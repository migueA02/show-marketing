"use client";

import React from "react";
import Image from "next/image";

export default function Footer() {
  const contactIcons = [
    { 
      name: "Email", 
      type: "email",
      url: "mailto:info@showmarketing.com",
    },
    { 
      name: "Teléfono", 
      type: "phone",
      url: "https://wa.me/50683054444",
      image: "/img/showmarketing/Llamada.png",
    },
  ];

  const socialIcons = [
    { name: "Facebook", image: "/img/showmarketing/Facebook.png", url: "https://www.facebook.com/showmarketingcr" },
    { name: "YouTube", image: "/img/showmarketing/Youtube.png", url: "https://www.youtube.com/@showmarketingcr" },
    { name: "Instagram", image: "/img/showmarketing/Instagram.png", url: "https://www.instagram.com/showmarketing.cr/" },
    { name: "TikTok", image: "/img/showmarketing/Tiktok.png", url: "https://www.tiktok.com/@showmarketingcr" },
  ];

  return (
    <footer className="w-full bg-gray-200 py-6 md:py-8">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-8 gap-4 md:gap-0">
        {/* Contact and Social Media Icons */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Email and Phone Icons */}
          {contactIcons.map((contact) => (
            <a
              key={contact.name}
              href={contact.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-opacity hover:opacity-80 text-black"
              aria-label={contact.name === "Teléfono" ? "Contactar por WhatsApp al 83054444" : `Contactar por ${contact.name}`}
            >
              {contact.type === "email" ? (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <Image
                  src={contact.image!}
                  alt={contact.name}
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              )}
            </a>
          ))}
          
          {/* Social Media Icons */}
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
