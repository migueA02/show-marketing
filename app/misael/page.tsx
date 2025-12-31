import React from "react";

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

const MisaelPage = () => {
  return (
    <>
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
    </>
  );
};

export default MisaelPage;
