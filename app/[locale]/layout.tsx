import "@/styles/globals.css";
import type { Metadata } from "next";

import { Toaster } from "@/components/ui/sonner";
import { i18nRouterConfig } from "@/i18nRouterConfig";
import ClientComponentsTranslationsProvider from "@/Providers/ClientComponentsTranslationsProvider";
import { dir } from "i18next";
import initTranslations from "../i18n";
import { Poppins, Baloo_Bhaijaan_2 } from "next/font/google";
import { ContextProvider } from "@/Providers/ContextProvider";
import TanstackProvider from "@/Providers/TanstackProvider";

export const metadata: Metadata = {
  title: "Hotel Booking",
  description: "Hotel Booking WEBSITE ",
};
const i18nNamespaces = ["home"];
const poppins = Poppins({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});
const baloo_Bhaijaan_2 = Baloo_Bhaijaan_2({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});
export function generateStaticParams() {
  return i18nRouterConfig.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <html lang={locale} dir={dir(locale)}>
      <body
        className={` ${
          locale === "ar" ? baloo_Bhaijaan_2.className : poppins.className
        } `}
      >
        <ContextProvider>
        <TanstackProvider>
          <ClientComponentsTranslationsProvider
            namespaces={i18nNamespaces}
            locale={locale}
            resources={resources}
          >
            {children}
            <Toaster />
          </ClientComponentsTranslationsProvider>
        </TanstackProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
