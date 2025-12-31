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
      id="contact"
      ref={sectionRef}
      className="w-full bg-[#854319] py-12 sm:py-16 md:py-20 lg:py-24"
    >
      <div
        className={`w-full flex flex-col items-center px-4 md:px-8 lg:px-12 gap-2 ${
          isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        {/* Título */}
        <h2
          className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase  text-center"
          style={{ fontFamily: "Colfax, sans-serif" }}
        >
          CONTACTO
        </h2>

        {/* Formulario */}
        <form className="w-full max-w-sm md:max-w-md lg:max-w-lg space-y-4 md:space-y-5 lg:space-y-6 ">
          {/* Nombre */}
          <input
            type="text"
            placeholder="Nombre"
            className="w-full px-4 py-3 md:px-5 md:py-4 lg:px-6 lg:py-5 rounded-md bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f69d28] text-gray-800 text-sm md:text-base lg:text-lg placeholder:text-[#854319]"
          />

          {/* Apellido */}
          <input
            type="text"
            placeholder="Apellido"
            className="w-full px-4 py-3 md:px-5 md:py-4 lg:px-6 lg:py-5 rounded-md  bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f69d28] text-gray-800 text-sm md:text-base lg:text-lg placeholder:text-[#854319]"
          />

          {/* Correo */}
          <input
            type="email"
            placeholder="Correo"
            className="w-full px-4 py-3 md:px-5 md:py-4 lg:px-6 lg:py-5 rounded-md bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f69d28] text-gray-800 text-sm md:text-base lg:text-lg placeholder:text-[#854319]"
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
              className="w-full pl-12 md:pl-14 lg:pl-16 pr-4 py-3 md:px-5 md:py-4 lg:px-6 lg:py-5 rounded-md bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f69d28] text-gray-800 text-sm md:text-base lg:text-lg placeholder:text-[#854319]"
            />
          </div>

          {/* Información adicional */}
          <textarea
            placeholder="Información adicional:"
            rows={4}
            className="w-full px-4 py-3 md:px-5 md:py-4 lg:px-6 lg:py-5 rounded-md bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f69d28] text-gray-800 resize-none text-sm md:text-base lg:text-lg placeholder:text-[#854319]"
          />
        </form>

        {/* Botón enviar */}
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            // Funcionalidad a implementar
          }}
          className="bg-white text-[#854319] px-6 sm:px-8 md:px-10 lg:px-12 py-2 rounded-md font-bold text-lg lg:text-xl uppercase tracking-wide hover:opacity-90 transition-opacity flex items-center gap-2 md:gap-3"
        >
          ENVIAR
        </button>
      </div>
    </section>
  );
}