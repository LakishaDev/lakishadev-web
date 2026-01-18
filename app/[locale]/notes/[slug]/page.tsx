import { notFound } from "next/navigation";
import { getAllNotes, getNoteBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

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
    <h1
      className="mb-4 sm:mb-6 text-3xl sm:text-4xl font-bold tracking-tight"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className="mb-3 sm:mb-4 mt-6 sm:mt-8 text-xl sm:text-2xl font-bold tracking-tight"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className="mb-2 sm:mb-3 mt-4 sm:mt-6 text-lg sm:text-xl font-semibold"
      {...props}
    />
  ),
  p: (props: any) => (
    <p
      className="mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed text-text-secondary"
      {...props}
    />
  ),
  code: (props: any) => (
    <code
      className="rounded bg-surface px-1 sm:px-1.5 py-0.5 font-mono text-xs sm:text-sm text-accent"
      {...props}
    />
  ),
  pre: (props: any) => (
    <pre
      className="mb-3 sm:mb-4 overflow-x-auto rounded-lg bg-surface p-3 sm:p-4 font-mono text-xs sm:text-sm"
      {...props}
    />
  ),
  ul: (props: any) => (
    <ul
      className="mb-3 sm:mb-4 ml-4 sm:ml-6 list-disc space-y-1.5 sm:space-y-2 text-sm sm:text-base text-text-secondary"
      {...props}
    />
  ),
  ol: (props: any) => (
    <ol
      className="mb-3 sm:mb-4 ml-4 sm:ml-6 list-decimal space-y-1.5 sm:space-y-2 text-sm sm:text-base text-text-secondary"
      {...props}
    />
  ),
  strong: (props: any) => (
    <strong className="font-semibold text-text-primary" {...props} />
  ),
  a: (props: any) => (
    <a
      className="text-accent hover:text-accent-alt underline break-words"
      {...props}
    />
  ),
};

export default async function NotePage({ params: { slug, locale } }: Props) {
  const note = await getNoteBySlug(slug, locale);

  if (!note) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-24">
      <Link
        href={`/${locale}/notes`}
        className="mb-6 sm:mb-8 inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-text-secondary transition-colors hover:text-accent"
      >
        <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
        Back to notes
      </Link>

      <header className="mb-8 sm:mb-10 md:mb-12">
        <time className="mb-2 block font-mono text-xs sm:text-sm text-text-secondary">
          {new Date(note.metadata.date).toLocaleDateString(locale, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h1 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          {note.metadata.title}
        </h1>
        <p className="text-base sm:text-lg text-text-secondary">
          {note.metadata.excerpt}
        </p>

        {note.metadata.tags && note.metadata.tags.length > 0 && (
          <div className="mt-4 sm:mt-6 flex flex-wrap gap-1.5 sm:gap-2">
            {note.metadata.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-primary/20 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-mono text-accent"
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
