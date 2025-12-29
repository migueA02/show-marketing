import React from "react";
import Image from "next/image";

/**
 * HeroSection Component
 * 
 * Sección principal del hero para el landing de Merry.
 * Incluye el header, texto de bienvenida, destellos y imagen principal.
 * 
 * Características:
 * - Fondo amarillo sólido #ffd44a (sin degradados)
 * - Tipografía Colfax Black, uppercase, tracking ajustado
 * - Texto rosado #ff29ab, compacto verticalmente
 * - 2 grupos de destellos: 2 arriba y 2 abajo (4 destellos totales)
 * - Imagen PNG con fondo transparente, centrada, más grande que el texto
 * - Diseño mobile-first, compacto, no se estira en desktop
 * - Un solo h1 para SEO
 * - Animación suave de entrada (fade-in + slide-up)
 */

/**
 * Componente de destello/estrella
 * Estrella blanca de 4 puntas para los destellos del hero
 */
const Sparkle = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12 2L14 8L20 10L14 12L12 18L10 12L4 10L10 8L12 2Z"
      fill="#ffffff"
    />
  </svg>
);

export default function HeroSection() {
  return (
    <section id="hero" className="w-full bg-[#ffd44a] flex flex-col relative">
      {/* Contenido principal del hero */}
      <div className="flex flex-col items-center px-4 pt-8 sm:pt-12 md:pt-16 lg:pt-20 max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
        {/* Contenedor del texto con destellos - relative exclusivo para evitar colisiones */}
        <div className="relative w-full mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          {/* Contenedor de destellos - posicionamiento absoluto, fuera del área del texto */}
          <div className="absolute inset-0 pointer-events-none overflow-visible">
            {/* Grupo de destellos arriba - 2 destellos */}
            <div className="absolute top-0 right-0 sm:top-2 sm:right-2 md:top-4 md:right-4 lg:top-6 lg:right-6">
              {/* Destello 1 arriba - pequeño */}
              <div className="relative -top-2 sm:-top-3 md:-top-4 lg:-top-5 left-2 sm:left-3 md:left-4 lg:left-5">
                <Sparkle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" />
              </div>
              {/* Destello 2 arriba - grande */}
              <div className="relative">
                <Sparkle className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 lg:w-14 lg:h-14" />
              </div>
            </div>

            {/* Grupo de destellos abajo - 2 destellos */}
            <div className="absolute bottom-0 left-0 sm:bottom-2 sm:left-2 md:bottom-4 md:left-4 lg:bottom-6 lg:left-6">
              {/* Destello 1 abajo - pequeño */}
              <div className="relative -top-2 sm:-top-3 md:-top-4 lg:-top-5 left-2 sm:left-3 md:left-4 lg:left-5">
                <Sparkle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" />
              </div>
              {/* Destello 2 abajo - grande */}
              <div className="relative">
                <Sparkle className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20" />
              </div>
            </div>
          </div>

          {/* Contenedor del texto - centrado, compacto verticalmente, con padding para evitar colisiones */}
          <div className="relative z-10 text-center px-12 sm:px-16 md:px-20 lg:px-24 py-8 sm:py-12 md:py-16 lg:py-20">
            <h1
              className="text-[#ff29ab] uppercase font-black animate-fade-in-up"
              style={{
                fontFamily: "Colfax, sans-serif",
                fontSize: "clamp(2rem, 8vw, 4.5rem)",
                letterSpacing: "-0.02em",
                lineHeight: "1.1",
              }}
            >
              BIENVENIDOS
              <br />
              CHIQUILLOS
            </h1>
          </div>
        </div>
      </div>

      {/* Imagen principal - pegada al límite inferior del landing */}
      <div className="relative z-10 w-full flex justify-center animate-fade-in-up" style={{ animationDelay: "150ms" }}>
        <Image
          src="/img/merry/Merry-landing.png"
          alt="Doña Merry - Imagen principal del hero"
          width={800}
          height={590}
          className="w-full h-auto max-w-2xl md:max-w-3xl lg:max-w-4xl object-contain"
          priority
        />
      </div>
    </section>
  );
}

