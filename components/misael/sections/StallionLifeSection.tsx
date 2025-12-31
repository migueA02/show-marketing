"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";

/**
 * ChismesitosSection Component
 *
 * Ajustes solicitados:
 * - Título "CHISMESITOS DE MERRY" más grande y más ancho (ocupa más línea).
 * - Bloque tipográfico más compacto (menos separación entre líneas).
 * - Imagen más pegada al botón (eliminar margen superior y compactar tarjeta).
 *
 * Reglas:
 * - Se mantiene mobile-first.
 * - No se introducen librerías externas.
 * - Se respetan colores existentes del diseño.
 */
export default function SallionLifeSection() {
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

  return (
    <section
      id="chismesitos"
      ref={sectionRef}
      className="w-full bg-black py-12 sm:py-16 md:py-20 lg:py-24"
    >
      <div
        className={[
          "w-full flex flex-col items-center",
          "px-4 md:px-8 lg:px-12",
          isVisible ? "animate-fade-in-up" : "opacity-0",
        ].join(" ")}
      >
        {/* Bloque de título: más grande, más ancho y más compacto */}
        <div className="w-full flex flex-col gap-2  text-center">
          <p className="text-white uppercase font-black tracking-[-0.015em] text-[28px] sm:text-[34px] md:text-[38px] lg:text-[44px] leading-[0.95] m-0 p-0">
            LA VIDA DE  UN
          </p>

          <h2 className="text-[#f69d28] uppercase font-black  text-[56px] sm:text-[68px] md:text-[78px] lg:text-[92px] leading-[0.9]  m-0 p-0">
            SEMENTAL
          </h2>
        </div>

        {/* Tarjeta unificada: imagen + botón (más pegada) */}
        <div className="mt-5 w-full max-w-[280px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[460px] flex flex-col gap-1 sm:gap-0">
          {/* Imagen */}
          <div className="w-full  relative overflow-hidden rounded-t-xl -mb-4 lg:-mb-6">
            <Image
              src="/img/misael/Sticker_5.png"
              alt="Chismesitos de Doña Merry"
              width={460}
              height={640}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* Botón como extensión de la imagen (sin separación) */}
          <button
            type="button"
            onClick={() => {
              // URL del canal a definir
              window.open("#", "_blank");
            }}
            className="w-full bg-[#854319] text-white py-2 sm:py-5 md:py-6 rounded-xl uppercase tracking-wide hover:opacity-90 transition-opacity flex items-center justify-center gap-3  font-bold"
          >
            {/* Instagram */}
           <FaInstagram className="w-7 h-7"/>

            <p className="font-bold text-xl">UNITE AL CANAL</p>

            {/* Flecha */}
            <Image
              src="/img/merry/Flecha.png"
              alt="Flecha"
              width={28}
              height={28}
              className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
