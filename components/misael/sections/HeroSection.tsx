"use client"
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const HeroSection = () => {
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

  return (
    <section
      id="hero"
      ref={sectionRef}
      className={`relative w-full h-screen overflow-hidden bg-black ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
    >
      {/* Texto */}
      <div className="relative z-30 flex flex-col items-center justify-start text-center px-6 top-28">
        <h1 className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-7xl font-bold tracking-wide font-rosewood">
          ¡BIENVENIDO AL
          <br />
          MUNDO DEL SEMENTAL!
        </h1>

        <p className="mt-6 text-[#f69d28] text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl uppercase tracking-widest font-acumin">
          Donde el humor sano se <br /> reune para hacerte reir
        </p>
      </div>

      {/* Imagen de fondo */}
      <div className="absolute bottom-0 left-0 w-full h-full z-10">
        <Image
          src="/img/misael/banner1.png"
          alt="Hero image"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Degradado encima de la imagen */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-black via-black/40 to-transparent" />
    </section>
  );
};

export default HeroSection;
