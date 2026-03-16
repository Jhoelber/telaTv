import { useEffect, useMemo, useState, useRef } from "react";

type NewsItem = { title: string; summary: string; source: string };

export const RelogioData = ({
  endpoint = "/api/news",
  refreshMs = 3600000, // 1 hora (60 * 60 * 1000)
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

  // Refs para controle de performance
  const lastFetchRef = useRef<number>(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  // --- RELÓGIO (Sincronizado com o minuto real) ---
  useEffect(() => {
    let interval: number | undefined;
    const tick = () => setNow(new Date());
    tick();

    const d = new Date();
    const msToNextMinute = (60 - d.getSeconds()) * 1000 - d.getMilliseconds();

    const t = window.setTimeout(() => {
      tick();
      interval = window.setInterval(tick, 60_000);
    }, msToNextMinute);

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
    const full = now.toLocaleDateString("pt-BR", { weekday: "long" });
    return full.charAt(0).toUpperCase() + full.slice(1);
  }, [now]);

  // --- BUSCA DE NOTÍCIAS (Alta Performance) ---
  useEffect(() => {
    let alive = true;

    async function load(isManualFocus = false) {
      if (!alive || document.visibilityState !== "visible") return;

      // Se for um "refoco" na aba, só busca se a última busca foi há mais de 1 minuto
      const nowMs = Date.now();
      if (isManualFocus && nowMs - lastFetchRef.current < 60000) return;

      // Cancela requisição anterior se ainda estiver rodando
      if (abortControllerRef.current) abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController();

      try {
        const res = await fetch(endpoint, {
          signal: abortControllerRef.current.signal
          // Note: Sem 'cache: no-store' para permitir Edge Cache da Vercel
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const list: NewsItem[] = Array.isArray(json?.items) ? json.items : [];

        if (!alive) return;
        setItems(list.length ? list : []);
        setIdx(0);
        lastFetchRef.current = Date.now();
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          console.error("Erro ao buscar notícias:", error);
          if (alive) setItems([]);
        }
      }
    }

    load();
    const t = setInterval(load, refreshMs);

    // Listener de foco com throttle (só atualiza se necessário)
    const onFocus = () => load(true);
    window.addEventListener("focus", onFocus);

    return () => {
      alive = false;
      clearInterval(t);
      window.removeEventListener("focus", onFocus);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [endpoint, refreshMs]);

  // --- ROTAÇÃO VISUAL (Local) ---
  useEffect(() => {
    if (items.length <= 1) return;

    const t = setInterval(() => {
      setFadeOut(true);
      window.setTimeout(() => {
        setIdx((v) => (v + 1) % items.length);
        setFadeOut(false);
      }, 180);
    }, rotateMs);

    return () => clearInterval(t);
  }, [items.length, rotateMs]);

  const current = useMemo(() => items[idx], [items, idx]);

  return (
    <>
      <style>{`
        .clamp1{ display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:1; overflow:hidden; word-break: break-word; }
        .clamp2{ display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:2; overflow:hidden; word-break: break-word; }
      `}</style>

      <div
        className="w-full h-20.5 flex overflow-hidden bg-white/95 border-t border-black/10 shadow-sm"
        style={{ contain: "layout paint size" }}
      >
        {/* Esquerda: Hora e Dia */}
        <div className="w-42.5 h-full flex flex-col shrink-0">
          <div className="flex-1 bg-[#062a66] flex items-center justify-center px-2">
            <span className="text-white font-extrabold text-3xl leading-none tabular-nums tracking-tighter">
              {hora}
            </span>
          </div>
          <div className="h-7 bg-[#0b4aa6] flex items-center justify-center px-2 overflow-hidden">
            <span className="text-white text-xs font-bold leading-none uppercase tracking-wide">
              {diaSemana}
            </span>
          </div>
        </div>

        {/* Direita: Notícias */}
        <div className="relative flex-1 min-w-0 h-full overflow-hidden">
          <div className="absolute left-0 top-0 h-5.5 px-4 bg-[#0b4aa6] flex items-center z-10 shadow-sm">
            <span className="text-white text-[10px] font-black tracking-widest uppercase">
              {label}
            </span>
          </div>

          <div
            className={[
              "h-full min-w-0 overflow-hidden flex flex-col justify-center pl-4 pr-4 pt-5.5",
              "transition-all duration-300 ease-in-out",
              fadeOut ? "opacity-0 translate-x-1" : "opacity-100 translate-x-0",
            ].join(" ")}
          >
            <div className="clamp1 text-[16px] font-extrabold text-[#062a66] leading-tight">
              {current?.title ?? "Carregando notícias..."}
            </div>

            <div className="flex min-w-0 items-center gap-2 mt-0.5">
              <div className="clamp1 min-w-0 text-[12.5px] text-slate-500 leading-snug">
                {current?.summary ?? "Aguarde as últimas atualizações..."}
              </div>

              {current?.source && (
                <span className="shrink-0 text-[#0b4aa6] font-bold text-[10px] bg-blue-50 px-1.5 py-0.5 rounded uppercase">
                  {current.source}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};