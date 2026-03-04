import React, { useEffect, useState, useCallback } from "react";

interface CarouselProps {
  items: React.ReactNode[];
  interval: number;
}

export const Carousel: React.FC<CarouselProps> = ({ items, interval }) => {
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
    <div className="relative w-full mx-auto">
      <div className="overflow-hidden relative">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={index} className="flex-shrink-0 w-full">
              <div className="flex items-center justify-center">{item}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};