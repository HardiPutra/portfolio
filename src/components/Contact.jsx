import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail } from 'lucide-react';

import { contact, profile, socials } from '../data/portfolio';
import { Button } from './ui/Button';
import { Reveal, STAGGER } from './ui/Reveal';
import { SocialLinks, isPlaceholder } from './ui/SocialLinks';

const CHANNEL_ICONS = { mail: Mail, github: Github, linkedin: Linkedin };

/**
 * Copies text, returning whether it worked.
 *
 * The async Clipboard API is the right call but it is unavailable on
 * insecure origins — a portfolio served over plain HTTP on a LAN address,
 * for instance — so this falls back to the legacy execCommand path rather
 * than leaving the button silently dead there.
 */
async function writeToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to the legacy path below.
    }
  }

  try {
    const field = document.createElement('textarea');
    field.value = text;
    // Keep it out of view and out of the tab order, and stop iOS from
    // scrolling to it or zooming in on focus.
    field.setAttribute('readonly', '');
    field.style.cssText = 'position:fixed;top:0;left:-9999px;opacity:0;';
    document.body.appendChild(field);
    field.select();
    const ok = document.execCommand('copy');
    field.remove();
    return ok;
  } catch {
    return false;
  }
}

/**
 * Copy-to-clipboard for the email address, with a brief confirmation state.
 * Rendered only when a real address is configured.
 */
function CopyEmailButton({ email }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  // Clear the pending reset if the component unmounts mid-confirmation.
  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const handleCopy = async () => {
    if (await writeToClipboard(email)) {
      setCopied(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    }
    // If both strategies fail the button stays idle rather than claiming a
    // copy that did not happen. The address is on screen and the row is also
    // a mailto: link, so the visitor is never stuck.
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Email address copied' : 'Copy email address'}
      className="relative z-10 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-muted transition-colors duration-300 hover:bg-surface hover:text-ink"
    >
      {copied ? (
        <Check size={16} strokeWidth={2} aria-hidden="true" className="text-accent" />
      ) : (
        <Copy size={16} strokeWidth={1.75} aria-hidden="true" />
      )}
      {/* Announced to screen readers without shifting the layout. */}
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? 'Copied' : ''}
      </span>
    </button>
  );
}

function ChannelRow({ channel }) {
  const Icon = CHANNEL_ICONS[channel.icon] ?? Mail;
  const active = !isPlaceholder(channel.href);
  const isMail = channel.id === 'email';

  return (
    <li className="group/row flex items-center gap-4 border-b border-line/70 py-4 last:border-b-0">
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface text-ink-muted">
        <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
          {channel.label}
        </p>
        {active ? (
          <a
            href={channel.href}
            {...(isMail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
            className="mt-0.5 inline-flex items-center gap-1 truncate text-[0.9375rem] font-medium text-ink transition-colors duration-200 hover:text-accent"
          >
            <span className="truncate">{channel.value}</span>
            {!isMail && (
              <ArrowUpRight
                size={14}
                strokeWidth={2}
                aria-hidden="true"
                className="shrink-0 transition-transform duration-300 group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5"
              />
            )}
          </a>
        ) : (
          <p className="mt-0.5 truncate text-[0.9375rem] font-medium text-ink-muted">
            {channel.value}
          </p>
        )}
      </div>

      {isMail && active && <CopyEmailButton email={profile.email} />}
    </li>
  );
}

export function Contact() {
  const mailHref = `mailto:${profile.email}`;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-20 overflow-hidden py-24 sm:py-28 lg:py-36"
    >
      {/* A single soft bloom behind the glass card — this is the one place
          on the page where the frosted effect has something to frost. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,113,227,0.08),transparent_65%)] blur-3xl" />
        <div className="absolute bottom-0 right-[12%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(120,120,140,0.10),transparent_65%)] blur-3xl" />
      </div>

      <div className="shell">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal as="p" y={12}>
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">
              {contact.eyebrow}
            </span>
          </Reveal>

          <Reveal as="h2" delay={0.06}>
            <span
              id="contact-heading"
              className="mt-4 block text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.025em] text-ink sm:text-5xl lg:text-[3.25rem]"
            >
              {contact.title}
            </span>
          </Reveal>

          <Reveal
            as="p"
            delay={0.12}
            className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-ink-muted sm:text-lg"
          >
            {contact.description}
          </Reveal>
        </div>

        {/* Contact card */}
        <Reveal delay={0.18} className="mx-auto mt-12 max-w-2xl">
          <div className="glass rounded-3xl p-7 sm:p-9">
            <ul className="flex flex-col">
              {contact.channels.map((channel) => (
                <ChannelRow key={channel.id} channel={channel} />
              ))}
            </ul>

            <div className="mt-8 flex flex-col items-center gap-6 border-t border-line/70 pt-8 sm:flex-row sm:justify-between">
              <Button href={mailHref} variant="primary" className="w-full sm:w-auto">
                {contact.ctaLabel}
                <ArrowUpRight
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Button>

              <SocialLinks items={socials} size="sm" className="justify-center" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
