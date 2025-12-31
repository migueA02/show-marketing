"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function EventSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);


  const logoBoxStyle: React.CSSProperties = {
    width: "clamp(110px, 30vw, 210px)",
    height: "clamp(110px, 30vw, 210px)",
  };

  return (
    <section
      id="event"
      ref={sectionRef}
      className="w-full bg-[#7e1ad2] py-12 sm:py-16 md:py-20 lg:py-24"
    >
      <div
        className={`w-full max-w-[1200px] mx-auto flex flex-col items-center px-4 md:px-8 lg:px-12 ${
          isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        {/* Bloque de títulos con escala similar a Adventures */}
        <div className="w-full max-w-[650px] sm:max-w-[750px] md:max-w-[900px] lg:max-w-[1050px] mx-auto">
          <h2
            className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase mb-0 text-center leading-none"
            style={{ fontFamily: "Acumin Pro, sans-serif", fontWeight: 300 }}
          >
            HAZ TU EVENTO
          </h2>

          <h2
            className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase mb-0 text-center leading-none"
            style={{ fontFamily: "Colfax, sans-serif" }}
          >
            INOLVIDABLE
          </h2>

          <p
            className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold uppercase tracking-[-0.05em] sm:tracking-[-0.055em] md:tracking-[-0.06em] lg:tracking-[-0.065em] mb-0 text-center leading-tight"
            style={{ fontFamily: "Colfax, sans-serif", fontWeight: 600 }}
          >
            CON
          </p>
        </div>

        {/* Un poco de aire como las demás secciones */}
        <div className="h-5 sm:h-6 md:h-7 lg:h-8" />

        {/* LOGOS — 1 fila, máximo ancho disponible */}
        <div className="w-full flex items-center justify-between gap-[2px] sm:gap-1 mb-8 sm:mb-10 md:mb-12 lg:mb-14 px-0">
          <div
            style={logoBoxStyle}
            className="flex-1 min-w-0 rounded-lg flex items-center justify-center overflow-hidden motion-lift"
          >
            <Image
              src="/img/merry/show_white.png"
              alt="ShowMarketing - Agencia de eventos y entretenimiento corporativo en Costa Rica"
              width={700}
              height={700}
              className="w-full h-full object-contain"
              priority
            />
          </div>

          <div
            style={logoBoxStyle}
            className="flex-1 min-w-0 rounded-lg flex items-center justify-center overflow-hidden motion-lift"
          >
            <Image
              src="/img/merry/Evento_1.png"
              alt="Doña Merry en evento corporativo - Entretenimiento profesional"
              width={700}
              height={700}
              className="w-full h-full object-contain scale-[1.18]"
              loading="lazy"
            />
          </div>

          <div
            style={logoBoxStyle}
            className="flex-1 min-w-0 rounded-lg flex items-center justify-center overflow-hidden motion-lift"
          >
            <Image
              src="/img/merry/logo show.png"
              alt="ShowMarketing Costa Rica - Eventos empresariales y animación"
              width={700}
              height={700}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>

          <div
            style={logoBoxStyle}
            className="flex-1 min-w-0 rounded-lg flex items-center justify-center overflow-hidden motion-lift"
          >
            <Image
              src="/img/merry/Evento_2.png"
              alt="Doña Merry - Presentaciones en vivo y eventos especiales"
              width={700}
              height={700}
              className="w-full h-full object-contain scale-[1.18]"
              loading="lazy"
            />
          </div>
        </div>

        {/* CTA (mismo “peso” de botón que Adventures) */}
        <button
          onClick={() => window.open("https://wa.me/50683054444", "_blank")}
          aria-label="Contactar por WhatsApp para contratar eventos con Doña Merry"
          className="bg-white text-[#7e1ad2] px-10 sm:px-14 md:px-18 lg:px-22 py-2 sm:py-2.5 md:py-3 lg:py-3.5 rounded-lg md:rounded-xl font-semibold md:text-lg lg:text-xl uppercase tracking-wide hover:opacity-90 transition-opacity flex items-center gap-2 md:gap-3 pulse-cta"
        >
          <Image
            src="/img/merry/whatsapp.png"
            alt="WhatsApp"
            width={60}
            height={60}
            className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain"
          />
          <span style={{ fontFamily: "Colfax, sans-serif" }}>+506 8305 4444</span>
          <Image
            src="/img/merry/flecha morado.png"
            alt="Flechas"
            width={40}
            height={40}
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 object-contain"
          />
        </button>
      </div>
    </section>
  );
}
