"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-text-secondary/10 bg-surface/30">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-text-secondary">{t("tagline")}</p>
          </div>

          <div className="flex gap-6">
            <a
              href="mailto:your.email@example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary transition-colors hover:text-accent"
            >
              {t("email")}
            </a>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary transition-colors hover:text-accent"
            >
              {t("github")}
            </a>
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary transition-colors hover:text-accent"
            >
              {t("linkedin")}
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-text-secondary/10 pt-8">
          <p className="text-xs text-text-secondary">
            {t("copyright", { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
