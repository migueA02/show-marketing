"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";

export default function MediaCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Disconnect observer after first intersection to reduce work
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Disconnect after first intersection to prevent repeated callbacks
          if (observerRef.current && sectionRef.current) {
            observerRef.current.unobserve(sectionRef.current);
            observerRef.current.disconnect();
            observerRef.current = null;
          }
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current = observer;

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  /**
   * Convierte URL de YouTube a formato embed
   */
  const getYouTubeEmbedUrl = (url: string): string => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^?&\s]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  /**
   * Convierte URL de Facebook a formato embed
   */
  const getFacebookEmbedUrl = (url: string): string => {
    const encodedUrl = encodeURIComponent(url);
    return `https://www.facebook.com/plugins/video.php?href=${encodedUrl}&show_text=false&width=476`;
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
      }
    ],
    []
  );

  // Use useCallback to stabilize handlers and prevent re-renders
  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-black py-16 md:py-24"
      style={{ contain: "layout paint style", contentVisibility: "auto" }}
    >
      <div
        className={`max-w-6xl mx-auto px-4 ${
          isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        {/* Carrusel */}
        <div className="relative">
          {/* Slides */}
          <div className="relative w-full aspect-video md:aspect-[16/9] rounded-2xl overflow-hidden">
            {slides.map((slide, index) => {
              const embedSrc = slide.type === "youtube"
                ? getYouTubeEmbedUrl(slide.url!)
                : getFacebookEmbedUrl(slide.url!);

              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <iframe
                    src={embedSrc}
                    title={slide.title || `Video ${slide.id}`}
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
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors z-10"
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors z-10"
            aria-label="Next slide"
          >
            ›
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all ripple-dot ${
                currentSlide === index
                  ? "w-3 h-3 bg-white"
                  : "w-2 h-2 bg-white/40 hover:bg-white/60"
              } rounded-full`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
