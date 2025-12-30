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
  /**
   * Control de visibilidad para animaciones de entrada.
   */
  const [isVisible, setIsVisible] = useState(false);
  /**
   * Referencia al section para el IntersectionObserver.
   */
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Activa animación cuando el section entra a viewport.
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
        className={`w-full max-w-[1200px] mx-auto flex flex-col items-center px-4 md:px-8 lg:px-12 ${
          isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        {/* Título */}
        <h2
          className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black uppercase mb-0 text-center leading-none"
          style={{ fontFamily: "Acumin Pro, sans-serif", fontWeight: 300 }}
        >
          HAZ TU EVENTO
        </h2>

        {/* Título 2 */}
        <h2
          className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase mb-0 text-center leading-none"
          style={{ fontFamily: "Colfax, sans-serif" }}
        >
          INOLVIDABLE
        </h2>

        {/* Título 3 */}
        <p className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold uppercase tracking-wide mb-8 sm:mb-10 md:mb-12 lg:mb-14 text-center leading-tight" style={{ fontFamily: "Colfax, sans-serif" }}>
          CON
        </p>

        {/* Línea de logos/imágenes de validación social */}
        <div className="w-full flex justify-center items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-8 sm:mb-10 md:mb-12 lg:mb-14 flex-nowrap overflow-x-auto">
          {/* Logo Show Marketing */}
          <div className="w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-lg md:rounded-xl flex items-center justify-center relative overflow-hidden flex-shrink-0">
            <Image
              src="/img/merry/logo show.png"
              alt="Show Marketing logo"
              width={224}
              height={224}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Imagen Doña Merry */}
          <div className="w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-lg md:rounded-xl flex items-center justify-center relative overflow-hidden flex-shrink-0">
            <Image
              src="/img/merry/Evento_1.png"
              alt="Doña Merry en evento"
              width={224}
              height={224}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Logo Doña Merry */}
          <div className="w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-lg md:rounded-xl flex items-center justify-center relative overflow-hidden flex-shrink-0">
            <Image
              src="/img/merry/Evento_2.png"
              alt="Doña Merry logo evento"
              width={224}
              height={224}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* CTA directa a WhatsApp con número preconfigurado */}
        <button
          onClick={() => {
            // URL de WhatsApp a cambiar por el usuario
            window.open("https://wa.me/50683054444", "_blank");
          }}
          className="bg-white text-[#7e1ad2] px-10 sm:px-14 md:px-18 lg:px-22 py-2 sm:py-2.5 md:py-3 lg:py-3.5 rounded-lg md:rounded-xl font-semibold text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl uppercase tracking-wide transition-opacity hover:opacity-90 flex items-center justify-center gap-2 md:gap-3 pulse-cta"
        >
          <Image
            src="/img/merry/whatsapp.png"
            alt="WhatsApp"
            width={60}
            height={60}
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain"
          />
          <span style={{ fontFamily: "Colfax, sans-serif" }}>+506 8305 4444</span>
          <Image
            src="/img/merry/flecha.png"
            alt="Flechas"
            width={40}
            height={40}
            className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain"
          />
        </button>
      </div>
    </section>
  );
}

