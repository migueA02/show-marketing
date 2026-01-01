"use client";

import { useEffect, useRef, useState, useMemo, memo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

// Memoized Talent Card to prevent re-renders
const TalentCard = memo(function TalentCard({
  talent,
  index,
}: {
  talent: {
    name: string;
    logo: string;
    image: string;
    link: string;
    nameParts: { firstLine: string; secondLine: string };
  };
  index: number;
}) {
  return (
    <Link
      href={talent.link}
      className="relative group motion-lift"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Imagen del talento con logo dentro */}
      <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-4">
        <Image
          src={talent.image}
          alt={talent.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-opacity group-hover:opacity-90"
        />
        
        {/* Logo del talento dentro de la imagen, más grande y más abajo, encima del texto */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <Image
            src={talent.logo}
            alt={`${talent.name} logo`}
            width={350}
            height={140}
            className="h-28 md:h-36 lg:h-44 w-auto object-contain drop-shadow-lg"
          />
        </div>
      </div>

      {/* Nombre en dos líneas, más grande */}
      <h3 className="font-helvetica text-white text-center text-lg md:text-xl lg:text-2xl leading-tight">
        <span className="block">{talent.nameParts.firstLine}</span>
        {talent.nameParts.secondLine && <span className="block">{talent.nameParts.secondLine}</span>}
      </h3>
    </Link>
  );
});

export default function Talents() {
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

  // Memoize talents array with pre-computed name parts to avoid string splitting in render
  const talents = useMemo(
    () => [
      {
        name: "La Gran Ingeniera del Hogar",
        logo: "/img/showmarketing/doña merry logo.png",
        image: "/img/showmarketing/Img 1.png",
        link: "/merry",
        nameParts: {
          firstLine: "La Gran Ingeniera",
          secondLine: "del Hogar",
        },
      },
      {
        name: "El Semental del Humor",
        logo: "/img/showmarketing/misael logo.png",
        image: "/img/showmarketing/Img 2.png",
        link: "/misael",
        nameParts: {
          firstLine: "El Semental",
          secondLine: "del Humor",
        },
      },
    ],
    []
  );

  return (
    <section
      ref={sectionRef}
      id="talentos"
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
          TALENTOS
        </h2>

        {/* Grid de Talentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {talents.map((talent, index) => (
            <TalentCard key={talent.link} talent={talent} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
