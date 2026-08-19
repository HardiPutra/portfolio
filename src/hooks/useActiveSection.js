import { useEffect, useState } from 'react';

/**
 * Scroll-spy. Returns the id of the section currently occupying the
 * reading area of the viewport.
 *
 * Uses IntersectionObserver rather than scroll listeners so it costs
 * nothing on the main thread. The rootMargin crops the observation band to
 * roughly the middle of the screen, which is what a reader actually looks
 * at — without it, a tall section would stay "active" long after you had
 * scrolled past its content.
 *
 * @param {string[]} sectionIds - ids to watch, in document order.
 * @returns {string} the active section id.
 */
export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el) => el !== null);

    if (elements.length === 0) return undefined;

    // Track ratios for every observed section, then pick the strongest.
    // A single "first intersecting entry wins" check flickers when two
    // sections are on screen at once.
    const ratios = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let bestId = '';
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        if (bestId) setActiveId(bestId);
      },
      {
        // Observation band: from 20% below the top to 35% above the bottom.
        rootMargin: '-20% 0px -35% 0px',
        threshold: [0, 0.15, 0.3, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));

    // The last section is often too short to ever win the ratio contest.
    // Bottom-of-page is unambiguous, so resolve it directly.
    const handleScroll = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
      if (atBottom) setActiveId(sectionIds[sectionIds.length - 1]);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds]);

  return activeId;
}
