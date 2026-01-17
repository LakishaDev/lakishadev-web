import { useTranslations } from "next-intl";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import { projects, skills } from "@/lib/data";
import Link from "next/link";

export const runtime = "edge";

export default function Home() {
  const t = useTranslations();

  return (
    <>
      <Hero />

      {/* What I Build Section */}
      <Section id="what-i-build" className="bg-surface/30">
        <h2 className="mb-16 text-3xl font-bold tracking-tight">
          {t("whatIBuild.title")}
        </h2>

        <div className="grid gap-12 md:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-accent">
              {t("whatIBuild.iot.title")}
            </h3>
            <p className="leading-relaxed text-text-secondary">
              {t("whatIBuild.iot.description")}
            </p>
            <p className="font-mono text-sm text-text-secondary/70">
              {t("whatIBuild.iot.tech")}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-accent">
              {t("whatIBuild.backend.title")}
            </h3>
            <p className="leading-relaxed text-text-secondary">
              {t("whatIBuild.backend.description")}
            </p>
            <p className="font-mono text-sm text-text-secondary/70">
              {t("whatIBuild.backend.tech")}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-accent">
              {t("whatIBuild.data.title")}
            </h3>
            <p className="leading-relaxed text-text-secondary">
              {t("whatIBuild.data.description")}
            </p>
            <p className="font-mono text-sm text-text-secondary/70">
              {t("whatIBuild.data.tech")}
            </p>
          </div>
        </div>
      </Section>

      {/* Featured Projects Section */}
      <Section id="featured-projects">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">
            {t("featuredProjects.title")}
          </h2>
          <Link
            href="/projects"
            className="text-sm text-accent transition-colors hover:text-accent-alt"
          >
            {t("featuredProjects.viewAll")}
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-surface/30">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight">
            {t("cta.title")}
          </h2>
          <p className="mb-8 text-lg text-text-secondary">
            {t("cta.description")}
          </p>
          <a
            href="mailto:your.email@example.com"
            className="inline-block rounded-lg bg-primary px-8 py-3 font-medium text-text-primary transition-colors hover:bg-primary/80"
          >
            {t("cta.getInTouch")}
          </a>
        </div>
      </Section>
    </>
  );
}
