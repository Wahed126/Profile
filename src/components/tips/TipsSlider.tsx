import { useState, useRef, type MouseEvent } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { tipsData, type Tip } from '@/data/tips';

interface TipsSliderProps {
  tips?: Tip[];
}

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 35 : -35,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: {
      x: { type: 'spring', stiffness: 280, damping: 22 },
      opacity: { duration: 0.25 },
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction < 0 ? 35 : -35,
    transition: {
      x: { type: 'spring', stiffness: 280, damping: 24 },
      opacity: { duration: 0.18 },
    },
  }),
};

export default function TipsSlider({ tips = tipsData }: TipsSliderProps) {
  const [[page, direction], setPage] = useState([0, 0]);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse cursor spotlight motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rawOpacity = useMotionValue(0);

  // Damped spring physics for smooth spotlight reveal movement
  const springConfig = { stiffness: 160, damping: 24, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const opacity = useSpring(rawOpacity, { stiffness: 200, damping: 26 });

  // CSS Radial Gradient Mask for spotlight revealing octopus sketch under cursor
  const maskImage = useTransform(
    [smoothX, smoothY],
    ([x, y]) => `radial-gradient(240px circle at ${x}px ${y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 85%)`
  );

  if (!tips || tips.length === 0) return null;

  const activeIndex = ((page % tips.length) + tips.length) % tips.length;
  const tip = tips[activeIndex];

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);
    rawOpacity.set(1);
  };

  const handleMouseLeave = () => {
    rawOpacity.set(0);
  };

  return (
    <section id="blog" className="pt-0 pb-0 mb-6 md:pt-2 md:pb-2">
      {/* Section Header with Working Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 gap-4">
        <h2 className="section-heading mb-0">
          ./Tips & Tricks
        </h2>
        <div className="flex items-center gap-6 text-sm font-mono">
          <button
            onClick={() => paginate(-1)}
            className="text-accent hover:underline cursor-pointer transition-colors active:scale-95"
            aria-label="Previous tip"
          >
            ./previous
          </button>
          <button
            onClick={() => paginate(1)}
            className="text-accent hover:underline cursor-pointer transition-colors active:scale-95"
            aria-label="Next tip"
          >
            ./next
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center">
        {/* Left Column: Illustration */}
        <div className="lg:col-span-6 flex justify-start items-center">
          <img
            src="/images/illustrations/octopus.png"
            alt="Tip illustration"
            className="w-full max-w-[320px] md:max-w-[360px] h-auto object-contain opacity-90 mix-blend-multiply dark:mix-blend-normal dark:invert"
            loading="lazy"
          />
        </div>

        {/* Right Column: Clean Pitch-Black Tip Card with Interactive Spotlight Octopus Reveal */}
        <div className="lg:col-span-6 flex justify-end w-full">
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group bg-[#09090b] text-white rounded-[2.2rem] p-6 md:p-8 shadow-sm w-full font-mono relative overflow-hidden border border-neutral-800/80 cursor-default"
          >
            {/* Full-Card Octopus Background Revealed Under Mouse Spotlight Mask */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
              style={{
                opacity,
                maskImage,
                WebkitMaskImage: maskImage,
              }}
            >
              <img
                src="/images/illustrations/octopus.png"
                alt=""
                className="w-full h-full object-cover opacity-35 dark:invert filter contrast-125 scale-110 pointer-events-none"
              />
            </motion.div>

            {/* Liquid Glass Specular Refraction Shimmer Following Cursor */}
            <motion.div
              className="pointer-events-none absolute -inset-px z-0 rounded-[2.2rem]"
              style={{
                opacity,
                background: useTransform(
                  [smoothX, smoothY],
                  ([x, y]) =>
                    `radial-gradient(450px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.09), rgba(6, 182, 212, 0.06) 40%, transparent 80%)`
                ),
              }}
            />

            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative z-10 w-full flex flex-col justify-between min-h-[160px]"
              >
                <div>
                  <div className="text-white text-base md:text-lg font-bold mb-3 tracking-tight font-mono">
                    ./Tips {tip.number}
                  </div>

                  <p className="text-neutral-200 text-xs md:text-sm leading-relaxed mb-6 font-mono">
                    {tip.text}
                  </p>
                </div>

                <div className="text-right text-xs md:text-sm text-neutral-400 font-mono">
                  {tip.author}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
