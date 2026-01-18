"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative min-h-[75vh] sm:min-h-[80vh] flex items-center">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center sm:text-left"
        >
          <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight">
            {t("title")}{" "}
            <span className="text-accent block sm:inline">
              {t("titleHighlight")}
            </span>
          </h1>

          <p className="mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto sm:mx-0 text-base sm:text-lg md:text-xl lg:text-2xl text-text-secondary">
            {t("subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center sm:justify-start">
            <Link
              href={`/${locale}/projects`}
              className="rounded-lg bg-primary px-5 sm:px-6 py-2.5 sm:py-3 font-medium text-sm sm:text-base text-text-primary transition-colors hover:bg-primary/80 text-center"
            >
              {t("viewProjects")}
            </Link>
            <a
              href="mailto:your.email@example.com"
              className="rounded-lg border border-text-secondary/30 px-5 sm:px-6 py-2.5 sm:py-3 font-medium text-sm sm:text-base text-text-primary transition-colors hover:border-accent hover:text-accent text-center"
            >
              {t("contact")}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Subtle grid background */}
      <div className="absolute inset-0 -z-10 opacity-10 sm:opacity-20">
        <div className="h-full w-full bg-[linear-gradient(to_right,#1165A320_1px,transparent_1px),linear-gradient(to_bottom,#1165A320_1px,transparent_1px)] bg-[size:2rem_2rem] sm:bg-[size:4rem_4rem]" />
      </div>
    </section>
  );
}
