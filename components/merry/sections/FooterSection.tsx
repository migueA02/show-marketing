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

  const socialIcons = [
    { name: "WhatsApp", image: "/img/merry/Whatsapp 2.png" },
    { name: "Facebook", image: "/img/merry/Facebook.png" },
    { name: "YouTube", image: "/img/merry/Youtube.png" },
    { name: "Instagram", image: "/img/merry/Instagram.png" },
    { name: "TikTok", image: "/img/merry/Tik tok.png" },
  ];

  return (
    <footer
      ref={sectionRef}
      className="w-full bg-[#7e1ad2] py-8 sm:py-10 md:py-12 lg:py-14"
    >
      <div
        className={`w-full flex justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-4 md:px-8 lg:px-12 ${
          isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        {socialIcons.map((social, index) => (
          <div
            key={social.name}
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer p-2"
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

