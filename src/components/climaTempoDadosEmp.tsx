import { Carousel } from "./Carousel";

const items = [
  {
    src: "https://res.cloudinary.com/dfgbasaxa/image/upload/v1784729288/images/declaracao_wiw45r.png",
    alt: "declaracao",
  },
  {
    src: "https://res.cloudinary.com/dfgbasaxa/image/upload/v1784729289/images/abrir_mei_kasgsh.png",
    alt: "abrir mei",
  },
  {
    src: "https://res.cloudinary.com/dfgbasaxa/image/upload/v1784729289/images/notafiscal_wpdp12.png",
    alt: "nota fiscal",
  },
  {
    src: "https://res.cloudinary.com/dfgbasaxa/image/upload/v1784729289/images/notafiscal_wpdp12.png",
    alt: "nota fiscal",
  }
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