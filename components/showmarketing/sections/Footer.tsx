"use client";

import React from "react";
import Image from "next/image";

export default function Footer() {
  const socialIcons = [
    { name: "Email", image: "/img/showmarketing/Llamada.png", url: "mailto:info@showmarketing.com" },
    { name: "Facebook", image: "/img/showmarketing/Facebook.png", url: "https://www.facebook.com/showmarketingcr" },
    { name: "YouTube", image: "/img/showmarketing/Youtube.png", url: "https://www.youtube.com/@showmarketingcr" },
    { name: "Instagram", image: "/img/showmarketing/Instagram.png", url: "https://www.instagram.com/showmarketing.cr/" },
    { name: "TikTok", image: "/img/showmarketing/Tiktok.png", url: "https://www.tiktok.com/@showmarketingcr" },
  ];

  return (
    <footer className="w-full bg-gray-200 py-6 md:py-8">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-8 gap-4 md:gap-0">
        {/* Social Media Icons */}
        <div className="flex items-center gap-4 md:gap-6">
          {socialIcons.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-opacity hover:opacity-80"
              aria-label={`Visitar ${social.name}`}
            >
              <Image
                src={social.image}
                alt={`${social.name} icon`}
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-black text-xs md:text-sm font-helvetica text-center md:text-right">
          Copyright © 2024. Shaw Marketing & Producciones. Desarrollado por Apolo, Costa Rica.
        </div>
      </div>
    </footer>
  );
}
