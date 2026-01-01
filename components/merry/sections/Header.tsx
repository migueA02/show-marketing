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
export default function Header() {
  const menuId = "mobile-menu-panel";
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  const NAV_ITEMS = [
    { label: "Inicio", targetId: "hero", sec: "inicio" },
    { label: "Redes", targetId: "social-stats", sec: "redes-sociales" },
    { label: "Doña Merry", targetId: "about", sec: "dona-merry" },
    { label: "Colaboraciones", targetId: "collaborations", sec: "colaboraciones" },
    { label: "Aventuras", targetId: "adventures", sec: "aventuras" },
    { label: "Stickers", targetId: "stickers", sec: "stickers" },
    { label: "Chismesitos", targetId: "chismesitos", sec: "chismesitos" },
    { label: "Evento", targetId: "event", sec: "evento" },
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
   * Deep-linking inicial (?sec=)
   */
  useEffect(() => {
    const sec = new URLSearchParams(window.location.search).get("sec");
    if (!sec) return;

    const match = NAV_ITEMS.find((i) => i.sec === sec);
    if (!match) return;

    requestAnimationFrame(() => {
      document
        .getElementById(match.targetId)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
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

    document
      .getElementById(targetId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

    const url = sec === "inicio" ? "/merry" : `/merry?sec=${encodeURIComponent(sec)}`;
    window.history.replaceState(null, "", url);

    menuButtonRef.current?.focus();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white">
      <div className="flex w-full items-center justify-between px-6 py-6 md:px-8 md:py-7">
        {/* Logos */}
        <div className="flex items-center gap-4 md:gap-5 ml-2 sm:ml-3">
          <Link href="/showmarketing" aria-label="Ir a ShowMarketing">
            <Image
              src="/img/merry/show_Black.png"
              alt="ShowMarketing"
              width={1000}
              height={1000}
              priority
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain hover:opacity-80 transition-opacity"
            />
          </Link>
          <Image
            src="/img/merry/Merry.png"
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
              href={item.sec === "inicio" ? "/merry" : `/merry?sec=${item.sec}`}
              onClick={(e) => scrollToSection(item.targetId, item.sec, e)}
              className="font-black uppercase tracking-tight text-[#171717] hover:text-[#ff29ab] transition-all text-sm xl:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff29ab] focus-visible:ring-offset-2 hover:scale-105 duration-150"
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
          className="xl:hidden bg-[#ff29ab] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff29ab] focus:ring-offset-2"
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
                    href={item.sec === "inicio" ? "/merry" : `/merry?sec=${item.sec}`}
                    onClick={(e) => scrollToSection(item.targetId, item.sec, e)}
                    className="block w-full px-5 py-3 font-black uppercase tracking-tight text-[#171717] hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff29ab] focus-visible:ring-inset"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="h-1 bg-[#ff29ab]" />
          </div>
        </div>
      </div>
    </header>
  );
}
