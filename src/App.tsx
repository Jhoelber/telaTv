import { ClimaTempo } from "./components/climatempo";
import usePolling from "./components/hooks/usePolling";
import { Analytics } from "@vercel/analytics/react";

function App() {
  usePolling("https://pooling-tv.vercel.app/meta", 300000, () => {
    location.reload();
  });
  function setVh() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  window.addEventListener("resize", setVh);
  setVh();
  return (
    <>
      <ClimaTempo />
      <Analytics />
    </>
  );
}

export default App;