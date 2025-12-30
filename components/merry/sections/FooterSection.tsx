"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * FooterSection Component
 * 
 * Footer final con iconos de redes sociales.
 * 
 * Características:
 * - Fondo morado #7e1ad2
 * - Iconos de redes sociales centrados
 * - Animación smooth al entrar
 */
export default function FooterSection() {
  /**
   * Controla la visibilidad animada del footer.
   */
  const [isVisible, setIsVisible] = useState(false);
  /**
   * Ref del footer para IntersectionObserver.
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
   * Configuración estática de iconos sociales; sustituir rutas si se actualiza branding.
   */
  const socialIcons = [
    { name: "WhatsApp", image: "/img/merry/Whatsapp 2.png" },
    { name: "Facebook", image: "/img/merry/Facebook 2.png" },
    { name: "YouTube", image: "/img/merry/Youtube 2.png" },
    { name: "Instagram", image: "/img/merry/Instagram 2.png" },
    { name: "TikTok", image: "/img/merry/Tik tok 2.png" },
  ];

  return (
    <footer
      ref={sectionRef}
      className="w-full bg-[#7e1ad2] py-4 sm:py-5 md:py-6 lg:py-7"
    >
      <div
        className={`w-full max-w-[1200px] mx-auto flex justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-4 md:px-8 lg:px-12 ${
          isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        {socialIcons.map((social, index) => (
          <div
            key={social.name}
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16  flex items-center justify-center transition-opacity cursor-pointer p-2 motion-lift hover:opacity-80"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <Image
              src={social.image}
              alt={`${social.name} icon`}
              width={100}
              height={100}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
    </footer>
  );
}

