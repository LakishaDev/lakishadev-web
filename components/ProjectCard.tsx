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
    <article className="group relative overflow-hidden rounded-lg border border-text-secondary/20 bg-surface/50 p-4 sm:p-5 md:p-6 transition-all hover:border-accent/50 hover:bg-surface">
      <div className="mb-4">
        <h3 className="mb-2 text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mb-5 sm:mb-6">
        <p className="mb-2 text-xs sm:text-sm font-medium text-text-secondary">
          Stack:
        </p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {stack.map((tech) => (
            <span
              key={tech}
              className="rounded bg-primary/20 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-mono text-accent"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 sm:gap-4">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-text-secondary transition-colors hover:text-accent"
          >
            <Github size={14} className="sm:w-4 sm:h-4" />
            Code
          </a>
        )}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-text-secondary transition-colors hover:text-accent"
          >
            <ExternalLink size={14} className="sm:w-4 sm:h-4" />
            Live Demo
          </a>
        )}
        {caseStudyUrl && (
          <Link
            href={caseStudyUrl}
            className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-text-secondary transition-colors hover:text-accent"
          >
            <ExternalLink size={14} className="sm:w-4 sm:h-4" />
            Case Study
          </Link>
        )}
      </div>

      {/* Subtle hover effect */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/5 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
    </article>
  );
}
