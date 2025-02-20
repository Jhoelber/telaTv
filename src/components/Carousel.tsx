import React, { useEffect, useState } from "react";

// Atualizando para aceitar qualquer tipo de conteúdo JSX
interface CarouselProps {
  items: React.ReactNode[]; // Altere para React.ReactNode[] em vez de string[]
  interval: number;
}

export const Carousel: React.FC<CarouselProps> = ({ items, interval }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  useEffect(() => {
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [interval]);

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="overflow-hidden relative">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={index} className="flex-shrink-0 w-full">
              <div className="flex items-center justify-center h-60">
                {item}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


