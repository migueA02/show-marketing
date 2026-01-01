"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

export default function StickersSection() {
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

  const stickers = [
    { alt: "Sticker ¡Que chicha!", image: "/img/misael/Sticker_1.png" },
    { alt: "Sticker Muack", image: "/img/misael/Sticker_2.png" },
    { alt: "Sticker Bendiciones", image: "/img/misael/Sticker_3.png" },
    { alt: "Sticker Yo no fui", image: "/img/misael/Sticker_4.png" },
  ];

  return (
    <section
      ref={sectionRef}
      className={`w-full bg-[#854319]  py-10 flex justify-center ${
        isVisible ? "animate-fade-in-up" : "opacity-0"
      }`}
    >
      <div className="w-full flex flex-col items-center max-w-[1200px] px-4 md:px-8 lg:px-12">
        {/* Título principal */}
        <div className="flex flex-col text-center ">
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase mb-3 font-acumin">
            Descarga los stickers del semental
          </h2>
          <h2 className="text-white text-6xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase mb-3 font-rosewood tracking-wide">
            ¡ARAAAJOO!
          </h2>
        </div>

        {/* Grid de stickers */}
        <div className="w-full grid grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-4">
          {stickers.map((sticker, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-full h-full"
            >
              <Image
                src={sticker.image}
                alt={sticker.alt}
                width={500}
                height={500}
                className="w-96 h-96  object-cover rounded-xl"
                priority={index < 2}
              />
            </div>
          ))}
        </div>

        <div id="channel"></div>
        {/* Botón de descarga */}
        <button
          onClick={() => window.open("#", "_blank")}
          className="bg-white text-[#854319] px-6 sm:px-8 md:px-10 lg:px-12 py-1  rounded-xl font-semibold text-md lg:text-xl xl:text-2xl uppercase tracking-wide hover:opacity-90 transition-opacity flex items-center gap-2 md:gap-3 xl:gap-4 n w-fit cursor-pointer motion-lift"
        >
          <p className="font-extrabold">DESCÁRGALOS</p>
          <MdOutlineKeyboardDoubleArrowLeft className="text-[30px] lg:text-[36px] xl:text-[40px]" />
        </button>
      </div>
    </section>
  );
}
