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

  useEffect(() => {
    if (!items?.length || items.length === 1) return;
    const t = window.setInterval(() => setIdx((v) => (v + 1) % items.length), interval);
    return () => window.clearInterval(t);
  }, [items.length, interval]);

  if (!items?.length) return null;

  return (
    <div
      className={[
        // tamanho “cartaz” e não gigante
        "w-[min(92%,260px)] aspect-[3/4]",
        // visual
        "overflow-hidden rounded-[14px] ",
        "",
        className,
      ].join(" ")}
    >
      <img
        src={items[idx].src}
        alt={items[idx].alt}
        draggable={false}
        className="w-full h-full object-contain p-2"
      />
    </div>
  );
};