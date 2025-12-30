"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * StickersSection Component
 *
 * Sección de stickers de Doña Merry.
 *
 * Objetivo:
 * - Mostrar una grilla visual fuerte de stickers SIN texto descriptivo.
 * - Stickers grandes, protagonistas, directamente sobre el fondo rosado.
 * - Botón de descarga con tipografía Acumin Pro Semibold.
 *
 * Características visuales:
 * - Fondo rosado #ff29ab
 * - Stickers grandes, sin contenedores visibles
 * - Diseño mobile-first
 * - Animación smooth al entrar en viewport
 */
export default function StickersSection() {
  /**
   * Controla la animación de entrada cuando la sección entra en viewport.
   */
  const [isVisible, setIsVisible] = useState(false);

  /**
   * Referencia al section para IntersectionObserver.
   */
  const sectionRef = useRef<HTMLElement>(null);

  /**
   * Observa cuando la sección entra en pantalla para disparar animación.
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  /**
   * Stickers a renderizar.
   * NOTA:
   * - El texto se mantiene solo como referencia semántica (alt),
   *   NO se renderiza visualmente.
   */
  const stickers = [
    { alt: "Sticker ¡Que chicha!", image: "/img/merry/STICKER-2---MERRY.png" },
    { alt: "Sticker Muack", image: "/img/merry/STICKER-9---MERRY.png" },
    { alt: "Sticker Bendiciones", image: "/img/merry/STICKER-11---MERRY.png" },
    { alt: "Sticker Yo no fui", image: "/img/merry/STICKER-8---MERRY.png" },
  ];

  return (
    <section
      id="stickers"
      ref={sectionRef}
      className="w-full bg-[#ff29ab] py-10 sm:py-12 md:py-14 lg:py-16"
    >
      <div
        className={[
          "w-full max-w-[1200px] mx-auto flex flex-col items-center",
          "px-4 md:px-8 lg:px-12",
          isVisible ? "animate-fade-in-up" : "opacity-0",
        ].join(" ")}
      >
        {/* Título principal */}
        <h2
          className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase mb-0 text-center leading-none"
          style={{ fontFamily: "Colfax, sans-serif" }}
        >
          STICKERS
        </h2>

        {/* Subtítulo */}
        <p className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase tracking-wide mb-2 text-center font-semibold leading-tight" style={{ fontFamily: "Acumin Pro, sans-serif", fontWeight: 600 }}>
          DE DOÑA MERRY
        </p>

        {/* Grid de stickers (sin texto) */}
        <div className="w-full grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-2 max-w-[800px] mx-auto">
          {stickers.map((sticker, index) => (
            <div
              key={index}
              className="flex items-center justify-center motion-lift"
            >
              <Image
                src={sticker.image}
                alt={sticker.alt}
                width={360}
                height={360}
                className="w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 object-contain"
                priority={index < 2}
              />
            </div>
          ))}
        </div>

        {/* Botón de descarga */}
        <button
          onClick={() => {
            // URL final a definir por el proyecto
            window.open("#", "_blank");
          }}
          className={[
            "bg-[#7e1ad2] text-white",
            "px-10 sm:px-14 md:px-18 lg:px-22",
            "py-2 sm:py-2.5 md:py-3 lg:py-3.5",
            "rounded-xl",
            "uppercase tracking-wide",
            "hover:opacity-90 transition-opacity",
            "flex items-center justify-center gap-3",
            "text-base sm:text-lg md:text-xl",
            "pulse-cta",
          ].join(" ")}
          style={{
            fontFamily: "Acumin Pro, sans-serif",
            fontWeight: 600, // Semibold
          }}
        >
          
          <span>DESCARGAR AQUÍ</span>
          <Image
            src="/img/merry/flecha.png"
            alt="Flechas"
            width={24}
            height={24}
            className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
          />
        </button>
      </div>
    </section>
  );
}
