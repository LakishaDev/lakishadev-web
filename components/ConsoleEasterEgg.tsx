"use client";

import { useEffect } from "react";

export default function ConsoleEasterEgg() {
  useEffect(() => {
    const styles = [
      "color: #38BDF8",
      "font-size: 16px",
      "font-weight: bold",
    ].join(";");

    const styles2 = ["color: #9CA3AF", "font-size: 12px"].join(";");

    console.log("%c👋 Hey Developer!", styles);
    console.log(
      "%cInterested in how this site is built? Check out the code:",
      styles2,
    );
    console.log("%chttps://github.com/yourusername/portfolio", styles2);
    console.log(
      "%c\nBuilt with Next.js 14, TypeScript, Tailwind CSS, and next-intl",
      styles2,
    );
    console.log("%c\nTech Stack:", "color: #38BDF8; font-weight: bold");
    console.log("%c- Framework: Next.js 14 (App Router)", styles2);
    console.log("%c- Language: TypeScript", styles2);
    console.log("%c- Styling: Tailwind CSS", styles2);
    console.log("%c- Animation: Framer Motion", styles2);
    console.log("%c- i18n: next-intl", styles2);
    console.log("%c- MDX: @next/mdx", styles2);
    console.log("%c\nWant to collaborate? Let's talk!", styles2);
  }, []);

  return null;
}
