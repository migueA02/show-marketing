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
export default function SocialSection() {
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
      id="adventures"
      ref={sectionRef}
      className="w-full bg-black py-12 sm:py-16 md:py-20 lg:py-24"
    >
      <div
        className={`w-full flex flex-col gap-4 items-center px-4 md:px-8 lg:px-12 ${
          isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        {/* Título */}
        <h2
          className="text-[#f69d28] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase mb-2 sm:mb-3 md:mb-4 lg:mb-5 text-center"
          style={{ fontFamily: "Colfax, sans-serif" }}
        >
          SIGUEME EN MIS <br /> REDES SOCIALES
        </h2>

        {/* Grid de posts */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
          {[
            "/img/misael/Redes1.png",
            "/img/misael/Redes2.png",
            "/img/misael/Redes3.png",
            "/img/misael/Redes4.png",
            "/img/misael/Redes5.png",
            "/img/misael/Redes6.png",
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

