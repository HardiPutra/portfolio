/**
 * Anchor styled as a button.
 *
 * Two variants only. A third would dilute the hierarchy, and on a page this
 * short there is never more than one primary action in view.
 *
 * Hover is a lift of one pixel plus a slightly deeper shadow — enough to
 * feel responsive, small enough that a row of buttons stays calm.
 */

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full text-[0.9375rem] font-medium ' +
  'transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ' +
  'motion-safe:hover:-translate-y-px active:translate-y-0 active:scale-[0.98] ' +
  'whitespace-nowrap';

const variants = {
  primary:
    'bg-ink text-white px-7 py-3.5 shadow-[0_1px_2px_rgb(0_0_0/0.06)] ' +
    'hover:bg-[#000] hover:shadow-[0_8px_24px_-8px_rgb(0_0_0/0.4)]',
  secondary:
    'bg-white text-ink px-7 py-3.5 border border-line ' +
    'hover:border-[#d2d2d7] hover:shadow-[0_8px_24px_-10px_rgb(0_0_0/0.18)]',
};

export function Button({
  href,
  children,
  variant = 'primary',
  external = false,
  className = '',
  ...rest
}) {
  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`} {...externalProps} {...rest}>
      {children}
    </a>
  );
}

/**
 * Quiet inline link with an arrow that nudges right on hover.
 * Used for "View Project" style affordances inside cards.
 */
export function TextLink({ href, children, external = false, className = '', ...rest }) {
  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-ink transition-colors duration-200 hover:text-accent ${className}`}
      {...externalProps}
      {...rest}
    >
      {children}
    </a>
  );
}
