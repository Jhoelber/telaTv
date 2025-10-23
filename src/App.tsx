
import { ClimaTempo } from "./components/climatempo";
import usePolling from "./components/hooks/usePolling";
import { Analytics } from "@vercel/analytics/react"

function App() {
  // Usa o hook para verificar a cada 5 minutos se o JSON indica atualização
  usePolling("https://pooling-tv.vercel.app/meta", 300000, () => {
    // Exemplo: recarrega a página inteira quando detectar alteração
    location.reload();
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ClimaTempo />
       <Analytics />
    </div>
  );
}

export default App;
