import Image from "next/image";

const BannerComponent = () => {
  return (
    <div className="relative w-full h-screen bg-black">
      {/* Imagen de fondo solo para md y menores */}
      <div className="absolute inset-0 lg:hidden">
        <Image
          src="/image/misael/banner.png"
          alt="Banner"
          fill
          className="object-cover object-bottom"
          priority
        />
        {/* Overlay negro para mejorar contraste con el texto */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col lg:flex-row">
        {/* Texto */}
        <div className="flex flex-col justify-center items-center text-center text-white px-8 md:px-16 lg:px-24 w-full lg:w-[45%] absolute top-24 lg:relative">
          <h1 className="text-4xl font-extrabold mb-4">
            ¡BIENVENIDO AL MUNDO DEL SEMENTAL!
          </h1>
          <p className="text-xl max-w-lg text-[#f69d28]">
            Donde el humor sano se reúne para hacerte reír
          </p>
        </div>

        {/* Imagen a la derecha solo para lg y mayores */}
        <div className="relative hidden lg:block w-full h-full">
          <Image
            src="/image/misael/banner.png"
            alt="Banner"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Overlay degradado solo en el lado izquierdo */}
          <div className="absolute top-0 left-0 h-full w-2/5 bg-gradient-to-r from-black to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default BannerComponent;
