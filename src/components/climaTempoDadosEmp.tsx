import { Carousel } from "./Carousel";

const items = [
  {
    src: "https://res.cloudinary.com/ddzqr6r2m/image/upload/v1782130498/O_s%C3%A1bado_da_31%C2%AA_FETEXAS_2026_ser%C3%A1_simplesmente_inesquec%C3%ADvel_No_dia_11_de_julho_de_2026_um_d_cqewpc.jpg",
    alt: "Leonardo",
  },
  {
    src: "https://res.cloudinary.com/ddzqr6r2m/image/upload/v1782130498/A_sexta-feira_da_31%C2%AA_FETEXAS_2026_promete_ser_inesquec%C3%ADvel_No_dia_10_de_julho_de_2026_o_pa_ckrq44.jpg",
    alt: "jiraya",
  },
  {
    src: "https://res.cloudinary.com/ddzqr6r2m/image/upload/v1782130498/A_contagem_regressiva_j%C3%A1_come%C3%A7ou_No_dia_09_de_julho_a_abertura_da_31%C2%AA_FETEXAS_promete_ser_k7ppzi.jpg",
    alt: "icaro e jilmar",
  },
  {
    src: "https://res.cloudinary.com/ddzqr6r2m/image/upload/v1782130498/Vem_a%C3%AD_um_dos_eventos_mais_aguardados_do_ano_%EF%B8%8F_Motocross_FETEXAS_2026_11_e_12_de_julho_de_po0p1d.jpg",
    alt: "motocross",
  },
  {
    src: "https://res.cloudinary.com/ddzqr6r2m/image/upload/v1782130498/%EF%B8%8F_O_encerramento_da_31%C2%AA_FETEXAS_2026_ser%C3%A1_em_grande_estilo_No_dia_12_de_julho_de_2026_a_ener_rstvmn.jpg",
    alt: "sorriso maroto",
  },
  {
    src: "https://res.cloudinary.com/ddzqr6r2m/image/upload/v1782130498/Vem_a%C3%AD_um_dos_eventos_mais_aguardados_do_ano_%EF%B8%8F_Motocross_FETEXAS_2026_11_e_12_de_julho_de_po0p1d.jpg",
    alt: "moto cross",
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