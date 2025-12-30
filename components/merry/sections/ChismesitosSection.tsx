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
  /**
   * Control de animación al entrar al viewport.
   */
  const [isVisible, setIsVisible] = useState(false);
  /**
   * Ref del section para IntersectionObserver.
   */
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Activa la animación una vez que la sección se hace visible.
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
          "w-full max-w-[1200px] mx-auto flex flex-col items-center",
          "px-4 md:px-8 lg:px-12",
          isVisible ? "animate-fade-in-up" : "opacity-0",
        ].join(" ")}
      >
        {/* Bloque de título: ajuste de tracking y ancho para equilibrar líneas */}
        <div className="w-full max-w-[780px] text-center mx-auto">
          <p
            className={[
              "w-full max-w-[360px] sm:max-w-[520px] md:max-w-[700px] mx-auto",
              "text-[#7e1ad2] uppercase font-black",
              "tracking-[0.12em] sm:tracking-[0.09em] md:tracking-[0.06em] lg:tracking-[0.04em]",
              "text-[30px] sm:text-[36px] md:text-[42px] lg:text-[50px]",
              "leading-[0.95]",
              "m-0 p-0",
            ].join(" ")}
            style={{ fontFamily: "Acumin Pro, sans-serif", fontWeight: 600 }}
          >
            CHISMESITOS DE
          </p>

          <h2
            className={[
              "w-full max-w-[360px] sm:max-w-[520px] md:max-w-[700px] mx-auto",
              "text-[#ff29ab] uppercase font-black",
              "tracking-[-0.03em]",
              "text-[88px] sm:text-[92px] md:text-[110px] lg:text-[128px]",
              "leading-[0.9]",
              "-mt-2 sm:-mt-3",
              "m-0 p-0",
            ].join(" ")}
            style={{ fontFamily: "Colfax, sans-serif" }}
          >
            MERRY
          </h2>
        </div>

        {/* Tarjeta unificada: imagen + botón sin separación visible */}
        <div className="-mt-12 sm:-mt-10 md:-mt-14 lg:-mt-18 w-full max-w-[320px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[460px] relative z-10 motion-lift">
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

          {/* CTA directa al canal; la imagen actúa como cabecera de la tarjeta */}
          <button
            type="button"
            onClick={() => {
              // URL del canal a definir
              window.open("#", "_blank");
            }}
            className={[
              "w-full",
              "bg-[#7e1ad2] text-white",
              "py-2 sm:py-2.5 md:py-3",
              "rounded-xl",
              "uppercase tracking-wide",
              "hover:opacity-90 transition-opacity",
              "flex items-center justify-center gap-3",
              "text-xl sm:text-2xl md:text-3xl lg:text-4xl",
              "font-semibold",
              "pulse-cta",
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

            <span style={{ fontFamily: "Colfax, sans-serif" }}>
              UNITE AL CANAL
            </span>

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
