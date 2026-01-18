import { ReactNode } from "react";

interface SectionProps {
  id?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function Section({
  id,
  title,
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-12 sm:py-16 md:py-20 lg:py-24 ${className}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {title && (
          <h2 className="mb-8 sm:mb-12 md:mb-16 text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}
