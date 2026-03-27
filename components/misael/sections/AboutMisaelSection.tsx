"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

export default function AboutMisaelSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isBioOpen, setIsBioOpen] = useState(false);
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
      id="about"
      ref={sectionRef}
      className="w-full bg-[#000000] pt-10 flex flex-col items-center gap-14"
    >
      <div
        className={`w-full flex flex-col items-center px-4 md:px-8 lg:px-12 gap-6 max-w-[1400px] ${
          isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        {/* Avatar circular */}
        <div className="flex flex-col justify-center items-center">
          <div className="rounded-full w-[220px] h-[220px] sm:w-[250px] sm:h-[250px] lg:w-[300px] lg:h-[300px] xl:w-[350px] xl:h-[350px] mb-6 sm:mb-8 md:mb-10 lg:mb-12 overflow-hidden relative">
            <Image
              src="/img/misael/semental.png"
              alt="Doña Merry - Avatar"
              width={350}
              height={350}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Título */}
          <h2 className="text-[#f69d28] text-5xl lg:text-6xl xl:text-7xl font-black uppercase mb-3 sm:mb-4 md:mb-5 lg:mb-6 text-center font-rosewood">
            EL SEMENTAL <br /> DEL HUMOR
          </h2>
        </div>

        {/* Botón acordeón */}
        <button
          id="beer"
          onClick={() => setIsBioOpen((prev) => !prev)}
          aria-expanded={isBioOpen}
          aria-controls="misael-bio-content"
          className="bg-[#f69d28] text-white px-6 sm:px-8 motion-lift cursor-pointer md:px-10 lg:px-12 py-1  rounded-xl font-semibold text-md lg:text-xl xl:text-2xl uppercase tracking-wide hover:opacity-90 transition-opacity flex items-center gap-2 md:gap-3 xl:gap-4 font-acumin"
        >
          <span>¿QUIEN ES EL SEMENTAL?</span>
          <MdOutlineKeyboardDoubleArrowLeft
            className={`text-[30px] lg:text-[36px] xl:text-[40px] transition-transform duration-300 ${
              isBioOpen ? "-rotate-90" : "rotate-0"
            }`}
          />
        </button>

        <div
          id="misael-bio-content"
          className={`w-full max-w-[1000px] overflow-hidden transition-all duration-500 ease-in-out ${
            isBioOpen ? "max-h-[720px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-[#f69d28]/95 text-white rounded-xl md:rounded-2xl px-5 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 font-acumin">
            <p className="text-sm sm:text-base md:text-lg leading-relaxed">
              Misael Ramírez se caracteriza por un humor sano, respetuoso y 100% familiar.
            </p>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed mt-3">
              Su visión de la masculinidad está basada en el respeto, el buen juicio y la aceptación de las diferencias que existen en la sociedad. Desde ahí, construye con un tono irónico y humorístico el concepto del "semental", como una forma de reafirmar su identidad y expresar con orgullo su heterosexualidad.
            </p>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed mt-3">
              A través de su humor criollo, Misael resalta el valor de ser auténtico. Mediante comparaciones coloquiales, logra simplificar la vida cotidiana de una manera cercana, en la que todos podemos identificarnos.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full h-[30px] bg-[#f69d28]"></div>
    </section>
  );
}
