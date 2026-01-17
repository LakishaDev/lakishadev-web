import { useTranslations } from "next-intl";
import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";
import GitHubActivity from "@/components/GitHubActivity";
import { Mail, Github, Linkedin } from "lucide-react";

export async function generateMetadata() {
  return {
    title: "Contact — Lazar",
    description:
      "Get in touch for collaboration, consulting, or questions about IoT and backend systems.",
  };
}

export default function ContactPage() {
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
                  href="mailto:your.email@example.com"
                  className="flex items-center gap-3 text-sm text-text-secondary transition-colors hover:text-accent"
                >
                  <Mail size={18} />
                  your.email@example.com
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-text-secondary transition-colors hover:text-accent"
                >
                  <Github size={18} />
                  github.com/yourusername
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-text-secondary transition-colors hover:text-accent"
                >
                  <Linkedin size={18} />
                  LinkedIn Profile
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
