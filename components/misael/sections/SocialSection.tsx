"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

export default function SocialSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const images = [
    "/img/misael/Redes1.png",
    "/img/misael/Redes2.png",
    "/img/misael/Redes3.png",
    "/img/misael/Redes4.png",
    "/img/misael/Redes5.png",
    "/img/misael/Redes6.png",
  ];

  return (
    <section
      id="adventures"
      ref={sectionRef}
      className="w-full bg-black py-4"
    >
      <div
        className={`max-w-[1400px] mx-auto flex flex-col gap-1 items-center px-4 md:px-8 lg:px-12  py-10 ${
          isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        {/* Título */}
        <h2 className="text-[#f69d28] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase mb-4 text-center font-rosewood">
          SIGUEME EN MIS <br /> REDES SOCIALES
        </h2>

        {/* Grid de posts */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
          {images.map((imageSrc, index) => (
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
