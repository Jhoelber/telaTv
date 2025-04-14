import { useEffect, useState } from "react";

export const RelogioData = () => {
    const [horaAtual, setHoraAtual] = useState(new Date());
  
    useEffect(() => {
      const timer = setInterval(() => {
        setHoraAtual(new Date());
      }, 60000);
  
      return () => clearInterval(timer);
    }, []);
  
    const formatarData = (data: Date) => {
        const texto = data.toLocaleDateString("pt-BR", {
          weekday: "long",
          day: "numeric",
          month: "long",
        });
      
        return texto.charAt(0).toUpperCase() + texto.slice(1);
      };
  
    const formatarHora = (data: Date) => {
      return data.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
       
      });
    };

    return (
      <div className="w-full flex justify-between  bg-white/20 px-3 py-4 rounded-md text-sm text-white">
        <div className="text-2xl">{formatarHora(horaAtual)}</div>
        <div className="text-xl">{formatarData(horaAtual)}</div>
      </div>
    );
  };
  