// components/merry/sections/Header.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * Header Component
 *
 * Barra de navegación fija (fixed) para el one-page de Merry.
 *
 * - Siempre visible arriba (position: fixed)
 * - Navegación por scroll suave
 * - Deep-linking con query string (?sec=)
 * - Menú mobile accesible con overlay
 */
export default function Navbar() {
  const menuId = "mobile-menu-panel";
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

   const NAV_ITEMS = [
    { label: "Inicio", targetId: "hero", sec: "inicio" },
    { label: "Redes", targetId: "social-stats", sec: "redes" },
    { label: "Cerveza Semental", targetId: "beer", sec: "cerveza-semental" },
    { label: "Colaboraciones", targetId: "collaborations", sec: "colaboraciones" },
    { label: "Banda MR", targetId: "band", sec: "banda-mr" },
    { label: "Redes Sociales", targetId: "social", sec: "redes-sociales" },
    { label: "Stickers", targetId: "stickers", sec: "stickers" },
    { label: "Canal", targetId: "channel", sec: "canal" },
    { label: "Contacto", targetId: "contact", sec: "contacto" },
  ] as const;


  /**
   * Cierra el menú al pasar a desktop
   */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const onChange = () => mq.matches && setIsOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /**
   * Bloquea scroll del body cuando el menú está abierto
   */
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  /**
   * Calcula dinámicamente la altura real del header para compensar el scroll.
   * Obtiene la altura real del elemento header en lugar de usar valores fijos.
   */
  const getHeaderOffset = (): number => {
    if (typeof window === "undefined") return 120;
    
    const header = document.querySelector("header");
    if (!header) return 120;
    
    return header.offsetHeight;
  };

  /**
   * Scroll a sección con offset para compensar header fijo.
   * Calcula la posición exacta considerando la altura real del header
   * y añade un pequeño margen adicional (16px) para mejor visualización.
   */
  const scrollToSectionWithOffset = (targetId: string): void => {
    const element = document.getElementById(targetId);
    if (!element) return;

    const headerOffset = getHeaderOffset();
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset - 16;

    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: "smooth",
    });
  };

  /**
   * Deep-linking inicial (?sec=)
   */
  useEffect(() => {
    const sec = new URLSearchParams(window.location.search).get("sec");
    if (!sec) return;

    const match = NAV_ITEMS.find((i) => i.sec === sec);
    if (!match) return;

    requestAnimationFrame(() => {
      scrollToSectionWithOffset(match.targetId);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToSection = async (
    targetId: string,
    sec: string,
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();

    setIsOpen(false);

    await new Promise<void>((r) => requestAnimationFrame(() => r()));

    scrollToSectionWithOffset(targetId);

    const url = sec === "inicio" ? "/misael" : `/misael?sec=${encodeURIComponent(sec)}`;
    window.history.replaceState(null, "", url);

    menuButtonRef.current?.focus();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-black">
      <div className="flex w-full items-center justify-between px-6 py-6 md:px-8 md:py-7">
        {/* Logos */}
        <div className="flex items-center gap-4 md:gap-5 ml-2 sm:ml-3">
          <Link href="/showmarketing" aria-label="Ir a ShowMarketing">
            <Image
              src="/img/misael/show_white.png"
              alt="ShowMarketing"
              width={1000}
              height={1000}
              priority
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain hover:opacity-80 transition-opacity"
            />
          </Link>
          <Image
            src="/img/misael/logo.png"
            alt="Doña Merry"
            width={1000}
            height={1000}
            priority
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
          />
        </div>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-4 xl:gap-6">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.sec}
              href={item.sec === "inicio" ? "/misael" : `/misael?sec=${item.sec}`}
              onClick={(e) => scrollToSection(item.targetId, item.sec, e)}
              className="font-black uppercase tracking-tight text-white hover:text-[#854319] transition-all text-sm xl:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-[#854319] focus-visible:ring-offset-2 hover:scale-105 duration-150"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Hamburger */}
        <button
          ref={menuButtonRef}
          aria-expanded={isOpen}
          aria-controls={menuId}
          onClick={() => setIsOpen((v) => !v)}
          className="xl:hidden bg-[#854319] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#854319] focus:ring-offset-2"
        >
          <span className="sr-only">Abrir menú</span>
          <div className="flex flex-col gap-[6px]">
            <span className="h-[3px] w-7 bg-white rounded" />
            <span className="h-[3px] w-7 bg-white rounded" />
            <span className="h-[3px] w-7 bg-white rounded" />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div className="xl:hidden">
        <div
          className={`fixed inset-0 z-40 transition-opacity ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsOpen(false)}
        />

        <div
          id={menuId}
          role="dialog"
          aria-modal="true"
          className={`fixed left-0 right-0 top-[110px] z-50 transition-all ${
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="bg-white rounded-b-2xl shadow-xl overflow-hidden">
            <ul className="flex flex-col py-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.sec}>
                  <a
                    href={item.sec === "inicio" ? "/misael" : `/misael?sec=${item.sec}`}
                    onClick={(e) => scrollToSection(item.targetId, item.sec, e)}
                    className="block w-full px-5 py-3 font-black uppercase tracking-tight text-[#171717] hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#854319] focus-visible:ring-inset"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="h-1 bg-black" />
          </div>
        </div>
      </div>
    </header>
  );
}
