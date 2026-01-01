import localFont from "next/font/local";
import "../globals.css";

const grifterBold = localFont({
  src: "../../public/fonts/grifterbold.otf",
  variable: "--font-grifter",
  display: "swap",
});

const helveticaBold = localFont({
  src: "../../public/fonts/Helvetica LT Bold.ttf",
  variable: "--font-helvetica",
  display: "swap",
});

export const metadata = {
  title: "ShowMarketing Producciones - Talentos y Eventos",
  description: "Agencia de talentos, shows en vivo, eventos corporativos y producción de contenido. ShowMarketing Producciones.",
  keywords: ["ShowMarketing", "Talentos", "Shows", "Eventos", "Producción", "Costa Rica"],
};

export default function ShowMarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${grifterBold.variable} ${helveticaBold.variable} bg-black text-white`}>
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
    </div>
  );
}
