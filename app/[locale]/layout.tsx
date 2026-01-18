import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { locales } from "@/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsoleEasterEgg from "@/components/ConsoleEasterEgg";
import StructuredData from "@/components/StructuredData";
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

  const title = "Lazar — Full-Stack & IoT Engineer";
  const description =
    "Building reliable software systems — from embedded devices to cloud APIs. Specialized in IoT platforms, real-time data pipelines, and backend architectures.";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lakisha.dev";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: "%s | Lazar",
    },
    description,
    keywords: [
      "Full-Stack Developer",
      "IoT Engineer",
      "Backend Systems",
      "Embedded Devices",
      "Real-Time Systems",
      "ESP32",
      "Node.js",
      "TypeScript",
      "WebSockets",
      "MQTT",
      "PostgreSQL",
      "Next.js",
      "React",
      "Cloudflare",
    ],
    authors: [{ name: "Lazar", url: siteUrl }],
    creator: "Lazar",
    publisher: "Lazar",
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
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : locale === "sr" ? "sr_RS" : "sr_RS",
      url: siteUrl,
      title,
      description,
      siteName: "Lazar — Full-Stack & IoT Engineer",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Lazar — Full-Stack & IoT Engineer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@LakishaDev",
      images: ["/og-image.png"],
    },
    alternates: {
      canonical: siteUrl,
      languages: {
        en: `${siteUrl}/en`,
        sr: `${siteUrl}/sr`,
        "sr-Cyrl": `${siteUrl}/sr-Cyrl`,
      },
    },
    verification: {
      google: "your-google-verification-code",
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
      <StructuredData />
      <ConsoleEasterEgg />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <Analytics />
    </NextIntlClientProvider>
  );
}
