import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const grifterBold = localFont({
  src: "../public/fonts/grifterbold.otf",
  variable: "--font-grifter",
  display: "swap",
});

const helveticaBold = localFont({
  src: "../public/fonts/Helvetica LT Bold.ttf",
  variable: "--font-helvetica",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ShowMarketing Producciones - Talentos y Eventos",
  description: "Agencia de talentos, shows en vivo, eventos corporativos y producción de contenido. ShowMarketing Producciones.",
  keywords: ["ShowMarketing", "Talentos", "Shows", "Eventos", "Producción", "Costa Rica"],
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
    "logo": "https://showmarketing.cr/img/showmarketing/show_white.png",
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
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="icon" href="/favicon.ico" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                function cleanBisAttrs(root) {
                  try {
                    if (!root || !root.querySelectorAll) return;
                    root.querySelectorAll('[bis_skin_checked]').forEach(function (el) {
                      el.removeAttribute('bis_skin_checked');
                    });
                    if (root.documentElement && root.documentElement.hasAttribute && root.documentElement.hasAttribute('bis_skin_checked')) {
                      root.documentElement.removeAttribute('bis_skin_checked');
                    }
                  } catch (e) {}
                }

                cleanBisAttrs(document);

                try {
                  var observer = new MutationObserver(function (mutations) {
                    mutations.forEach(function (m) {
                      if (m.type === 'attributes' && m.attributeName === 'bis_skin_checked' && m.target && m.target.removeAttribute) {
                        m.target.removeAttribute('bis_skin_checked');
                      }
                    });
                  });

                  observer.observe(document.documentElement, {
                    subtree: true,
                    attributes: true,
                    attributeFilter: ['bis_skin_checked'],
                  });
                } catch (e) {}
              })();
            `,
          }}
        />
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
        className={`${grifterBold.variable} ${helveticaBold.variable} bg-black text-white antialiased`}
        suppressHydrationWarning
      >
        <style dangerouslySetInnerHTML={{
          __html: `
            .font-grifter {
              font-family: var(--font-grifter), sans-serif;
            }
            .font-helvetica {
              font-family: var(--font-helvetica), sans-serif;
            }
          `
        }} />
        {children}
      </body>
    </html>
  );
}
