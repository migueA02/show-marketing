import Navbar from "../components/showmarketing/sections/Navbar";
import Hero from "../components/showmarketing/sections/Hero";
import Talents from "../components/showmarketing/sections/Talents";
import Services from "../components/showmarketing/sections/Services";
import Clients from "../components/showmarketing/sections/Clients";
import AboutUs from "../components/showmarketing/sections/AboutUs";
import MediaCarousel from "../components/showmarketing/sections/MediaCarousel";
import Contact from "../components/showmarketing/sections/Contact";
import Footer from "../components/showmarketing/sections/Footer";

export default function ShowMarketingPage() {
  return (
    <main className="w-full min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Talents />
      <Services />
      <Clients />
      <AboutUs />
      <MediaCarousel />
      <Contact />
      <Footer />
    </main>
  );
}
