"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative min-h-[80vh] flex items-center">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            {t("title")}{" "}
            <span className="text-accent">{t("titleHighlight")}</span>
          </h1>

          <p className="mb-12 max-w-2xl text-xl text-text-secondary md:text-2xl">
            {t("subtitle")}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href={`/${locale}/projects`}
              className="rounded-lg bg-primary px-6 py-3 font-medium text-text-primary transition-colors hover:bg-primary/80"
            >
              {t("viewProjects")}
            </Link>
            <a
              href="mailto:your.email@example.com"
              className="rounded-lg border border-text-secondary/30 px-6 py-3 font-medium text-text-primary transition-colors hover:border-accent hover:text-accent"
            >
              {t("contact")}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Subtle grid background */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="h-full w-full bg-[linear-gradient(to_right,#1165A320_1px,transparent_1px),linear-gradient(to_bottom,#1165A320_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>
    </section>
  );
}
