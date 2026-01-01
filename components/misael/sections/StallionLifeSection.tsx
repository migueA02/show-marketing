"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";

export default function SallionLifeSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    <section
      ref={sectionRef}
      className={`w-full bg-black py-10 flex justify-center ${
        isVisible ? "animate-fade-in-up" : "opacity-0"
      }`}
    >
      <div className="w-full max-w-[1400px] px-4 md:px-8 lg:px-12 flex flex-col items-center gap-8">
        <div className="w-full flex flex-col gap-2 text-center">
          <p className="text-white uppercase font-black tracking-[-0.015em] text-[28px] sm:text-[34px] md:text-[38px] lg:text-[44px] xl:text-[56px] 2xl:text-[64px] leading-[0.95] font-acumin m-0 p-0">
            LA VIDA DE UN
          </p>

          <h2 className="text-[#f69d28] uppercase font-black text-[56px] sm:text-[68px] md:text-[78px] lg:text-[92px] xl:text-[110px] 2xl:text-[120px] leading-[0.9] font-rosewood m-0 p-0">
            SEMENTAL
          </h2>
        </div>

        <div className="mt-5 w-full max-w-[280px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[460px] flex flex-col gap-1 sm:gap-0 motion-lift cursor-pointer">
          <div className="w-full relative overflow-hidden rounded-t-xl -mb-4 lg:-mb-6">
            <Image
              src="/img/misael/Sticker_5.png"
              alt="Chismesitos de Doña Merry"
              width={460}
              height={640}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          <button
            type="button"
            onClick={() => window.open("#", "_blank")}
            className="w-full bg-[#854319] text-white py-1  md:py-2 rounded-xl uppercase tracking-wide hover:opacity-90 transition-opacity flex items-center justify-center gap-3 font-bold"
          >
            <FaInstagram className="w-6 h-6 sm:w-7 sm:h-7" />
            <p className="font-bold text-xl sm:text-2xl">UNITE AL CANAL</p>
            <Image
              src="/img/merry/Flecha.png"
              alt="Flecha"
              width={28}
              height={28}
              className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
