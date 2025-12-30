"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * AboutMerrySection Component
 * 
 * Sección "Sobre Doña Merry" con avatar circular y botón.
 * 
 * Características:
 * - Fondo rosado #ff29ab
 * - Avatar circular con borde blanco
 * - Título y subtítulo en blanco
 * - Botón morado con texto blanco
 * - Animación smooth al entrar
 */
export default function AboutMerrySection() {
  /**
   * Controla visibilidad para animación al entrar en viewport.
   */
  const [isVisible, setIsVisible] = useState(false);
  /**
   * Referencia al section para el IntersectionObserver.
   */
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Activa animación cuando la sección se hace visible.
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
      id="about"
      ref={sectionRef}
      className="w-full bg-[#ff29ab] py-12 sm:py-16 md:py-20 lg:py-24 flex flex-col items-center"
    >
      <div
        className={`w-full max-w-[1080px] mx-auto flex flex-col items-center px-4 md:px-8 lg:px-12 ${
          isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        {/* Avatar circular centrado con borde blanco implícito por el recorte */}
        <div className="w-[clamp(10rem,24vw,18rem)] h-[clamp(10rem,24vw,18rem)] rounded-full mb-6 sm:mb-8 md:mb-10 lg:mb-12 overflow-hidden relative">
          <Image
            src="/img/merry/Merry-2.png"
            alt="Doña Merry - Avatar"
            width={250}
            height={250}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Contenedor tipográfico para ajustar ancho máximo de título/subtítulo */}
        <div className="w-full max-w-[600px] sm:max-w-[700px] md:max-w-[850px] lg:max-w-[1000px] mx-auto">
          {/* Título principal */}
          <h2
            className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase mb-0.5 sm:mb-1 md:mb-1 text-center leading-[0.9] tracking-[0.004em] sm:tracking-[0.006em] md:tracking-[0.008em] lg:tracking-[0.012em] xl:tracking-[0.012em]"
            style={{ fontFamily: "Colfax, sans-serif" }}
          >
            DOÑA MERRY
          </h2>

          {/* Subtítulo con tracking y word-spacing para calibrar ancho visual */}
          <p className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold uppercase tracking-[-0.06em] sm:tracking-[-0.065em] md:tracking-[-0.07em] lg:tracking-[0.06em] xl:tracking-[0.1em] leading-tight mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-center" style={{ fontFamily: "colfax, sans-serif", fontWeight: 600, wordSpacing: "clamp(0.3em, 1vw + 0.3em, 1.2em)" }}>
            LA GRAN INGENIERA DEL HOGAR
          </p>
        </div>

        {/* CTA hacia biografía o landing externo */}
        <button
          onClick={() => {
            // URL a cambiar por el usuario
            window.open("#", "_blank");
          }}
          className="bg-[#7e1ad2] text-white px-10 sm:px-14 md:px-18 lg:px-22 py-2 sm:py-2.5 md:py-3 lg:py-3.5 rounded-lg md:rounded-xl font-semibold text-sm sm:text-base md:text-lg uppercase tracking-wide hover:opacity-90 transition-opacity flex items-center justify-center gap-2 md:gap-3 pulse-cta"
          style={{ fontFamily: "Acumin Pro, sans-serif", fontWeight: 600 }}
        >
          
          <span style={{ fontFamily: "Acumin Pro, sans-serif", fontWeight: 700 }}>
            ¿QUIÉN ES DOÑA MERRY?
          </span>
                    <Image
                      src="/img/merry/flecha.png"
                      alt="Flechas"
                      width={24}
                      height={24}
                      className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 object-contain"
                    />
        </button>
      </div>
    </section>
  );
}

