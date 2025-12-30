// components/merry/sections/Header.tsx
"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";

/**
 * Header Component
 *
 * Barra de navegación principal para el one-page de Merry.
 *
 * Objetivos de diseño y UX:
 * - Mantener la ruta base estable (/merry) y reflejar la sección actual mediante query string
 *   (ej: /merry?sec=redes-sociales) para evitar 404 al refrescar.
 * - Permitir navegación por secciones con scroll suave (smooth) sin recargar la página.
 * - Comportamiento responsivo:
 *   - Desktop (lg+): navegación visible en línea, sin menú hamburguesa.
 *   - Mobile/Tablet: menú hamburguesa con panel desplegable y overlay.
 *
 * Reglas de implementación:
 * - Los ids en `targetId` deben existir en el DOM como <section id="..."> para que el scroll funcione.
 * - Tipografía de navegación en `font-black` para consistencia de marca.
 * - No modificar tamaños de assets (logos); únicamente se aplica un offset lateral (padding/margen).
 *
 * Accesibilidad:
 * - `aria-controls` y `aria-expanded` para comunicar estado del menú.
 * - `role="dialog"` + `aria-modal` para el panel móvil.
 * - Gestión de foco al cerrar menú (vuelve al botón hamburguesa).
 */
export default function Header() {
  /**
   * Identificador estable para relacionar el botón hamburguesa con el panel (aria-controls).
   */
  const menuId = useId();

  /**
   * Estado del panel desplegable en mobile/tablet.
   */
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Referencia al botón hamburguesa para restaurar foco tras cerrar el panel (accesibilidad).
   */
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  /**
   * Configuración de navegación.
   *
   * - `targetId`: id real del section en el DOM (debe existir).
   * - `sec`: valor canónico que se refleja en la URL como query string.
   *
   * Ejemplo:
   * - click en "Redes" -> scroll a <section id="social-stats"> y URL -> /merry?sec=redes-sociales
   */
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
   * Sincroniza el estado del menú con el breakpoint:
   * - Al pasar a desktop (lg+), se fuerza el cierre del panel para evitar estados inconsistentes.
   */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setIsOpen(false);
    };

    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /**
   * Bloquea el scroll del body cuando el panel móvil está abierto.
   * Esto evita "scroll bleed" detrás del overlay.
   */
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  /**
   * Deep-linking sin rutas adicionales:
   * - Si el usuario entra o refresca con /merry?sec=xxxx, se hace scroll suave al section equivalente.
   * - Se utiliza requestAnimationFrame para garantizar que el DOM haya renderizado secciones.
   */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sec = params.get("sec");

    if (!sec) return;

    const match = NAV_ITEMS.find((x) => x.sec === sec);
    if (!match) return;

    requestAnimationFrame(() => {
      const element = document.getElementById(match.targetId);
      element?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    // NAV_ITEMS es constante y no se incluye para evitar recalcular en runtime.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Navegación interna:
   * - Evita navegación clásica (no recarga).
   * - Cierra el panel (si aplica) antes de scrollear, para liberar el scroll del body.
   * - Ejecuta scroll suave al section.
   * - Actualiza la URL usando query string (sin romper refresh).
   */
  const scrollToSection = async (
    targetId: string,
    sec: string,
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault();

    const target = document.getElementById(targetId);

    /**
     * Se cierra el panel primero para re-habilitar el scroll del documento.
     */
    setIsOpen(false);

    /**
     * Espera un frame para permitir que el DOM aplique el cambio de overflow del body.
     */
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

    /**
     * Si el destino existe, se realiza scroll suave al inicio del section.
     * Si no existe, se mantiene la URL actualizada; esto facilita detectar ids faltantes.
     */
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    /**
     * Se mantiene /merry como ruta real y se representa la sección mediante query string
     * para evitar 404 al refrescar o compartir el enlace.
     */
    const url = sec === "inicio" ? "/merry" : `/merry?sec=${encodeURIComponent(sec)}`;
    window.history.replaceState(null, "", url);

    /**
     * Restaura foco al botón del menú (cuando existe en viewport) para accesibilidad.
     */
    menuButtonRef.current?.focus();
  };

  return (
    <header className="w-full bg-[#ffffff]">
      <div className="flex w-full items-center justify-between px-6 py-6 md:px-8 md:py-7">
        {/* Identidad de marca (logos). Se respeta tamaño; solo se aplica desplazamiento lateral. */}
        <div className="flex items-center gap-4 md:gap-5 ml-2 sm:ml-3">
          <Image
            src="/img/merry/show_Black.png"
            alt="Show Marketing logo"
            width={1000}
            height={1000}
            priority
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
          />
          <Image
            src="/img/merry/Merry.png"
            alt="Doña Merry logo"
            width={1000}
            height={1000}
            priority
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
          />
        </div>

        {/* Navegación desktop (sin menú hamburguesa). */}
        <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-4 xl:gap-6">
          {NAV_ITEMS.map((item) => {
            const href = item.sec === "inicio" ? "/merry" : `/merry?sec=${item.sec}`;

            return (
              <a
                key={item.sec}
                href={href}
                onClick={(e) => scrollToSection(item.targetId, item.sec, e)}
                className={[
                  "font-black uppercase tracking-tight",
                  "text-[#171717] hover:text-[#ff29ab] transition-colors",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff29ab] focus-visible:ring-offset-2",
                  "text-sm xl:text-base",
                ].join(" ")}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Control de navegación mobile/tablet (menú hamburguesa). */}
        <button
          ref={menuButtonRef}
          type="button"
          aria-label="Abrir menú de navegación"
          aria-expanded={isOpen}
          aria-controls={menuId}
          onClick={() => setIsOpen((v) => !v)}
          className="lg:hidden bg-[#ff29ab] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff29ab] focus:ring-offset-2"
        >
          <div className="flex flex-col items-center justify-center gap-[6px]" aria-hidden="true">
            <span className="block h-[3px] w-7 rounded bg-white" />
            <span className="block h-[3px] w-7 rounded bg-white" />
            <span className="block h-[3px] w-7 rounded bg-white" />
          </div>
        </button>
      </div>

      {/* Menú mobile/tablet: overlay + panel desplegable. */}
      <div className="lg:hidden">
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
                const href = item.sec === "inicio" ? "/merry" : `/merry?sec=${item.sec}`;

                return (
                  <li key={item.sec}>
                    <a
                      href={href}
                      onClick={(e) => scrollToSection(item.targetId, item.sec, e)}
                      className={[
                        "block w-full px-5 py-3",
                        "font-black uppercase tracking-tight",
                        "text-[#171717]",
                        "transition-opacity",
                        "hover:opacity-80",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff29ab] focus-visible:ring-inset",
                      ].join(" ")}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Barra de acento de marca para cierre visual del panel. */}
            <div className="h-1 w-full bg-[#ff29ab]" aria-hidden="true" />
          </div>
        </div>
      </div>
    </header>
  );
}
