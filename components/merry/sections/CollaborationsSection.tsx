"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * CollaborationsSection Component
 * Carrusel de colaboraciones de Doña Merry optimizado sin bugs
 */
export default function CollaborationsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [arrowTop, setArrowTop] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Videos de colaboraciones de Doña Merry
   * Todos los videos ahora en YouTube
   */
  const videos = [
    { id: 1, url: "https://youtu.be/fQpNLEu5CSk", type: "youtube", title: "McDonald's", format: "horizontal" },
    { id: 2, url: "https://youtu.be/y7hr8IXkyeA", type: "youtube", title: "Tío Pelón", format: "horizontal" },
    { id: 3, url: "https://youtu.be/YBSxyvy7l2s", type: "youtube", title: "Economy Rent a Car", format: "horizontal" },
    { id: 4, url: "https://youtu.be/RSfWK1zUQTY", type: "youtube", title: "Carrera Avon", format: "horizontal" },
    { id: 5, url: "https://youtu.be/dtg5J2Mamf8", type: "youtube", title: "Mercado de las Telas", format: "horizontal" },
    { id: 6, url: "https://youtu.be/1yOGG6qL8sA", type: "youtube", title: "Foton", format: "horizontal" },
    { id: 7, url: "https://youtu.be/ujl2fzC6nls", type: "youtube", title: "Dr Bolaños", format: "horizontal" },
    { id: 8, url: "https://youtu.be/OhOhdQ7nzak", type: "youtube", title: "Electrolit", format: "horizontal" },
    { id: 9, url: "https://youtube.com/shorts/cQP9CWKXslM", type: "youtube", title: "CR Eléctricos", format: "vertical" },
    { id: 10, url: "https://youtube.com/shorts/iQiJmIr0Grw", type: "youtube", title: "Fibra en Casa", format: "vertical" },
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

  useEffect(() => {
    const updateArrowPosition = () => {
      if (!carouselRef.current) return;
      const slide = carouselRef.current.children[currentSlide] as HTMLElement;
      if (!slide) return;
      setArrowTop(slide.offsetTop + slide.offsetHeight / 2);
    };

    updateArrowPosition();
    window.addEventListener("resize", updateArrowPosition);
    return () => window.removeEventListener("resize", updateArrowPosition);
  }, [currentSlide]);

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

  const nextVideo = () => {
    const nextIndex = currentSlide < videos.length - 1 ? currentSlide + 1 : 0;
    goToSlide(nextIndex);
  };

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
      id="collaborations"
      ref={sectionRef}
      className="w-full bg-[#7E1AD2] py-10 flex justify-center items-center"
    >
      <div
        className={`w-full flex flex-col items-center px-4 md:px-8 lg:px-12 gap-6 max-w-[1400px] ${
          isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        {/* Título */}
        <h2
          className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase mb-0 text-center leading-none"
          style={{ fontFamily: "Colfax, sans-serif" }}
        >
          DOÑA MERRY
        </h2>

        {/* Subtítulo */}
        <p className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-semibold uppercase tracking-wide mb-8 sm:mb-10 md:mb-12 lg:mb-14 text-center leading-tight" style={{ fontFamily: "Acumin Pro, sans-serif", fontWeight: 600 }}>
          HA COLABORADO CON RECONOCIDAS MARCAS
        </p>

        {/* Carrusel de videos */}
        <div className="w-full mb-6 sm:mb-8 md:mb-10 lg:mb-12 relative">
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex items-center gap-3 sm:gap-4 lg:gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth snap-x snap-mandatory"
            style={{ 
              scrollbarWidth: "none", 
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
              paddingLeft: "max(1rem, env(safe-area-inset-left))",
              paddingRight: "max(1rem, env(safe-area-inset-right))",
              scrollPaddingLeft: "max(1rem, env(safe-area-inset-left))",
              scrollPaddingRight: "max(1rem, env(safe-area-inset-right))"
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
               * Controlado por altura responsiva en lugar de ancho para asegurar
               * que verticales y horizontales compartan la misma línea visual.
               */
              const frameHeight = "h-[220px] sm:h-[280px] md:h-[360px] lg:h-[450px]";

              const frameAspect = video.format === "vertical"
                ? "aspect-[9/16]"
                : "aspect-video";

              const frameClass = `${frameHeight} ${frameAspect}`;

              return (
                <div
                  key={video.id}
                  className={`flex-shrink-0 snap-center rounded-xl overflow-hidden bg-black/10 ${frameClass}`}
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
            className="absolute left-4 w-10 h-10 md:w-12 md:h-12 bg-white/50 hover:bg-white/70 rounded-full flex items-center justify-center text-[#7E1AD2] transition-colors z-10 text-2xl font-bold"
            style={{ top: arrowTop ? `${arrowTop}px` : "50%", transform: "translateY(-50%)" }}
            aria-label="Video anterior"
          >
            ‹
          </button>
          <button
            onClick={nextVideo}
            className="absolute right-4 w-10 h-10 md:w-12 md:h-12 bg-white/50 hover:bg-white/70 rounded-full flex items-center justify-center text-[#7E1AD2] transition-colors z-10 text-2xl font-bold"
            style={{ top: arrowTop ? `${arrowTop}px` : "50%", transform: "translateY(-50%)" }}
            aria-label="Video siguiente"
          >
            ›
          </button>

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