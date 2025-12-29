"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

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
export default function ChismesitosSection() {
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
      className="w-full bg-[#ffd44a] py-12 sm:py-16 md:py-20 lg:py-24"
    >
      <div
        className={[
          "w-full flex flex-col items-center",
          "px-4 md:px-8 lg:px-12",
          isVisible ? "animate-fade-in-up" : "opacity-0",
        ].join(" ")}
      >
        {/* Bloque de título: más grande, más ancho y más compacto */}
        <div className="w-full max-w-[520px] text-center">
          <p
            className={[
              "text-[#7e1ad2] uppercase font-black",
              "tracking-[-0.015em]",
              "text-[28px] sm:text-[34px] md:text-[38px] lg:text-[44px]",
              "leading-[0.95]",
              "m-0 p-0",
            ].join(" ")}
            style={{ fontFamily: "Colfax, sans-serif" }}
          >
            CHISMESITOS DE
          </p>

          <h2
            className={[
              "text-[#ff29ab] uppercase font-black",
              "tracking-[-0.03em]",
              "text-[56px] sm:text-[68px] md:text-[78px] lg:text-[92px]",
              "leading-[0.9]",
              "-mt-2 sm:-mt-3",
              "m-0 p-0",
            ].join(" ")}
            style={{ fontFamily: "Colfax, sans-serif" }}
          >
            MERRY
          </h2>
        </div>

        {/* Tarjeta unificada: imagen + botón (más pegada) */}
        <div className="mt-5 w-full max-w-[320px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[460px]">
          {/* Imagen */}
          <div className="w-full aspect-3/4 relative overflow-hidden rounded-t-xl -mb-4 lg:-mb-6">

            <Image
              src="/img/merry/Chismesitos.png"
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
            className={[
              "w-full",
              "bg-[#7e1ad2] text-white",
              "py-4 sm:py-5 md:py-6",
              "rounded-b-xl",
              "uppercase tracking-wide",
              "hover:opacity-90 transition-opacity",
              "flex items-center justify-center gap-3",
              "text-sm sm:text-base md:text-lg",
              "font-semibold",
            ].join(" ")}
          >
            {/* Instagram */}
            <Image
              src="/img/merry/instagram 2.png"
              alt="Instagram"
              width={28}
              height={28}
              className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
            />

            <span>UNITE AL CANAL</span>

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
