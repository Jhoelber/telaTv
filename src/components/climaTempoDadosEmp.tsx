import { Carousel } from './Carousel';


const items = [

    <img src="https://res.cloudinary.com/ddzqr6r2m/image/upload/v1772554763/jogo_lbso5g.jpg" className="w-56" alt="Atletismo" />,
    <img src="https://res.cloudinary.com/ddzqr6r2m/image/upload/v1772554763/dengue_lqeipt.jpg" className="w-56 " alt="Dengue" />,
    <img src="https://res.cloudinary.com/ddzqr6r2m/image/upload/v1772554763/corrida_nuhcbs.jpg" className="w-56 " alt="Venha Treinar" />,
   
    
];

export const ClimaTempoDadosEmp = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen overflow-hidden '>
            <div className="flex flex-col items-center space-y-4">
                <img src="https://res.cloudinary.com/ddzqr6r2m/image/upload/v1740507702/imagesTv/iaiverse2lkckvqpycvz.png" alt="Logo Principal" className="  w-48 " />
                <Carousel items={items} interval={4000} />
                     <img src="https://res.cloudinary.com/ddzqr6r2m/image/upload/v1772557909/jac_oafdhk.png" alt="Logo Principal" className="  w-32 pb-2" />

                    
            </div>
        </div>
    );
};
