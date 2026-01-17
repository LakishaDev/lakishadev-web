import { useTranslations } from "next-intl";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/data";

export async function generateMetadata() {
  return {
    title: "Projects — Lazar",
    description:
      "Full-stack and IoT projects focused on reliable system design.",
  };
}

export default function ProjectsPage() {
  const t = useTranslations();

  return (
    <Section>
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
          {t("projects.title")}
        </h1>
        <p className="max-w-2xl text-lg text-text-secondary">
          {t("projects.description")}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </Section>
  );
}
