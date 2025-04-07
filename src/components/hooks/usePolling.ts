import { useEffect, useRef } from 'react';

const usePolling = (url: string, interval: number, onReload: () => void) => {
  const lastUpdateRef = useRef<string | null>(
    localStorage.getItem("ultimaAtualizacao") // Persistente entre reloads (opcional)
  );

  useEffect(() => {
    const checkForUpdate = () => {
      fetch(`${url}?_=${Date.now()}`) // evita cache
        .then((response) => response.json())
        .then((data) => {
          const novaAtualizacao = data.meta?.ultimaAtualizacao;

          console.log("⏱️ Verificando atualização...");
          console.log("Última conhecida:", lastUpdateRef.current);
          console.log("Nova do servidor:", novaAtualizacao);

          if (novaAtualizacao && lastUpdateRef.current && novaAtualizacao !== lastUpdateRef.current) {
            console.log("🟢 Atualização detectada! Recarregando...");
            onReload();
          }

          localStorage.setItem("ultimaAtualizacao", novaAtualizacao);
          lastUpdateRef.current = novaAtualizacao;
        })
        .catch((error) => {
          console.error('❌ Erro ao buscar JSON:', error);
        });
    };

    checkForUpdate(); // executa logo que abre
    const intervalId = setInterval(checkForUpdate, interval);
    return () => clearInterval(intervalId);
  }, [url, interval, onReload]);
};

export default usePolling;
