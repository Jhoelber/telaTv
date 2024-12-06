import { useEffect, useRef, useState } from 'react';

export const Relogio = () => {
    const [horaAtual, setHoraAtual] = useState<string>("");

    const intervaloRef = useRef<NodeJS.Timeout | null>(null);

    
    const atualizarHora = () => {
        const dateToday = new Date();
        let hora = dateToday.getHours();
        let minutos = dateToday.getMinutes();

        let horaFormatada = hora < 10 ? `0${hora}` : `${hora}`;
        let minutosFormatados = minutos < 10 ? `0${minutos}` : `${minutos}`;

        setHoraAtual(`${horaFormatada}:${minutosFormatados}`);
    };

    useEffect(() => {
        
        atualizarHora();

        if (intervaloRef.current) {
            clearInterval(intervaloRef.current);
        }

        intervaloRef.current = setInterval(() => {
            atualizarHora();
        }, 240000);

        return () => {
           
            if (intervaloRef.current) {
                clearInterval(intervaloRef.current);
            }
        };
    }, []);

    return (
        <div className='flex items-center gap-2'>
           
            <h1 className='text-zinc-600  text-2xl font-semibold'>  {horaAtual}</h1>
        </div>
    );
};
