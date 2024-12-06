import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaRegClock, FaTemperatureHigh } from "react-icons/fa";
import { IoIosWater } from "react-icons/io";
import { LuWind } from "react-icons/lu";
import { Relogio } from './relogio';
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
        <div className="bg-gradient-to-tl from-slate-700 to-neutral-900 w-screen h-screen relative">
            <div className={isVisible ? "grid grid-cols-[1fr,5fr]" : "grid grid-cols-1"}>
                {isVisible && (
                    <div className="relative bg-slate-600 p-2 mt-36 mx-2 rounded-md max-w-max font-semibold z-10 ease-in-out ">
                        {results ? (
                            <div className="flex flex-col items-center p-4 rounded-2xl bg-white shadow-lg ease-in duration-300">
                                <h2 className="text-2xl">
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
                        ) : (
                            <p>Carregando dados...</p>
                        )}
                        <div className="flex gap-2 mt-2">
                            <div className="flex flex-col items-center px-4 rounded-lg bg-white shadow-lg">
                                <p>Umidade</p>
                                <div className="flex">
                                    <IoIosWater className="text-lg text-blue-600 mr-2" /> {results.main.humidity}%
                                </div>
                            </div>
                            <div className="flex flex-col items-center px-4 rounded-lg bg-white shadow-lg">
                                <p>Vento</p>
                                <div className="flex">
                                    <LuWind className="text-lg text-purple-800 mr-2" />
                                    {results.wind.speed} Km/h
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col mt-2 py-2 items-center rounded-lg bg-white shadow-lg">
                            <p className='text-2xl'>Relógio</p>
                            <div className='flex  flex-col '>
                                <div className='flex gap-6 items-center'>
                                    <FaRegClock className='text-3xl text-zinc-600' />
                                    <Relogio />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="relative w-full h-full">
                    <div className="absolute top-0 left-0 w-full h-full z-0">
                        <Video />
                    </div>
                </div>
            </div>
        </div>
    );
};