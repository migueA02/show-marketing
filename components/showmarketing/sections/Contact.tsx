"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import Image from "next/image";

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
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
        body: JSON.stringify({ ...formData, source: 'show-marketing' }),
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
      ref={sectionRef}
      id="contacto"
      className="w-full bg-black py-16 md:py-24"
      style={{ contain: "layout paint style", contentVisibility: "auto" }}
    >
      <div
        className={`w-full max-w-6xl mx-auto flex flex-col items-center px-4 md:px-8 ${
          isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        {/* Título */}
        <h2 className="font-grifter text-5xl md:text-6xl lg:text-7xl uppercase mb-12 md:mb-16 text-white text-center">
          CONTACTO
        </h2>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md md:max-w-lg space-y-4 md:space-y-5"
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
            className="w-full px-4 py-3 md:px-5 md:py-4 rounded-lg bg-white border border-black/20 focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-black text-sm md:text-base placeholder:text-black/50 font-helvetica transition-all duration-200"
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
            className="w-full px-4 py-3 md:px-5 md:py-4 rounded-lg bg-white border border-black/20 focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-black text-sm md:text-base placeholder:text-black/50 font-helvetica transition-all duration-200"
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
            className="w-full px-4 py-3 md:px-5 md:py-4 rounded-lg bg-white border border-black/20 focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-black text-sm md:text-base placeholder:text-black/50 font-helvetica transition-all duration-200"
          />

          {/* Teléfono con bandera de Costa Rica */}
          <div className="relative">
            <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-10">
              <Image
                src="/img/showmarketing/Costa Rica.png"
                alt="Bandera de Costa Rica"
                width={24}
                height={18}
                className="w-6 md:w-7 object-contain"
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
              className="w-full pl-12 md:pl-14 pr-4 py-3 md:px-5 md:py-4 rounded-lg bg-white border border-black/20 focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-black text-sm md:text-base placeholder:text-black/50 font-helvetica transition-all duration-200"
            />
          </div>

          {/* Información adicional */}
          <textarea
            name="mensaje"
            value={formData.mensaje}
            onChange={handleInputChange}
            placeholder="Información adicional"
            aria-label="Comentarios o información adicional"
            rows={4}
            className="w-full px-4 py-3 md:px-5 md:py-4 rounded-lg bg-white border border-black/20 focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-black text-sm md:text-base placeholder:text-black/50 font-helvetica resize-none transition-all duration-200"
          />

          {/* Mensajes de éxito/error */}
          {submitMessage.type && (
            <div
              className={`w-full px-4 py-3 rounded-lg text-sm md:text-base text-center font-helvetica border-2 ${
                submitMessage.type === "success"
                  ? "bg-white text-black border-black"
                  : "bg-black text-white border-white"
              }`}
            >
              {submitMessage.text}
            </div>
          )}

          {/* Botón Enviar */}
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-transparent border-2 border-white text-white font-helvetica px-8 py-3 md:px-10 md:py-4 rounded-lg hover:bg-white hover:text-black transition-all duration-300 text-sm md:text-base uppercase tracking-wider pulse-cta shadow-lg hover:shadow-xl ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-105"
              }`}
            >
              {isSubmitting ? "ENVIANDO..." : "ENVIAR"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
