import axios from 'axios';
import { useEffect, useState } from 'react';
import { ClimaTempoDadosEmp } from './climaTempoDadosEmp';
import { ClimaTempoDadosPref } from './climaTempoDadosPref';
import { Video } from './video';



export const ClimaTempo = () => {
    const [results, setResults] = useState<any>(null);
   

    const lat = "-23.1616";
    const lon = "-49.9697";
    const keyApi = "a039016986f4ab373377db704f26e335";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${keyApi}&units=metric&lang=pt_br`;

    const climaTempo = async () => {
        try {
            const response = await axios.get(url);
            setResults(response.data);
            console.log(response.data);
            console.log(results)
        } catch (error) {
            console.error("Erro ao buscar os dados:", error);
        }
    };

    useEffect(() => {

        climaTempo();

       

    }, []);




    return (
        <div className="bg-gradient-to-tl  from-blue-700 to-neutral-600 w-screen h-screen relative">
            <div className="grid grid-cols-[1fr,4fr,1fr] " >


                <div className='flex flex-col items-center justify-center h-screen overflow-hidden' >

                    <div className="relative  p-2  mx-2 rounded-md max-w-max font-semibold z-10 ease-in-out ">


                        <ClimaTempoDadosEmp />



                    </div>
                </div>



                < div className="relative w-full h-full">
                    <div className={` mt-[20%]  z-0`}>
                        <Video />

                    </div>
                </div>


                <div>
                    <ClimaTempoDadosPref />
                </div>
            </div>
        </div >
    );
};