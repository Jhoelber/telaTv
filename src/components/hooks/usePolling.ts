import { useEffect } from 'react';

const usePolling = (url: string, interval: number, onReload: () => void) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.reloadPage) {
            onReload(); // Ação para recarregar a página ou atualizar conteúdo
          }
        })
        .catch((error) => {
          console.error('Erro ao buscar JSON:', error);
        });
    }, interval); // Defina o intervalo de polling (por exemplo, 10 segundos)

    return () => clearInterval(intervalId); // Limpeza do intervalo quando o componente for desmontado
  }, [url, interval, onReload]);
};

export default usePolling;
