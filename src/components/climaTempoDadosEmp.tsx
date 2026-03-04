import { Carousel } from "./Carousel";

const items = [
  <img
    key="1"
    src="https://res.cloudinary.com/ddzqr6r2m/image/upload/v1772554763/jogo_lbso5g.jpg"
    className="w-full h-full object-contain"
    alt="Atletismo"
    draggable={false}
  />,
  <img
    key="2"
    src="https://res.cloudinary.com/ddzqr6r2m/image/upload/v1772554763/dengue_lqeipt.jpg"
    className="w-full h-full object-contain"
    alt="Dengue"
    draggable={false}
  />,
  <img
    key="3"
    src="https://res.cloudinary.com/ddzqr6r2m/image/upload/v1772554763/corrida_nuhcbs.jpg"
    className="w-full h-full object-contain"
    alt="Venha Treinar"
    draggable={false}
  />,
];

export const ClimaTempoDadosEmp = () => {
  return (
    <div className="h-full w-full overflow-hidden flex flex-col items-center">
      {/* topo */}
      <img
        src="https://res.cloudinary.com/ddzqr6r2m/image/upload/v1740507702/imagesTv/iaiverse2lkckvqpycvz.png"
        alt="Jacarezinho"
        draggable={false}
        className="w-full max-w-[260px] h-auto object-contain"
        style={{ maxHeight: "22vh" }}
      />

      {/* meio (carousel com altura limitada) */}
      <div className="w-full max-w-[300px] my-[clamp(8px,1.6vh,14px)] overflow-hidden">
        <Carousel items={items} interval={4000} heightClass="h-[38vh]" />
      </div>

      {/* base */}
      <img
        src="https://res.cloudinary.com/ddzqr6r2m/image/upload/v1772557909/jac_oafdhk.png"
        alt="Mascote"
        draggable={false}
        className="w-full max-w-[210px] h-auto object-contain mt-auto"
        style={{ maxHeight: "18vh" }}
      />
    </div>
  );
};