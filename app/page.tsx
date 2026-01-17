import Hero from "@/components/Hero";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import { projects, skills } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Hero />

      {/* What I Build Section */}
      <Section id="what-i-build" className="bg-surface/30">
        <h2 className="mb-16 text-3xl font-bold tracking-tight">
          What I Build
        </h2>

        <div className="grid gap-12 md:grid-cols-3">
          {skills.map((skill) => (
            <div key={skill.category} className="space-y-4">
              <h3 className="text-xl font-semibold text-accent">
                {skill.category}
              </h3>
              <p className="leading-relaxed text-text-secondary">
                {skill.description}
              </p>
              <p className="font-mono text-sm text-text-secondary/70">
                {skill.technologies}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Featured Projects Section */}
      <Section id="featured-projects">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">
            Featured Projects
          </h2>
          <a
            href="/projects"
            className="text-sm text-accent transition-colors hover:text-accent-alt"
          >
            View all →
          </a>
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
            Building something complex?
          </h2>
          <p className="mb-8 text-lg text-text-secondary">
            I specialize in systems where reliability matters — IoT platforms,
            real-time data pipelines, and backend architectures that scale.
          </p>
          <a
            href="mailto:your.email@example.com"
            className="inline-block rounded-lg bg-primary px-8 py-3 font-medium text-text-primary transition-colors hover:bg-primary/80"
          >
            Get in touch
          </a>
        </div>
      </Section>
    </>
  );
}
