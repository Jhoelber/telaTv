import React, { useEffect, useState } from "react";

interface CarouselProps {
  items: { src: string; alt: string }[];
  interval?: number;
  className?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  items,
  interval = 4000,
  className = "",
}) => {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (!items?.length || items.length === 1) return;

    const t = window.setInterval(() => {
      setFade(true);
      window.setTimeout(() => {
        setIdx((v) => (v + 1) % items.length);
        setFade(false);
      }, 180);
    }, interval);

    return () => window.clearInterval(t);
  }, [items.length, interval]);

  if (!items?.length) return null;

  const current = items[idx];

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <img
        src={current.src}
        alt={current.alt}
        draggable={false}
        className={[
          "w-full h-full object-cover rounded-[14px]",
          "transition-all duration-200",
          fade ? "opacity-0 scale-[1.01]" : "opacity-100 scale-[1.00]",
        ].join(" ")}
      />
    </div>
  );
};