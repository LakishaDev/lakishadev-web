import { notFound } from "next/navigation";
import { getAllNotes, getNoteBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateStaticParams({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const notes = await getAllNotes(locale);
  return notes.map((note) => ({
    slug: note.slug,
  }));
}

export async function generateMetadata({ params: { slug, locale } }: Props) {
  const note = await getNoteBySlug(slug, locale);

  if (!note) {
    return {
      title: "Note not found",
    };
  }

  return {
    title: `${note.metadata.title} — Lazar`,
    description: note.metadata.excerpt,
  };
}

const components = {
  h1: (props: any) => (
    <h1 className="mb-6 text-4xl font-bold tracking-tight" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="mb-4 mt-8 text-2xl font-bold tracking-tight" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="mb-3 mt-6 text-xl font-semibold" {...props} />
  ),
  p: (props: any) => (
    <p className="mb-4 leading-relaxed text-text-secondary" {...props} />
  ),
  code: (props: any) => (
    <code
      className="rounded bg-surface px-1.5 py-0.5 font-mono text-sm text-accent"
      {...props}
    />
  ),
  pre: (props: any) => (
    <pre
      className="mb-4 overflow-x-auto rounded-lg bg-surface p-4 font-mono text-sm"
      {...props}
    />
  ),
  ul: (props: any) => (
    <ul
      className="mb-4 ml-6 list-disc space-y-2 text-text-secondary"
      {...props}
    />
  ),
  ol: (props: any) => (
    <ol
      className="mb-4 ml-6 list-decimal space-y-2 text-text-secondary"
      {...props}
    />
  ),
  strong: (props: any) => (
    <strong className="font-semibold text-text-primary" {...props} />
  ),
  a: (props: any) => (
    <a className="text-accent hover:text-accent-alt underline" {...props} />
  ),
};

export default async function NotePage({ params: { slug, locale } }: Props) {
  const note = await getNoteBySlug(slug, locale);

  if (!note) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-6 py-24">
      <Link
        href={`/${locale}/notes`}
        className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent"
      >
        <ArrowLeft size={16} />
        Back to notes
      </Link>

      <header className="mb-12">
        <time className="mb-2 block font-mono text-sm text-text-secondary">
          {new Date(note.metadata.date).toLocaleDateString(locale, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
          {note.metadata.title}
        </h1>
        <p className="text-lg text-text-secondary">{note.metadata.excerpt}</p>

        {note.metadata.tags && note.metadata.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {note.metadata.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-primary/20 px-3 py-1 text-xs font-mono text-accent"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose prose-invert max-w-none">
        <MDXRemote source={note.content} components={components} />
      </div>
    </article>
  );
}
