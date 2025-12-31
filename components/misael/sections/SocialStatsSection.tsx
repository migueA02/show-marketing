"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

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
    { name: "Facebook", icon: "FB", image: <FaFacebookF className="text-[#492a10] w-12 h-12"/>, followers: '5.5M' },
    { name: "YouTube", icon: "YT", image: <FaYoutube className="text-[#492a10] w-12 h-12"/>, followers: '5.5M' },
    { name: "Instagram", icon: "IG", image: <FaInstagram className="text-[#492a10] w-12 h-12"/>, followers: '5.5M' },
    { name: "TikTok", icon: "TT", image: <FaTiktok className="text-[#492a10] w-12 h-12"/>, followers: '5.5M' },
  ];

  return (
    <section
      id="social-stats"
      ref={sectionRef}
      className="w-full bg-[#854319] py-6 sm:py-8 md:py-10 lg:py-12"
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
              className="flex flex-col items-center justify-center text-center gap-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icono de red social */}
              {platform?.image}
              
              {/* Número */}
              <span
                className="text-[#f69d28] text-3xl sm:text-xl md:text-2xl lg:text-3xl font-black mb-1 md:mb-2"
                style={{ fontFamily: "Colfax, sans-serif" }}
              >
                {platform?.followers}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
