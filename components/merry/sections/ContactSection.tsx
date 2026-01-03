"use client";

import React, { useEffect, useRef, useState, FormEvent } from "react";
import Image from "next/image";

/**
 * ContactSection Component
 *
 * Objetivo: Capturar información de contacto de usuarios interesados mediante
 * formulario accesible con validación básica y envío a backend (a implementar).
 *
 * Características visuales:
 * - Fondo: Cyan corporativo (#67c7db) para diferenciación de secciones
 * - Título: Colfax Black en morado (#7e1ad2), tamaño responsive (48px-80px)
 * - Inputs: Blancos con border 1px gray-200, focus ring 2px #7e1ad2
 * - Placeholder: Texto morado (#7e1ad2) con font-bold para legibilidad
 * - Botón: Morado con padding clamp, icono flecha integrada, pulse-cta hover
 *
 * Estructura del formulario:
 * - Nombre (text input) - campo requerido para identificación
 * - Apellido (text input) - complemento de identificación
 * - Correo (email input) - validación HTML5 type="email"
 * - Teléfono (tel input) - con imagen bandera Costa Rica (#67c7db) precediendo
 *   → Padding-left: pl-12 para acomodar imagen (w-6/h-6)
 *   → Image estilo Costa Rica.png con height: auto
 * - Información adicional (textarea, 4 rows) - comentarios generales
 *
 * Responsive:
 * - Mobile: max-w-sm, px-4, inputs py-3, gap-4
 * - Tablet (md+): max-w-md, px-5 py-4, gap-5
 * - Desktop (lg+): max-w-lg, px-6 py-5, gap-6
 *
 * Accesibilidad:
 * - Placeholder descriptivos con texto morado (#7e1ad2)
 * - Focus ring 2px #7e1ad2 en todos los inputs
 * - Semántica form con button type="submit"
 * - Alt text "Bandera de Costa Rica" en Image
 * - Estructura de campos clara y secuencial
 *
 * Notas de desarrollo:
 * - onClick handler vacío en botón (e.preventDefault()) - implementar lógica de envío
 * - Envío a backend pendiente (API endpoint a definir)
 * - Validación client-side opcional (required attributes no incluidos)
 */
export default function ContactSection() {
  /**
   * Control de visibilidad para activar animación en viewport.
   */
  const [isVisible, setIsVisible] = useState(false);
  /**
   * Ref del section para IntersectionObserver.
   */
  const sectionRef = useRef<HTMLElement>(null);
  
  // Estados del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    mensaje: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error" | null;
    text: string;
  }>({ type: null, text: "" });

  useEffect(() => {
    // Observa entrada al viewport y habilita la animación de fade/slide.
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar mensajes al escribir
    if (submitMessage.type) {
      setSubmitMessage({ type: null, text: "" });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitMessage({ type: null, text: "" });

    // Validación básica
    if (!formData.nombre || !formData.apellido || !formData.email || !formData.telefono) {
      setSubmitMessage({
        type: "error",
        text: "Por favor complete todos los campos requeridos",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, source: 'merry' }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage({
          type: "success",
          text: data.message || "Mensaje enviado exitosamente. Nos pondremos en contacto pronto.",
        });
        // Limpiar formulario
        setFormData({
          nombre: "",
          apellido: "",
          email: "",
          telefono: "",
          mensaje: "",
        });
      } else {
        setSubmitMessage({
          type: "error",
          text: data.error || "Error al enviar el mensaje. Por favor intente nuevamente.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitMessage({
        type: "error",
        text: "Error al enviar el mensaje. Por favor intente más tarde.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full bg-[#67c7db] py-12 sm:py-16 md:py-20 lg:py-24"
    >
      <div
        className={`w-full max-w-[1200px] mx-auto flex flex-col items-center px-4 md:px-8 lg:px-12 ${
          isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        {/* Título */}
        <h2
          className="text-[#7e1ad2] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase mb-8 sm:mb-10 md:mb-12 lg:mb-14 text-center"
          style={{ fontFamily: "Colfax, sans-serif" }}
        >
          CONTACTO
        </h2>

        {/* Formulario compacto con campos básicos de contacto */}
        <form 
          onSubmit={handleSubmit}
          className="w-full max-w-sm md:max-w-md lg:max-w-lg space-y-4 md:space-y-5 lg:space-y-6 mb-8 sm:mb-10 md:mb-12 lg:mb-14"
        >
          {/* Nombre */}
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            placeholder="Nombre"
            aria-label="Nombre completo"
            required
            className="w-full px-4 py-3 md:px-5 md:py-4 lg:px-6 lg:py-5 rounded-lg md:rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7e1ad2] text-gray-800 text-sm md:text-base lg:text-lg placeholder:text-[#7e1ad2] font-bold"
          />

          {/* Apellido */}
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleInputChange}
            placeholder="Apellido"
            aria-label="Apellido"
            required
            className="w-full px-4 py-3 md:px-5 md:py-4 lg:px-6 lg:py-5 rounded-lg md:rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7e1ad2] text-gray-800 text-sm md:text-base lg:text-lg placeholder:text-[#7e1ad2] font-bold"
          />

          {/* Correo */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Correo"
            aria-label="Correo electrónico"
            required
            className="w-full px-4 py-3 md:px-5 md:py-4 lg:px-6 lg:py-5 rounded-lg md:rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7e1ad2] text-gray-800 text-sm md:text-base lg:text-lg placeholder:text-[#7e1ad2] font-bold"
          />

          {/* Teléfono con bandera de Costa Rica a la izquierda */}
          <div className="relative">
            <div className="absolute left-3 md:left-4 lg:left-5 top-1/2 -translate-y-1/2 z-10">
              <Image
                src="/img/merry/Costa Rica.png"
                alt="Bandera de Costa Rica"
                width={24}
                height={18}
                className="w-6 md:w-7 lg:w-8 object-contain"
                style={{ height: 'auto' }}
              />
            </div>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              placeholder="Número de teléfono"
              aria-label="Número de teléfono de Costa Rica"
              required
              className="w-full pl-12 md:pl-14 lg:pl-16 pr-4 py-3 md:px-5 md:py-4 lg:px-6 lg:py-5 rounded-lg md:rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7e1ad2] text-gray-800 text-sm md:text-base lg:text-lg placeholder:text-[#7e1ad2] font-bold"
            />
          </div>

          {/* Información adicional */}
          <textarea
            name="mensaje"
            value={formData.mensaje}
            onChange={handleInputChange}
            placeholder="Información adicional:"
            rows={4}
            aria-label="Información adicional o mensaje"
            className="w-full px-4 py-3 md:px-5 md:py-4 lg:px-6 lg:py-5 rounded-lg md:rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7e1ad2] text-gray-800 resize-none text-sm md:text-base lg:text-lg placeholder:text-[#7e1ad2] font-bold"
          />

          {/* Mensajes de éxito/error */}
          {submitMessage.type && (
            <div
              className={`w-full px-4 py-3 rounded-lg text-sm md:text-base text-center font-semibold ${
                submitMessage.type === "success"
                  ? "bg-[#7e1ad2] text-white"
                  : "bg-[#67c7db] text-white"
              }`}
              style={{ fontFamily: "Colfax, sans-serif" }}
            >
              {submitMessage.text}
            </div>
          )}

          {/* CTA de envío */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              aria-label="Enviar formulario de contacto a Doña Merry"
              className={`bg-[#7e1ad2] text-white px-16 sm:px-20 md:px-24 lg:px-28 py-2 sm:py-2.5 md:py-3 lg:py-3.5 rounded-lg md:rounded-xl font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase tracking-wide hover:opacity-90 transition-opacity flex items-center justify-center gap-3 md:gap-4 pulse-cta ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              style={{ fontFamily: "Colfax, sans-serif" }}
            >
              <span>{isSubmitting ? "ENVIANDO..." : "ENVIAR"}</span>
              {!isSubmitting && (
                <Image
                  src="/img/merry/flecha.png"
                  alt="Flechas"
                  width={40}
                  height={40}
                  className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain"
                />
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

