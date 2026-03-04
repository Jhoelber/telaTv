import { ClimaTempoDadosEmp } from "./climaTempoDadosEmp";
import { RelogioData } from "./RelogioData";
import { Video } from "./video";

export const ClimaTempo = () => {
    return (
        <div
            className="w-screen h-screen bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage:
                    "url('https://res.cloudinary.com/ddzqr6r2m/image/upload/v1772633203/bgtv_nx8pdo.png')",
            }}
        >
            {/* Safe area menor (TV corta borda) */}
            <div className="h-full w-full p-[1.6vw]">
                <div className="grid h-full w-full gap-[1.2vw] [grid-template-columns:clamp(220px,18vw,300px)_minmax(0,1fr)]">
                    {/* ESQUERDA */}
                    <div className="h-full min-w-0">
                        <ClimaTempoDadosEmp />
                    </div>

                    {/* DIREITA */}
                    <div className="h-full min-w-0 flex flex-col">
                        {/* Card vídeo + tarja ocupa toda largura disponível */}
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