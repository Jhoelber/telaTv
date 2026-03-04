import { ClimaTempoDadosEmp } from "./climaTempoDadosEmp";
import { RelogioData } from "./RelogioData";
import { Video } from "./video";

export const ClimaTempo = () => {
  return (
    <div
      className="w-screen h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/ddzqr6r2m/image/upload/v1772633203/bgtv_nx8pdo.png')",
      }}
    >
      {/* Safe area + trava geral */}
      <div className="h-full w-full overflow-hidden p-[clamp(10px,2.2vw,22px)]">
        <div
          className="h-full w-full overflow-hidden grid gap-[clamp(10px,1.6vw,18px)]"
          style={{
            gridTemplateColumns: "clamp(220px, 20vw, 300px) minmax(0, 1fr)",
          }}
        >
          {/* esquerda */}
          <div className="h-full min-w-0 overflow-hidden">
            <ClimaTempoDadosEmp />
          </div>

          {/* direita */}
          <div className="h-full min-w-0 overflow-hidden flex flex-col">
            <div className="w-full overflow-hidden rounded-[26px] shadow-[0_18px_60px_rgba(0,0,0,0.35)] ring-1 ring-black/10">
              <Video />
              <RelogioData label="DIVULGAÇÕES NACIONAIS" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};