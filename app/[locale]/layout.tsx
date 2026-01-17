import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { locales } from "@/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsoleEasterEgg from "@/components/ConsoleEasterEgg";
import { Analytics } from "@vercel/analytics/react";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const messages = await getMessages({ locale });

  return {
    title: "Lazar — Full-Stack & IoT Engineer",
    description:
      "Building reliable software systems — from embedded devices to cloud APIs.",
    keywords: [
      "Full-Stack Developer",
      "IoT Engineer",
      "Backend Systems",
      "Embedded Devices",
      "Real-Time Systems",
    ],
    authors: [{ name: "Lazar" }],
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : locale === "sr" ? "sr_RS" : "sr_RS",
      title: "Lazar — Full-Stack & IoT Engineer",
      description:
        "Building reliable software systems — from embedded devices to cloud APIs.",
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering with next-intl on app router
  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages}>
      <ConsoleEasterEgg />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <Analytics />
    </NextIntlClientProvider>
  );
}
