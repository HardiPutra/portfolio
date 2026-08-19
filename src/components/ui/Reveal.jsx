import { motion, useReducedMotion } from 'motion/react';

/**
 * Scroll-triggered entrance animation.
 *
 * One wrapper, used everywhere, so the whole page shares a single timing
 * signature — that consistency is most of what makes motion read as
 * "designed" rather than "decorated".
 *
 * When the visitor prefers reduced motion, content renders in its final
 * state immediately: no transform, no fade, no delay.
 *
 * @param {object}  props
 * @param {number}  props.delay      - seconds to wait before starting.
 * @param {number}  props.y          - pixels to travel upward.
 * @param {string}  props.as         - element to render ('div' by default).
 * @param {boolean} props.once       - animate only the first time it enters.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  as = 'div',
  once = true,
  className = '',
  ...rest
}) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as] ?? motion.div;

  if (reduceMotion) {
    const Static = as;
    return (
      <Static className={className} {...rest}>
        {children}
      </Static>
    );
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '0px 0px -12% 0px' }}
      transition={{
        duration: 0.7,
        delay,
        // The house easing curve. Fast out of the gate, long settle.
        ease: [0.22, 1, 0.36, 1],
      }}
      {...rest}
    >
      {children}
    </Component>
  );
}

/**
 * Standard stagger step, in seconds. Shared so every grid on the page
 * cascades at the same rhythm. Anything much larger starts to feel slow.
 */
export const STAGGER = 0.07;
