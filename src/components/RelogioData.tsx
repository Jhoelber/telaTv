import { useEffect, useMemo, useState } from "react";

type NewsItem = { title: string; summary: string; source: string };

export const RelogioData = ({
  endpoint = "/api/news",
  refreshMs = 120_000,
  rotateMs = 12_000,
}: {
  endpoint?: string;
  refreshMs?: number;
  rotateMs?: number;
}) => {
  const [now, setNow] = useState(new Date());
  const [items, setItems] = useState<NewsItem[]>([]);
  const [idx, setIdx] = useState(0);

  // relógio sincronizado no minuto
  useEffect(() => {
    let interval: number | undefined;
    const tick = () => setNow(new Date());
    tick();

    const d = new Date();
    const ms = (60 - d.getSeconds()) * 1000 - d.getMilliseconds();
    const t = window.setTimeout(() => {
      tick();
      interval = window.setInterval(tick, 60_000);
    }, ms);

    return () => {
      window.clearTimeout(t);
      if (interval) window.clearInterval(interval);
    };
  }, []);

  const hora = useMemo(
    () => now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    [now]
  );

  const diaSemana = useMemo(() => {
    const texto = now.toLocaleDateString("pt-BR", { weekday: "long" });
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }, [now]);

  // buscar notícias
  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        const res = await fetch(endpoint, { cache: "no-store" });
        const json = await res.json();
        const list: NewsItem[] = Array.isArray(json?.items) ? json.items : [];
        if (!alive) return;
        setItems(list.length ? list : []);
        setIdx(0);
      } catch {
        if (!alive) return;
        setItems([]);
        setIdx(0);
      }
    }

    load();
    const t = setInterval(load, refreshMs);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, [endpoint, refreshMs]);

  // rotação
  useEffect(() => {
    if (items.length <= 1) return;
    const t = setInterval(() => setIdx((v) => (v + 1) % items.length), rotateMs);
    return () => clearInterval(t);
  }, [items.length, rotateMs]);

  const current = useMemo(() => items[idx], [items, idx]);

  return (
    <>
      <style>{`
        .fade { animation: fade .22s ease-out; }
        @keyframes fade { from { opacity:0; transform: translateY(2px);} to { opacity:1; transform: translateY(0);} }
      `}</style>

      <div className="w-full h-[52px] flex overflow-hidden bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.16)] rounded-b-md">
        {/* Bloco esquerdo: HORA em cima / DIA embaixo */}
        <div className="w-[82px] h-full flex flex-col">
          <div className="flex-1 bg-[#062a66] flex items-center justify-center">
            <span className="text-white font-extrabold text-[18px] leading-none tabular-nums">
              {hora}
            </span>
          </div>
          <div className="h-[18px] bg-[#0b4aa6] flex items-center justify-center px-1">
            <span className="text-white text-[10px] font-bold leading-none truncate">
              {diaSemana}
            </span>
          </div>
        </div>

        {/* Área branca: selo + título + resumo */}
        <div className="relative flex-1 min-w-0 h-full">
          <div className="absolute left-0 top-0 h-[18px] px-3 bg-[#0b4aa6] flex items-center">
            <span className="text-white text-[11px] font-extrabold tracking-wide">
              ÚLTIMAS NOTÍCIAS
            </span>
          </div>

          <div key={idx} className="fade h-full min-w-0 flex flex-col justify-center pl-3 pr-4 pt-[18px]">
            <div className="min-w-0 truncate text-[13px] font-extrabold text-[#0b4aa6] leading-tight">
              {current?.title ?? "Carregando notícias..."}
            </div>

            <div className="min-w-0 truncate text-[11px] text-slate-600 leading-tight">
              {current?.summary ?? "—"}
              {current?.source ? <span className="text-slate-400"> • {current.source}</span> : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};