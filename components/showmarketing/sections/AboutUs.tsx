"use client";

import { useEffect, useRef, useState } from "react";

export default function AboutUs() {
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

  return (
    <section
      ref={sectionRef}
      id="nosotros"
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
          NOSOTROS
        </h2>

        {/* Grid Misión y Visión */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Misión */}
          <div className="bg-transparent rounded-2xl p-6 md:p-8 text-center">
            <h3 className="font-grifter text-2xl md:text-3xl lg:text-4xl uppercase tracking-wide mb-4 md:mb-6 text-white pb-4 border-b border-white/30">
              MISIÓN
            </h3>
            <p className="font-helvetica text-white text-sm md:text-base lg:text-lg leading-relaxed">
              Nuestra misión es crear eventos memorables que conecten marcas con audiencias a través de la creatividad y la originalidad. Nos dedicamos a representar talentos únicos que cautivan al público con su carisma y profesionalismo.
            </p>
          </div>

          {/* Visión */}
          <div className="bg-transparent rounded-2xl p-6 md:p-8 text-center">
            <h3 className="font-grifter text-2xl md:text-3xl lg:text-4xl uppercase tracking-wide mb-4 md:mb-6 text-white pb-4 border-b border-white/30">
              VISIÓN
            </h3>
            <p className="font-helvetica text-white text-sm md:text-base lg:text-lg leading-relaxed">
              Ser líderes en la organización de eventos nacionales e internacionales, reconocidos por nuestra calidad, profesionalismo y capacidad de crear experiencias únicas que dejen una huella duradera en nuestros clientes y audiencias.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
