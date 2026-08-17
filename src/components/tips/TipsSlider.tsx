import { useState, useRef, useEffect, type MouseEvent } from 'react';
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
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30);
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
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  };

  // Typewriter effect & live 30s countdown timer after typing finishes
  useEffect(() => {
    if (!tip || !tip.text) return;

    let charIndex = 0;
    setDisplayedText('');
    setIsTyping(true);
    setTimeLeft(30);

    let typingInterval: NodeJS.Timeout | null = null;
    let countdownInterval: NodeJS.Timeout | null = null;

    const charSpeed = 22; // 22ms per character typing speed

    typingInterval = setInterval(() => {
      charIndex++;
      setDisplayedText(tip.text.slice(0, charIndex));

      if (charIndex >= tip.text.length) {
        if (typingInterval) clearInterval(typingInterval);
        setIsTyping(false);

        // Start live 30s countdown timer
        countdownInterval = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              if (countdownInterval) clearInterval(countdownInterval);
              paginate(1);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    }, charSpeed);

    return () => {
      if (typingInterval) clearInterval(typingInterval);
      if (countdownInterval) clearInterval(countdownInterval);
    };
  }, [page, tip?.text]);

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
        <motion.div
          className="lg:col-span-6 flex justify-start items-center"
          initial={{ opacity: 0, x: -36, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src="/images/illustrations/octopus-light.png"
            alt="Tip illustration light mode"
            className="w-full max-w-[320px] md:max-w-[360px] h-auto object-contain opacity-90 block dark:hidden"
            loading="lazy"
          />
          <img
            src="/images/illustrations/octopus-dark.png"
            alt="Tip illustration dark mode"
            className="w-full max-w-[320px] md:max-w-[360px] h-auto object-contain opacity-95 hidden dark:block"
            loading="lazy"
          />
        </motion.div>

        {/* Right Column: Clean Pitch-Black Tip Card with Interactive Spotlight Octopus Reveal */}
        <motion.div
          className="lg:col-span-6 flex justify-end w-full"
          initial={{ opacity: 0, x: 36, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
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
                src="/images/illustrations/octopus-dark.png"
                alt=""
                className="w-full h-full object-cover opacity-40 filter contrast-125 scale-110 pointer-events-none"
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
                  <div className="text-white text-base md:text-lg font-bold mb-3 tracking-tight font-mono flex items-center justify-between">
                    <span>./Tips {tip.number}</span>
                    <span className="text-[11px] text-[#0891b2] dark:text-cyan-400 border border-[#0891b2]/40 bg-[#0891b2]/10 px-2.5 py-0.5 rounded-full font-mono font-medium shadow-sm backdrop-blur-sm">
                      {isTyping ? (
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0891b2] dark:bg-cyan-400 animate-ping" />
                          typing...
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          next in {timeLeft}s
                        </span>
                      )}
                    </span>
                  </div>

                  <p className="text-neutral-200 text-xs md:text-sm leading-relaxed mb-6 font-mono min-h-[4rem]">
                    {displayedText}
                    <span className={`inline-block w-1.5 h-4 ml-1 bg-[#0891b2] dark:bg-cyan-400 align-middle ${isTyping ? 'animate-pulse' : 'opacity-40'}`} />
                  </p>
                </div>

                <div className="text-right text-xs md:text-sm text-neutral-400 font-mono">
                  {tip.author}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
