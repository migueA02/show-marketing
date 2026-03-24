"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

export default function SocialStatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const socialPlatforms = [
    {
      name: "Facebook",
      icon: <FaFacebookF className="text-[#492a10] w-full h-full" />,
      followers: "204K",
      url: "https://www.facebook.com/sementalcr",
    },
    {
      name: "YouTube",
      icon: <FaYoutube className="text-[#492a10] w-full h-full" />,
      followers: "24.7K",
      url: "https://www.youtube.com/@MisaelRam%C3%ADrezElSemental",
    },
    {
      name: "Instagram",
      icon: <FaInstagram className="text-[#492a10] w-full h-full" />,
      followers: "40.2K",
      url: "https://www.instagram.com/misaelramirezcr/",
    },
    {
      name: "TikTok",
      icon: <FaTiktok className="text-[#492a10] w-full h-full" />,
      followers: "121K",
      url: "https://www.tiktok.com/@misaelramirezcr",
    },
  ];

  return (
    <section
      id="social-stats"
      ref={sectionRef}
      className="w-full bg-[#854319] py-4 sm:py-6 md:py-8 lg:py-12 flex justify-center items-center"
    >
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <div
          className={`flex flex-row justify-between items-center w-full gap-3 sm:gap-4 md:gap-6 lg:gap-8 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          {socialPlatforms.map((platform, index) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visitar ${platform.name} de Misael`}
              className="flex flex-col items-center justify-center text-center flex-1 motion-lift"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Contenedor responsivo para el icono (Aquí ocurre la magia de la adaptación) */}
              <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-[4.75rem] lg:h-[4.75rem] flex items-center justify-center mb-1 sm:mb-2 p-1 sm:p-2">
                {platform.icon}
              </div>

              {/* Número con texto responsivo */}
              <span className="text-[#f69d28] text-base sm:text-lg md:text-2xl lg:text-4xl font-black mb-0 font-acumin leading-none">
                {platform.followers}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
