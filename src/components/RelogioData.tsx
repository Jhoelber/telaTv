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
    const tick = () => setNow(new Date());
    tick();
    const d = new Date();
    const msToNextMinute = (60 - d.getSeconds()) * 1000 - d.getMilliseconds();
    const t = window.setTimeout(() => {
      tick();
      window.setInterval(tick, 60_000);
    }, msToNextMinute);
    return () => window.clearTimeout(t);
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
      if (isManualFocus && Date.now() - lastFetchRef.current < 60000) return;
      if (abortControllerRef.current) abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController();
      try {
        const res = await fetch(endpoint, { signal: abortControllerRef.current.signal });
        const json = await res.json();
        if (alive) {
          setItems(Array.isArray(json?.items) ? json.items : []);
          setIdx(0);
          lastFetchRef.current = Date.now();
        }
      } catch (e) { if (alive) setItems([]); }
    }
    load();
    const t = setInterval(load, refreshMs);
    window.addEventListener("focus", () => load(true));
    return () => { alive = false; clearInterval(t); };
  }, [endpoint, refreshMs]);

  useEffect(() => {
    if (items.length <= 1) return;
    const t = setInterval(() => {
      setFadeOut(true);
      setTimeout(() => {
        setIdx((v) => (v + 1) % items.length);
        setFadeOut(false);
      }, 200);
    }, rotateMs);
    return () => clearInterval(t);
  }, [items.length, rotateMs]);

  const current = items[idx];

  return (
    <>
      <style>{`
        .clamp1 { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden; text-overflow: ellipsis; }
      `}</style>

      <div className="w-full h-20.5 flex overflow-hidden bg-white border-t border-black/10 shadow-sm">
        {/* Relógio Esquerda */}
        <div className="w-42.5 h-full flex flex-col shrink-0">
          <div className="flex-1 bg-[#062a66] flex items-center justify-center">
            <span className="text-white font-extrabold text-3xl tabular-nums tracking-tighter">{hora}</span>
          </div>
          <div className="h-7 bg-[#0b4aa6] flex items-center justify-center">
            <span className="text-white text-xs font-bold uppercase tracking-wide">{diaSemana}</span>
          </div>
        </div>

        {/* Notícias Direita */}
        <div className="relative flex-1 min-w-0 flex flex-col">
          <div className="h-5.5 px-4 bg-[#0b4aa6] flex items-center self-start">
            <span className="text-white text-[10px] font-black tracking-widest uppercase">{label}</span>
          </div>

          <div className={`flex-1 flex flex-col justify-center px-4 transition-all duration-300 ${fadeOut ? "opacity-0" : "opacity-100"}`}>
            <h2 className="clamp1 text-[16px] font-extrabold text-[#062a66] leading-tight mb-0.5">
              {current?.title ?? "Carregando..."}
            </h2>
            
            <div className="flex items-center justify-between gap-4">
              <p className="clamp1 text-[13px] text-slate-500 font-medium flex-1">
                {current?.summary}
              </p>
              {current?.source && (
                <span className="shrink-0 text-[#0b4aa6] font-bold text-[9px] bg-blue-50 px-2 py-0.5 rounded uppercase border border-blue-100">
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