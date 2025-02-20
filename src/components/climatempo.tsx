import { ClimaTempoDadosEmp } from './climaTempoDadosEmp';
import { Video } from './video';

export const ClimaTempo = () => {
    return (
        <div className="bg-gradient-to-tl from-blue-700 to-neutral-600 w-screen h-screen relative">
            <div className="grid grid-cols-[1fr,4fr]">
                <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
                    <div className="relative p-2 mx-2 rounded-md max-w-max font-semibold z-10 ease-in-out">
                        <ClimaTempoDadosEmp />
                        {/* <ClimaTempoDadosPref /> */}
                    </div>
                </div>

                <div className="flex items-center justify-center w-full h-full">
                    <div className="w-full h-full flex items-center justify-center">
                        <Video />
                    </div>
                </div>
            </div>
        </div>
    );
};
