import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Texto */}
      <div className="relative z-30 flex flex-col items-center justify-start text-center px-6 top-28">
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide">
          ¡BIENVENIDO AL
          <br />
          MUNDO DEL SEMENTAL!
        </h1>

        <p className="mt-4 text-[#f69d28] text-lg md:text-xl uppercase tracking-widest">
          Donde el humor sano se reune para hacerte  reir
        </p>
      </div>

      {/* Imagen abajo (IGUAL que antes) */}
      <div className="absolute bottom-0 left-0 w-full h-[80%] z-10">
        <Image
          src="/img/misael/banner1.png"
          alt="Hero image"
          fill
          className="object-cover object-bottom"
          priority
        />
      </div>

      {/* Degradado SOLO ARRIBA de la imagen */}
      <div className="absolute bottom-0 left-0 w-full h-[99%] z-20 bg-gradient-to-b from-black via-black/40 to-transparent" />
    </section>
  );
};

export default HeroSection;
