"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

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
    {
      name: "WhatsApp",
      image: <FaWhatsapp className="text-white w-8 h-8" />,
    },
    {
      name: "Facebook",
      image: <FaFacebookF className="text-white w-8 h-8" />,
    },
    {
      name: "YouTube",
      image: <FaYoutube className="text-white w-8 h-8" />,
    },
    {
      name: "Instagram",
      image: <FaInstagram className="text-white w-8 h-8" />,
    },
    {
      name: "TikTok",
      image: <FaTiktok className="text-white w-8 h-8" />,
    },
  ];

  return (
    <footer
      ref={sectionRef}
      className="w-full bg-black py-8 sm:py-10 md:py-12 lg:py-14"
    >
      <div
        className={`w-full flex justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-4 md:px-8 lg:px-12 ${
          isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        {socialIcons.map((social, index) => (
          <div
            key={social.name}
            className="  rounded-full  flex items-center justify-center transition-all cursor-pointer hover:scale-110"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {social?.image}
          </div>
        ))}
      </div>
    </footer>
  );
}
