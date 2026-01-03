"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const menuId = "mobile-menu-panel";
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  const NAV_ITEMS = [
    { label: "TALENTOS", targetId: "talentos", sec: "talentos" },
    { label: "SERVICIOS", targetId: "servicios", sec: "servicios" },
    { label: "NUESTROS CLIENTES", targetId: "clientes", sec: "clientes" },
    { label: "NOSOTROS", targetId: "nosotros", sec: "nosotros" },
    { label: "CONTACTO", targetId: "contacto", sec: "contacto" },
  ] as const;

  // Cerrar menú en desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const onChange = () => {
      if (mq.matches) setIsOpen(false);
    };

    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Bloquear scroll del body cuando el menú está abierto
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Navegación con scroll suave
  const scrollToSection = async (
    targetId: string,
    sec: string,
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();

    const target = document.getElementById(targetId);
    setIsOpen(false);

    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    const url = `/?sec=${encodeURIComponent(sec)}`;
    window.history.replaceState(null, "", url);

    menuButtonRef.current?.focus();
  };

  return (
    <header className="w-full bg-[#ffffff] pr-0 md:pr-20">
      <div className="flex w-full gap-32  items-center justify-between px-6  md:px-20 ">
        {/* Logos */}
        <div className="flex items-center gap-4 md:gap-5 ml-2 sm:ml-3">
          <Image
            src="/img/showmarketing/show_Black.png"
            alt="SHAW MARKETING producciones"
            width={1000}
            height={1000}
            priority
            className="w-28 h-[80px] sm:w-40 md:w-36 object-contain"
          />
        </div>

        {/* Navegación desktop */}
        <nav aria-label="Navegación principal" className="hidden xl:flex items-center gap-4 xl:gap-6 w-full justify-between">
          {NAV_ITEMS.map((item) => {
            const href = `/?sec=${item.sec}`;

            return (
              <a
                key={item.sec}
                href={href}
                onClick={(e) => scrollToSection(item.targetId, item.sec, e)}
                aria-label={`Navegar a ${item.label}`}
                className={[
                  "font-grifter uppercase tracking-tight",
                  "text-black hover:text-gray-700 transition-colors",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
                  "text-sm xl:text-base",
                ].join(" ")}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Botón hamburguesa mobile */}
        <button
          ref={menuButtonRef}
          type="button"
          aria-label="Abrir menú de navegación"
          aria-expanded={isOpen}
          aria-controls={menuId}
          onClick={() => setIsOpen((v) => !v)}
          className="xl:hidden bg-black p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
        >
          <div className="flex flex-col items-center justify-center gap-[6px]" aria-hidden="true">
            <span className="block h-[3px] w-7 rounded bg-white" />
            <span className="block h-[3px] w-7 rounded bg-white" />
            <span className="block h-[3px] w-7 rounded bg-white" />
          </div>
        </button>
      </div>

      {/* Menú mobile */}
      <div className="xl:hidden">
        <div
          className={[
            "fixed inset-0 z-40",
            "bg-black/20",
            "transition-opacity duration-200 ease-out motion-reduce:transition-none",
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
          ].join(" ")}
          aria-hidden="true"
          onClick={() => setIsOpen(false)}
        />

        <div
          id={menuId}
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          className={[
            "fixed left-0 right-0 z-50",
            "px-6 md:px-8",
            "top-[96px]",
            "transition-all duration-200 ease-out motion-reduce:transition-none",
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none",
          ].join(" ")}
        >
          <div className="w-full rounded-2xl bg-white shadow-xl ring-1 ring-black/10 overflow-hidden">
            <ul className="flex flex-col py-2">
              {NAV_ITEMS.map((item) => {
                const href = `/?sec=${item.sec}`;

                return (
                  <li key={item.sec}>
                    <a
                      href={href}
                      onClick={(e) => scrollToSection(item.targetId, item.sec, e)}
                      className={[
                        "block w-full px-5 py-3",
                        "font-grifter uppercase tracking-tight",
                        "text-black",
                        "transition-colors",
                        "hover:text-gray-700 hover:bg-gray-50",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-inset",
                      ].join(" ")}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="h-1 w-full bg-black" aria-hidden="true" />
          </div>
        </div>
      </div>
    </header>
  );
}
