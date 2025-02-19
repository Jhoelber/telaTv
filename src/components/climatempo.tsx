import axios from 'axios';
import { useEffect, useState } from 'react';
import { ClimaTempoDadosEmp } from './climaTempoDadosEmp';
import { ClimaTempoDadosPref } from './climaTempoDadosPref';
import { Video } from './video';



export const ClimaTempo = () => {
    const [results, setResults] = useState<any>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const lat = "-23.1616";
    const lon = "-49.9697";
    const keyApi = "a039016986f4ab373377db704f26e335";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${keyApi}&units=metric&lang=pt_br`;

    const climaTempo = async () => {
        try {
            const response = await axios.get(url);
            setResults(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Erro ao buscar os dados:", error);
        }
    };

    useEffect(() => {

        climaTempo();

        const intervalId = setInterval(() => {
            setIsVisible(prev => !prev);
        }, 240000);

        return () => {
            clearInterval(intervalId);
        };


    }, []);




    return (
        <div className="bg-gradient-to-tl  from-blue-700 to-neutral-600 w-screen h-screen relative">
            <div className={isVisible ? "grid grid-cols-[1fr,4fr,1fr] " : "grid grid-cols-1"}>
                {isVisible && (

                    <div className='flex flex-col items-center justify-center h-screen overflow-hidden' >

                        <div className="relative  p-2  mx-2 rounded-md max-w-max font-semibold z-10 ease-in-out ">
                            {results ? (

                                <ClimaTempoDadosEmp />

                            ) : (
                                <p>Carregando dados...</p>
                            )}

                        </div>
                    </div>

                )}
                {isVisible ?
                    < div className="relative w-full h-full">
                        <div className={` mt-[20%]  z-0`}>
                            <Video />

                        </div>
                    </div>
                    :
                    <div className="relative w-full h-full">
                        <div className={` top-0 left-0 w-full h-full z-0 `}>
                            <Video />

                        </div>
                    </div>


                }


                {isVisible && <ClimaTempoDadosPref />}

            </div>
        </div >
    );
};