import { ClimaTempoDadosEmp } from "./climaTempoDadosEmp";
import { RelogioData } from "./RelogioData";
import { Video } from "./video";

export const ClimaTempo = () => {
    return (
        <div className="bg-gradient-to-tl from-blue-500 to-neutral-200 w-screen h-screen">
            <div className="grid grid-cols-[1fr,5fr] h-screen">
                <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
                    <div className="relative p-2 mx-2 rounded-md max-w-max font-semibold z-10 ease-in-out">
                        <ClimaTempoDadosEmp />
                    </div>
                </div>

                <div className="w-full h-full flex flex-col ">
                    {/* Container do vídeo com overlay */}
                    <div className=" w-full mt-4">
                        <Video />

                        {/* TARJA colada no vídeo (overlay) */}
                        <div className=" left-0 right-0 bottom-0">
                            <RelogioData />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};