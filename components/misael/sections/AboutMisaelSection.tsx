"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

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
export default function AboutMisaelSection() {
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
      className="w-full bg-[#000000] pt-12 sm:pt-16 md:py-20 lg:pt-24 flex flex-col items-center gap-14"
    >
      <div
        className={`w-full flex flex-col items-center px-4 md:px-8 lg:px-12 gap-4 ${
          isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        {/*Avatar circular */}

        <div className="flex flex-col justify-center items-center">
          <div className="rounded-full w-[220px] h-[220px] mb-6 sm:mb-8 md:mb-10 lg:mb-12 overflow-hidden relative">
            <Image
              src="/img/misael/semental.png"
              alt="Doña Merry - Avatar"
              width={250}
              height={250}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Título */}
          <h2
            className="text-[#f69d28] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase mb-3 sm:mb-4 md:mb-5 lg:mb-6 text-center"
            style={{ fontFamily: "Colfax, sans-serif" }}
          >
            EL SEMENTAL <br /> DEL HUMOR
          </h2>
        </div>

        {/* Subtítulo */}

        {/* Botón */}
        <button
          onClick={() => {
            // URL a cambiar por el usuario
            window.open("#", "_blank");
          }}
          className="bg-[#f69d28] text-white px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 lg:py-6 rounded-lg md:rounded-xl font-semibold md:text-lg lg:text-xl uppercase tracking-wide hover:opacity-90 transition-opacity flex items-center gap-2 md:gap-3"
        >
          <span>¿QUIEN ES EL SEMENTAL?</span>
          <MdOutlineKeyboardDoubleArrowLeft className="text-[30px]" />
        </button>
      </div>
      <div className="w-full h-[50px] bg-[#f69d28]"></div>
    </section>
  );
}
