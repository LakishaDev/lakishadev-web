import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
}

export default function ProjectCard({
  title,
  description,
  stack,
  githubUrl,
  liveUrl,
  caseStudyUrl,
}: ProjectCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-lg border border-text-secondary/20 bg-surface/50 p-6 transition-all hover:border-accent/50 hover:bg-surface">
      <div className="mb-4">
        <h3 className="mb-2 text-2xl font-bold tracking-tight text-text-primary">
          {title}
        </h3>
        <p className="text-text-secondary leading-relaxed">{description}</p>
      </div>

      <div className="mb-6">
        <p className="mb-2 text-sm font-medium text-text-secondary">Stack:</p>
        <div className="flex flex-wrap gap-2">
          {stack.map((tech) => (
            <span
              key={tech}
              className="rounded bg-primary/20 px-3 py-1 text-xs font-mono text-accent"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent"
          >
            <Github size={16} />
            Code
          </a>
        )}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent"
          >
            <ExternalLink size={16} />
            Live Demo
          </a>
        )}
        {caseStudyUrl && (
          <Link
            href={caseStudyUrl}
            className="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent"
          >
            <ExternalLink size={16} />
            Case Study
          </Link>
        )}
      </div>

      {/* Subtle hover effect */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/5 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
    </article>
  );
}
