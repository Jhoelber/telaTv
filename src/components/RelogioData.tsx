import { useEffect, useMemo, useState, useRef } from "react";

type NewsItem = { title: string; summary: string; source: string };

export const RelogioData = ({
  endpoint = "/api/news",
  refreshMs = 3600000,
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

  const lastFetchRef = useRef<number>(0);
  const abortControllerRef = useRef<AbortController | null>(null);

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

  const hora = useMemo(() => now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }), [now]);
  const diaSemana = useMemo(() => {
    const full = now.toLocaleDateString("pt-BR", { weekday: "long" });
    return full.charAt(0).toUpperCase() + full.slice(1);
  }, [now]);

  useEffect(() => {
    let alive = true;
    async function load(isManualFocus = false) {
      if (!alive || document.visibilityState !== "visible") return;
      const nowMs = Date.now();
      if (isManualFocus && nowMs - lastFetchRef.current < 60000) return;
      if (abortControllerRef.current) abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController();
      try {
        const res = await fetch(endpoint, { signal: abortControllerRef.current.signal });
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
    const onFocus = () => load(true);
    window.addEventListener("focus", onFocus);
    return () => {
      alive = false;
      clearInterval(t);
      window.removeEventListener("focus", onFocus);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [endpoint, refreshMs]);

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
        /* O segredo para as 2 linhas e reticências automáticas */
        .line-clamp-2-custom {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .line-clamp-1-custom {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>

      <div className="w-full h-20.5 flex overflow-hidden bg-white/95 border-t border-black/10 shadow-sm">
        {/* Esquerda: Relógio */}
        <div className="w-42.5 h-full flex flex-col shrink-0">
          <div className="flex-1 bg-[#062a66] flex items-center justify-center px-2">
            <span className="text-white font-extrabold text-3xl leading-none tabular-nums tracking-tighter">{hora}</span>
          </div>
          <div className="h-7 bg-[#0b4aa6] flex items-center justify-center px-2 overflow-hidden">
            <span className="text-white text-xs font-bold leading-none uppercase tracking-wide">{diaSemana}</span>
          </div>
        </div>

        {/* Direita: Conteúdo */}
        <div className="relative flex-1 min-w-0 h-full flex flex-col">
          {/* Label Azul */}
          <div className="h-5.5 px-4 bg-[#0b4aa6] flex items-center self-start">
            <span className="text-white text-[10px] font-black tracking-widest uppercase">{label}</span>
          </div>

          <div className={`flex-1 flex flex-col justify-center px-4 transition-all duration-300 ${fadeOut ? "opacity-0 translate-x-1" : "opacity-100 translate-x-0"}`}>
            {/* Título: 1 linha */}
            <h2 className="line-clamp-1-custom text-[16px] font-extrabold text-[#062a66] leading-tight mb-0.5">
              {current?.title ?? "Carregando..."}
            </h2>

            {/* Resumo: 2 linhas reais */}
            <div className="line-clamp-2-custom text-[12.5px] text-slate-500 leading-snug">
              <span>{current?.summary}</span>
              
              {/* O selo inserido como item inline para não quebrar o layout */}
              {current?.source && (
                <span className="inline-flex items-center ml-2 text-[#0b4aa6] font-bold text-[9px] bg-blue-50 px-1.5 py-0.5 rounded uppercase border border-blue-100 align-middle">
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