"use client";

import React, { useEffect, useRef, useState } from "react";

// Declaración de tipos para Instagram embeds
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

export default function CollaborationsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  /**
   * Videos de colaboraciones de Misael Ramírez
   * Incluye YouTube, Facebook e Instagram
   * format: "vertical" para reels/shorts, "horizontal" para videos normales
   */
  const videos = [
    { id: 1, url: "https://www.facebook.com/ToyotaCostaRica/videos/1625744321092517/", type: "facebook", title: "Toyota Costa Rica", format: "horizontal" },
    { id: 2, url: "https://www.youtube.com/watch?v=AVcdHEK1Pa8", type: "youtube", title: "QU", format: "horizontal" },
    { id: 3, url: "https://www.youtube.com/watch?v=LPNZvd3us7s", type: "youtube", title: "Jorge Lozano", format: "horizontal" },
    { id: 4, url: "https://www.youtube.com/watch?v=NOXUIF4AjxI", type: "youtube", title: "TRAA Repuestos", format: "horizontal" },
    { id: 5, url: "https://www.youtube.com/watch?v=Wq6uX4odnEU", type: "youtube", title: "Bomberos", format: "horizontal" },
    { id: 6, url: "https://www.facebook.com/GolloCR/videos/misael-ram%C3%ADrez-les-va-a-contar-porque-el-celular-caterpillar-es-el-semental-de-l/282745675653086/?locale=es_LA", type: "facebook", title: "CAT", format: "horizontal" },
    { id: 7, url: "https://www.instagram.com/p/DDCsLT7RpxU/", type: "instagram", title: "MaxiPali", format: "vertical" },
    { id: 8, url: "https://www.instagram.com/p/DCj-5HkCmnT/", type: "instagram", title: "MAXUS", format: "vertical" },
    { id: 9, url: "https://www.instagram.com/p/DBjjkAKRkap/", type: "instagram", title: "INTRADE", format: "vertical" },
    { id: 10, url: "https://www.instagram.com/p/C_8ZsWyB1L-/", type: "instagram", title: "MONGE", format: "vertical" },
    { id: 11, url: "https://www.instagram.com/reel/DCrmGSQhx7y/", type: "instagram", title: "Tequila Jarana", format: "vertical" },
    { id: 12, url: "https://www.facebook.com/reel/312179268287737", type: "facebook", title: "Economy Rent a Car", format: "vertical" },
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

  /**
   * Cargar script de Instagram embeds para videos de Instagram
   */
  useEffect(() => {
    const instagramVideos = videos.filter((v) => v.type === "instagram");
    if (instagramVideos.length === 0) return;

    let script: HTMLScriptElement | null = document.querySelector('script[src="//www.instagram.com/embed.js"]');
    
    if (!script) {
      script = document.createElement('script');
      script.src = '//www.instagram.com/embed.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    const processEmbeds = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      } else {
        setTimeout(processEmbeds, 100);
      }
    };

    if (script) {
      if (window.instgrm) {
        processEmbeds();
      } else {
        script.onload = processEmbeds;
      }
    }

    const timeoutId = setTimeout(processEmbeds, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    if (!carouselRef.current) return;
    const slides = carouselRef.current.children;
    if (slides[index]) {
      const slide = slides[index] as HTMLElement;
      carouselRef.current.scrollTo({
        left: slide.offsetLeft,
        behavior: "smooth",
      });
    }
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
            className="flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {videos.map((video) => {
              /**
               * Convierte URL de YouTube a formato embed
               */
              const getYouTubeEmbedUrl = (url: string): string => {
                const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)?.[1];
                return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
              };

              /**
               * Convierte URL de Facebook a formato embed
               */
              const getFacebookEmbedUrl = (url: string): string => {
                const encodedUrl = encodeURIComponent(url);
                return `https://www.facebook.com/plugins/video.php?href=${encodedUrl}&show_text=false&width=476`;
              };

              /**
               * Determina el src del iframe según el tipo de video
               */
              const getEmbedSrc = (): string => {
                if (video.type === "youtube") {
                  return getYouTubeEmbedUrl(video.url);
                } else if (video.type === "facebook") {
                  return getFacebookEmbedUrl(video.url);
                }
                return video.url;
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

              /**
               * Para Instagram, usar el sistema de embeds de Instagram
               */
              if (video.type === "instagram") {
                return (
                  <div
                    key={video.id}
                    className={`flex-shrink-0 snap-center rounded-xl overflow-hidden bg-black/10 ${frameClass}`}
                  >
                    <blockquote
                      className="instagram-media"
                      data-instgrm-permalink={video.url}
                      data-instgrm-version="14"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                );
              }

              /**
               * Para YouTube y Facebook, usar iframe
               */
              return (
                <div
                  key={video.id}
                  className={`flex-shrink-0 snap-center rounded-xl overflow-hidden bg-black/10 ${frameClass}`}
                >
                  <iframe
                    src={getEmbedSrc()}
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
