"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Globe, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const locale = useLocale();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const links = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/projects`, label: t("projects") },
    { href: `/${locale}/notes`, label: t("notes") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  const languages = [
    { code: "en", label: "English" },
    { code: "sr", label: "Srpski" },
    { code: "sr-Cyrl", label: "Српски" },
  ];

  const getCurrentPath = () => {
    return pathname.replace(`/${locale}`, "") || "/";
  };

  // Close mobile menu on route change
  useEffect(() => {
    setShowMobileMenu(false);
    setShowLangMenu(false);
  }, [pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showMobileMenu]);

  return (
    <nav className="sticky top-0 z-50 border-b border-text-secondary/10 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <Link
            href={`/${locale}`}
            className="text-base sm:text-lg font-semibold tracking-tight"
          >
            <span className="text-accent">{"<"}</span>
            lakisha.dev
            <span className="text-accent">{"/>"}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <ul className="flex gap-6 lg:gap-8">
              {links.map(({ href, label }) => {
                const isActive = pathname === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`text-sm transition-colors ${
                        isActive
                          ? "text-accent"
                          : "text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent"
                aria-label="Change language"
              >
                <Globe size={18} />
                <span className="hidden lg:inline">
                  {languages.find((l) => l.code === locale)?.label}
                </span>
              </button>

              {showLangMenu && (
                <div className="absolute right-0 top-full mt-2 rounded-lg border border-text-secondary/20 bg-surface shadow-lg">
                  {languages.map((lang) => (
                    <Link
                      key={lang.code}
                      href={`/${lang.code}${getCurrentPath()}`}
                      onClick={() => setShowLangMenu(false)}
                      className={`block px-4 py-2 text-sm transition-colors hover:bg-primary/20 ${
                        locale === lang.code
                          ? "text-accent"
                          : "text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {lang.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 text-text-secondary hover:text-accent transition-colors"
            aria-label="Toggle menu"
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden fixed inset-0 top-[57px] bg-background/95 backdrop-blur-lg">
            <div className="flex flex-col p-6 space-y-6">
              <ul className="space-y-4">
                {links.map(({ href, label }) => {
                  const isActive = pathname === href;
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        className={`block text-lg transition-colors ${
                          isActive
                            ? "text-accent font-medium"
                            : "text-text-secondary hover:text-text-primary"
                        }`}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Mobile Language Switcher */}
              <div className="pt-6 border-t border-text-secondary/20">
                <p className="text-xs text-text-secondary mb-3 uppercase tracking-wide">
                  Language
                </p>
                <div className="space-y-3">
                  {languages.map((lang) => (
                    <Link
                      key={lang.code}
                      href={`/${lang.code}${getCurrentPath()}`}
                      className={`block text-base transition-colors ${
                        locale === lang.code
                          ? "text-accent font-medium"
                          : "text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {lang.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
