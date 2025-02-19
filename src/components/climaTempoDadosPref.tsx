import axios from 'axios';
import { useState, useEffect } from 'react';
// import { FaRegClock, FaTemperatureHigh } from "react-icons/fa";
// import { IoIosWater } from "react-icons/io";
// import { LuWind } from "react-icons/lu";
// import { Relogio } from './relogio';


interface WeatherData {
    name: string;
    sys: {
        country: string;
    };
    weather: Array<{
        icon: string;
    }>;
    main: {
        temp: number;
        humidity: number;
    };
    wind: {
        speed: number;
    };
}

export const ClimaTempoDadosPref = () => {
    const [results, setResults] = useState<WeatherData | null>(null); // Tipando o estado
    const lat = "-23.1616";
    const lon = "-49.9697";
    const keyApi = "a039016986f4ab373377db704f26e335";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${keyApi}&units=metric&lang=pt_br`;

    
    useEffect(() => {
        const climaTempo = async () => {
            try {
                const response = await axios.get(url);
                setResults(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Erro ao buscar os dados:", error);
            }
        };
        climaTempo();
    }, []);

    return (

       
           
       
        <div className='flex flex-col items-center justify-center h-screen overflow-hidden'>
             <img src="./logoprincipal.png" className='pl-2 ' alt="Logo" />
            <div className="relative  mx-2 rounded-md max-w-max font-semibold z-10 ease-in-out">
                {results ? (
                    <div>
                        {/* <div className="flex flex-col items-center justify-center p-4  rounded-2xl bg-white shadow-lg ease-in duration-300">
                            <h2 className="text-xl">
                                {results.name}, {results.sys.country}
                            </h2>
                            <img
                                className="w-24 h-24"
                                src={`https://openweathermap.org/img/wn/${results.weather[0].icon}.png`}
                                alt="Ícone do clima"
                            />
                            <p>Temperatura:</p>
                            <div className="flex">
                                <FaTemperatureHigh className="text-xl text-red-500 mr-2" /> {results.main.temp}°C
                            </div>



                        </div>
                        <div className="flex gap-2 mt-2">
                            <div className="flex flex-col items-center px-4 rounded-lg bg-white shadow-lg">
                                <p>Umidade</p>
                                <div className="flex">
                                    <IoIosWater className="text-lg text-blue-600 mr-2" /> {results?.main.humidity}%
                                </div>
                            </div>
                            <div className="flex flex-col items-center px-4 rounded-lg bg-white shadow-lg">
                                <p>Vento</p>
                                <div className="flex">
                                    <LuWind className="text-lg text-purple-800 mr-2" />
                                    {results?.wind.speed} Km/h
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col mt-2 py-2 items-center rounded-lg bg-white shadow-lg">
                            <p className='text-2xl'>Relógio</p>
                            <div className='flex flex-col'>
                                <div className='flex gap-6 items-center'>
                                    <FaRegClock className='text-3xl text-zinc-600' />
                                    <Relogio />
                                </div>
                            </div>
                        </div> */}

                        <img src="./muralPref.jpg"  className='mt-20 '  />
                    </div>
                ) : (
                    <p>Carregando dados...</p>
                )}


            </div>
        </div>
       
    );
};
