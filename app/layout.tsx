import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Doña Merry - Content Creator & Entertainer | ShowMarketing",
  description: "Doña Merry - La Gran Ingeniera del Hogar. Entretenimiento, aventuras, colaboraciones y eventos con ShowMarketing. ¡Bienvenidos Chiquillos!",
  keywords: [
    "Doña Merry",
    "ShowMarketing",
    "Content Creator",
    "Entretenimiento",
    "Eventos",
    "Aventuras",
    "Costa Rica",
    "Colaboraciones",
    "Redes Sociales",
  ],
  authors: [{ name: "ShowMarketing" }],
  creator: "ShowMarketing",
  publisher: "ShowMarketing",
  metadataBase: new URL("https://showmarketing.cr"),
  alternates: {
    canonical: "https://showmarketing.cr/merry",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://showmarketing.cr/merry",
    title: "Doña Merry - La Gran Ingeniera del Hogar",
    description: "Descubre aventuras, stickers, colaboraciones, eventos y más con Doña Merry.",
    siteName: "ShowMarketing",
    images: [
      {
        url: "https://showmarketing.cr/img/merry/Merry-2.png",
        width: 1200,
        height: 630,
        alt: "Doña Merry - La Gran Ingeniera del Hogar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Doña Merry - Content Creator & Entertainer",
    description: "La Gran Ingeniera del Hogar. Entretenimiento y aventuras con ShowMarketing.",
    creator: "@merry_oficial",
    images: ["https://showmarketing.cr/img/merry/Merry-2.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ShowMarketing",
    "url": "https://showmarketing.cr",
    "logo": "https://showmarketing.cr/img/merry/Logo SM_Mesa de trabajo 1.png",
    "sameAs": [
      "https://www.instagram.com/merry_oficial",
      "https://www.tiktok.com/@merry_oficialcr",
      "https://www.facebook.com/FansdeMerry",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ShowMarketing - Doña Merry",
    "url": "https://showmarketing.cr/merry",
    "description": "Página oficial de Doña Merry - La Gran Ingeniera del Hogar",
    "inLanguage": "es-CR",
  };

  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
