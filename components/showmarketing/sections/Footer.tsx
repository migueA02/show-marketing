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

  return (
    <footer className="w-full bg-gray-200 py-6 md:py-8">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-8 gap-4 md:gap-0">
        <div className="flex items-center gap-4 md:gap-6">
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

          <span
            role="img"
            aria-label="LinkedIn (próximamente)"
            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-black opacity-90"
            title="LinkedIn próximamente"
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M8 11V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <circle cx="8" cy="8" r="1" fill="currentColor" />
              <path d="M12 16V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 13C12 11.9 12.9 11 14 11C15.1 11 16 11.9 16 13V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        {/* Copyright */}
        <div className="text-black text-xs md:text-sm font-helvetica text-center md:text-right">
          Copyright © 2024. Show Marketing & Producciones, Costa Rica.
        </div>
      </div>
    </footer>
  );
}
