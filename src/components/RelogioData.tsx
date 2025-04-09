import { useEffect, useState } from "react";

export const RelogioData = () => {
    const [horaAtual, setHoraAtual] = useState(new Date());
  
    useEffect(() => {
      const timer = setInterval(() => {
        setHoraAtual(new Date());
      }, 1000);
  
      return () => clearInterval(timer);
    }, []);
  
    const formatarData = (data: Date) => {
      return data.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });
    };
  
    const formatarHora = (data: Date) => {
      return data.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    };

    return (
      <div className="w-full flex justify-between  bg-white/20 backdrop-blur px-3 py-4 rounded-md text-sm text-white">
        <div className="text-2xl">{formatarHora(horaAtual)}</div>
        <div className="text-xl">{formatarData(horaAtual)}</div>
      </div>
    );
  };
  