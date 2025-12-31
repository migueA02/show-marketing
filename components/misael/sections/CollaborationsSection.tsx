"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * CollaborationsSection Component
 * 
 * Sección de colaboraciones con carrusel de videos.
 * 
 * Características:
 * - Fondo morado #7e1ad2
 * - Título y subtítulo en blanco
 * - Carrusel de videos con placeholders
 * - Indicadores de paginación (dots)
 * - Animación smooth al entrar
 */
export default function CollaborationsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    if (carouselRef.current) {
      const slides = carouselRef.current.children;
      if (slides[index]) {
        const slide = slides[index] as HTMLElement;
        const slideLeft = slide.offsetLeft;
        carouselRef.current.scrollTo({
          left: slideLeft,
          behavior: "smooth",
        });
      }
    }
  };

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const scrollLeft = carouselRef.current.scrollLeft;
    const slides = carouselRef.current.children;
    let newSlide = 0;
    
    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i] as HTMLElement;
      if (scrollLeft >= slide.offsetLeft - slide.offsetWidth / 2) {
        newSlide = i;
      }
    }
    
    setCurrentSlide(newSlide);
  };

  return (
    <section
      id="collaborations"
      ref={sectionRef}
      className="w-full bg-[#854319] py-12 sm:py-16 md:py-20 lg:py-24"
    >
      <div
        className={`w-full flex flex-col items-center px-4 md:px-8 lg:px-12 gap-4 ${
          isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        {/* Título */}
        <h2
          className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase mb-3 sm:mb-4 md:mb-5 lg:mb-6 text-center"
          style={{ fontFamily: "Colfax, sans-serif" }}
        >
          EL SEMENTAL <br /> Y SUS COLABORACIONES
        </h2>
        {/* Carrusel de videos */}
        <div className="w-full mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <div
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onScroll={handleScroll}
            className="flex gap-3 sm:gap-4 md:gap-6 lg:gap-8 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing lg:pb-0"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {/* Falta asset para: thumbnails de videos de colaboraciones (3 videos) */}
            {[
              { id: 1, url: "#" },
              { id: 2, url: "#" },
              { id: 3, url: "#" },
            ].map((video) => (
              <div
                key={video.id}
                className="flex-shrink-0 w-[85%] sm:w-[80%] md:w-[70%] lg:w-[60%] aspect-video bg-gray-300 h-[520px] rounded-[40px] md:rounded-xl relative snap-center overflow-hidden"
                onClick={() => {
                  // URL a cambiar por el usuario
                  window.open(video.url, "_blank");
                }}
              >
                {/* Placeholder de video - Falta asset para thumbnail de video {video.id} */}
                <div className="absolute inset-0 flex items-center justify-center bg-gray-300 cursor-pointer hover:opacity-90 transition-opacity">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-white/80 flex items-center justify-center z-10">
                    <Image
                      src="/img/merry/Play.png"
                      alt="Play button"
                      width={100}
                      height={100}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>

        {/* Indicadores de paginación - clickeables */}
        <div className="flex gap-2 md:gap-3 justify-center">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-4 h-4 md:w-4 md:h-4 rounded-full transition-all ${
                currentSlide === index ? "bg-white" : "bg-white/60"
              } hover:bg-white/80 cursor-pointer`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

