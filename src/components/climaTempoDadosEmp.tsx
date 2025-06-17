import { Carousel } from './Carousel';


const items = [

    <img src="https://res.cloudinary.com/ddzqr6r2m/image/upload/v1742823674/imagesTv/qx1nheg5yi5nsuq8a2k9.jpg" className="h-60 " alt="Atletismo" />,
    <img src="https://res.cloudinary.com/ddzqr6r2m/image/upload/v1740507701/imagesTv/fqniom8gjrzrqeb2g2lt.png" className="w-56 " alt="Causa Animal" />,
    <img src="https://res.cloudinary.com/ddzqr6r2m/image/upload/v1740507701/imagesTv/hbdnf69dh9jbmtsz79vi.png" className="w-56 " alt="Centro da Juventude" />,
    <img src="https://res.cloudinary.com/ddzqr6r2m/image/upload/v1740507701/imagesTv/rnkdwwiz6bsxr7cr434v.png" className="w-56 " alt="Obras" />,
    <img src="https://res.cloudinary.com/ddzqr6r2m/image/upload/v1740507701/imagesTv/qb857gy31mrjc6et227n.png" className="w-56 " alt="Parques" />,
    <img src="https://res.cloudinary.com/ddzqr6r2m/image/upload/v1740507701/imagesTv/h6pakqenzo2m24ebutog.png" className="w-56 " alt="Saúde" />
    
];

export const ClimaTempoDadosEmp = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen overflow-hidden '>
            <div className="flex flex-col items-center space-y-4">
                <img src="https://res.cloudinary.com/ddzqr6r2m/image/upload/v1740507702/imagesTv/iaiverse2lkckvqpycvz.png" alt="Logo Principal" className="  w-48 pb-2" />
                <Carousel items={items} interval={4000} />
            </div>
        </div>
    );
};
