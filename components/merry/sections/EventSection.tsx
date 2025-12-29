"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * EventSection Component
 * 
 * Sección para contratar eventos con Doña Merry.
 * 
 * Características:
 * - Fondo blanco #ffffff
 * - Títulos en morado #7e1ad2
 * - Logos/imágenes en fila horizontal
 * - Botón con número de teléfono
 * - Animación smooth al entrar
 */
export default function EventSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="event"
      ref={sectionRef}
      className="w-full bg-[#7e1ad2] py-12 sm:py-16 md:py-20 lg:py-24"
    >
      <div
        className={`w-full flex flex-col items-center px-4 md:px-8 lg:px-12 ${
          isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        {/* Título */}
        <h2
          className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase mb-2 sm:mb-3 md:mb-4 lg:mb-5 text-center"
          style={{ fontFamily: "Colfax, sans-serif" }}
        >
          HAZ TU EVENTO
        </h2>

        {/* Título 2 */}
        <h2
          className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase mb-2 sm:mb-3 md:mb-4 lg:mb-5 text-center"
          style={{ fontFamily: "Colfax, sans-serif" }}
        >
          INOLVIDABLE
        </h2>

        {/* Título 3 */}
        <p className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold uppercase tracking-wide mb-8 sm:mb-10 md:mb-12 lg:mb-14 text-center">
          CON
        </p>

        {/* Logos/Imágenes en fila */}
        <div className="w-full flex justify-center items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-8 sm:mb-10 md:mb-12 lg:mb-14 flex-wrap">
          {/* Logo Show Marketing */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-lg md:rounded-xl flex items-center justify-center relative overflow-hidden">
            <Image
              src="/img/merry/logo show.png"
              alt="Show Marketing logo"
              width={150}
              height={150}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Imagen Doña Merry */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-lg md:rounded-xl flex items-center justify-center relative overflow-hidden">
            <Image
              src="/img/merry/Evento_1.png"
              alt="Doña Merry en evento"
              width={150}
              height={150}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Logo Doña Merry */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-lg md:rounded-xl flex items-center justify-center relative overflow-hidden">
            <Image
              src="/img/merry/Evento_2.png"
              alt="Doña Merry logo evento"
              width={150}
              height={150}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Botón con teléfono */}
        <button
          onClick={() => {
            // URL de WhatsApp a cambiar por el usuario
            window.open("https://wa.me/50683054444", "_blank");
          }}
          className="bg-white text-[#7e1ad2] px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 lg:py-6 rounded-lg md:rounded-xl font-semibold md:text-lg lg:text-xl uppercase tracking-wide hover:bg-white/90 transition-colors flex items-center gap-2 md:gap-3"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
          <span>{"<<"}</span>
          <span>+506 8305 4444</span>
          <span>{"<<"}</span>
        </button>
      </div>
    </section>
  );
}

