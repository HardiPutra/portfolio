import { Facebook, Github, Instagram, Linkedin, Mail } from 'lucide-react';

/**
 * Icon registry. Every icon comes from lucide-react so stroke weight,
 * corner radius and optical size stay identical across the set — mixing
 * icon libraries is the fastest way to make a clean page look assembled.
 */
const ICONS = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
  mail: Mail,
};

/**
 * A value is still a placeholder if it looks like YOUR_SOMETHING.
 * Placeholder entries render as inert icons instead of links, so the site
 * never ships a dead href that navigates the visitor nowhere.
 */
export function isPlaceholder(value) {
  return typeof value !== 'string' || /YOUR_[A-Z_]+/.test(value);
}

const sizes = {
  sm: { box: 'h-9 w-9', icon: 16 },
  md: { box: 'h-11 w-11', icon: 18 },
};

/**
 * A single social icon: circular hit area, subtle lift on hover,
 * always labelled for assistive technology.
 */
export function SocialIcon({ label, icon, url, size = 'md' }) {
  const Icon = ICONS[icon] ?? Mail;
  const { box, icon: iconSize } = sizes[size] ?? sizes.md;
  const inert = isPlaceholder(url);

  const shared =
    `${box} inline-flex items-center justify-center rounded-full border border-line bg-white ` +
    'transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]';

  if (inert) {
    return (
      <span
        className={`${shared} text-ink-muted`}
        role="img"
        aria-label={`${label} — link not set`}
      >
        <Icon size={iconSize} strokeWidth={1.75} aria-hidden="true" />
      </span>
    );
  }

  const isMail = url.startsWith('mailto:');

  return (
    <a
      href={url}
      aria-label={label}
      title={label}
      {...(isMail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
      className={`${shared} text-ink-muted hover:border-ink hover:bg-ink hover:text-white motion-safe:hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-8px_rgb(0_0_0/0.35)]`}
    >
      <Icon size={iconSize} strokeWidth={1.75} aria-hidden="true" />
    </a>
  );
}

/**
 * The full row of social icons.
 * @param {Array} items - entries from `socials` in data/portfolio.js
 */
export function SocialLinks({ items, size = 'md', className = '' }) {
  return (
    <ul className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {items.map((item) => (
        <li key={item.id}>
          <SocialIcon label={item.label} icon={item.icon} url={item.url} size={size} />
        </li>
      ))}
    </ul>
  );
}
