import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";
import GitHubActivity from "@/components/GitHubActivity";
import { Mail, Github, Linkedin } from "lucide-react";

export async function generateMetadata() {
  const title = "Contact";
  const description =
    "Get in touch for collaboration, consulting, or questions about IoT and backend systems. I typically respond within 24-48 hours.";
  const url = `${process.env.NEXT_PUBLIC_SITE_URL || "https://lakisha.dev"}/contact`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Lazar`,
      description,
      url,
      type: "website",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://lakisha.dev"}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "Contact Lazar",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Lazar`,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function ContactPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations();

  return (
    <Section>
      <div className="mb-8 sm:mb-10 md:mb-12">
        <h1 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          Get in Touch
        </h1>
        <p className="max-w-2xl text-base sm:text-lg text-text-secondary">
          Interested in collaboration, consulting, or have questions about
          building reliable systems? Let's talk.
        </p>
      </div>

      <div className="grid gap-8 sm:gap-10 lg:gap-12 lg:grid-cols-3">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <ContactForm />
        </div>

        {/* Contact Info & GitHub Activity */}
        <div className="space-y-6 sm:space-y-8">
          {/* Direct Contact */}
          <div className="rounded-lg border border-text-secondary/20 bg-surface/50 p-4 sm:p-6">
            <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold">
              Direct Contact
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a
                  href="mailto:lazar@lakisha.dev"
                  className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-text-secondary transition-colors hover:text-accent break-all"
                >
                  <Mail size={16} className="flex-shrink-0" />
                  lazar@lakisha.dev
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/LakishaDev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-text-secondary transition-colors hover:text-accent break-all"
                >
                  <Github size={16} className="flex-shrink-0" />
                  github.com/LakishaDev
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/lazar-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-text-secondary transition-colors hover:text-accent break-all"
                >
                  <Linkedin size={16} className="flex-shrink-0" />
                  linkedin.com/in/lazar-dev
                </a>
              </li>
            </ul>
          </div>

          {/* GitHub Activity */}
          <GitHubActivity />

          {/* Response Time */}
          <div className="rounded-lg border border-text-secondary/20 bg-surface/50 p-4 sm:p-6">
            <h3 className="mb-2 text-base sm:text-lg font-semibold">
              Response Time
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary">
              I typically respond within 24-48 hours during weekdays.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
