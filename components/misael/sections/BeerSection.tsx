"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const BeerSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

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
      className={`w-full h-fit bg-center bg-cover bg-no-repeat flex-col gap-16 pb-32 flex justify-center items-center ${
        isVisible ? "animate-fade-in-up" : "opacity-0"
      }`}
      style={{ backgroundImage: "url('/img/misael/cerveza.png')" }}
    >
      <div className="flex justify-center items-center w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] xl:w-[350px] h-auto">
        <Image
          alt="cerveza"
          src="/img/misael/cervezaLogo.png"
          width={500} // ancho real de la imagen para mantener calidad
          height={500} // alto real
          className="w-full h-auto object-contain"
        />
      </div>

      <iframe
        height="450"
        src="https://www.youtube.com/embed/PWlqcNWSqwA?si=NJv-UtrF6Avl_bCd&amp;controls=0"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share "
        className="w-full max-w-300"
      ></iframe>
      <div id="collaborations"></div>
    </div>
  );
};

export default BeerSection;
