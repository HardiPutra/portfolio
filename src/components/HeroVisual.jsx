import { motion, useReducedMotion } from 'motion/react';
import { BrainCircuit, Terminal } from 'lucide-react';

/**
 * Decorative composition beside the hero copy.
 *
 * Purely abstract on purpose: a frosted panel suggesting an interface, two
 * small floating chips, and a faint grid. No screenshots, no 3D, no
 * particles — it should read as depth, not as an illustration.
 *
 * The whole thing is aria-hidden. It carries no information, and a screen
 * reader announcing "decorative panel" would be pure noise.
 */
export function HeroVisual() {
  const reduceMotion = useReducedMotion();

  // Slow, small-amplitude drift. Anything faster reads as a loading state.
  const float = (distance, duration, delay = 0) =>
    reduceMotion
      ? {}
      : {
          animate: { y: [0, -distance, 0] },
          transition: { duration, delay, repeat: Infinity, ease: 'easeInOut' },
        };

  return (
    <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[26rem]">
      {/* Faint grid, masked to fade out at the edges */}
      <div
        className="absolute inset-0 rounded-[2rem] opacity-[0.55]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #e8e8ec 1px, transparent 1px), linear-gradient(to bottom, #e8e8ec 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage: 'radial-gradient(circle at 50% 50%, black 35%, transparent 72%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 35%, transparent 72%)',
        }}
      />

      {/* Main frosted panel */}
      <motion.div
        {...float(10, 7)}
        className="glass absolute left-[8%] top-[14%] w-[74%] rounded-[1.5rem] p-6"
      >
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#d8d8de]" />
          <span className="h-2 w-2 rounded-full bg-[#e2e2e8]" />
          <span className="h-2 w-2 rounded-full bg-[#ececf1]" />
        </div>

        {/* Abstract content lines — widths vary so it reads as text, not bars */}
        <div className="mt-6 space-y-3">
          <div className="h-2 w-[86%] rounded-full bg-[#e6e6eb]" />
          <div className="h-2 w-[62%] rounded-full bg-[#eeeef2]" />
          <div className="h-2 w-[74%] rounded-full bg-[#e6e6eb]" />
          <div className="h-2 w-[40%] rounded-full bg-accent/25" />
        </div>

        <div className="mt-7 h-px w-full bg-line/80" />

        <div className="mt-5 flex items-center justify-between">
          <div className="h-2 w-[30%] rounded-full bg-[#eeeef2]" />
          <div className="h-7 w-16 rounded-full bg-ink/90" />
        </div>
      </motion.div>

      {/* Floating chip — top right */}
      <motion.div
        {...float(14, 8, 0.6)}
        className="glass absolute right-[2%] top-[6%] flex h-14 w-14 items-center justify-center rounded-2xl"
      >
        <BrainCircuit size={22} strokeWidth={1.5} className="text-ink-muted" />
      </motion.div>

      {/* Floating chip — bottom left */}
      <motion.div
        {...float(12, 9, 1.2)}
        className="glass absolute bottom-[10%] left-[0%] flex items-center gap-2.5 rounded-2xl px-4 py-3"
      >
        <Terminal size={18} strokeWidth={1.5} className="text-ink-muted" />
        <span className="text-xs font-medium tracking-tight text-ink-muted">Always building</span>
      </motion.div>

      {/* Single accent mark, bottom right */}
      <motion.div
        {...float(8, 6.5, 0.3)}
        className="absolute bottom-[24%] right-[6%] h-3 w-3 rounded-full bg-accent/70 shadow-[0_0_0_6px_rgba(0,113,227,0.10)]"
      />
    </div>
  );
}
