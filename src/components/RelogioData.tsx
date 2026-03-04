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
    const full = now.toLocaleDateString("pt-BR", { weekday: "long" }).toLowerCase();
    const txt = full;
    return txt.charAt(0).toUpperCase() + txt.slice(1);
  }, [now]);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        const res = await fetch(endpoint, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
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
        .clamp1{
          display:-webkit-box;
          -webkit-box-orient:vertical;
          -webkit-line-clamp:1;
          overflow:hidden;
          word-break: break-word;
        }
        .clamp2{
          display:-webkit-box;
          -webkit-box-orient:vertical;
          -webkit-line-clamp:2;
          overflow:hidden;
          word-break: break-word;
        }
      `}</style>

      <div
        className="w-full h-[82px] flex overflow-hidden bg-white/95 backdrop-blur-sm border-t border-black/10"
        style={{ contain: "layout paint size" }}
      >
        {/* esquerda: hora / dia */}
        <div className="w-[170px] h-full flex flex-col ">
          <div className="flex-1 bg-[#062a66] flex items-center justify-center px-2">
            <span className="text-white font-extrabold text-3xl leading-none tabular-nums">
              {hora}
            </span>
          </div>

          <div className="h-[28px] bg-[#0b4aa6] flex items-center justify-center px-2 overflow-hidden">
            <span className="text-white text-sm font-bold leading-none clamp1">
              {diaSemana}
            </span>
          </div>
        </div>

        {/* direita: notícias */}
        <div className="relative flex-1 min-w-0 h-full overflow-hidden">
          {/* selo */}
          <div className="absolute left-0 top-0 h-[22px] px-4 bg-[#0b4aa6] flex items-center">
            <span className="text-white text-sm font-extrabold tracking-wide">
              {label}
            </span>
          </div>

          <div
            className={[
              "h-full min-w-0 overflow-hidden",
              "flex flex-col justify-center pl-4 pr-4 pt-[22px]",
              "transition-all duration-200",
              fadeOut ? "opacity-0 translate-y-[2px]" : "opacity-100 translate-y-0",
            ].join(" ")}
          >
            <div className="clamp1 text-[16px] font-extrabold text-[#0b4aa6] leading-tight">
              {current?.title ?? "Carregando notícias..."}
            </div>

            <div className="flex min-w-0 items-center gap-2">
              <div className="clamp2 min-w-0 text-[12.5px] text-slate-600 leading-snug">
                {current?.summary ?? "—"}
              </div>

              {current?.source ? (
                <span className="shrink-0 text-slate-400 text-xs">
                  • {current.source}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};