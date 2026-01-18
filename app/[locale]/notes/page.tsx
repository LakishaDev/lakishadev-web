import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Section from "@/components/Section";
import NoteCard from "@/components/NoteCard";
import { getAllNotes } from "@/lib/mdx";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const title = "Engineering Notes";
  const description =
    "Technical notes on system design, architecture decisions, and lessons learned from building IoT and backend systems.";
  const url = `${process.env.NEXT_PUBLIC_SITE_URL || "https://lakisha.dev"}/notes`;

  return {
    title,
    description,
    keywords: [
      "Engineering Blog",
      "Technical Articles",
      "IoT Architecture",
      "Backend Development",
      "System Design",
      "WebSocket Guide",
      "Real-time Systems",
    ],
    openGraph: {
      title: `${title} | Lazar`,
      description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Lazar`,
      description,
    },
  };
}

export default async function NotesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations();
  const notes = await getAllNotes(locale);

  return (
    <Section>
      <div className="mb-8 sm:mb-10 md:mb-12">
        <h1 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          {t("notes.title")}
        </h1>
        <p className="max-w-2xl text-base sm:text-lg text-text-secondary">
          {t("notes.description")}
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        {notes.map((note) => (
          <NoteCard key={note.slug} {...note} />
        ))}
      </div>
    </Section>
  );
}
