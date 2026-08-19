import { about } from '../data/portfolio';
import { Reveal, STAGGER } from './ui/Reveal';
import { Section, SectionHeader } from './ui/Section';

export function About() {
  const [lead, ...rest] = about.paragraphs;

  return (
    <Section id="about" tone="surface">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        {/* Heading stays pinned while the narrative scrolls past it. */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader id="about" eyebrow={about.eyebrow} title={about.title} />
        </div>

        {/* Narrative. A hairline rule that fades out replaces the old stat
            cards — quieter, and it keeps the eye moving down the column. */}
        <div className="relative pl-7 sm:pl-10">
          <span
            aria-hidden="true"
            className="absolute left-0 top-1 h-full w-px bg-gradient-to-b from-ink/25 via-line to-transparent"
          />

          <Reveal
            as="p"
            className="max-w-xl text-lg leading-[1.7] text-ink sm:text-xl sm:leading-[1.65]"
          >
            {lead}
          </Reveal>

          <div className="mt-7 space-y-6">
            {rest.map((paragraph, index) => (
              <Reveal
                key={paragraph.slice(0, 24)}
                as="p"
                delay={0.1 + index * STAGGER}
                className="max-w-xl text-base leading-[1.8] text-ink-muted sm:text-[1.0625rem]"
              >
                {paragraph}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
