"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

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
    { alt: "Sticker ¡Que chicha!", image: "/img/misael/Sticker_1.png" },
    { alt: "Sticker Muack", image: "/img/misael/Sticker_2.png" },
    { alt: "Sticker Bendiciones", image: "/img/misael/Sticker_3.png" },
    { alt: "Sticker Yo no fui", image: "/img/misael/Sticker_4.png" },
  ];

  return (
    <section
      id="stickers"
      ref={sectionRef}
      className="w-full bg-[#854319] py-14 sm:py-18 md:py-22 lg:py-26"
    >
      <div
        className={[
          "w-full flex flex-col items-center",
          "px-4 md:px-8 lg:px-12",
          isVisible ? "animate-fade-in-up" : "opacity-0",
        ].join(" ")}
      >
        {/* Título principal */}
        <div className="flex flex-col ">
          {" "}
          <h2
            className="text-white text-xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase mb-3 text-center"
            style={{ fontFamily: "Colfax, sans-serif" }}
          >
            Descarga los stickers del semental
          </h2>
          <h2
            className="text-white text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase mb-3 text-center"
            style={{ fontFamily: "Colfax, sans-serif" }}
          >
            ¡ARAAAJOO!
          </h2>
        </div>

        {/* Grid de stickers (sin texto) */}
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-12">
          {stickers.map((sticker, index) => (
            <div key={index} className="flex items-center justify-center">
              <Image
                src={sticker.image}
                alt={sticker.alt}
                width={360}
                height={360}
                className="w-52 h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain"
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
          className="bg-white text-[#854319] px-8 sm:px-10 md:px-12 py-2 sm:py-2 md:py-2 rounded-xl uppercase tracking-wide hover:opacity-90 transition-opacity flex items-center gap-3 text-base sm:text-lg md:text-xl"
          style={{
            fontFamily: "Acumin Pro, sans-serif",
            fontWeight: 800, // Semibold
          }}
        >
          <span>DESCARGAR AQUÍ</span>
          <MdOutlineKeyboardDoubleArrowLeft className="text-[30px]" />
        </button>
      </div>
    </section>
  );
}
