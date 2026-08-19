import { useEffect, useState } from 'react';

/**
 * True once the page has scrolled past `threshold` pixels.
 * Drives the navbar's transition from transparent to frosted glass.
 *
 * The listener is passive and only calls setState on an actual change, so
 * React re-renders twice per page visit rather than once per scroll frame.
 *
 * @param {number} threshold - pixels of scroll before flipping to true.
 */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => {
      setScrolled((previous) => {
        const next = window.scrollY > threshold;
        return next === previous ? previous : next;
      });
    };

    update(); // handle a reload that restores mid-page scroll position
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [threshold]);

  return scrolled;
}
