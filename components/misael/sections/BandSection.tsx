"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

const BandSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`flex flex-col ${
        isVisible ? "animate-fade-in-up" : "opacity-0"
      }`}
    >
      {/* Sección negra */}
      <div className="bg-black w-full py-10">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center px-4 md:px-8 lg:px-12">
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase mb-4 text-center font-acumin">
              Un concepto de <br /> carnaval diferente
            </h2>
            <Image
              src="/img/misael/bandaLogo.png"
              width={300}
              height={300}
              alt="Banda Logo"
              className="block w-[300px] h-[300px]"
            />
          </div>

          <div className="relative w-full h-[400px] overflow-hidden">
            <Image
              src="/img/misael/banda.png"
              alt="Banda"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Sección café */}
      <div className="bg-[#854319] w-full flex flex-col justify-center items-center py-10 gap-4">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-12">
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 text-center capitalize font-rosewood">
            ¡Le tocamos lo que quiera!
          </h2>

          {/* Grid de imágenes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="relative w-full h-[250px] overflow-hidden rounded-xl">
              <Image
                src="/img/misael/Banda.png"
                alt="Evento 1"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-full h-[250px] overflow-hidden rounded-xl">
              <Image
                src="/img/misael/Banda2.png"
                alt="Evento 2"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-full h-[250px] overflow-hidden rounded-xl">
              <Image
                src="/img/misael/Banda3.png"
                alt="Evento 3"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <button
          onClick={() => window.open("#", "_blank")}
          className="bg-white text-[#854319] px-6 sm:px-8 md:px-10 lg:px-12 py-1  rounded-xl font-semibold text-md lg:text-xl xl:text-2xl uppercase tracking-wide hover:opacity-90 transition-opacity flex items-center gap-2 md:gap-3 xl:gap-4 n w-fit cursor-pointer motion-lift"
        >
          <FaWhatsapp className="text-[30px] lg:text-[36px] xl:text-[40px] " />
          <p className="font-extrabold">+506 8305 4444</p>
          <MdOutlineKeyboardDoubleArrowLeft className="text-[30px] lg:text-[36px] xl:text-[40px]" />
        </button>
      </div>
    </div>
  );
};

export default BandSection;
