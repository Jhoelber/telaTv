import { ClimaTempo } from "./components/climatempo";
import usePolling from "./components/hooks/usePolling";
import { Analytics } from "@vercel/analytics/react";

function App() {
  usePolling("https://pooling-tv.vercel.app/meta", 300000, () => {
    location.reload();
  });

  return (
    <>
      <ClimaTempo />
      <Analytics />
    </>
  );
}

export default App;