import { Carousel } from "./Carousel";

const items = [
  {
    src: "https://res.cloudinary.com/ddzqr6r2m/image/upload/v1772554763/jogo_lbso5g.jpg",
    alt: "Atletismo",
  },
  {
    src: "https://res.cloudinary.com/ddzqr6r2m/image/upload/v1772554763/dengue_lqeipt.jpg",
    alt: "Dengue",
  },
  {
    src: "https://res.cloudinary.com/ddzqr6r2m/image/upload/v1772554763/corrida_nuhcbs.jpg",
    alt: "Venha Treinar",
  },
];

export const ClimaTempoDadosEmp = () => {
  return (
    <div className="h-full w-full flex flex-col items-center overflow-hidden">
      {/* TOP (logo grande) */}
      <div className="w-full flex items-center justify-center pt-[1.2vh]">
        <img
          src="https://res.cloudinary.com/ddzqr6r2m/image/upload/v1740507702/imagesTv/iaiverse2lkckvqpycvz.png"
          alt="Jacarezinho"
          draggable={false}
          className="w-[min(92%,300px)] h-auto object-contain"
        />
      </div>

      {/* MID (cartaz / carrossel do tamanho da imagem) */}
      <div className="w-full flex items-center justify-center mt-[1.6vh]">
        <Carousel
          items={items}
          interval={4000}
          className="w-[min(92%,260px)] aspect-[3/4] shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
        />
      </div>

      {/* BOTTOM (jacaré grande) */}
      <div className="mt-auto w-full flex items-end justify-center pb-[2.2vh]">
        <img
          src="https://res.cloudinary.com/ddzqr6r2m/image/upload/v1772557909/jac_oafdhk.png"
          alt="Mascote"
          draggable={false}
          className="w-[min(90%,250px)] h-auto object-contain drop-shadow-lg"
        />
      </div>
    </div>
  );
};