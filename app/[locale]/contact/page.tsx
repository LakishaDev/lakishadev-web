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
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
          Get in Touch
        </h1>
        <p className="max-w-2xl text-lg text-text-secondary">
          Interested in collaboration, consulting, or have questions about
          building reliable systems? Let's talk.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <ContactForm />
        </div>

        {/* Contact Info & GitHub Activity */}
        <div className="space-y-8">
          {/* Direct Contact */}
          <div className="rounded-lg border border-text-secondary/20 bg-surface/50 p-6">
            <h3 className="mb-4 text-lg font-semibold">Direct Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:lazar@lakisha.dev"
                  className="flex items-center gap-3 text-sm text-text-secondary transition-colors hover:text-accent"
                >
                  <Mail size={18} />
                  lazar@lakisha.dev
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/LakishaDev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-text-secondary transition-colors hover:text-accent"
                >
                  <Github size={18} />
                  github.com/LakishaDev
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/lazar-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-text-secondary transition-colors hover:text-accent"
                >
                  <Linkedin size={18} />
                  linkedin.com/in/lazar-dev
                </a>
              </li>
            </ul>
          </div>

          {/* GitHub Activity */}
          <GitHubActivity />

          {/* Response Time */}
          <div className="rounded-lg border border-text-secondary/20 bg-surface/50 p-6">
            <h3 className="mb-2 text-lg font-semibold">Response Time</h3>
            <p className="text-sm text-text-secondary">
              I typically respond within 24-48 hours during weekdays.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
