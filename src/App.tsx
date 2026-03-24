import { useEffect } from "react";
import { ClimaTempo } from "./components/climatempo";
import usePolling from "./components/hooks/usePolling";
import { Analytics } from "@vercel/analytics/react";

function App() {
  usePolling("https://pooling-tv.vercel.app/meta", 300000, () => {
    location.reload();
  });

  useEffect(() => {
    function setVh() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    setVh();
    window.addEventListener("resize", setVh);

    const refreshTimer = window.setTimeout(() => {
      window.location.reload();
    }, 1000 * 60 * 60 * 2); // 2 horas

    return () => {
      window.removeEventListener("resize", setVh);
      window.clearTimeout(refreshTimer);
    };
  }, []);

  return (
    <>
      <ClimaTempo />
      <Analytics />
    </>
  );
}

export default App;