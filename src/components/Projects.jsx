import { ArrowUpRight, Github, Lock } from 'lucide-react';

import { projects } from '../data/portfolio';
import { isPlaceholder } from './ui/SocialLinks';
import { Reveal, STAGGER } from './ui/Reveal';
import { Section, SectionHeader } from './ui/Section';

/**
 * One project card.
 *
 * The card uses the "stretched link" pattern: the title is the real anchor
 * and its ::after pseudo-element covers the whole card. That keeps the
 * clickable area large while leaving exactly one link in the accessibility
 * tree per destination — wrapping the card in an <a> would swallow the
 * repository link nested inside it.
 */
function ProjectCard({ project }) {
  const hasLive = !isPlaceholder(project.url);
  const hasRepo = !isPlaceholder(project.repo);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#d8d8de] hover:shadow-[0_2px_6px_rgb(0_0_0/0.04),0_28px_48px_-24px_rgb(0_0_0/0.24)] motion-safe:hover:-translate-y-1.5 focus-within:border-[#d8d8de]">
      {/* Thumbnail */}
      <div className="relative overflow-hidden bg-surface">
        <img
          src={project.image}
          alt={project.imageAlt}
          width={1600}
          height={1000}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.04]"
        />
        {/* Hairline between image and body, drawn on top of the image so it
            survives the scale transform. */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-line" aria-hidden="true" />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
          <span>{project.category}</span>
          {project.year && (
            <>
              <span className="h-3 w-px bg-line" aria-hidden="true" />
              <span>{project.year}</span>
            </>
          )}
        </div>

        <h3 className="mt-3 text-xl font-semibold tracking-tight text-ink sm:text-[1.375rem]">
          {hasLive ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="after:absolute after:inset-0 after:content-[''] focus:outline-none"
            >
              {project.name}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            project.name
          )}
        </h3>

        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">
          {project.description}
        </p>

        {/* Tech */}
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-line-soft bg-surface-2 px-2.5 py-1 text-xs font-medium text-ink-muted"
            >
              {tech}
            </li>
          ))}
        </ul>

        {/* Actions pinned to the bottom so cards of different text lengths
            still line up along their baseline. */}
        <div className="mt-auto flex items-center justify-between gap-4 pt-7">
          {hasLive ? (
            <span className="inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-ink transition-colors duration-300 group-hover:text-accent">
              View Project
              <ArrowUpRight
                size={16}
                strokeWidth={2}
                aria-hidden="true"
                className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
              />
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-ink-muted">
              <Lock size={14} strokeWidth={1.75} aria-hidden="true" />
              Link coming soon
            </span>
          )}

          {hasRepo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} source code on GitHub`}
              title="Source code"
              className="relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors duration-300 hover:bg-surface hover:text-ink"
            >
              <Github size={17} strokeWidth={1.75} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <Section id="projects" tone="surface">
      <SectionHeader
        id="projects"
        eyebrow="Work"
        title="Selected Projects"
        description="A few things I have built — from repair-service platforms to machine learning experiments."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-7">
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={(index % 2) * STAGGER} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
