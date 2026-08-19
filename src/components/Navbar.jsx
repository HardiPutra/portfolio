import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Menu, X } from 'lucide-react';

import { navigation, profile } from '../data/portfolio';
import { useActiveSection } from '../hooks/useActiveSection';
import { useScrolled } from '../hooks/useScrolled';

const SECTION_IDS = navigation.map((item) => item.id);

export function Navbar() {
  const scrolled = useScrolled(24);
  const activeId = useActiveSection(SECTION_IDS);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Escape closes the sheet, and body scroll is locked while it is open so
  // the page behind cannot move under the visitor's finger.
  useEffect(() => {
    if (!menuOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen, closeMenu]);

  // Close the sheet if the viewport grows into the desktop layout while it
  // is open — otherwise the scroll lock would persist with nothing visible.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)');
    const onChange = (event) => {
      if (event.matches) closeMenu();
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, [closeMenu]);

  return (
    <>
      {/* Keyboard users land here first. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={[
          'fixed inset-x-0 top-0 z-50',
          'transition-[background-color,box-shadow,backdrop-filter,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
          scrolled || menuOpen
            ? 'glass-strong border-b border-line/70 shadow-[0_1px_0_0_rgb(0_0_0/0.03)]'
            : 'border-b border-transparent bg-transparent',
        ].join(' ')}
      >
        <nav aria-label="Primary" className="shell">
          <div className="flex h-16 items-center justify-between gap-6">
            {/* Brand */}
            <a
              href="#home"
              onClick={closeMenu}
              className="text-[1.0625rem] font-semibold tracking-tight text-ink transition-opacity duration-200 hover:opacity-60"
            >
              {profile.name}
              <span className="text-accent" aria-hidden="true">
                .
              </span>
            </a>

            {/* Desktop links — no hamburger above md, as specified. */}
            <ul className="hidden items-center gap-1 md:flex">
              {navigation.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? 'true' : undefined}
                      className={[
                        'relative inline-flex items-center rounded-full px-4 py-2 text-sm transition-colors duration-300',
                        isActive ? 'text-ink' : 'text-ink-muted hover:text-ink',
                      ].join(' ')}
                    >
                      {/* The pill slides between items rather than fading in
                          and out, which reads as one object moving. */}
                      {isActive && (
                        <motion.span
                          layoutId={reduceMotion ? undefined : 'nav-active-pill'}
                          className="absolute inset-0 -z-10 rounded-full bg-surface"
                          transition={{ type: 'spring', stiffness: 380, damping: 32, mass: 0.8 }}
                        />
                      )}
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Mobile trigger */}
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-surface md:hidden"
            >
              {menuOpen ? (
                <X size={20} strokeWidth={1.75} aria-hidden="true" />
              ) : (
                <Menu size={20} strokeWidth={1.75} aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile sheet */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              initial={reduceMotion ? false : { opacity: 0, height: 0 }}
              animate={reduceMotion ? {} : { opacity: 1, height: 'auto' }}
              exit={reduceMotion ? {} : { opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-line/70 md:hidden"
            >
              <ul className="shell flex flex-col gap-1 py-4">
                {navigation.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={closeMenu}
                        aria-current={isActive ? 'true' : undefined}
                        className={[
                          'flex items-center justify-between rounded-xl px-4 py-3 text-base transition-colors duration-200',
                          isActive ? 'bg-surface font-medium text-ink' : 'text-ink-muted',
                        ].join(' ')}
                      >
                        {item.label}
                        {isActive && (
                          <span
                            className="h-1.5 w-1.5 rounded-full bg-accent"
                            aria-hidden="true"
                          />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
