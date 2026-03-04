import { ClimaTempoDadosEmp } from "./climaTempoDadosEmp";
import { RelogioData } from "./RelogioData";
import { Video } from "./video";

export const ClimaTempo = () => {
  return (
    <div
      className="relative w-screen h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/ddzqr6r2m/image/upload/v1772633203/bgtv_nx8pdo.png')",
      }}
    >
      

      {/* Safe-area pra “não encostar” no background */}
      <div className="h-full w-full p-8">
        <div className="grid h-full grid-cols-[340px,1fr] gap-8">
          {/* Coluna esquerda (brasão/cartaz/mascote/etc fica no seu componente) */}
          <div className="flex flex-col items-start justify-start overflow-hidden">
            <div className="w-full">
              <ClimaTempoDadosEmp />
            </div>
          </div>

          {/* Coluna direita */}
          <div className="flex flex-col justify-start">
            {/* Card do vídeo + tarja (igual a imagem) */}
            <div className="overflow-hidden rounded-[26px] shadow-[0_18px_60px_rgba(0,0,0,0.35)] ring-1 ring-black/10">
              <Video />
              <RelogioData  />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};