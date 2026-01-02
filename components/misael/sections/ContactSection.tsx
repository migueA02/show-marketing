"use client";

import React, { useEffect, useRef, useState, FormEvent } from "react";
import Image from "next/image";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

/**
 * ContactSection Component
 *
 * Sección de contacto con formulario.
 *
 * Características:
 * - Fondo marrón #854319
 * - Título en blanco
 * - Formulario con inputs blancos
 * - Botón blanco con texto marrón
 * - Iconos de redes sociales al final
 * - Animación smooth al entrar
 */
export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
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
        body: JSON.stringify({ ...formData, source: 'misael' }),
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
    <section id="contact" ref={sectionRef} className="w-full bg-[#854319] py-4">
      <div
        className={`w-full flex flex-col items-center px-4 md:px-8 lg:px-12 gap-2 ${
          isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        {/* Título */}
        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase  text-center font-acumin">
          CONTACTO
        </h2>

        {/* Formulario */}
        <form 
          onSubmit={handleSubmit}
          className="w-full max-w-sm md:max-w-md lg:max-w-lg space-y-4 md:space-y-5 lg:space-y-6"
        >
          {/* Nombre */}
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            placeholder="Nombre"
            aria-label="Nombre"
            required
            className="w-full px-4 py-3 md:px-5 md:py-4 lg:px-6 lg:py-5 rounded-md bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f69d28] text-gray-800 text-sm md:text-base lg:text-lg placeholder:text-[#854319]"
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
            className="w-full px-4 py-3 md:px-5 md:py-4 lg:px-6 lg:py-5 rounded-md  bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f69d28] text-gray-800 text-sm md:text-base lg:text-lg placeholder:text-[#854319]"
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
            className="w-full px-4 py-3 md:px-5 md:py-4 lg:px-6 lg:py-5 rounded-md bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f69d28] text-gray-800 text-sm md:text-base lg:text-lg placeholder:text-[#854319]"
          />

          {/* Teléfono con bandera de Costa Rica a la izquierda */}
          <div className="relative">
            <div className="absolute left-3 md:left-4 lg:left-5 top-1/2 -translate-y-1/2 z-10">
              <Image
                src="/img/merry/Costa Rica.png"
                alt="Bandera de Costa Rica"
                width={24}
                height={18}
                className="w-6 h-4 md:w-7 md:h-5 lg:w-8 lg:h-6 object-contain"
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
              className="w-full pl-12 md:pl-14 lg:pl-16 pr-4 py-3 md:px-5 md:py-4 lg:px-6 lg:py-5 rounded-md bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f69d28] text-gray-800 text-sm md:text-base lg:text-lg placeholder:text-[#854319]"
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
            className="w-full px-4 py-3 md:px-5 md:py-4 lg:px-6 lg:py-5 rounded-md bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#f69d28] text-gray-800 resize-none text-sm md:text-base lg:text-lg placeholder:text-[#854319]"
          />

          {/* Mensajes de éxito/error */}
          {submitMessage.type && (
            <div
              className={`w-full px-4 py-3 rounded-lg text-sm md:text-base text-center font-semibold ${
                submitMessage.type === "success"
                  ? "bg-[#f69d28] text-white"
                  : "bg-[#854319] text-white"
              }`}
              style={{ fontFamily: "Acumin Pro, sans-serif" }}
            >
              {submitMessage.text}
            </div>
          )}

          {/* Botón enviar */}
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-white text-[#854319] px-10 lg:px-12 py-1 font-semibold text-md lg:text-xl xl:text-2xl uppercase tracking-wide hover:opacity-90 transition-opacity flex items-center gap-1 w-fit cursor-pointer ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <p className="font-extrabold">{isSubmitting ? "ENVIANDO..." : "ENVIAR"}</p>
              {!isSubmitting && (
                <MdOutlineKeyboardDoubleArrowLeft className="text-[30px] lg:text-[36px] xl:text-[40px]" />
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
