import { ClimaTempoDadosEmp } from "./climaTempoDadosEmp";
import { RelogioData } from "./RelogioData";
import { Video } from "./video";

export const ClimaTempo = () => {
  return (
    <div
      className="relative w-screen h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/ddzqr6r2m/image/upload/v1772633203/bgtv_nx8pdo.png')",
      }}
    >
      {/* Logo topo-direito (fora do card do vídeo) */}
      <img
        src="https://res.cloudinary.com/ddzqr6r2m/image/upload/v1772633185/tv_fyxkcp.png"
        alt="TV Jacarezinho"
        draggable={false}
        className="absolute top-[2.2vh] right-[2.2vw] z-50 w-[min(16vw,190px)] h-auto select-none pointer-events-none drop-shadow-lg"
      />

      {/* Safe area */}
      <div className="h-full w-full p-[clamp(12px,2.2vw,22px)]">
        <div
          className="h-full w-full grid gap-[clamp(12px,1.8vw,22px)]"
          style={{
            gridTemplateColumns: "clamp(300px, 23vw, 360px) minmax(0, 1fr)",
          }}
        >
          {/* ESQUERDA */}
          <div className="h-full min-w-0 overflow-hidden">
            <ClimaTempoDadosEmp />
          </div>

          {/* DIREITA */}
          <div className="h-full min-w-0 flex flex-col overflow-hidden">
            {/* Card vídeo + tarja */}
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