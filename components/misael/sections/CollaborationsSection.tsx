"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CollaborationsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Videos de colaboraciones de Misael Ramírez
   * Todos los videos ahora en YouTube
   * format: "vertical" para reels/shorts, "horizontal" para videos normales
   */
  const videos = [
    { id: 1, url: "https://youtu.be/fESh4_OCAVM", type: "youtube", title: "PURDY", format: "horizontal" },
    { id: 2, url: "https://youtu.be/wU1YEvQXkpY", type: "youtube", title: "QU", format: "horizontal" },
    { id: 3, url: "https://www.youtube.com/watch?v=LPNZvd3us7s", type: "youtube", title: "Jorge Lozano", format: "horizontal" },
    { id: 4, url: "https://youtu.be/xqIP9_mfJZM", type: "youtube", title: "TRAA Repuestos", format: "horizontal" },
    { id: 5, url: "https://www.youtube.com/watch?v=Wq6uX4odnEU", type: "youtube", title: "Bomberos", format: "horizontal" },
    { id: 6, url: "https://youtu.be/y-IpAUbpixA", type: "youtube", title: "CAT", format: "horizontal" },
    { id: 7, url: "https://youtu.be/mosDlizl_VQ", type: "youtube", title: "Monge", format: "horizontal" },
    { id: 8, url: "https://youtube.com/shorts/NRZDQ9eQuUY", type: "youtube", title: "MaxiPali", format: "vertical" },
    { id: 9, url: "https://youtube.com/shorts/CK6ZxFTxff4", type: "youtube", title: "MAXUS", format: "vertical" },
    { id: 10, url: "https://youtube.com/shorts/e3ilF_ZwGYY", type: "youtube", title: "INTRADE", format: "vertical" },
    { id: 11, url: "https://youtube.com/shorts/tq7-aW0O_bk", type: "youtube", title: "Tequila Jarana", format: "vertical" },
    { id: 12, url: "https://youtube.com/shorts/j9SigHSwLZE", type: "youtube", title: "Economy Rent a Car", format: "vertical" },
  ];

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

  const goToSlide = (index: number) => {
    if (!carouselRef.current || isScrollingRef.current) return;
    
    isScrollingRef.current = true;
    setCurrentSlide(index);
    
    const carousel = carouselRef.current;
    const slide = carousel.children[index] as HTMLElement;
    
    if (slide) {
      const scrollLeft = slide.offsetLeft - (carousel.offsetWidth - slide.offsetWidth) / 2;
      carousel.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: "smooth",
      });
    }

    // Reset scrolling flag after animation
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 600);
  };

  /**
   * Navega al siguiente video en el carrusel
   */
  const nextVideo = () => {
    const nextIndex = currentSlide < videos.length - 1 ? currentSlide + 1 : 0;
    goToSlide(nextIndex);
  };

  /**
   * Navega al video anterior en el carrusel
   */
  const prevVideo = () => {
    const prevIndex = currentSlide > 0 ? currentSlide - 1 : videos.length - 1;
    goToSlide(prevIndex);
  };

  const handleScroll = () => {
    if (!carouselRef.current || isScrollingRef.current) return;
    
    const carousel = carouselRef.current;
    const scrollLeft = carousel.scrollLeft;
    const carouselCenter = scrollLeft + carousel.offsetWidth / 2;
    
    let closestIndex = 0;
    let closestDistance = Infinity;

    for (let i = 0; i < videos.length; i++) {
      const slide = carousel.children[i] as HTMLElement;
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(carouselCenter - slideCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    }

    if (closestIndex !== currentSlide) {
      setCurrentSlide(closestIndex);
    }
  };

  return (
    <section
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
        <div className="w-full mb-6 sm:mb-8 md:mb-10 lg:mb-12 relative">
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
            style={{ 
              scrollbarWidth: "none", 
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch"
            }}
          >
            {videos.map((video) => {
              /**
               * Convierte URL de YouTube a formato embed
               * Maneja videos normales, youtu.be y shorts
               */
              const getYouTubeEmbedUrl = (url: string): string => {
                // Extrae el ID del video de diferentes formatos de YouTube
                let videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s?]+)/)?.[1];
                
                // Si no encuentra el ID, intenta con formato shorts
                if (!videoId) {
                  videoId = url.match(/youtube\.com\/shorts\/([^&\s?]+)/)?.[1];
                }
                
                return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
              };

              /**
               * Frame unificado para todos los videos
               * Usa aspect ratio en lugar de altura fija para eliminar espacio gris
               * Ancho controlado por vw + min/max
               */
              const frameWidth = video.format === "vertical"
                ? "w-[62vw] max-w-[280px] min-w-[220px] lg:max-w-[320px]"
                : "w-[84vw] max-w-[420px] min-w-[320px] lg:max-w-[760px]";

              const frameAspect = video.format === "vertical"
                ? "aspect-[9/16]"
                : "aspect-video";

              const frameClass = `${frameWidth} ${frameAspect}`;

              /*
               * Renderiza iframe de YouTube
               */
              return (
                <div
                  key={video.id}
                  className={`flex-shrink-0 rounded-xl overflow-hidden bg-black/10 ${frameClass}`}
                >
                  <iframe
                    src={getYouTubeEmbedUrl(video.url)}
                    title={video.title || `Video ${video.id}`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevVideo}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/50 hover:bg-white/70 rounded-full flex items-center justify-center text-[#854319] transition-colors z-10"
            aria-label="Video anterior"
          >
            ‹
          </button>
          <button
            onClick={nextVideo}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/50 hover:bg-white/70 rounded-full flex items-center justify-center text-[#854319] transition-colors z-10"
            aria-label="Video siguiente"
          >
            ›
          </button>

          <div id="band"></div>
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
