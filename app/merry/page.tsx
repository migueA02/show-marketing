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

export const metadata: Metadata = {
  title: "Doña Merry | La Gran Ingeniera del Hogar - ShowMarketing",
  description: "Doña Merry te invita a descubrir entretenimiento, aventuras en redes sociales, stickers exclusivos, colaboraciones con marcas reconocidas y eventos inolvidables.",
  keywords: [
    "Doña Merry",
    "Ingeniera del Hogar",
    "Content Creator",
    "ShowMarketing",
    "Eventos",
    "Stickers",
    "Colaboraciones",
    "Entretenimiento Costa Rica",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://showmarketing.cr/merry",
    title: "Doña Merry - La Gran Ingeniera del Hogar",
    description: "Entretenimiento, aventuras, stickers y colaboraciones con ShowMarketing.",
    siteName: "ShowMarketing",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@merry_oficial",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Doña Merry",
  alternateName: ["La Gran Ingeniera del Hogar", "Merry Oficial"],
  description: "Content creator, entertainer y personalidad de redes sociales costarricense. Conocida como La Gran Ingeniera del Hogar.",
  image: "https://showmarketing.cr/img/merry/Merry-2.png",
  url: "https://showmarketing.cr/merry",
  nationality: "Costa Rica",
  knowsLanguage: "es",
  sameAs: [
    "https://www.instagram.com/merry_oficial",
    "https://www.tiktok.com/@merry_oficialcr",
    "https://www.youtube.com/c/MisaelRam%C3%ADrezElSemental",
    "https://www.facebook.com/FansdeMerry",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+506-8305-4444",
    contactType: "Customer Service",
    availableLanguage: ["Spanish", "es"],
    areaServed: "CR",
  },
  affiliation: {
    "@type": "Organization",
    name: "ShowMarketing",
    url: "https://showmarketing.cr",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Inicio",
      item: "https://showmarketing.cr",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Doña Merry",
      item: "https://showmarketing.cr/merry",
    },
  ],
};

export default function MerryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="w-full">
        <Header />
        <div className="w-full">
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
    </>
  );
}
