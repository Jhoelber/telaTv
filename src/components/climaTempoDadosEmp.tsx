import { Carousel } from "./Carousel";

const items = [
  <img
    key="1"
    src="https://res.cloudinary.com/ddzqr6r2m/image/upload/v1772554763/jogo_lbso5g.jpg"
    className="w-full h-auto object-contain"
    alt="Atletismo"
    draggable={false}
  />,
  <img
    key="2"
    src="https://res.cloudinary.com/ddzqr6r2m/image/upload/v1772554763/dengue_lqeipt.jpg"
    className="w-full h-auto object-contain"
    alt="Dengue"
    draggable={false}
  />,
  <img
    key="3"
    src="https://res.cloudinary.com/ddzqr6r2m/image/upload/v1772554763/corrida_nuhcbs.jpg"
    className="w-full h-auto object-contain"
    alt="Venha Treinar"
    draggable={false}
  />,
];

export const ClimaTempoDadosEmp = () => {
  return (
    <div className="h-full w-full flex flex-col items-center py-[1.2vw] pb-[4vh] gap-[1.6vh]">
      {/* Topo */}
      <img
        src="https://res.cloudinary.com/ddzqr6r2m/image/upload/v1740507702/imagesTv/iaiverse2lkckvqpycvz.png"
        alt="Jacarezinho"
        className="w-full max-w-[260px] h-auto object-contain"
        draggable={false}
      />

      {/* Meio */}
      <div className="w-full max-w-[300px]">
        <Carousel items={items} interval={4000} />
      </div>

      {/* Base (agora com folga pra não cortar na TV) */}
      <img
        src="https://res.cloudinary.com/ddzqr6r2m/image/upload/v1772557909/jac_oafdhk.png"
        alt="Mascote"
        className="w-full max-w-[210px] h-auto object-contain mt-auto"
        draggable={false}
      />
    </div>
  );
};