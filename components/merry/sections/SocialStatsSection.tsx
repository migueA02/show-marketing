"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * SocialStatsSection Component
 *
 * Objetivo: Visualizar métricas de presencia social de Doña Merry (followers)
 * en formato compacto y horizontalmente distribuido para máxima legibilidad.
 *
 * Características visuales:
 * - Fondo: Morado corporativo (#7e1ad2) para continuidad de marca
 * - Distribución: 4 columnas horizontal (flex justify-between) con iconos cuadrados
 * - Iconos: 48px-76px según breakpoint (clamp 12rem-4.75rem) con Image optimizada
 * - Tipografía: Colfax Black para números (100K), Colfax SB para "SEGUIDORES"
 * - Espaciado mínimo: py-3 para sección compacta
 *
 * Estructura:
 * - Contenedor sección con id="social-stats" para deep-linking (?sec=redes-sociales)
 * - Array socialPlatforms: {name, icon, image} para fácil actualización de métricas
 * - 4 bloques verticales con motion-lift y animationDelay escalonado (100ms)
 * - Cada bloque contiene: icono + número + etiqueta ("SEGUIDORES")
 *
 * Responsive:
 * - Mobile: gap-3, iconos w-12/h-12, texto xs
 * - Tablet (md+): gap-6, iconos w-16/h-16, texto md
 * - Desktop (lg+): gap-8, iconos w-76px/h-76px, texto 3xl
 *
 * Accesibilidad:
 * - Alt text en cada icono ({platform.name} icon)
 * - ARIA-label implícito en números (100K SEGUIDORES)
 * - Focus ring 2px #7e1ad2 en bloque padre
 * - Estructura semántica con div para cada métrica
 *
 * Animación: fade-in-up principal + motion-lift escalonado (0ms-300ms) para efecto visual
 */
export default function SocialStatsSection() {
  /**
   * Control de animación al entrar en viewport.
   */
  const [isVisible, setIsVisible] = useState(false);
  /**
   * Ref del section para IntersectionObserver.
   */
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

  /**
   * Datos de plataformas y rutas de icono; sustituir para actualizar métricas.
   */
  const socialPlatforms = [
    { name: "Facebook", icon: "FB", image: "/img/merry/Facebook.png" },
    { name: "YouTube", icon: "YT", image: "/img/merry/Youtube.png" },
    { name: "Instagram", icon: "IG", image: "/img/merry/Instagram.png" },
    { name: "TikTok", icon: "TT", image: "/img/merry/Tik tok.png" },
  ];

  return (
    <section
      id="social-stats"
      ref={sectionRef}
      className="w-full bg-[#7e1ad2] py-3 sm:py-4 md:py-5 lg:py-6"
    >
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12">
        <div
          className={`flex flex-row justify-between items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          {socialPlatforms.map((platform, index) => (
            <div
              key={platform.name}
              className="flex flex-col items-center justify-center text-center motion-lift"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icono de red social */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-[4.75rem] lg:h-[4.75rem]  flex items-center justify-center mb-0.5 sm:mb-1 p-1.5 sm:p-2">
                <Image
                  src={platform.image}
                  alt={`${platform.name} icon`}
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Número */}
              <span
                className="text-white text-base sm:text-lg md:text-2xl lg:text-3xl font-black mb-0 leading-none"
                style={{ fontFamily: "Colfax, sans-serif" }}
              >
                100K
              </span>
              
              {/* Texto seguidores */}
              <span className="text-white text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold uppercase tracking-tight leading-none" style={{ fontFamily: "Colfax, sans-serif" }}>
                SEGUIDORES
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

