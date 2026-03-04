import React, { useEffect, useState, useCallback } from "react";

interface CarouselProps {
  items: React.ReactNode[];
  interval: number;
  heightClass?: string; // 👈 novo
}

export const Carousel: React.FC<CarouselProps> = ({
  items,
  interval,
  heightClass = "h-[40vh]",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    if (!items.length) return;
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = window.setInterval(next, interval);
    return () => window.clearInterval(timer);
  }, [interval, next, items.length]);

  if (!items.length) return null;

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      <div className={`overflow-hidden relative w-full ${heightClass}`}>
        <div
          className="h-full flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={index} className="flex-shrink-0 w-full h-full">
              <div className="w-full h-full flex items-center justify-center">
                {item}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};