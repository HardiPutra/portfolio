import {
  BrainCircuit,
  CodeXml,
  Database,
  PanelsTopLeft,
  Wrench,
} from 'lucide-react';

import { skillGroups } from '../data/portfolio';
import { Reveal, STAGGER } from './ui/Reveal';
import { Section, SectionHeader } from './ui/Section';

/**
 * Maps the `icon` string in portfolio.js to a component. Adding a category
 * means adding one entry here — the grid itself needs no changes.
 */
const ICONS = {
  CodeXml,
  PanelsTopLeft,
  Database,
  BrainCircuit,
  Wrench,
};

function SkillCard({ group }) {
  const Icon = ICONS[group.icon] ?? CodeXml;

  return (
    <article className="group h-full rounded-2xl border border-line bg-white p-7 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#d8d8de] hover:shadow-[0_2px_4px_rgb(0_0_0/0.03),0_16px_32px_-16px_rgb(0_0_0/0.16)] motion-safe:hover:-translate-y-1">
      <div className="flex items-center gap-3.5">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface text-ink transition-colors duration-500 group-hover:bg-ink group-hover:text-white">
          <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
        </span>
        <h3 className="text-[1.0625rem] font-semibold tracking-tight text-ink">{group.title}</h3>
      </div>

      {group.description && (
        <p className="mt-4 text-sm leading-relaxed text-ink-muted">{group.description}</p>
      )}

      <ul className="mt-5 flex flex-wrap gap-2">
        {group.items.map((item) => (
          <li
            key={item}
            className="rounded-full border border-line-soft bg-surface-2 px-3 py-1.5 text-[0.8125rem] leading-none text-ink-muted transition-colors duration-300 group-hover:border-line group-hover:text-ink"
          >
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeader
        id="skills"
        eyebrow="Skills"
        title="Tools and technologies I work with."
        description="Grouped by what they are actually for, rather than scored on a bar."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <Reveal
            key={group.title}
            delay={(index % 3) * STAGGER}
            className="h-full"
          >
            <SkillCard group={group} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
