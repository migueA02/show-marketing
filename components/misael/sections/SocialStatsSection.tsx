"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

export default function SocialStatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const socialPlatforms = [
    {
      name: "Facebook",
      icon: (
        <FaFacebookF className="text-[#492a10] w-12 h-12 lg:w-16 lg:h-16" />
      ),
      followers: "5.5m",
    },
    {
      name: "YouTube",
      icon: <FaYoutube className="text-[#492a10] w-12 h-12 lg:w-16 lg:h-16" />,
      followers: "5.5m",
    },
    {
      name: "Instagram",
      icon: (
        <FaInstagram className="text-[#492a10] w-12 h-12 lg:w-16 lg:h-16" />
      ),
      followers: "5.5m",
    },
    {
      name: "TikTok",
      icon: <FaTiktok className="text-[#492a10] w-12 h-12 lg:w-16 lg:h-16" />,
      followers: "5.5m",
    },
  ];

  return (
    <section
      id="social-stats"
      ref={sectionRef}
      className="w-full bg-[#854319] py-6 sm:py-8 md:py-10 lg:py-16 flex justify-center items-center"
    >
      <div className="w-full px-4 md:px-8 lg:px-12 max-w-[1400px]">
        <div
          className={`flex justify-between items-center w-full gap-4 md:gap-6 lg:gap-12 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          {socialPlatforms.map((platform, index) => (
            <div
              key={platform.name}
              className="flex flex-col items-center justify-center text-center gap-2 flex-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icono de red social */}
              {platform.icon}

              {/* Número */}
              <span className="text-[#f69d28] text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-1 md:mb-2 font-acumin">
                {platform.followers}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
