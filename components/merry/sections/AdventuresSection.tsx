"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * AdventuresSection Component
 * 
 * Sección de aventuras en redes sociales con grid de posts.
 * 
 * Características:
 * - Fondo cyan #67c7db
 * - Título y subtítulo en morado #7e1ad2
 * - Botón morado con handle de Instagram
 * - Grid de 2 columnas con 6 placeholders
 * - Animación smooth al entrar
 */
export default function AdventuresSection() {
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
      id="adventures"
      ref={sectionRef}
      className="w-full bg-[#67c7db] py-12 sm:py-16 md:py-20 lg:py-24"
    >
      <div
        className={`w-full flex flex-col items-center px-4 md:px-8 lg:px-12 ${
          isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        {/* Título */}
        <h2
          className="text-[#7e1ad2] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase mb-2 sm:mb-3 md:mb-4 lg:mb-5 text-center"
          style={{ fontFamily: "Colfax, sans-serif" }}
        >
          AVENTURAS
        </h2>

        {/* Subtítulo */}
        <p className="text-[#7e1ad2] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold uppercase tracking-wide mb-2 sm:mb-3 md:mb-4 text-center">
          DE DOÑA MERRY
        </p>

        {/* Subtítulo 2 */}
        <p className="text-[#7e1ad2] text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold uppercase tracking-wide mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-center">
          EN REDES SOCIALES
        </p>

        {/* Botón */}
        <button
          onClick={() => {
            // URL a cambiar por el usuario (Instagram de Doña Merry)
            window.open("#", "_blank");
          }}
          className="bg-[#7e1ad2] text-white px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 lg:py-6 rounded-lg md:rounded-xl font-semibold md:text-lg lg:text-xl uppercase tracking-wide hover:opacity-90 transition-opacity flex items-center gap-2 md:gap-3 mb-8 sm:mb-10 md:mb-12 lg:mb-14"
        >
          <span>{"<<"}</span>
          <span>@merryoficial</span>
          <span>{"<<"}</span>
        </button>

        {/* Grid de posts */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
          {[
            "/img/merry/Aventuras_1.png",
            "/img/merry/Aventuras_2.png",
            "/img/merry/Aventuras_3.png",
            "/img/merry/Aventuras_4.png",
            "/img/merry/Aventuras_5.png",
            "/img/merry/Aventuras_6.png",
          ].map((imageSrc, index) => (
            <div
              key={index}
              className="aspect-square rounded-lg md:rounded-xl relative overflow-hidden"
            >
              <Image
                src={imageSrc}
                alt={`Aventura de Doña Merry ${index + 1}`}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

