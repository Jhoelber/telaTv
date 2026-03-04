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
    <div className="h-full w-full flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-[320px] px-4 py-6 flex flex-col items-center gap-4">
        <img
          src="https://res.cloudinary.com/ddzqr6r2m/image/upload/v1740507702/imagesTv/iaiverse2lkckvqpycvz.png"
          alt="Logo Principal"
          className="w-full max-w-[220px] h-auto object-contain"
          draggable={false}
        />

        {/* trava a largura do carousel pra não estourar */}
        <div className="w-full max-w-[260px]">
          <Carousel items={items} interval={4000} />
        </div>

        <img
          src="https://res.cloudinary.com/ddzqr6r2m/image/upload/v1772557909/jac_oafdhk.png"
          alt="Mascote"
          className="w-full max-w-[170px] h-auto object-contain"
          draggable={false}
        />
      </div>
    </div>
  );
};