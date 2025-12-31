import Image from "next/image";
import React from "react";

const BandSection = () => {
  return (
    <div className="flex flex-col">
      {/* Sección negra */}
      <div className="bg-black flex flex-col items-center py-[30px] px-10">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase mb-4 text-center">
            Un concepto de <br /> carnaval diferente
          </h2>

          <Image
            src="/img/misael/bandaLogo.png"
            width={300}
            height={300}
            alt="Banda Logo"
            className="block w-[300px] h-[300px]"
          />
        </div>

        <div className="relative w-full h-[400px] overflow-hidden">
          <Image
            src="/img/misael/banda.png"
            alt="Banda"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Sección café */}
      <div className="w-full bg-[#854319] py-6 px-6">
        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 text-center capitalize">
          ¡Le tocamos lo que quiera!
        </h2>

        {/* Grid de imágenes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
          <div className="relative w-full h-[250px] overflow-hidden rounded-xl">
            <Image
              src="/img/misael/Banda.png"
              alt="Evento 1"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative w-full h-[250px] overflow-hidden rounded-xl">
            <Image
             src="/img/misael/Banda2.png"
              alt="Evento 2"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative w-full h-[250px] overflow-hidden rounded-xl">
            <Image
              src="/img/misael/Banda3.png"
              alt="Evento 3"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BandSection;
