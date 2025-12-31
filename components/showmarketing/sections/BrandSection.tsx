"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function BrandSection() {
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

  return (
    <section
      ref={sectionRef}
      className="w-full bg-black py-16 md:py-20 lg:py-24"
    >
      <div
        className={`w-full max-w-[1200px] mx-auto flex flex-col items-center px-4 md:px-8 lg:px-12 ${
          isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        {/* Logo ShowMarketing */}
        <div className="mb-8 md:mb-10">
          <Image
            src="/img/showmarketing/logo-showmarketing-white.png"
            alt="ShowMarketing Producciones"
            width={400}
            height={200}
            className="w-full max-w-sm md:max-w-md lg:max-w-lg object-contain"
          />
        </div>

        {/* Texto descriptivo */}
        <p className="font-helvetica text-white text-center text-base md:text-lg lg:text-xl max-w-3xl leading-relaxed">
          Nuestro compromiso es elevar el entretenimiento y la publicidad al más alto nivel. 
          Trabajamos día a día en el desarrollo y perfeccionamiento de nuestros talentos, 
          creando experiencias memorables que conectan con la audiencia.
        </p>
      </div>
    </section>
  );
}
