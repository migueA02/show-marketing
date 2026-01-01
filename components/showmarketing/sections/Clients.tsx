"use client";

import { useEffect, useRef, useState, useMemo, memo } from "react";
import Image from "next/image";

// Memoized Client Logo to prevent re-renders
const ClientLogo = memo(function ClientLogo({
  client,
  index,
}: {
  client: { name: string; logo: string };
  index: number;
}) {
  return (
    <div
      className="aspect-square bg-transparent rounded-xl flex items-center justify-center p-4 hover:opacity-80 transition-opacity motion-lift"
      style={{ animationDelay: `${index * 30}ms` }}
    >
      <Image
        src={client.logo}
        alt={client.name}
        width={200}
        height={200}
        className="w-full h-full object-contain"
      />
    </div>
  );
});

export default function Clients() {
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

  // Memoize clients array to prevent recreation on every render
  const clients = useMemo(
    () => [
      { name: "McDonald's", logo: "/img/showmarketing/Mcdonalds logo.png" },
      { name: "Dos Pinos", logo: "/img/showmarketing/Dos pinos logo.png" },
      { name: "Toyota", logo: "/img/showmarketing/Toyota logo.png" },
      { name: "Economy", logo: "/img/showmarketing/Economy logo.png" },
      { name: "QU", logo: "/img/showmarketing/QU logo.png" },
      { name: "Ultra Klin", logo: "/img/showmarketing/Ultra logo.png" },
      { name: "Banquete", logo: "/img/showmarketing/Banquete logo.png" },
      { name: "Repretel", logo: "/img/showmarketing/Repretel logo.png" },
      { name: "AP", logo: "/img/showmarketing/AP logo.png" },
      { name: "Tío Pelón", logo: "/img/showmarketing/Tio pelon logo.png" },
    ],
    []
  );

  return (
    <section
      ref={sectionRef}
      id="clientes"
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
          NUESTROS CLIENTES
        </h2>

        {/* Grid de Logos - 5 columnas: 5 arriba, 5 abajo */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 max-w-6xl mx-auto">
          {clients.map((client, index) => (
            <ClientLogo key={client.name} client={client} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
