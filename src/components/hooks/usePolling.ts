import { useEffect, useRef } from "react";

const STORAGE_KEY = "ultimaAtualizacao";

export default function usePolling(
  url: string,
  intervalMs: number,
  onReload: () => void
) {
  const lastUpdateRef = useRef<string | null>(localStorage.getItem(STORAGE_KEY));
  const inFlightRef = useRef(false);
  const timerRef = useRef<number | null>(null);
  const backoffRef = useRef(intervalMs);

  useEffect(() => {
    let mounted = true;

    const schedule = (ms: number) => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(run, ms);
    };

    const run = async () => {
      if (!mounted) return;
      if (inFlightRef.current) {
        schedule(backoffRef.current);
        return;
      }

      inFlightRef.current = true;

      try {
        // evita cache sem precisar mudar a URL toda hora
        const res = await fetch(url, { cache: "no-store" });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        const nova = data?.ultimaAtualizacao ?? null;

        if (nova) {
          const antiga = lastUpdateRef.current;

          // se mudou -> reload
          if (antiga && nova !== antiga) onReload();

          localStorage.setItem(STORAGE_KEY, nova);
          lastUpdateRef.current = nova;
        }

        // sucesso: volta pro intervalo normal
        backoffRef.current = intervalMs;
      } catch (err) {
        // falhou: backoff progressivo (até 60s)
        backoffRef.current = Math.min(backoffRef.current * 2, 60_000);

        // não logar em produção (pra não “sujar”)
        if (import.meta.env.DEV) {
          console.error("Polling falhou:", err);
        }
      } finally {
        inFlightRef.current = false;
        schedule(backoffRef.current);
      }
    };

    // roda logo de cara
    run();

    // se a internet voltar, checa imediatamente
    const onOnline = () => run();
    window.addEventListener("online", onOnline);

    return () => {
      mounted = false;
      window.removeEventListener("online", onOnline);
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [url, intervalMs, onReload]);
}