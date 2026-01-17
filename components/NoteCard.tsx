import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface NoteCardProps {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
}

export default function NoteCard({
  title,
  excerpt,
  slug,
  date,
}: NoteCardProps) {
  return (
    <article className="group border-b border-text-secondary/10 py-6 transition-all hover:border-accent/30">
      <Link href={`/notes/${slug}`} className="block">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-xl font-semibold tracking-tight text-text-primary group-hover:text-accent transition-colors">
            {title}
          </h3>
          <ArrowRight
            className="text-text-secondary opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1"
            size={20}
          />
        </div>
        <p className="mb-3 text-text-secondary leading-relaxed">{excerpt}</p>
        <time className="text-xs font-mono text-text-secondary/70">{date}</time>
      </Link>
    </article>
  );
}
