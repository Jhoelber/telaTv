import { useEffect, useRef } from 'react';

const usePolling = (url: string, interval: number, onReload: () => void) => {
  const lastUpdateRef = useRef<string | null>(null);

  useEffect(() => {
    const checkForUpdate = () => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const novaAtualizacao = data.meta?.ultimaAtualizacao;

          if (novaAtualizacao && lastUpdateRef.current && novaAtualizacao !== lastUpdateRef.current) {
            onReload();
          }

          // Salva a data atual pra comparar nas próximas
          lastUpdateRef.current = novaAtualizacao;
        })
        .catch((error) => {
          console.error('Erro ao buscar JSON:', error);
        });
    };

    checkForUpdate(); // executa na primeira renderização
    const intervalId = setInterval(checkForUpdate, interval);

    return () => clearInterval(intervalId);
  }, [url, interval, onReload]);
};

export default usePolling;
