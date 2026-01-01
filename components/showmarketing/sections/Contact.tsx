"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Disconnect observer after first intersection to reduce work
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Disconnect after first intersection to prevent repeated callbacks
          if (observerRef.current && sectionRef.current) {
            observerRef.current.unobserve(sectionRef.current);
            observerRef.current.disconnect();
            observerRef.current = null;
          }
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current = observer;

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="w-full bg-black py-16 md:py-24"
      style={{ contain: "layout paint style", contentVisibility: "auto" }}
    >
      <div
        className={`w-full max-w-6xl mx-auto flex flex-col items-center px-4 md:px-8 ${
          isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        {/* Título */}
        <h2 className="font-grifter text-5xl md:text-6xl lg:text-7xl uppercase mb-12 md:mb-16 text-white text-center">
          CONTACTO
        </h2>

        {/* Formulario */}
        <form className="w-full max-w-md md:max-w-lg space-y-4 md:space-y-5">
          {/* Nombre */}
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            aria-label="Nombre"
            className="w-full px-4 py-3 md:px-5 md:py-4 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-white text-black text-sm md:text-base placeholder:text-gray-500 font-helvetica"
          />

          {/* Apellido */}
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            aria-label="Apellido"
            className="w-full px-4 py-3 md:px-5 md:py-4 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-white text-black text-sm md:text-base placeholder:text-gray-500 font-helvetica"
          />

          {/* Correo */}
          <input
            type="email"
            name="email"
            placeholder="Correo"
            aria-label="Correo electrónico"
            className="w-full px-4 py-3 md:px-5 md:py-4 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-white text-black text-sm md:text-base placeholder:text-gray-500 font-helvetica"
          />

          {/* Teléfono con bandera de Costa Rica */}
          <div className="relative">
            <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-10">
              <Image
                src="/img/showmarketing/Costa Rica.png"
                alt="Bandera de Costa Rica"
                width={24}
                height={18}
                className="w-6 md:w-7 object-contain"
                style={{ height: 'auto' }}
              />
            </div>
            <input
              type="tel"
              name="telefono"
              placeholder="Número de teléfono"
              aria-label="Número de teléfono de Costa Rica"
              className="w-full pl-12 md:pl-14 pr-4 py-3 md:px-5 md:py-4 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-white text-black text-sm md:text-base placeholder:text-gray-500 font-helvetica"
            />
          </div>

          {/* Información adicional */}
          <textarea
            name="mensaje"
            placeholder="Información adicional"
            aria-label="Comentarios o información adicional"
            rows={4}
            className="w-full px-4 py-3 md:px-5 md:py-4 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-white text-black text-sm md:text-base placeholder:text-gray-500 font-helvetica resize-none"
          />

          {/* Botón Enviar */}
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="bg-transparent border-2 border-white text-white font-helvetica px-8 py-3 md:px-10 md:py-4 rounded-lg hover:bg-white hover:text-black transition-all text-sm md:text-base uppercase tracking-wider pulse-cta"
            >
              ENVIAR
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
