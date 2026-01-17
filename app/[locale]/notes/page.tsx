import { useTranslations } from "next-intl";
import Section from "@/components/Section";
import NoteCard from "@/components/NoteCard";
import { getAllNotes } from "@/lib/mdx";

export const runtime = "edge";

export async function generateMetadata() {
  return {
    title: "Engineering Notes — Lazar",
    description:
      "Technical notes on system design, architecture decisions, and lessons learned.",
  };
}

export default async function NotesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations();
  const notes = await getAllNotes(locale);

  return (
    <Section>
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
          {t("notes.title")}
        </h1>
        <p className="max-w-2xl text-lg text-text-secondary">
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
