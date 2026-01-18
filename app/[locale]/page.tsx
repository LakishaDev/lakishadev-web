import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import GitHubActivity from "@/components/GitHubActivity";
import Stats from "@/components/Stats";
import { projects, skills } from "@/lib/data";
import Link from "next/link";

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations();

  return (
    <>
      <Hero />

      {/* What I Build Section */}
      <Section id="what-i-build" className="bg-surface/30">
        <h2 className="mb-8 sm:mb-12 md:mb-16 text-2xl sm:text-3xl font-bold tracking-tight">
          {t("whatIBuild.title")}
        </h2>

        <div className="grid gap-6 sm:gap-8 md:gap-10 lg:gap-12 grid-cols-1 md:grid-cols-3">
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold text-accent">
              {t("whatIBuild.iot.title")}
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-text-secondary">
              {t("whatIBuild.iot.description")}
            </p>
            <p className="font-mono text-xs sm:text-sm text-text-secondary/70">
              {t("whatIBuild.iot.tech")}
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold text-accent">
              {t("whatIBuild.backend.title")}
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-text-secondary">
              {t("whatIBuild.backend.description")}
            </p>
            <p className="font-mono text-xs sm:text-sm text-text-secondary/70">
              {t("whatIBuild.backend.tech")}
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold text-accent">
              {t("whatIBuild.data.title")}
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-text-secondary">
              {t("whatIBuild.data.description")}
            </p>
            <p className="font-mono text-xs sm:text-sm text-text-secondary/70">
              {t("whatIBuild.data.tech")}
            </p>
          </div>
        </div>
      </Section>

      {/* Featured Projects Section */}
      <Section id="featured-projects">
        <div className="mb-8 sm:mb-10 md:mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {t("featuredProjects.title")}
          </h2>
          <Link
            href="/projects"
            className="text-xs sm:text-sm text-accent transition-colors hover:text-accent-alt"
          >
            {t("featuredProjects.viewAll")}
          </Link>
        </div>

        <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </Section>

      {/* GitHub Activity Section */}
      <Section className="bg-surface/30">
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {t("githubActivity.title")}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-text-secondary">
            {t("githubActivity.description")}
          </p>
        </div>

        <div className="mb-8 sm:mb-10 md:mb-12">
          <Stats />
        </div>

        <GitHubActivity />
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold tracking-tight">
            {t("cta.title")}
          </h2>
          <p className="mb-6 sm:mb-8 text-base sm:text-lg text-text-secondary px-4">
            {t("cta.description")}
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-lg bg-primary px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-text-primary transition-colors hover:bg-primary/80"
          >
            {t("cta.getInTouch")}
          </Link>
        </div>
      </Section>
    </>
  );
}
