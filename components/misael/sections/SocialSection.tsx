"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";

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

  const instagramPosts = [
    { image: "/img/misael/Redes1.png", url: "https://www.instagram.com/misaelramirezcr/" },
    { image: "/img/misael/Redes2.png", url: "https://www.instagram.com/misaelramirezcr/" },
    { image: "/img/misael/Redes3.png", url: "https://www.instagram.com/misaelramirezcr/" },
    { image: "/img/misael/Redes4.png", url: "https://www.instagram.com/misaelramirezcr/" },
    { image: "/img/misael/Redes5.png", url: "https://www.instagram.com/misaelramirezcr/" },
    { image: "/img/misael/Redes6.png", url: "https://www.instagram.com/misaelramirezcr/" },
  ];

  return (
    <section ref={sectionRef} className="w-full bg-black py-4">
      <div
        className={`max-w-[1400px] mx-auto flex flex-col gap-1 items-center px-4 md:px-8 lg:px-12  py-10 ${
          isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        {/* Título */}
        <h2 className="text-[#f69d28] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase mb-4 text-center font-rosewood">
          SIGUEME EN MIS <br /> REDES SOCIALES
        </h2>

        <button
          type="button"
          onClick={() => {
            window.open("https://www.instagram.com/misaelramirezcr/", "_blank");
          }}
          className="bg-[#f69d28] text-white px-6 sm:px-8 md:px-10 lg:px-12 py-1 rounded-xl font-semibold text-md lg:text-xl xl:text-2xl uppercase tracking-wide hover:opacity-90 transition-opacity flex items-center gap-2 md:gap-3 xl:gap-4 mb-6 md:mb-8 cursor-pointer font-acumin"
          aria-label="Visitar Instagram de Misael Ramirez"
        >
          <span className="inline-flex items-center gap-2">
            <FaInstagram className="text-base lg:text-xl" aria-hidden="true" />
            <span>misaelramirezcr</span>
          </span>
          <MdOutlineKeyboardDoubleArrowLeft className="text-[30px] lg:text-[36px] xl:text-[40px]" />
        </button>

        {/* Grid de posts */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
          {instagramPosts.map((post, index) => (
            <a
              key={index}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ver post de Instagram ${index + 1} de Misael`}
              className="aspect-square rounded-lg md:rounded-xl relative overflow-hidden block hover:opacity-90 transition-opacity"
            >
              <Image
                src={post.image}
                alt={`Post de redes de Misael ${index + 1}`}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </a>
          ))}
        </div>
        <div id="stickers"></div>
      </div>
    </section>
  );
}
