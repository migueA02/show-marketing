"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full bg-black pt-40 pb-28 md:pt-44 md:pb-36 overflow-hidden">
      {/* Gradiente radial izquierdo - NO cortado */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[1100px] h-[1100px] pointer-events-none opacity-70"
        style={{
          transform: "translate(-35%, -50%)",
          background:
            "radial-gradient(ellipse 55% 70% at 35% 50%, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.12) 22%, rgba(255,255,255,0.06) 45%, rgba(255,255,255,0.02) 60%, rgba(255,255,255,0) 72%)",
        }}
      />

      {/* Gradiente radial esquina superior derecha */}
      <div
        className="absolute right-0 top-0 w-[800px] h-[800px] pointer-events-none opacity-60"
        style={{
          transform: "translate(25%, -25%)",
          background:
            "radial-gradient(ellipse 70% 60% at 70% 30%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.10) 25%, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0.02) 58%, rgba(255,255,255,0) 70%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 text-center z-10 flex flex-col items-center">
        <h1 className="font-grifter text-7xl md:text-7xl lg:text-8xl xl:text-9xl uppercase mb-6 md:mb-8 text-white animate-fade-in-up leading-[0.95]">
          BIENVENIDOS
        </h1>

        <p className="font-helvetica text-white text-base md:text-lg max-w-2xl mx-auto mb-8 md:mb-10 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          Representamos a una variedad de personajes únicos que cautivan al público con su talento y carisma.
        </p>

        <a
          href="#contacto"
          className="inline-block font-helvetica px-8 py-3 md:px-10 md:py-4 border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 text-sm md:text-base uppercase tracking-wide mb-12 md:mb-14 animate-fade-in-up pulse-cta"
          style={{ animationDelay: "200ms" }}
        >
          CONTACTO
        </a>

        {/* Logo + halo (gradiente) detrás */}
        <div className="relative flex w-full justify-center items-center animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          {/* Halo/Arco detrás del logo (VISIBLE y sin tocar Talentos) */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[35%] w-[520px] h-[300px] sm:w-[680px] sm:h-[380px] md:w-[760px] md:h-[430px] lg:w-[900px] lg:h-[520px] pointer-events-none opacity-70 z-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 55% at 50% 65%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.14) 22%, rgba(255,255,255,0.07) 42%, rgba(255,255,255,0.03) 55%, rgba(255,255,255,0) 68%)",
            }}
          />

          <Image
            src="/img/showmarketing/show_white.png"
            alt="SHAW MARKETING producciones"
            width={400}
            height={400}
            priority
            className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-96 lg:h-96 object-contain z-10"
          />
        </div>
      </div>
    </section>
  );
}
