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
    { name: "WhatsApp", image: "/img/merry/Whatsapp 2.png", url: "https://wa.me/50683054444" },
    { name: "Facebook", image: "/img/merry/Facebook 2.png", url: "https://www.facebook.com/FansdeMerry/?locale=es_LA" },
    { name: "YouTube", image: "/img/merry/Youtube 2.png", url: "https://www.youtube.com/c/MisaelRam%C3%ADrezElSemental" },
    { name: "Instagram", image: "/img/merry/Instagram 2.png", url: "https://www.instagram.com/merry_oficial/" },
    { name: "TikTok", image: "/img/merry/Tik tok 2.png", url: "https://www.tiktok.com/@merry_oficialcr" },
  ];

  return (
    <footer
      ref={sectionRef}
      className="w-full bg-[#7e1ad2] py-8 sm:py-10 md:py-12 lg:py-14"
    >
      <div
        className={`w-full max-w-[1200px] mx-auto flex justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-4 md:px-8 lg:px-12 ${
          isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        {socialIcons.map((social, index) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center transition-opacity cursor-pointer motion-lift hover:opacity-80"
            style={{ animationDelay: `${index * 50}ms` }}
            aria-label={`Visitar ${social.name}`}
          >
            <Image
              src={social.image}
              alt={`${social.name} icon`}
              width={32}
              height={32}
              className="w-full h-full object-contain"
            />
          </a>
        ))}
      </div>
    </footer>
  );
}

