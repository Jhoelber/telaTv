import { ClimaTempoDadosEmp } from './climaTempoDadosEmp';
import { ClimaTempoDadosPref } from './climaTempoDadosPref';
import { Video } from './video';



export const ClimaTempo = () => {
   


    return (
        <div className="bg-gradient-to-tl  from-blue-700 to-neutral-600 w-screen h-screen relative">
            <div className="grid grid-cols-[250px,3fr,1fr] " >


                <div className='flex flex-col items-center justify-center h-screen overflow-hidden' >

                    <div className="relative  p-2  mx-2 rounded-md max-w-max font-semibold z-10 ease-in-out ">


                        <ClimaTempoDadosEmp />



                    </div>
                </div>



                < div className="relative w-full h-full">
                    <div className={` mt-[20%]  z-0`}>
                        <Video />

                    </div>
                </div>


                <div>
                    <ClimaTempoDadosPref />
                </div>
            </div>
        </div >
    );
};