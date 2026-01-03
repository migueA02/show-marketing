"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

export default function StickersSection() {
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

  const stickers = [
    { alt: "Sticker ¡Que chicha!", image: "/img/misael/Sticker_1.png" },
    { alt: "Sticker Muack", image: "/img/misael/Sticker_2.png" },
    { alt: "Sticker Bendiciones", image: "/img/misael/Sticker_3.png" },
    { alt: "Sticker Yo no fui", image: "/img/misael/Sticker_4.png" },
  ];

  return (
    <section
      ref={sectionRef}
      className={`w-full bg-[#854319]  py-10 flex justify-center ${
        isVisible ? "animate-fade-in-up" : "opacity-0"
      }`}
    >
      <div className="w-full flex flex-col items-center max-w-[1200px] px-4 md:px-8 lg:px-12">
        {/* Título principal */}
        <div className="flex flex-col text-center ">
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase mb-3 font-acumin">
            Descarga los stickers del semental
          </h2>
          <h2 className="text-white text-6xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase mb-3 font-rosewood tracking-wide">
            ¡ARAAAJOO!
          </h2>
        </div>

        {/* Grid de stickers */}
         <div className="w-full grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-2 max-w-[800px] mx-auto">
          {stickers.map((sticker, index) => (
            <div
              key={index}
              className="flex items-center justify-center motion-lift"
            >
              <Image
                src={sticker.image}
                alt={sticker.alt}
                width={360}
                height={360}
                className="w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 object-contain"
                priority={index < 2}
              />
            </div>
          ))}
        </div>

        <div id="channel"></div>
        {/* Botón de descarga */}
        <button
          onClick={() => window.open("#", "_blank")}
          className="bg-white text-[#854319] px-6 sm:px-8 md:px-10 lg:px-12 py-1  rounded-xl font-semibold text-md lg:text-xl xl:text-2xl uppercase tracking-wide hover:opacity-90 transition-opacity flex items-center gap-2 md:gap-3 xl:gap-4 n w-fit cursor-pointer motion-lift"
        >
          <p className="font-extrabold">DESCÁRGALOS</p>
          <MdOutlineKeyboardDoubleArrowLeft className="text-[30px] lg:text-[36px] xl:text-[40px]" />
        </button>
      </div>
    </section>
  );
}


// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import Image from "next/image";

// /**
//  * StickersSection Component
//  *
//  * Objetivo: Exhibir stickers descargables de Doña Merry con call-to-action
//  * directo a App Store/Play Store/Web según dispositivo del usuario.
//  *
//  * Características visuales:
//  * - Fondo: Rosado vibrante (#ff29ab) para alto contraste con stickers
//  * - Títulos: Colfax Black "STICKERS" (64px-144px) + Acumin Pro "DE DOÑA MERRY"
//  * - Grid: 2 columnas (mobile), responsive gap (16px-40px) con motion-lift
//  * - Stickers: Escalables (width: w-48-80), aspect 1:1, priority load para primeros 2
//  * - Botón: Morado con icono flecha, Acumin Pro Semibold, pulse-cta en hover
//  *
//  * Estructura:
//  * - Bloque tipográfico centrado (STICKERS + DE DOÑA MERRY)
//  * - Stickers array: {alt, image} para renderizado dinámico
//  *   → Cada sticker es Image optimizada con alt text descriptivo
//  *   → Primeros 2 stickers con priority=true para carga instantánea
//  * - Botón CTA: onClick → handleStickerDownload() → redirige a tienda
//  *
//  * Responsive:
//  * - Mobile: grid-cols-2, gap-4, py-10, w-48/h-48, px-4
//  * - Tablet (sm+): gap-6, py-12, w-56/h-56, px-4
//  * - Desktop (md+): gap-8, py-14, w-72/h-72, px-8
//  * - Large (lg+): gap-10, py-16, w-80/h-80, px-12
//  *
//  * Lógica de descarga:
//  * - Detecta userAgent para identificar dispositivo
//  * - iOS: Redirecciona a Apple App Store (Stickerly app)
//  * - Android: Redirecciona a Google Play Store (Stickerly app)
//  * - Desktop/Otro: Redirecciona a sticker.ly web
//  *
//  * Accesibilidad:
//  * - Alt text descriptivo en cada sticker
//  * - Alt text en icono flecha
//  * - ARIA-label implícito en botón CTA
//  * - Focus ring 2px en botón
//  * - Semántica h2 para "STICKERS"
//  *
//  * Notas de optimización:
//  * - Images con width/height precisos evitan layout shift
//  * - Priority load para stickers 0-1 (above-the-fold)
//  * - Lazy load para stickers 2-3 (below-the-fold)
//  * - window.open("_blank") permite abrir tienda sin abandonar página
//  */
// export default function StickersSection() {
//   /**
//    * Controla la animación de entrada cuando la sección entra en viewport.
//    */
//   const [isVisible, setIsVisible] = useState(false);

//   /**
//    * Referencia al section para IntersectionObserver.
//    */
//   const sectionRef = useRef<HTMLElement>(null);

//   /**
//    * Observa cuando la sección entra en pantalla para disparar animación.
//    */
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (sectionRef.current) observer.observe(sectionRef.current);

//     return () => {
//       if (sectionRef.current) observer.unobserve(sectionRef.current);
//     };
//   }, []);

//   /**
//    * Stickers a renderizar.
//    * NOTA:
//    * - El texto se mantiene solo como referencia semántica (alt),
//    *   NO se renderiza visualmente.
//    */
//   const stickers = [
//     { alt: "Sticker de Doña Merry - ¡Que chicha! - Descargable para WhatsApp", image: "/img/merry/STICKER-2---MERRY.png" },
//     { alt: "Sticker de Doña Merry - Muack - Descargable para WhatsApp", image: "/img/merry/STICKER-9---MERRY.png" },
//     { alt: "Sticker de Doña Merry - Bendiciones - Descargable para WhatsApp", image: "/img/merry/STICKER-11---MERRY.png" },
//     { alt: "Sticker de Doña Merry - Yo no fui - Descargable para WhatsApp", image: "/img/merry/STICKER-8---MERRY.png" },
//   ];

//   /**
//    * Maneja la descarga de stickers:
//    * - Redirige directamente a la tienda del dispositivo (App Store/Play Store/Web)
//    */
//   const handleStickerDownload = () => {
//     const userAgent = navigator.userAgent || navigator.vendor;
//     const isIOS = /iPad|iPhone|iPod/.test(userAgent);
//     const isAndroid = /android/i.test(userAgent);

//     // Redirigir directamente a la tienda correspondiente
//     if (isIOS) {
//       window.open("https://apps.apple.com/app/stickerly/id1458326933", "_blank");
//     } else if (isAndroid) {
//       window.open("https://play.google.com/store/apps/details?id=com.stickerly.app", "_blank");
//     } else {
//       // Desktop o navegador desconocido
//       window.open("https://sticker.ly/", "_blank");
//     }
//   };

//   return (
//     <section
//       id="stickers"
//       ref={sectionRef}
//       className="w-full bg-[#ff29ab] py-10 sm:py-12 md:py-14 lg:py-16"
//     >
//       <div
//         className={[
//           "w-full max-w-[1200px] mx-auto flex flex-col items-center",
//           "px-4 md:px-8 lg:px-12",
//           isVisible ? "animate-fade-in-up" : "opacity-0",
//         ].join(" ")}
//       >
//         {/* Título principal */}
//         <h2
//           className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase mb-0 text-center leading-none"
//           style={{ fontFamily: "Colfax, sans-serif" }}
//         >
//           STICKERS
//         </h2>

//         {/* Subtítulo */}
//         <p className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase tracking-wide mb-2 text-center font-semibold leading-tight" style={{ fontFamily: "Acumin Pro, sans-serif", fontWeight: 600 }}>
//           DE DOÑA MERRY
//         </p>

//         {/* Grid de stickers (sin texto) */}
//         <div className="w-full grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-2 max-w-[800px] mx-auto">
//           {stickers.map((sticker, index) => (
//             <div
//               key={index}
//               className="flex items-center justify-center motion-lift"
//             >
//               <Image
//                 src={sticker.image}
//                 alt={sticker.alt}
//                 width={360}
//                 height={360}
//                 className="w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 object-contain"
//                 priority={index < 2}
//               />
//             </div>
//           ))}
//         </div>

//         {/* Botón de descarga */}
//         <button
//           onClick={handleStickerDownload}
//           className={[
//             "bg-[#7e1ad2] text-white",
//             "px-10 sm:px-14 md:px-18 lg:px-22",
//             "py-2 sm:py-2.5 md:py-3 lg:py-3.5",
//             "rounded-xl",
//             "uppercase tracking-wide",
//             "hover:opacity-90 transition-opacity",
//             "flex items-center justify-center gap-3",
//             "text-base sm:text-lg md:text-xl",
//             "pulse-cta",
//           ].join(" ")}
//           style={{
//             fontFamily: "Acumin Pro, sans-serif",
//             fontWeight: 600, // Semibold
//           }}
//         >
          
//           <span>DESCARGAR AQUÍ</span>
//           <Image
//             src="/img/merry/flecha.png"
//             alt="Flechas"
//             width={24}
//             height={24}
//             className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
//           />
//         </button>
//       </div>
//     </section>
//   );
// }
