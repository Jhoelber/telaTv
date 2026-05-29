import { useEffect } from "react";
import { ClimaTempoDadosEmp } from "./climaTempoDadosEmp";
import { RelogioData } from "./RelogioData";
import { Video } from "./video";

export const ClimaTempo = () => {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  return (
    <div
      className="relative w-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        height: "calc(var(--vh, 1vh) * 100)",
        backgroundImage:
          "url('https://res.cloudinary.com/ddzqr6r2m/image/upload/v1780083815/ChatGPT_Image_29_de_mai._de_2026_16_39_08_rnhsgk.png')",
      }}
    >
      <div className="h-full w-full overflow-hidden p-[clamp(12px,2.2vw,22px)]">
        <div
          className="h-full w-full overflow-hidden grid gap-[clamp(12px,1.8vw,22px)]"
          style={{
            gridTemplateColumns: "clamp(240px, 22vw, 320px) minmax(0, 1fr)",
          }}
        >
          <div className="h-full min-w-0 overflow-hidden">
            <ClimaTempoDadosEmp />
          </div>

          <div className="h-full min-w-0 overflow-hidden flex flex-col">
            <div className="w-full overflow-hidden rounded-[28px] shadow-[0_18px_60px_rgba(0,0,0,0.35)] ring-1 ring-black/10">
              <Video />
              <RelogioData label="DIVULGAÇÕES NACIONAIS" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
