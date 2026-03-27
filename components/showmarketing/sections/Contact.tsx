"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import ReCAPTCHA from "react-google-recaptcha"; // <-- Imported ReCAPTCHA
import CountryPhoneInput from "../../common/CountryPhoneInput";

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  // ReCAPTCHA reference and state
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

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
        body: JSON.stringify({ ...formData, source: 'show-marketing', captcha: captchaToken }), // <-- Added captcha token
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
            placeholder="Nombre y Apellido"
            aria-label="Nombre y Apellido"
            required
            className="w-full px-4 py-3 md:px-5 md:py-4 rounded-lg bg-white border border-black/20 focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-black text-sm md:text-base placeholder:text-black/50 font-helvetica transition-all duration-200"
          />

          {/* Apellido */}
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleInputChange}
            placeholder="Empresa (opcional)"
            aria-label="Empresa (opcional)"
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

          <CountryPhoneInput
            value={formData.telefono}
            onChange={handlePhoneChange}
            placeholder="Número de teléfono"
            required
            countryAriaLabel="Seleccionar código de país"
            phoneAriaLabel="Número de teléfono"
            containerClassName="flex gap-2"
            selectClassName="w-[38%] px-3 py-3 md:px-4 md:py-4 rounded-lg bg-white border border-black/20 focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-black text-sm md:text-base font-helvetica transition-all duration-200"
            inputClassName="flex-1 px-4 py-3 md:px-5 md:py-4 rounded-lg bg-white border border-black/20 focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-black text-sm md:text-base placeholder:text-black/50 font-helvetica transition-all duration-200"
          />

          {/* Cuéntenos su idea */}
          <textarea
            name="mensaje"
            value={formData.mensaje}
            onChange={handleInputChange}
            placeholder="Cuéntenos su idea"
            aria-label="Cuéntenos su idea"
            rows={4}
            className="w-full px-4 py-3 md:px-5 md:py-4 rounded-lg bg-white border border-black/20 focus:outline-none focus:border-black focus:ring-1 focus:ring-black text-black text-sm md:text-base placeholder:text-black/50 font-helvetica resize-none transition-all duration-200"
          />

          {/* reCAPTCHA Component */}
          <div className="flex justify-center w-full">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6Lc5_4ksAAAAAOOPq5UVYpPa7ns7ua7J_Om_6fkQ"}
              onChange={handleCaptchaChange}
              theme="dark" // Added dark theme to match the black background
            />
          </div>

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