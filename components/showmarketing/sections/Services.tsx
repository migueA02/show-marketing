"use client";

import { useEffect, useRef, useState, useMemo, memo } from "react";
import Image from "next/image";

// Memoized Service Item to prevent re-renders
const ServiceItem = memo(function ServiceItem({
  service,
  index,
}: {
  service: {
    name: string;
    icon: string;
    displayText: string | { firstLine: string; secondLine: string };
  };
  index: number;
}) {
  return (
    <div
      className="flex flex-col items-center motion-lift"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 mx-auto mb-4 rounded-full flex items-center justify-center border-2 border-white bg-transparent">
        <Image
          src={service.icon}
          alt={service.name}
          width={60}
          height={60}
          className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain filter brightness-0 invert"
        />
      </div>
      <p className="font-helvetica text-white text-center text-sm md:text-base leading-tight">
        {typeof service.displayText === "string" ? (
          service.displayText
        ) : (
          <>
            <span className="block">{service.displayText.firstLine}</span>
            <span className="block">{service.displayText.secondLine}</span>
          </>
        )}
      </p>
    </div>
  );
});

export default function Services() {
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

  // Memoize services with pre-computed text splitting to avoid string operations in render
  const services = useMemo(() => {
    const rawServices = [
      { name: "Shows en vivo", icon: "/img/showmarketing/En vivo.png" },
      { name: "Shows temáticos", icon: "/img/showmarketing/Shows.png" },
      { name: "Bodas", icon: "/img/showmarketing/Bodas.png" },
      { name: "Jingles", icon: "/img/showmarketing/Jingles.png" },
      { name: "Redes Sociales", icon: "/img/showmarketing/Redes.png" },
      { name: "Campañas de publicidad", icon: "/img/showmarketing/Campañas.png" },
      { name: "Conferencias", icon: "/img/showmarketing/Conferencias.png" },
      { name: "Animación", icon: "/img/showmarketing/Animacion.png" },
    ];

    return rawServices.map((service) => {
      const words = service.name.split(" ");
      const displayText =
        words.length > 2
          ? {
              firstLine: words.slice(0, Math.ceil(words.length / 2)).join(" "),
              secondLine: words.slice(Math.ceil(words.length / 2)).join(" "),
            }
          : service.name;

      return {
        ...service,
        displayText,
      };
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="w-full bg-black py-16 md:py-24"
      style={{ contain: "layout paint style", contentVisibility: "auto" }}
    >
      <div
        className={`max-w-6xl mx-auto px-4 ${
          isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        {/* Título */}
        <h2 className="font-grifter text-5xl md:text-6xl lg:text-7xl text-center uppercase tracking-wide mb-12 md:mb-16 text-white">
          SERVICIOS
        </h2>

        {/* Grid de Servicios - 2 columnas en móvil, 4 en desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 max-w-5xl mx-auto">
          {/* Todos los servicios */}
          {services.map((service, index) => (
            <ServiceItem key={service.name} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
