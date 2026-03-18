"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";

export default function MediaCarousel() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
   * Convierte URL de YouTube a formato embed
   * Maneja videos normales, youtu.be y shorts
   */
  const getYouTubeEmbedUrl = (url: string): string => {
    let videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s?]+)/)?.[1];
    if (!videoId) {
      videoId = url.match(/youtube\.com\/shorts\/([^&\s?]+)/)?.[1];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  // Memoize slides array to prevent recreation
  const slides = useMemo(
    () => [
      { 
        id: 1, 
        url: "https://www.youtube.com/watch?v=LPNZvd3us7s&t", 
        type: "youtube", 
        title: "Jorge Lozano",
        format: "horizontal"
      },
      { 
        id: 2, 
        url: "https://youtu.be/fQpNLEu5CSk", 
        type: "youtube", 
        title: "PURDY",
        format: "horizontal"
      }
    ],
    []
  );

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

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 600);
  };

  const nextSlide = useCallback(() => {
    const nextIndex = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
    goToSlide(nextIndex);
  }, [currentSlide, slides.length]);

  const prevSlide = useCallback(() => {
    const prevIndex = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
    goToSlide(prevIndex);
  }, [currentSlide, slides.length]);

  const handleScroll = () => {
    if (!carouselRef.current || isScrollingRef.current) return;
    
    const carousel = carouselRef.current;
    const scrollLeft = carousel.scrollLeft;
    const carouselCenter = scrollLeft + carousel.offsetWidth / 2;
    
    let closestIndex = 0;
    let closestDistance = Infinity;

    for (let i = 0; i < slides.length; i++) {
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
      className="w-full bg-black py-16 md:py-24"
    >
      <div
        className={`max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 ${
          isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        {/* Título */}
        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-grifter uppercase mb-8 md:mb-12 text-center">
          VIDEOS
        </h2>

        {/* Carrusel */}
        <div className="w-full mb-8 md:mb-12 relative">
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
            {slides.map((video) => {
              const frameWidth = video.format === "vertical"
                ? "w-[62vw] max-w-[280px] min-w-[220px] lg:max-w-[320px]"
                : "w-[84vw] max-w-[420px] min-w-[320px] lg:max-w-[760px]";

              const frameAspect = video.format === "vertical"
                ? "aspect-[9/16]"
                : "aspect-video";

              const frameClass = `${frameWidth} ${frameAspect}`;

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
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/50 hover:bg-white/70 rounded-full flex items-center justify-center text-black transition-colors z-10 text-2xl font-bold"
            aria-label="Video anterior"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/50 hover:bg-white/70 rounded-full flex items-center justify-center text-black transition-colors z-10 text-2xl font-bold"
            aria-label="Siguiente video"
          >
            ›
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all ${
                currentSlide === index
                  ? "w-3 h-3 bg-white"
                  : "w-2 h-2 bg-white/40 hover:bg-white/60"
              } rounded-full`}
              aria-label={`Ir al video ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
