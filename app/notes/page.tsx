import Section from "@/components/Section";
import NoteCard from "@/components/NoteCard";
import { notes } from "@/lib/data";

export const metadata = {
  title: "Engineering Notes — Lazar",
  description:
    "Technical notes on system design, architecture decisions, and lessons learned.",
};

export default function NotesPage() {
  return (
    <Section>
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
          Engineering Notes
        </h1>
        <p className="max-w-2xl text-lg text-text-secondary">
          Short technical notes on architectural decisions, trade-offs, and
          lessons learned from building real systems.
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
