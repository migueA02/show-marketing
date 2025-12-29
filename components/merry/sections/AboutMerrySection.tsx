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
      id="about"
      ref={sectionRef}
      className="w-full bg-[#ff29ab] py-12 sm:py-16 md:py-20 lg:py-24 flex flex-col items-center"
    >
      <div
        className={`w-full flex flex-col items-center px-4 md:px-8 lg:px-12 ${
          isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        {/* Avatar circular */}
        <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 rounded-full border-4 md:border-6 lg:border-8 border-white mb-6 sm:mb-8 md:mb-10 lg:mb-12 overflow-hidden relative">
          <Image
            src="/img/merry/Merry-2.png"
            alt="Doña Merry - Avatar"
            width={250}
            height={250}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Título */}
        <h2
          className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase mb-3 sm:mb-4 md:mb-5 lg:mb-6 text-center"
          style={{ fontFamily: "Colfax, sans-serif" }}
        >
          DOÑA MERRY
        </h2>

        {/* Subtítulo */}
        <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold uppercase tracking-wide mb-8 sm:mb-10 md:mb-12 lg:mb-14 text-center">
          LA GRAN INGENIERA DEL HOGAR
        </p>

        {/* Botón */}
        <button
          onClick={() => {
            // URL a cambiar por el usuario
            window.open("#", "_blank");
          }}
          className="bg-[#7e1ad2] text-white px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 lg:py-6 rounded-lg md:rounded-xl font-semibold md:text-lg lg:text-xl uppercase tracking-wide hover:opacity-90 transition-opacity flex items-center gap-2 md:gap-3"
        >
          <span>{"<<"}</span>
          <span>¿QUIÉN ES DOÑA MERRY?</span>
          <span>{"<<"}</span>
        </button>
      </div>
    </section>
  );
}

