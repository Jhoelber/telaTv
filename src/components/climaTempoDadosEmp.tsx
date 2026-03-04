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
    <div className="h-full w-full overflow-hidden">
      {/* 3 “faixas” com altura fixa -> NÃO ESTOURA */}
      <div
        className="h-full w-full grid justify-items-center overflow-hidden"
        style={{
          gridTemplateRows: "30% 46% 24%", // topo / meio / base
          rowGap: "1.2vh",
        }}
      >
        {/* TOPO: brasão/logo */}
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <img
            src="https://res.cloudinary.com/ddzqr6r2m/image/upload/v1772640781/Logotipo_Jacarezinho_TextoBranco_pnuyxj.png"
            alt="Jacarezinho"
            draggable={false}
            className="h-full max-h-full w-[min(92%,320px)] object-contain"
          />
        </div>

        {/* MEIO: cartaz (carrossel) */}
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <Carousel
            items={items}
            interval={4000}
            className="h-full w-[min(92%,260px)]"
          />
        </div>

        
      </div>
    </div>
  );
};