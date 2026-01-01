import React from "react";
import { Metadata } from "next";

import AboutMisaelSection from "@/components/misael/sections/AboutMisaelSection";
import BeerSection from "@/components/misael/sections/BeerSection";
import BandSection from "@/components/misael/sections/BandSection";
import SocialSection from "@/components/misael/sections/SocialSection";
import StickersSection from "@/components/misael/sections/StickersSection";
import SallionLifeSection from "@/components/misael/sections/StallionLifeSection";
import FooterSection from "@/components/misael/sections/FooterSection";
import SocialStatsSection from "@/components/misael/sections/SocialStatsSection";
import ContactSection from "@/components/misael/sections/ContactSection";
import CollaborationsSection from "@/components/misael/sections/CollaborationsSection";
import HeroSection from "@/components/misael/sections/HeroSection";
import Navbar from "@/components/misael/sections/Navbar";




export const metadata: Metadata = {
  title: "Misael Ramírez | El Semental del Humor - ShowMarketing",
  description:
    "Misael Ramírez, conocido como El Semental del Humor, te trae comedia costarricense, entretenimiento viral, shows en vivo, contenido digital y colaboraciones con marcas.",
  keywords: [
    "Misael Ramírez",
    "El Semental del Humor",
    "Comediante Costarricense",
    "Humor Costa Rica",
    "ShowMarketing",
    "Shows en Vivo",
    "Contenido Viral",
    "Entretenimiento",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://showmarketing.cr/misael",
    title: "Misael Ramírez - El Semental del Humor",
    description:
      "Comedia, entretenimiento y shows en vivo con Misael Ramírez, El Semental del Humor.",
    siteName: "ShowMarketing",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@elsementalhumor",
  },
};

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Misael Ramírez",
  alternateName: ["El Semental del Humor", "El Semental"],
  description:
    "Comediante y creador de contenido costarricense, reconocido por su estilo de humor popular y viral como El Semental del Humor.",
  image: "https://showmarketing.cr/img/misael/misael-1.png",
  url: "https://showmarketing.cr/misael",
  nationality: "Costa Rica",
  knowsLanguage: "es",
  sameAs: [
    "https://www.instagram.com/elsementalhumor",
    "https://www.tiktok.com/@elsementalhumor",
    "https://www.youtube.com/c/MisaelRam%C3%ADrezElSemental",
    "https://www.facebook.com/ElSementalDelHumor",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+506-8305-4444",
    contactType: "Booking & Customer Service",
    availableLanguage: ["Spanish", "es"],
    areaServed: "CR",
  },
  affiliation: {
    "@type": "Organization",
    name: "ShowMarketing",
    url: "https://showmarketing.cr",
  },
};

export const breadcrumbSchema = {
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
      name: "Misael Ramírez",
      item: "https://showmarketing.cr/misael",
    },
  ],
};

const MisaelPage = () => {
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
        <Navbar />
        <div className="w-full mt-[112px] md:mt-[152px]">
          <HeroSection />
          <SocialStatsSection />
          <AboutMisaelSection />
          <BeerSection />
          <CollaborationsSection />
          <BandSection />
          <SocialSection />
          <StickersSection />
          <SallionLifeSection />
          <ContactSection />
          <FooterSection />
        </div>
      </main>
    </>
  );
};

export default MisaelPage;
