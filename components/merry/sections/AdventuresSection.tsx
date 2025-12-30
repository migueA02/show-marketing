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
  /**
   * Controla la visibilidad animada cuando el section entra al viewport.
   */
  const [isVisible, setIsVisible] = useState(false);
  /**
   * Ref del section para IntersectionObserver.
   */
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Activa la animación de entrada al detectar intersección.
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
        className={`w-full max-w-[1200px] mx-auto flex flex-col items-center px-4 md:px-8 lg:px-12 ${
          isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        {/* Bloque principal de título/subtítulo con anchura controlada */}
        <div className="w-full max-w-[650px] sm:max-w-[750px] md:max-w-[900px] lg:max-w-[1050px] mx-auto">
          {/* Título principal */}
          <h2
            className="text-[#7e1ad2] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase mb-0 text-center leading-none"
            style={{ fontFamily: "Colfax, sans-serif" }}
          >
            AVENTURAS
          </h2>

          {/* Subtítulo alineado en ancho con tracking negativo para equilibrar */}
          <p className="text-[#7e1ad2] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold uppercase tracking-[-0.05em] sm:tracking-[-0.055em] md:tracking-[-0.06em] lg:tracking-[-0.065em] mb-0 text-center leading-tight" style={{ fontFamily: "Colfax, sans-serif", fontWeight: 600 }}>
            DE DOÑA MERRY
          </p>
        </div>

        {/* Etiqueta secundaria para contexto de plataforma */}
        <p className="text-[#7e1ad2] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold uppercase tracking-wide -mt-1 sm:-mt-1.5 md:-mt-2 lg:-mt-2.5 mb-3 sm:mb-4 md:mb-5 lg:mb-6 text-center leading-tight" style={{ fontFamily: "Acumin Pro, sans-serif", fontWeight: 600 }}>
          EN REDES SOCIALES
        </p>

        {/* CTA hacia el perfil de Instagram (sustituir URL) */}
        <button
          onClick={() => {
            // URL a cambiar por el usuario (Instagram de Doña Merry)
            window.open("#", "_blank");
          }}
          className="bg-[#7e1ad2] text-white px-10 sm:px-14 md:px-18 lg:px-22 py-2 sm:py-2.5 md:py-3 lg:py-3.5 rounded-lg md:rounded-xl font-semibold md:text-lg lg:text-xl uppercase tracking-wide hover:opacity-90 transition-opacity flex items-center gap-2 md:gap-3 mb-8 sm:mb-10 md:mb-12 lg:mb-14 pulse-cta"
        >
          <span>@merryoficial</span>
          <Image
            src="/img/merry/flecha.png"
            alt="Flechas"
            width={24}
            height={24}
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 object-contain"
          />
        </button>

        {/* Grid de posts con placeholders de imagen */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-5 max-w-[900px] mx-auto">
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

