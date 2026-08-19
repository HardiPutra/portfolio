import { Reveal } from './Reveal';

/**
 * Page section shell. Owns vertical rhythm and the max-width gutter so
 * spacing stays identical from About all the way down to Contact.
 *
 * Renders a real <section> with an accessible name derived from its
 * heading, which is what lets screen-reader users jump between landmarks.
 */
export function Section({ id, children, className = '', tone = 'canvas' }) {
  const background = tone === 'surface' ? 'bg-surface' : 'bg-canvas';

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`scroll-mt-20 py-24 sm:py-20 lg:py-15 ${background} ${className}`}
    >
      <div className="shell">{children}</div>
    </section>
  );
}

/**
 * Section header: small uppercase eyebrow, then the heading, then optional
 * supporting copy. Kept as one component so the type scale never drifts
 * between sections.
 */
export function SectionHeader({ id, eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'text-center mx-auto items-center' : 'text-left';

  return (
    <header className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      {eyebrow && (
        <Reveal as="p" y={12} className="flex items-center gap-3">
          <span className="h-px w-8 bg-line" aria-hidden="true" />
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">
            {eyebrow}
          </span>
        </Reveal>
      )}

      <Reveal as="h2" delay={0.06}>
        <span
          id={id ? `${id}-heading` : undefined}
          className="block text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]"
        >
          {title}
        </span>
      </Reveal>

      {description && (
        <Reveal as="p" delay={0.12} className="text-base leading-relaxed text-ink-muted sm:text-lg">
          {description}
        </Reveal>
      )}
    </header>
  );
}
