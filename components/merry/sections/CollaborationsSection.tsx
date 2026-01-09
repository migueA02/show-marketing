"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

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

/**
 * CollaborationsSection Component
 *
 * Objetivo: Exhibir carrusel infinito de colaboraciones/videos de Doña Merry
 * con controles de navegación (dots), soporte touch/mouse drag, y loop seamless.
 *
 * Características visuales:
 * - Fondo: Morado corporativo (#7e1ad2) para continuidad de marca
 * - Títulos: Colfax Black "DOÑA MERRY" (48px-80px) + Acumin Pro subtítulo
 * - Carrusel: Videos en contenedor horizontal con snap-x snap-mandatory
 * - Item size: 85% mobile (w-[85%]), 80% tablet (w-[80%]), 70%-60% desktop
 * - Aspect ratio: aspect-video (16:9) para videos/placeholders
 * - Indicadores: 3 dots blancos, clickeables, dimmed cuando inactivo
 *
 * Estructura del carrusel:
 * - baseSlides: Array de 3 slides base con {id, url}
 * - loopSlides: Triplicación [base, base, base] para loop infinito seamless
 * - Refs: carouselRef (contenedor scroll), hasDraggedRef (flag drag detection)
 * - Estados: currentSlide (0-2), isDragging, startX, scrollLeft
 *
 * Interacciones:
 * - Mouse: handleMouseDown/handleMouseMove/handleMouseUp para drag
 * - Touch: handleTouchStart/handleTouchMove/handleTouchEnd sin preventDefault
 * - CSS touchAction: "pan-x" para permitir scroll horizontal natural
 * - Drag detection: 6px threshold para bloquear clicks tras arrastre
 * - Click delay: setTimeout 80ms antes de habilitar clicks nuevamente
 *
 * Lógica del loop infinito:
 * - handleScroll monitorea scroll position relativo a los 3 bloques
 * - Si scroll < 10% del bloque central: reposiciona a bloque central sin transición
 * - Si scroll > 290% del bloque central: reposiciona igual
 * - Actualización de currentSlide: Cálculo de slide relativo al tercio central
 * - goToSlide: Navega a slide especific con smooth scroll behavior
 *
 * Responsive:
 * - Mobile: item width 85%, gap-3, py-12, px-4
 * - Tablet (sm+): item width 80%, gap-4, py-16, px-4
 * - Desktop (md+): item width 70%, gap-6, py-20, px-8
 * - Large (lg+): item width 60%, gap-8, py-24, px-12, pb-0 (mobile pb-4)
 *
 * Accesibilidad:
 * - Alt text en botones de navegación: "Ir a slide {index+1}"
 * - aria-label en indicators (ARIA navigation)
 * - Cursor grab/grabbing para indicar draggability
 * - Focus ring 2px en buttons
 * - Semántica h2 para título principal
 * - Apertura de links en nueva ventana (window.open "_blank")
 *
 * Notas de optimización:
 * - scrollbarWidth: none y msOverflowStyle: none ocultan scrollbar
 * - WebkitOverflowScrolling: touch para inercial smooth en iOS
 * - Images (Play button) con width/height precisos
 * - motion-lift en items para efecto visual hover
 * - ripple-dot en indicators para feedback visual
 */
export default function CollaborationsSection() {
  /**
   * Slides base; se triplican para lograr bucle continuo.
   * URLs de los videos de colaboraciones de Doña Merry
   * Incluye YouTube, Facebook e Instagram
   * format: "vertical" para reels/shorts, "horizontal" para videos normales
   */
  const baseSlides = [
    //{ id: 1, url: "https://www.facebook.com/McDonaldsCostaRica/videos/974803979895477", type: "facebook", title: "McDonald's", format: "horizontal" },
    { id: 2, url: "https://www.youtube.com/watch?v=IzapTews1x0", type: "youtube", title: "Tío Pelón", format: "horizontal" },
    { id: 3, url: "https://www.facebook.com/reel/210804173163897", type: "facebook", title: "Tío Pelón", format: "vertical" },
    { id: 4, url: "https://www.facebook.com/reel/780605416996943", type: "facebook", title: "Economy Rent a Car", format: "vertical" },
    { id: 5, url: "https://www.facebook.com/reel/669878861876447", type: "facebook", title: "Carrera Avon", format: "vertical" },
    { id: 6, url: "https://www.youtube.com/watch?v=c_YGWZAKIqw", type: "youtube", title: "Malla en Bolsa", format: "horizontal" },
    { id: 7, url: "https://www.facebook.com/reel/934124890994718", type: "facebook", title: "Mercado de las Telas", format: "vertical" },
    { id: 8, url: "https://www.facebook.com/reel/883775509596411", type: "facebook", title: "Foton", format: "vertical" },
    { id: 9, url: "https://www.facebook.com/reel/361891106370894", type: "facebook", title: "Dr Bolaños", format: "vertical" },
    { id: 10, url: "https://www.facebook.com/reel/2513600912361504", type: "facebook", title: "Electrolit", format: "vertical" },
    { id: 11, url: "https://www.facebook.com/reel/1571070084264978", type: "facebook", title: "CR Eléctricos", format: "vertical" },
    { id: 12, url: "https://www.youtube.com/shorts/JtyUJ1KapRA", type: "youtube", title: "Fibra en Casa", format: "vertical" },
  ];
  const loopSlides = [...baseSlides, ...baseSlides, ...baseSlides];
  const loopSegmentLength = baseSlides.length;

  /**
   * Controla la animación de entrada y la visibilidad del bloque en viewport.
   */
  const [isVisible, setIsVisible] = useState(false);
  /**
   * Índice del slide activo (sincronizado con los dots y el scroll snap).
   */
  const [currentSlide, setCurrentSlide] = useState(0);
  /**
   * Flag para saber si hay gesto de arrastre activo (mouse o touch).
   */
  const [isDragging, setIsDragging] = useState(false);
  /**
   * Punto inicial del gesto para calcular desplazamiento relativo.
   */
  const [startX, setStartX] = useState(0);
  /**
   * scrollLeft capturado al inicio del gesto para aplicar delta.
   */
  const [scrollLeft, setScrollLeft] = useState(0);
  /**
   * Referencia al section para observar entrada a viewport.
   */
  const sectionRef = useRef<HTMLElement>(null);
  /**
   * Ref del contenedor horizontal para controlar scroll y medidas.
   */
  const carouselRef = useRef<HTMLDivElement>(null);
  /**
   * Flag mutable para bloquear clicks cuando hubo arrastre real.
   */
  const hasDraggedRef = useRef(false);

  useEffect(() => {
    // Observa cuando la sección entra al viewport para disparar animación.
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

  useEffect(() => {
    // Cargar script de Instagram embeds solo si no existe
    let script: HTMLScriptElement | null = document.querySelector('script[src="//www.instagram.com/embed.js"]');
    
    if (!script) {
      script = document.createElement('script');
      script.src = '//www.instagram.com/embed.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    // Función para procesar embeds
    const processEmbeds = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      } else {
        // Si el script aún no está listo, intentar de nuevo después de un breve delay
        setTimeout(processEmbeds, 100);
      }
    };

    // Procesar embeds después de que el script se carga
    if (script) {
      if (window.instgrm) {
        // Si ya está cargado, procesar inmediatamente
        processEmbeds();
      } else {
        script.onload = processEmbeds;
      }
    }

    // También procesar después de un breve delay para asegurar que el DOM esté listo
    const timeoutId = setTimeout(processEmbeds, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    // Posiciona inicialmente en el bloque central para permitir desplazamiento infinito.
    if (!carouselRef.current) return;
    const slides = carouselRef.current.children;
    const middleIndex = loopSegmentLength;
    const middleSlide = slides[middleIndex] as HTMLElement | undefined;
    if (middleSlide) {
      carouselRef.current.scrollTo({ left: middleSlide.offsetLeft, behavior: "auto" });
    }

    // Procesar embeds de Instagram después de que el carrusel se inicialice
    const processEmbeds = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };

    // Procesar después de un breve delay para asegurar que el DOM esté listo
    const timeoutId = setTimeout(processEmbeds, 300);
    return () => clearTimeout(timeoutId);
  }, [loopSegmentLength]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    // Inicia gesto de arrastre con mouse; captura posición inicial y scroll base.
    setIsDragging(true);
    hasDraggedRef.current = false;
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    // Calcula desplazamiento horizontal relativo al inicio del gesto.
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    if (Math.abs(x - startX) > 6) {
      hasDraggedRef.current = true;
    }
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    // Termina gesto y libera bloqueo de click tras un breve delay.
    setIsDragging(false);
    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 80);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!carouselRef.current) return;
    // Inicia gesto táctil; se resetea el flag de arrastre.
    setIsDragging(true);
    hasDraggedRef.current = false;
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    // CSS touch-action: none se encarga de prevenir el scroll vertical.
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    if (Math.abs(x - startX) > 6) {
      hasDraggedRef.current = true;
    }
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    // Libera gesto táctil y re-habilita clicks tras un breve timeout.
    setIsDragging(false);
    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 80);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    if (carouselRef.current) {
      // Apunta al bloque central para evitar saltos visibles en el loop.
      const slides = carouselRef.current.children;
      const targetIndex = index + loopSegmentLength;
      const targetSlide = slides[targetIndex] as HTMLElement | undefined;
      if (targetSlide) {
        carouselRef.current.scrollTo({
          left: targetSlide.offsetLeft,
          behavior: "smooth",
        });
      }
    }
  };

  /**
   * Navega al siguiente video en el carrusel
   */
  const nextVideo = () => {
    const nextIndex = (currentSlide + 1) % loopSegmentLength;
    goToSlide(nextIndex);
  };

  /**
   * Navega al video anterior en el carrusel
   */
  const prevVideo = () => {
    const prevIndex = (currentSlide - 1 + loopSegmentLength) % loopSegmentLength;
    goToSlide(prevIndex);
  };

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const totalWidth = container.scrollWidth;
    const third = totalWidth / 3;
    const scrollLeft = container.scrollLeft;

    // Reenrutar cuando se sale del bloque central (loop infinito)
    if (scrollLeft < third * 0.1) {
      container.scrollTo({ left: scrollLeft + third, behavior: "auto" });
      return;
    }
    if (scrollLeft > third * 2.9) {
      container.scrollTo({ left: scrollLeft - third, behavior: "auto" });
      return;
    }

    // Cálculo del slide activo relativo al bloque central
    const perSlide = third / loopSegmentLength;
    const relative = scrollLeft - third;
    const newSlide = Math.round(relative / perSlide);
    setCurrentSlide((newSlide % loopSegmentLength + loopSegmentLength) % loopSegmentLength);
  };

  return (
    <section
      id="collaborations"
      ref={sectionRef}
      className="w-full bg-[#7E1AD2] py-12 sm:py-16 md:py-20 lg:py-24"
    >
      <div
        className={`w-full max-w-[1200px] mx-auto flex flex-col items-center px-4 md:px-8 lg:px-12 ${
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
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch",
              touchAction: "pan-x",
            }}
          >
            {loopSlides.map((video, idx) => {
              /**
               * Convierte URL de YouTube a formato embed
               */
              const getYouTubeEmbedUrl = (url: string): string => {
                // Manejar shorts y videos normales
                const shortsMatch = url.match(/youtube\.com\/shorts\/([^?&\s]+)/);
                if (shortsMatch) {
                  return `https://www.youtube.com/embed/${shortsMatch[1]}`;
                }
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
                    key={`${video.id}-${idx}`}
                    className={`flex-shrink-0 snap-center motion-lift rounded-xl overflow-hidden bg-black/10 ${frameClass}`}
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
              const embedSrc = video.type === "youtube" 
                ? getYouTubeEmbedUrl(video.url)
                : getFacebookEmbedUrl(video.url);

              return (
                <div
                  key={`${video.id}-${idx}`}
                  className={`flex-shrink-0 snap-center motion-lift rounded-xl overflow-hidden bg-black/10 ${frameClass}`}
                >
                  <iframe
                    src={embedSrc}
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
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/50 hover:bg-white/70 rounded-full flex items-center justify-center text-[#7E1AD2] transition-colors z-10"
            aria-label="Video anterior"
          >
            ‹
          </button>
          <button
            onClick={nextVideo}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/50 hover:bg-white/70 rounded-full flex items-center justify-center text-[#7E1AD2] transition-colors z-10"
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

        {/* Indicadores de paginación - clickeables */}
        <div className="flex gap-2 md:gap-3 justify-center flex-wrap">
          {baseSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-opacity ripple-dot ${
                currentSlide === index ? "bg-white" : "bg-white/60"
              } hover:opacity-80 cursor-pointer`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

