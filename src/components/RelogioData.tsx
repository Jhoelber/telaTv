import { useEffect, useMemo, useState } from "react";

type NewsItem = { title: string; summary: string; source: string };

export const RelogioData = ({
  endpoint = "/api/news",
  refreshMs = 120_000,
  rotateMs = 12_000,
  label = "DIVULGAÇÕES NACIONAIS",
}: {
  endpoint?: string;
  refreshMs?: number;
  rotateMs?: number;
  label?: string;
}) => {
  const [now, setNow] = useState(new Date());
  const [items, setItems] = useState<NewsItem[]>([]);
  const [idx, setIdx] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  // --- Lógica de Tempo ---
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

  const hora = useMemo(() => now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }), [now]);
  const diaSemana = useMemo(() => {
    const full = now.toLocaleDateString("pt-BR", { weekday: "long" });
    return full.charAt(0).toUpperCase() + full.slice(1);
  }, [now]);

  // --- Lógica de News (Simplificada) ---
  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const res = await fetch(endpoint, { cache: "no-store" });
        const json = await res.json();
        if (!alive) return;
        setItems(Array.isArray(json?.items) ? json.items : []);
        setIdx(0);
      } catch {
        if (alive) setItems([]);
      }
    }
    load();
    const t = setInterval(load, refreshMs);
    return () => { alive = false; clearInterval(t); };
  }, [endpoint, refreshMs]);

  useEffect(() => {
    if (items.length <= 1) return;
    const t = setInterval(() => {
      setFadeOut(true);
      setTimeout(() => {
        setIdx((v) => (v + 1) % items.length);
        setFadeOut(false);
      }, 300);
    }, rotateMs);
    return () => clearInterval(t);
  }, [items.length, rotateMs]);

  const current = useMemo(() => items[idx], [items, idx]);

  return (
    <div className="flex h-[85px] w-full overflow-hidden font-sans shadow-lg shadow-black/20">
      
      {/* BLOCO ESQUERDA: Gradiente Vertical (Hora e Dia) */}
      <div className="flex w-37.5 flex-col items-center justify-center border-r border-white/10 bg-radial-[at_55%_95%]
       from-[#05bafc] via-[#024a7ab5] to-[#013954] to-90%">
        <span className="text-4xl font-bold leading-none tracking-tighter text-white tabular-nums">
          {hora}
        </span>
        <span className="mt-1 text-[13px] font-medium text-white/70 ">
          {diaSemana}
        </span>
      </div>

      {/* BLOCO DIREITA: Notícias */}
      <div className="flex flex-1 flex-col bg-white">
        
        {/* Sub-barra superior: Gradiente Horizontal */}
        <div className="flex h-1/3 items-center bg-gradient-to-r from-[#051c3d] to-[#0a3a75] px-5">
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white">
            {label}
          </span>
        </div>

        {/* Conteúdo da Notícia */}
        <div className="relative flex flex-1 flex-col justify-center bg-slate-100 px-5">
          {/* Brilho sutil no topo do conteúdo */}
          <div className="absolute inset-x-0 top-0 h-px bg-white/50" />
          
          <div className={`transition-all duration-300 ${fadeOut ? "translate-x-4 opacity-0" : "translate-x-0 opacity-100"}`}>
            <h2 className="line-clamp-1 text-[17px] font-black uppercase leading-tight text-[#0a3a75]">
              {current?.title ?? "Aguardando informações..."}
            </h2>
            <p className="line-clamp-1 text-[13px] font-medium leading-tight text-slate-500">
              {current?.summary ?? "Conectando ao servidor..."}
              {current?.source && (
                <span className="ml-2 font-normal text-slate-400">| {current.source}</span>
              )}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};