import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/data";

export async function generateMetadata() {
  const title = "Projects";
  const description =
    "Full-stack and IoT projects focused on reliable system design. Real-world implementations of embedded devices, backend services, and data pipelines.";
  const url = `${process.env.NEXT_PUBLIC_SITE_URL || "https://lakisha.dev"}/projects`;

  return {
    title,
    description,
    keywords: [
      "IoT Projects",
      "Backend Systems",
      "Real-time Applications",
      "ESP32 Projects",
      "Node.js Applications",
      "WebSocket Implementation",
      "MQTT Systems",
    ],
    openGraph: {
      title: `${title} | Lazar`,
      description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Lazar`,
      description,
    },
  };
}

export default function ProjectsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
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
