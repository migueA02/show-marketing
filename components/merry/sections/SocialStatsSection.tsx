"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * SocialStatsSection Component
 * 
 * Sección de estadísticas de redes sociales.
 * Muestra 4 métricas horizontales con iconos de redes sociales.
 * 
 * Características:
 * - Fondo morado #7e1ad2
 * - 4 bloques horizontales con iconos, número y texto
 * - Animación smooth al entrar
 * - Mobile-first, compacto
 */
export default function SocialStatsSection() {
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
      className="w-full bg-[#7e1ad2] py-6 sm:py-8 md:py-10 lg:py-12"
    >
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div
          className={`grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 lg:gap-8 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          {socialPlatforms.map((platform, index) => (
            <div
              key={platform.name}
              className="flex flex-col items-center justify-center text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icono de red social */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 rounded-full bg-white/20 flex items-center justify-center mb-2 md:mb-3 lg:mb-4 p-1.5 sm:p-2">
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
                className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-black mb-1 md:mb-2"
                style={{ fontFamily: "Colfax, sans-serif" }}
              >
                100K
              </span>
              
              {/* Texto seguidores */}
              <span className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-semibold uppercase tracking-wide">
                SEGUIDORES
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

