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
    <div
      className="h-full w-full grid items-center justify-items-center"
      style={{
        // safe-area responsiva (não é “chute”, escala com a tela)
        paddingTop: "clamp(10px, 2vh, 22px)",
        paddingBottom: "clamp(14px, 3vh, 34px)",
        rowGap: "clamp(10px, 1.6vh, 18px)",
        gridTemplateRows: "auto 1fr auto",
      }}
    >
      {/* TOPO */}
      <img
        src="https://res.cloudinary.com/ddzqr6r2m/image/upload/v1740507702/imagesTv/iaiverse2lkckvqpycvz.png"
        alt="Jacarezinho"
        draggable={false}
        className="w-[min(90%,260px)] h-auto object-contain"
      />

      {/* MEIO (carousel ocupa o espaço sem estourar) */}
      <div className="w-[min(92%,300px)]">
        <Carousel items={items} interval={4000} />
      </div>

      {/* BASE (jacaré nunca encosta na borda) */}
      <img
        src="https://res.cloudinary.com/ddzqr6r2m/image/upload/v1772557909/jac_oafdhk.png"
        alt="Mascote"
        draggable={false}
        className="w-[min(85%,210px)] h-auto object-contain"
      />
    </div>
  );
};