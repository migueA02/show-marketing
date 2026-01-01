"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function CollaborationsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

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

  const videos = [
    { id: 1, url: "#" },
    { id: 2, url: "#" },
    { id: 3, url: "#" },
  ];

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    if (!carouselRef.current) return;
    const slides = carouselRef.current.children;
    if (slides[index]) {
      const slide = slides[index] as HTMLElement;
      carouselRef.current.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const scrollLeft = carouselRef.current.scrollLeft;
    const slides = carouselRef.current.children;
    let newSlide = 0;

    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i] as HTMLElement;
      if (scrollLeft >= slide.offsetLeft - slide.offsetWidth / 2) newSlide = i;
    }

    setCurrentSlide(newSlide);
  };

  return (
    <section
      id="collaborations"
      ref={sectionRef}
      className="w-full bg-[#854319]  py-10 flex justify-center items-center"
    >
      <div
        className={`w-full flex flex-col items-center px-4 md:px-8 lg:px-12 gap-6 max-w-[1400px] ${
          isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        {/* Título */}
        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase mb-6 text-center font-rosewood">
          EL SEMENTAL <br /> Y SUS COLABORACIONES
        </h2>

        {/* Carrusel */}
        <div className="w-full mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {videos.map((video) => (
              <div
                key={video.id}
                className="flex-shrink-0 w-[85%] h-[500px] md:h-[372px] sm:w-[50%] md:w-[55%] lg:w-[40%] aspect-video rounded-xl relative snap-center overflow-hidden bg-gray-300 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => window.open(video.url, "_blank")}
              >
                <div className="absolute  inset-0 flex items-center justify-center bg-gray-300">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-white/80 flex items-center justify-center">
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

        {/* Paginación */}
        <div className="flex gap-2 md:gap-3 justify-center">
          {videos.map((_, index) => (
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
