"use client";

import React, { useEffect, useRef, useState, FormEvent } from "react";
import Image from "next/image";
import ReCAPTCHA from "react-google-recaptcha"; // <-- Imported ReCAPTCHA
import CountryPhoneInput from "../../common/CountryPhoneInput";

/**
 * Formulario de contacto de Doña Merry que envía los datos a /api/contact con el origen "merry".
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
  
  // ReCAPTCHA reference and state
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  // Estados del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
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

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
    if (submitMessage.type) {
      setSubmitMessage({ type: null, text: "" });
    }
  };

  const handlePhoneChange = (phone: string) => {
    setFormData((prev) => ({ ...prev, telefono: phone }));
    if (submitMessage.type) {
      setSubmitMessage({ type: null, text: "" });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitMessage({ type: null, text: "" });

    // Validación básica
    if (!formData.nombre || !formData.email || !formData.telefono) {
      setSubmitMessage({
        type: "error",
        text: "Por favor complete todos los campos requeridos",
      });
      return;
    }

    // Validación de reCAPTCHA
    if (!captchaToken) {
      setSubmitMessage({
        type: "error",
        text: "Por favor, verifica que no eres un robot.",
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
        body: JSON.stringify({ ...formData, source: 'merry', captcha: captchaToken }), // <-- Added captcha token
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
          empresa: "",
          email: "",
          telefono: "",
          mensaje: "",
        });
        // Reset reCAPTCHA on success
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
        setCaptchaToken(null);
      } else {
        setSubmitMessage({
          type: "error",
          text: data.error || "Error al enviar el mensaje. Por favor intente nuevamente.",
        });
        // Reset reCAPTCHA on error
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
        setCaptchaToken(null);
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
            placeholder="Nombre y Apellido"
            aria-label="Nombre y Apellido"
            required
            className="w-full px-4 py-3 md:px-5 md:py-4 lg:px-6 lg:py-5 rounded-lg md:rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7e1ad2] text-gray-800 text-sm md:text-base lg:text-lg placeholder:text-[#7e1ad2] font-bold"
          />

          {/* Apellido */}
          <input
            type="text"
            name="empresa"
            value={formData.empresa}
            onChange={handleInputChange}
            placeholder="Empresa (opcional)"
            aria-label="Empresa (opcional)"
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

          <CountryPhoneInput
            value={formData.telefono}
            onChange={handlePhoneChange}
            placeholder="Número de teléfono"
            required
            countryAriaLabel="Seleccionar código de país"
            phoneAriaLabel="Número de teléfono"
            containerClassName="flex gap-2"
            selectClassName="w-[40%] px-3 py-3 md:px-4 md:py-4 lg:px-5 lg:py-5 rounded-lg md:rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7e1ad2] text-gray-800 text-sm md:text-base lg:text-lg font-bold"
            inputClassName="flex-1 px-4 py-3 md:px-5 md:py-4 lg:px-6 lg:py-5 rounded-lg md:rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7e1ad2] text-gray-800 text-sm md:text-base lg:text-lg placeholder:text-[#7e1ad2] font-bold"
          />

          {/* Cuéntenos su idea */}
          <textarea
            name="mensaje"
            value={formData.mensaje}
            onChange={handleInputChange}
            placeholder="Cuéntenos su idea"
            rows={4}
            aria-label="Cuéntenos su idea"
            className="w-full px-4 py-3 md:px-5 md:py-4 lg:px-6 lg:py-5 rounded-lg md:rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7e1ad2] text-gray-800 resize-none text-sm md:text-base lg:text-lg placeholder:text-[#7e1ad2] font-bold"
          />

          {/* reCATCHA Component */}
          <div className="flex justify-center w-full">
            <ReCAPTCHA
              ref={recaptchaRef}
sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
              onChange={handleCaptchaChange}
            />
          </div>

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
                  src="/img/merry/Flecha.png"
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