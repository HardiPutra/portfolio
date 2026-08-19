import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Download, Mail } from "lucide-react";

import { profile } from "../data/portfolio";
import { Button } from "./ui/Button";
import { isPlaceholder } from "./ui/SocialLinks";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Entrance animation for the hero. Unlike the rest of the page this fires on
 * mount rather than on scroll — the hero is already in view, and waiting for
 * an intersection would leave the first paint empty.
 */
function rise(delay) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  };
}

export function Hero() {
  const reduceMotion = useReducedMotion();

  // With reduced motion every element is simply present from the start.
  const animate = (delay) => (reduceMotion ? {} : rise(delay));

  return (
    <section id="home" aria-labelledby="home-heading" className="relative flex min-h-[100svh] items-center overflow-hidden pt-25 pb-20 sm:pt-32 lg:pb-15">
      {/* Ambient wash. Two very soft blooms, well under the text contrast
          threshold — they add depth without becoming a "gradient background". */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 -top-24 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(0,113,227,0.07),transparent_65%)] blur-3xl" />
        <div className="absolute -right-24 top-1/3 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(120,120,140,0.09),transparent_65%)] blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-canvas" />
      </div>

      <div className="shell w-full">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h1 id="home-heading" className="text-balance">
            <motion.span {...animate(0.12)} className="block text-[2.75rem] font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-6xl lg:text-[4.25rem]">
              {profile.headline}
            </motion.span>
            <motion.span {...animate(0.2)} className="mt-3 block text-[1.375rem] font-medium leading-snug tracking-tight text-ink-muted sm:text-3xl lg:text-[2rem]">
              {profile.role}
            </motion.span>
          </h1>

          <motion.p {...animate(0.3)} className="mt-7 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {profile.summary}
          </motion.p>

          <motion.div {...animate(0.4)} className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center sm:gap-4">
            <Button href="#projects" variant="primary" className="w-full sm:w-auto">
              View My Work
              <ArrowRight size={16} strokeWidth={2} aria-hidden="true" className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1" />
            </Button>

            {!isPlaceholder(profile.resumeUrl) && (
              <Button href={profile.resumeUrl} variant="secondary" external className="w-full sm:w-auto">
                <Download size={16} strokeWidth={1.75} aria-hidden="true" />
                Download Resume
              </Button>
            )}

            <Button href="#contact" variant="secondary" className="w-full sm:w-auto">
              <Mail size={16} strokeWidth={1.75} aria-hidden="true" />
              Contact Me
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
