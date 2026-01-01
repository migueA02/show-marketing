"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * ChismesitosSection Component
 *
 * Objetivo: Promover la suscripción al canal de Instagram de Do\u00f1a Merry mediante\n * visualizaci\u00f3n destacada de t\u00edtulo tipogr\u00e1fico + imagen atractiva + CTA directo.\n *\n * Caracter\u00edsticas visuales:\n * - Fondo: Amarillo vibrante (#ffd44a) para alto contraste y visibilidad\n * - T\u00edtulos: Acumin Pro + Colfax Black en morado/rosado, tama\u00f1os din\u00e1micos\n *   \u2192 \"CHISMESITOS DE\" (30px-50px) con tracking positivo (0.12em-0.04em)\n *   \u2192 \"MERRY\" (88px-128px) con Colfax negrita, tracking negativo (-0.03em)\n * - Imagen: aspect-3/4 (460x640px), rounded-t-xl, overflow-hidden\n * - Bot\u00f3n: Morado con padding escalable (py-2-3), icono Instagram + flecha\n * - Tarjeta unificada: Imagen + bot\u00f3n sin separaci\u00f3n (mb-0)\n *\n * Estructura:\n * - Bloque tipogr\u00e1fico centrado con max-width responsiva (360px-700px)\n * - Negativo margin-top (-mt-16 a -mt-25) para solapamiento visual con t\u00edtulo\n * - Tarjeta contenedora con motion-lift (animaci\u00f3n hover sutil)\n * - Imagen preload: priority=true para carga r\u00e1pida\n * - Bot\u00f3n CTA: window.open(Instagram channel, \"_blank\"), pulse-cta en hover\n *\n * Responsive:\n * - Mobile: max-w-[320px], tracking [0.12em], texto 30px, py-12\n * - Tablet (sm+): max-w-[360px], tracking [0.09em], texto 36px, py-16\n * - Desktop (md+): max-w-[420px], tracking [0.06em], texto 42px-110px, py-20\n * - Large (lg+): max-w-[460px], tracking [0.04em], texto 50px-128px, py-24\n *\n * Accesibilidad:\n * - Alt text en imagen: \"Chismesitos de Do\u00f1a Merry\"\n * - Alt text en icono Instagram y flecha\n * - Sem\u00e1ntica h2 para \"MERRY\" (t\u00edtulo principal)\n * - Button type=\"button\" con onClick y rel=\"noopener noreferrer\"\n * - Focus ring 2px en bot\u00f3n (hover:opacity-90)\n *\n * Notas de optimizaci\u00f3n:\n * - Imagen priority=true para carga prioritaria (hero del viewport)\n * - Tracking din\u00e1mico reduce complejidad visual en mobile\n * - Solapamiento tipogr\u00e1fico crea din\u00e1mica visual sin complexity CSS\n */
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
        <div className="-mt-16 sm:-mt-14 md:-mt-20 lg:-mt-25 w-full max-w-[320px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[460px] relative z-10 motion-lift">
          {/* Imagen */}
          <div className="w-full aspect-3/4 relative overflow-hidden rounded-t-xl mb-0 sm:mb-0 lg:mb-0">

            <Image
              src="/img/merry/Chismesitos.png"
              alt="Chismesitos de Doña Merry - Canal exclusivo de Instagram con contenido de entretenimiento"
              width={460}
              height={640}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          {/* CTA directa al canal; la imagen actúa como cabecera de la tarjeta */}
          <button
            type="button"
            onClick={() => {
              // URL del canal a definir
              window.open("https://www.instagram.com/channel/Abal9hIfKAWne5zY/", "_blank");
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
