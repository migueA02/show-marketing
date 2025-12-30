import React from "react";
import type { Metadata } from "next";
import Header from "@/components/merry/sections/Header";
import HeroSection from "@/components/merry/sections/HeroSection";
import SocialStatsSection from "@/components/merry/sections/SocialStatsSection";
import AboutMerrySection from "@/components/merry/sections/AboutMerrySection";
import CollaborationsSection from "@/components/merry/sections/CollaborationsSection";
import AdventuresSection from "@/components/merry/sections/AdventuresSection";
import StickersSection from "@/components/merry/sections/StickersSection";
import ChismesitosSection from "@/components/merry/sections/ChismesitosSection";
import EventSection from "@/components/merry/sections/EventSection";
import ContactSection from "@/components/merry/sections/ContactSection";
import FooterSection from "@/components/merry/sections/FooterSection";

/**
 * Metadatos SEO para la página /merry
 * 
 * Configuración optimizada para SEO con:
 * - Título descriptivo
 * - Descripción relevante
 * - Open Graph para redes sociales
 * - Estructura semántica correcta
 */
export const metadata: Metadata = {
  title: "Doña Merry - Bienvenidos Chiquillos | ShowMarketing",
  description: "Doña Merry - La gran ingeniera del hogar. Descubre aventuras, stickers, colaboraciones y más.",
  openGraph: {
    title: "Doña Merry - Bienvenidos Chiquillos | ShowMarketing",
    description: "Doña Merry - La gran ingeniera del hogar. Descubre aventuras, stickers, colaboraciones y más.",
    type: "website",
  },
};

/**
 * MerryPage Component
 * 
 * Página principal del landing ONE PAGE para /merry.
 * 
 * Estructura completa:
 * - Header: Navegación con logos
 * - HeroSection: Sección principal con texto y imagen
 * - SocialStatsSection: Estadísticas de redes sociales
 * - AboutMerrySection: Información sobre Doña Merry
 * - CollaborationsSection: Colaboraciones con marcas
 * - AdventuresSection: Aventuras en redes sociales
 * - StickersSection: Stickers descargables
 * - ChismesitosSection: Canal de chismesitos
 * - EventSection: Contratación de eventos
 * - ContactSection: Formulario de contacto
 * - FooterSection: Footer con redes sociales
 * 
 * Características:
 * - One page design
 * - Mobile-first responsive
 * - Canvas centrado con max-width fijo
 * - SEO optimizado
 * - Accesibilidad implementada
 */
export default function MerryPage() {
  return (
    <main className="w-full min-h-screen bg-gray-50">
      {/* Header fuera del canvas para que ocupe todo el ancho */}
      <Header />
      
      {/* Canvas centrado - contenido responsive mobile-first */}
      <div className="w-full max-w-[420px] md:max-w-[768px] lg:max-w-none mx-auto overflow-hidden bg-white">
        <HeroSection />
        <SocialStatsSection />
        <AboutMerrySection />
        <CollaborationsSection />
        <AdventuresSection />
        <StickersSection />
        <ChismesitosSection />
        <EventSection />
        <ContactSection />
        <FooterSection />
      </div>
    </main>
  );
}
