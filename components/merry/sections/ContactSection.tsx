"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * ContactSection Component
 * 
 * Sección de contacto con formulario.
 * 
 * Características:
 * - Fondo cyan #67c7db
 * - Título en morado #7e1ad2
 * - Formulario con inputs blancos
 * - Botón morado con texto blanco
 * - Iconos de redes sociales al final
 * - Animación smooth al entrar
 */
export default function ContactSection() {
  /**
   * Control de visibilidad para activar animación en viewport.
   */
  const [isVisible, setIsVisible] = useState(false);
  /**
   * Ref del section para IntersectionObserver.
   */
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Observa entrada al viewport y habilita la animación de fade/slide.
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
      id="contact"
      ref={sectionRef}
      className="w-full bg-[#67c7db] py-12 sm:py-16 md:py-20 lg:py-24"
    >
      <div
        className={`w-full max-w-[1200px] mx-auto flex flex-col items-center px-4 md:px-8 lg:px-12 ${
          isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        {/* Título */}
        <h2
          className="text-[#7e1ad2] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase mb-8 sm:mb-10 md:mb-12 lg:mb-14 text-center"
          style={{ fontFamily: "Colfax, sans-serif" }}
        >
          CONTACTO
        </h2>

        {/* Formulario compacto con campos básicos de contacto */}
        <form className="w-full max-w-sm md:max-w-md lg:max-w-lg space-y-4 md:space-y-5 lg:space-y-6 mb-8 sm:mb-10 md:mb-12 lg:mb-14">
          {/* Nombre */}
          <input
            type="text"
            placeholder="Nombre"
            className="w-full px-4 py-3 md:px-5 md:py-4 lg:px-6 lg:py-5 rounded-lg md:rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7e1ad2] text-gray-800 text-sm md:text-base lg:text-lg placeholder:text-[#7e1ad2]" style={{ fontFamily: "Helvetica LT P, sans-serif", fontWeight: 700 }}
          />

          {/* Apellido */}
          <input
            type="text"
            placeholder="Apellido"
            className="w-full px-4 py-3 md:px-5 md:py-4 lg:px-6 lg:py-5 rounded-lg md:rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7e1ad2] text-gray-800 text-sm md:text-base lg:text-lg placeholder:text-[#7e1ad2]" style={{ fontFamily: "Helvetica LT P, sans-serif", fontWeight: 700 }}
          />

          {/* Correo */}
          <input
            type="email"
            placeholder="Correo"
            className="w-full px-4 py-3 md:px-5 md:py-4 lg:px-6 lg:py-5 rounded-lg md:rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7e1ad2] text-gray-800 text-sm md:text-base lg:text-lg placeholder:text-[#7e1ad2]" style={{ fontFamily: "Helvetica LT P, sans-serif", fontWeight: 700 }}
          />

          {/* Teléfono con bandera de Costa Rica a la izquierda */}
          <div className="relative">
            <div className="absolute left-3 md:left-4 lg:left-5 top-1/2 -translate-y-1/2 z-10">
              <Image
                src="/img/merry/Costa Rica.png"
                alt="Bandera de Costa Rica"
                width={24}
                height={18}
                className="w-6 h-4 md:w-7 md:h-5 lg:w-8 lg:h-6 object-contain"
              />
            </div>
            <input
              type="tel"
              placeholder="Número de teléfono"
              className="w-full pl-12 md:pl-14 lg:pl-16 pr-4 py-3 md:px-5 md:py-4 lg:px-6 lg:py-5 rounded-lg md:rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7e1ad2] text-gray-800 text-sm md:text-base lg:text-lg placeholder:text-[#7e1ad2]" style={{ fontFamily: "Helvetica LT P, sans-serif", fontWeight: 700 }}
            />
          </div>

          {/* Información adicional */}
          <textarea
            placeholder="Información adicional:"
            rows={4}
            className="w-full px-4 py-3 md:px-5 md:py-4 lg:px-6 lg:py-5 rounded-lg md:rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7e1ad2] text-gray-800 resize-none text-sm md:text-base lg:text-lg placeholder:text-[#7e1ad2]" style={{ fontFamily: "Helvetica LT P, sans-serif", fontWeight: 700 }}
          />
        </form>

        {/* CTA de envío (lógica de backend pendiente) */}
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            // Funcionalidad a implementar
          }}
          className="bg-[#7e1ad2] text-white px-16 sm:px-20 md:px-24 lg:px-28 py-2 sm:py-2.5 md:py-3 lg:py-3.5 rounded-lg md:rounded-xl font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase tracking-wide hover:opacity-90 transition-opacity flex items-center justify-center gap-3 md:gap-4 pulse-cta"
          style={{ fontFamily: "Colfax, sans-serif" }}
        >
          
          <span>ENVIAR</span>
          <Image
            src="/img/merry/flecha.png"
            alt="Flechas"
            width={40}
            height={40}
            className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain"
          />
        </button>
      </div>
    </section>
  );
}

