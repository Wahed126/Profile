import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function HeroBackground() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [spotlightOpacity, setSpotlightOpacity] = useState(0);

  // Smooth springs for hardware-accelerated cursor tracking
  const rawCursorX = useMotionValue(0);
  const rawCursorY = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 280, damping: 26 };
  const smoothCursorX = useSpring(rawCursorX, springConfig);
  const smoothCursorY = useSpring(rawCursorY, springConfig);
  const springMouseX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springMouseY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handleMediaChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    const heroElement = document.getElementById('home');
    if (!heroElement || !containerRef.current) return;

    const handleHeroMouseMove = (e: MouseEvent) => {
      if (reducedMotion || isMobile || !containerRef.current) return;

      const heroRect = heroElement.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      // Active across hero section with a smooth bottom-edge transition buffer
      const isHeroInView = heroRect.top < window.innerHeight * 0.6 && heroRect.bottom > 80;
      const inHeroArea = isHeroInView && e.clientY >= 0 && e.clientY <= heroRect.bottom + 80;

      if (inHeroArea) {
        setIsHovering(true);

        // Smooth spotlight fade near bottom boundary instead of abrupt cutout
        const opacity = e.clientY <= heroRect.bottom 
          ? 1 
          : Math.max(0, 1 - (e.clientY - heroRect.bottom) / 80);
        setSpotlightOpacity(opacity);

        const x = e.clientX - containerRect.left;
        const y = e.clientY - containerRect.top;

        rawCursorX.set(x);
        rawCursorY.set(y);

        const screenCenterX = window.innerWidth / 2;
        const heroCenterY = heroRect.height / 2;
        const heroMouseY = e.clientY - heroRect.top;

        mouseX.set(((e.clientX - screenCenterX) / screenCenterX) * 8);
        mouseY.set(((heroMouseY - heroCenterY) / heroCenterY) * 8);
      } else {
        setIsHovering(false);
        setSpotlightOpacity(0);
        mouseX.set(0);
        mouseY.set(0);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setSpotlightOpacity(0);
      mouseX.set(0);
      mouseY.set(0);
    };

    window.addEventListener('mousemove', handleHeroMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleHeroMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [reducedMotion, isMobile]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-[calc(100%+80px)] pointer-events-none select-none overflow-hidden z-0 [mask-image:linear-gradient(to_bottom,black_82%,transparent_100%)]"
    >
      {/* 1. Accent #0891b2 Cursor Spotlight Glow */}
      {!reducedMotion && !isMobile && (
        <motion.div
          className="absolute w-[420px] h-[420px] rounded-full pointer-events-none transition-opacity duration-300 blur-3xl bg-[#0891b2]/20 dark:bg-[#0891b2]/30"
          style={{
            x: smoothCursorX,
            y: smoothCursorY,
            translateX: '-50%',
            translateY: '-50%',
            opacity: isHovering ? spotlightOpacity : 0,
          }}
        />
      )}

      {/* 2. Precision SVG Dynamic Blueprint Lines Traversing to Very End of Hero (120s-200s Ultra Slow Motion) */}
      <svg className="w-full h-full absolute inset-0">
        <g stroke="currentColor" fill="none" strokeWidth="0.85" className="text-neutral-400/30 dark:text-neutral-600/30">
          {/* Randomized Constellation Line 1 (Left Area - 120s Ultra Slow Motion) */}
          <motion.path
            animate={
              reducedMotion
                ? {}
                : {
                    d: [
                      "M 4% 80 Q 28% 440 12% 260 T 18% 680",
                      "M 26% 510 Q 8% 190 32% 580 T 10% 310",
                      "M 1% 20 Q 38% 420 6% 340 T 22% 720",
                      "M 4% 80 Q 28% 440 12% 260 T 18% 680",
                    ],
                    strokeDashoffset: [0, -300, -600, 0],
                  }
            }
            transition={{
              duration: 120,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            strokeDasharray="4 4"
          />

          {/* Randomized Constellation Line 2 (Right Area - 135s Ultra Slow Motion) */}
          <motion.path
            animate={
              reducedMotion
                ? {}
                : {
                    d: [
                      "M 98% 30 Q 72% 480 94% 290 T 82% 710",
                      "M 76% 550 Q 94% 140 80% 460 T 96% 220",
                      "M 90% 10 Q 64% 540 98% 380 T 74% 680",
                      "M 98% 30 Q 72% 480 94% 290 T 82% 710",
                    ],
                    strokeDashoffset: [0, 300, 600, 0],
                  }
            }
            transition={{
              duration: 135,
              delay: 3.0,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            strokeDasharray="3 3"
          />

          {/* Line 1: Randomized Start (Top-Left) -> End of Hero (150s Ultra Slow Motion) */}
          <motion.path
            animate={
              reducedMotion
                ? {}
                : {
                    d: [
                      "M -140 -20 Q 420 410 880 180 T 1820 680",
                      "M -60 380 Q 520 120 980 540 T 1820 740",
                      "M -200 -80 Q 280 520 740 260 T 1820 620",
                      "M -140 -20 Q 420 410 880 180 T 1820 680",
                    ],
                    strokeDashoffset: [0, -360, -720, 0],
                  }
            }
            transition={{
              duration: 150,
              delay: 1.5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            strokeDasharray="6 4"
            opacity="0.65"
          />

          {/* Line 2: Randomized Start (Mid-Left) -> End of Hero (165s Ultra Slow Motion) */}
          <motion.path
            animate={
              reducedMotion
                ? {}
                : {
                    d: [
                      "M -80 440 C 360 180, 720 610, 1900 320",
                      "M -180 310 C 480 440, 850 160, 1900 690",
                      "M -30 520 C 240 240, 680 480, 1900 750",
                      "M -80 440 C 360 180, 720 610, 1900 320",
                    ],
                    strokeDashoffset: [0, 360, 720, 0],
                  }
            }
            transition={{
              duration: 165,
              delay: 4.5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            strokeDasharray="4 4"
            opacity="0.55"
          />

          {/* Line 3: Randomized Start (Top Center-Left) -> End of Hero (180s Ultra Slow Motion) */}
          <motion.path
            animate={
              reducedMotion
                ? {}
                : {
                    d: [
                      "M 120 -80 Q 610 490 1150 280 T 1860 680",
                      "M -90 320 Q 480 380 980 630 T 1860 720",
                      "M 310 -140 Q 720 560 1250 210 T 1860 760",
                      "M 120 -80 Q 610 490 1150 280 T 1860 680",
                    ],
                    strokeDashoffset: [0, -360, 0],
                  }
            }
            transition={{
              duration: 180,
              delay: 2.5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            strokeDasharray="5 5"
            opacity="0.6"
          />

          {/* Line 4 (END OF HERO LINE): Traversing Bottom Boundary of Hero (200s Ultra Slow Motion) */}
          <motion.path
            animate={
              reducedMotion
                ? {}
                : {
                    d: [
                      "M -160 620 Q 520 480 1050 710 T 1880 690",
                      "M -50 720 Q 680 550 1180 690 T 1880 780",
                      "M -220 510 Q 380 640 920 570 T 1880 660",
                      "M -160 620 Q 520 480 1050 710 T 1880 690",
                    ],
                    strokeDashoffset: [0, 400, 0],
                  }
            }
            transition={{
              duration: 200,
              delay: 6.0,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            strokeDasharray="6 4"
            opacity="0.75"
          />
        </g>
      </svg>

      {/* 3. 11 Software Engineering Badges Floating Across Whole Hero Width & Height */}
      <motion.div
        style={{ x: springMouseX, y: springMouseY }}
        className="w-full h-full relative"
      >
        {/* ================= LEFT MARGIN BADGES (Steady Badge + Connecting Blueprint Line + Right Popover) ================= */}

        {/* 1. DOCKER NODE */}
        <motion.div
          animate={
            reducedMotion
              ? {}
              : {
                  y: [0, 25, -20, 15, 0],
                  x: [0, 30, -15, 20, 0],
                  rotate: [0, 1.5, -1, 1, 0],
                }
          }
          transition={{
            duration: 22,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          className="group absolute top-[50px] left-[4%] hidden xl:flex items-center gap-1.5 font-mono text-[10px] border border-border/60 bg-card/50 text-muted-foreground/80 px-2.5 py-1 rounded-full transition-all duration-300 backdrop-blur-md opacity-65 hover:opacity-100 hover:border-[#0891b2] hover:bg-[#0891b2]/20 hover:text-foreground hover:shadow-[0_0_12px_rgba(8,145,178,0.25)] hover:scale-105 cursor-pointer z-20"
        >
          <span className="text-[#0891b2] font-bold">docker:</span>
          <span>containerized</span>

          {/* Connecting Line & Popover Pill (to Right Open Space) */}
          <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 flex items-center opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-300 z-30">
            <div className="flex items-center w-6 relative shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0891b2] shadow-[0_0_8px_#0891b2]" />
              <span className="h-[1.5px] w-full bg-gradient-to-r from-[#0891b2] via-cyan-400 to-cyan-300" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#0891b2]" />
            </div>
            <span className="ml-1.5 whitespace-nowrap bg-background/95 text-[#0891b2] dark:text-cyan-300 border border-[#0891b2] px-2.5 py-0.5 rounded-full text-[9.5px] font-mono shadow-[0_0_12px_rgba(8,145,178,0.25)] backdrop-blur-md font-semibold">
              container: ready ✓
            </span>
          </div>
        </motion.div>

        {/* 2. GIT PUSH NODE */}
        <motion.div
          animate={
            reducedMotion
              ? {}
              : {
                  y: [0, -20, 30, -15, 0],
                  x: [0, 25, -20, 15, 0],
                  rotate: [0, -1.5, 1.2, -1, 0],
                }
          }
          transition={{
            duration: 26,
            delay: 2,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          className="group absolute top-[160px] left-[2%] hidden xl:flex items-center gap-1.5 font-mono text-[10px] border border-border/60 bg-card/40 text-muted-foreground/80 px-2.5 py-1 rounded-full transition-all duration-300 backdrop-blur-md opacity-65 hover:opacity-100 hover:border-[#0891b2] hover:bg-[#0891b2]/20 hover:text-foreground hover:shadow-[0_0_12px_rgba(8,145,178,0.25)] hover:scale-105 cursor-pointer z-20"
        >
          <span className="text-[#0891b2] font-bold">git:</span>
          <span>push</span>

          {/* Connecting Line & Popover Pill (to Right Open Space) */}
          <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 flex items-center opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-300 z-30">
            <div className="flex items-center w-6 relative shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0891b2] shadow-[0_0_8px_#0891b2]" />
              <span className="h-[1.5px] w-full bg-gradient-to-r from-[#0891b2] via-cyan-400 to-cyan-300" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#0891b2]" />
            </div>
            <span className="ml-1.5 whitespace-nowrap bg-background/95 text-[#0891b2] dark:text-cyan-300 border border-[#0891b2] px-2.5 py-0.5 rounded-full text-[9.5px] font-mono shadow-[0_0_12px_rgba(8,145,178,0.25)] backdrop-blur-md font-semibold">
              commit: 9f8a2d ✓
            </span>
          </div>
        </motion.div>

        {/* 3. API SYSTEM FLOW NODE */}
        <motion.div
          animate={
            reducedMotion
              ? {}
              : {
                  y: [0, 30, -25, 20, 0],
                  x: [0, -20, 25, -15, 0],
                  rotate: [0, 1.2, -1.5, 1, 0],
                }
          }
          transition={{
            duration: 24,
            delay: 1,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          className="group absolute top-[280px] left-[5%] hidden xl:flex items-center gap-2 font-mono text-[10px] border border-border/60 bg-card/40 text-muted-foreground/80 px-3 py-1 rounded-full transition-all duration-300 backdrop-blur-md opacity-65 hover:opacity-100 hover:border-[#0891b2] hover:bg-[#0891b2]/20 hover:text-foreground hover:shadow-[0_0_12px_rgba(8,145,178,0.25)] hover:scale-105 cursor-pointer z-20"
        >
          <span>API</span>
          <span className="text-muted-foreground/40">→</span>
          <span>Service</span>
          <span className="text-muted-foreground/40">→</span>
          <span className="text-[#0891b2] font-medium">UI</span>

          {/* Connecting Line & Popover Pill (to Right Open Space) */}
          <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 flex items-center opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-300 z-30">
            <div className="flex items-center w-6 relative shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0891b2] shadow-[0_0_8px_#0891b2]" />
              <span className="h-[1.5px] w-full bg-gradient-to-r from-[#0891b2] via-cyan-400 to-cyan-300" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#0891b2]" />
            </div>
            <span className="ml-1.5 whitespace-nowrap bg-background/95 text-[#0891b2] dark:text-cyan-300 border border-[#0891b2] px-2.5 py-0.5 rounded-full text-[9.5px] font-mono shadow-[0_0_12px_rgba(8,145,178,0.25)] backdrop-blur-md font-semibold">
              status: 200 OK ✓
            </span>
          </div>
        </motion.div>

        {/* 4. MAIN BUILD STATUS NODE */}
        <motion.div
          animate={
            reducedMotion
              ? {}
              : {
                  y: [0, -25, 20, -30, 0],
                  x: [0, 20, -25, 15, 0],
                  rotate: [0, -1.2, 1.5, -1, 0],
                }
          }
          transition={{
            duration: 28,
            delay: 3,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          className="group absolute top-[410px] left-[3%] hidden xl:flex items-center gap-2 font-mono text-[10px] border border-border/60 bg-card/40 text-muted-foreground/85 px-2.5 py-1 rounded-full transition-all duration-300 backdrop-blur-md opacity-65 hover:opacity-100 hover:border-[#0891b2] hover:bg-[#0891b2]/20 hover:text-foreground hover:shadow-[0_0_12px_rgba(8,145,178,0.25)] hover:scale-105 cursor-pointer z-20"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#0891b2] animate-pulse" />
          <span>main • v2.4</span>

          {/* Connecting Line & Popover Pill (to Right Open Space) */}
          <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 flex items-center opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-300 z-30">
            <div className="flex items-center w-6 relative shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0891b2] shadow-[0_0_8px_#0891b2]" />
              <span className="h-[1.5px] w-full bg-gradient-to-r from-[#0891b2] via-cyan-400 to-cyan-300" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#0891b2]" />
            </div>
            <span className="ml-1.5 whitespace-nowrap bg-background/95 text-[#0891b2] dark:text-cyan-300 border border-[#0891b2] px-2.5 py-0.5 rounded-full text-[9.5px] font-mono shadow-[0_0_12px_rgba(8,145,178,0.25)] backdrop-blur-md font-semibold">
              build: passing ✓
            </span>
          </div>
        </motion.div>

        {/* 5. SPRING BOOT & POSTGRESQL */}
        <motion.div
          animate={
            reducedMotion
              ? {}
              : {
                  y: [0, 20, -30, 15, 0],
                  x: [0, 25, -20, 10, 0],
                  rotate: [0, -1, 1.2, -1, 0],
                }
          }
          transition={{
            duration: 25,
            delay: 1.2,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          className="group absolute top-[100px] left-[15%] hidden xl:flex items-center gap-1.5 font-mono text-[9.5px] border border-border/50 bg-card/30 text-muted-foreground/70 px-2.5 py-1 rounded-full transition-all duration-300 backdrop-blur-md opacity-50 hover:opacity-100 hover:border-[#0891b2] hover:bg-[#0891b2]/20 hover:text-foreground hover:shadow-[0_0_12px_rgba(8,145,178,0.25)] hover:scale-105 cursor-pointer z-20"
        >
          <span className="text-[#0891b2] font-bold">spring boot</span>
          <span className="text-muted-foreground/40">•</span>
          <span>postgresql</span>

          {/* Connecting Line & Popover Pill (to Right Open Space) */}
          <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 flex items-center opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-300 z-30">
            <div className="flex items-center w-6 relative shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0891b2] shadow-[0_0_8px_#0891b2]" />
              <span className="h-[1.5px] w-full bg-gradient-to-r from-[#0891b2] via-cyan-400 to-cyan-300" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#0891b2]" />
            </div>
            <span className="ml-1.5 whitespace-nowrap bg-background/95 text-[#0891b2] dark:text-cyan-300 border border-[#0891b2] px-2.5 py-0.5 rounded-full text-[9.5px] font-mono shadow-[0_0_12px_rgba(8,145,178,0.25)] backdrop-blur-md font-semibold">
              backend: connected ✓
            </span>
          </div>
        </motion.div>

        {/* 6. PERFORMANCE & LIGHTHOUSE */}
        <motion.div
          animate={
            reducedMotion
              ? {}
              : {
                  y: [0, -30, 25, -15, 0],
                  x: [0, 20, -30, 15, 0],
                  rotate: [0, 1.2, -1, 1, 0],
                }
          }
          transition={{
            duration: 23,
            delay: 3.5,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          className="group absolute top-[340px] left-[13%] hidden xl:flex items-center gap-1.5 font-mono text-[9.5px] border border-border/50 bg-card/30 text-muted-foreground/70 px-2.5 py-1 rounded-full transition-all duration-300 backdrop-blur-md opacity-50 hover:opacity-100 hover:border-[#0891b2] hover:bg-[#0891b2]/20 hover:text-foreground hover:shadow-[0_0_12px_rgba(8,145,178,0.25)] hover:scale-105 cursor-pointer z-20"
        >
          <span>perf: 99/100</span>
          <span className="text-muted-foreground/40">•</span>
          <span className="text-[#0891b2] font-medium">lighthouse</span>

          {/* Connecting Line & Popover Pill (to Right Open Space) */}
          <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 flex items-center opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-300 z-30">
            <div className="flex items-center w-6 relative shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0891b2] shadow-[0_0_8px_#0891b2]" />
              <span className="h-[1.5px] w-full bg-gradient-to-r from-[#0891b2] via-cyan-400 to-cyan-300" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#0891b2]" />
            </div>
            <span className="ml-1.5 whitespace-nowrap bg-background/95 text-[#0891b2] dark:text-cyan-300 border border-[#0891b2] px-2.5 py-0.5 rounded-full text-[9.5px] font-mono shadow-[0_0_12px_rgba(8,145,178,0.25)] backdrop-blur-md font-semibold">
              lcp: 1.1s ✓
            </span>
          </div>
        </motion.div>


        {/* ================= RIGHT MARGIN BADGES (Steady Badge + Connecting Blueprint Line + Left Popover) ================= */}

        {/* 7. DESIGN TO CODE DEPLOY NODE */}
        <motion.div
          animate={
            reducedMotion
              ? {}
              : {
                  y: [0, 25, -20, 15, 0],
                  x: [0, -30, 20, -15, 0],
                  rotate: [0, 1.5, -1.2, 1, 0],
                }
          }
          transition={{
            duration: 25,
            delay: 0.5,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          className="group absolute top-[70px] right-[4%] hidden xl:flex items-center gap-1.5 font-mono text-[10px] border border-border/60 bg-card/50 text-muted-foreground/80 px-2.5 py-1 rounded-md transition-all duration-300 backdrop-blur-md opacity-65 hover:opacity-100 hover:border-[#0891b2] hover:bg-[#0891b2]/20 hover:text-foreground hover:shadow-[0_0_12px_rgba(8,145,178,0.25)] hover:scale-105 cursor-pointer z-20"
        >
          <span>design</span>
          <span className="text-muted-foreground/40">→</span>
          <span className="text-[#0891b2] font-medium">code</span>

          {/* Connecting Line & Popover Pill (to Left Open Space) */}
          <div className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 flex items-center flex-row-reverse opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300 z-30">
            <div className="flex items-center w-6 relative shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0891b2] shadow-[0_0_8px_#0891b2]" />
              <span className="h-[1.5px] w-full bg-gradient-to-r from-cyan-300 via-cyan-400 to-[#0891b2]" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#0891b2]" />
            </div>
            <span className="mr-1.5 whitespace-nowrap bg-background/95 text-[#0891b2] dark:text-cyan-300 border border-[#0891b2] px-2.5 py-0.5 rounded-full text-[9.5px] font-mono shadow-[0_0_12px_rgba(8,145,178,0.25)] backdrop-blur-md font-semibold">
              deploy: success ✓
            </span>
          </div>
        </motion.div>

        {/* 8. ASYNC COMPONENT NODE */}
        <motion.div
          animate={
            reducedMotion
              ? {}
              : {
                  y: [0, -25, 30, -15, 0],
                  x: [0, -20, 25, -10, 0],
                  rotate: [0, -1.2, 1.5, -1, 0],
                }
          }
          transition={{
            duration: 29,
            delay: 2.5,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          className="group absolute top-[190px] right-[7%] hidden xl:flex items-center gap-2 font-mono text-[10px] border border-border/60 bg-card/50 text-muted-foreground/85 px-2.5 py-1 rounded-lg transition-all duration-300 backdrop-blur-md opacity-65 hover:opacity-100 hover:border-[#0891b2] hover:bg-[#0891b2]/20 hover:text-foreground hover:shadow-[0_0_12px_rgba(8,145,178,0.25)] hover:scale-105 cursor-pointer z-20"
        >
          <span>{'<AsyncComponent />'}</span>

          {/* Connecting Line & Popover Pill (to Left Open Space) */}
          <div className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 flex items-center flex-row-reverse opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300 z-30">
            <div className="flex items-center w-6 relative shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0891b2] shadow-[0_0_8px_#0891b2]" />
              <span className="h-[1.5px] w-full bg-gradient-to-r from-cyan-300 via-cyan-400 to-[#0891b2]" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#0891b2]" />
            </div>
            <span className="mr-1.5 whitespace-nowrap bg-background/95 text-[#0891b2] dark:text-cyan-300 border border-[#0891b2] px-2.5 py-0.5 rounded-full text-[9.5px] font-mono shadow-[0_0_12px_rgba(8,145,178,0.25)] backdrop-blur-md font-semibold">
              bundle: 4.2kB ✓
            </span>
          </div>
        </motion.div>

        {/* 9. STATE FLOW NODE */}
        <motion.div
          animate={
            reducedMotion
              ? {}
              : {
                  y: [0, -30, 20, -25, 0],
                  x: [0, -25, 30, -15, 0],
                  rotate: [0, 1.5, -1, 1.2, 0],
                }
          }
          transition={{
            duration: 27,
            delay: 4,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          className="group absolute top-[350px] right-[2%] hidden xl:flex items-center gap-1.5 font-mono text-[10px] border border-border/60 bg-card/50 text-muted-foreground/80 px-2.5 py-1 rounded-md transition-all duration-300 backdrop-blur-md opacity-65 hover:opacity-100 hover:border-[#0891b2] hover:bg-[#0891b2]/20 hover:text-foreground hover:shadow-[0_0_12px_rgba(8,145,178,0.25)] hover:scale-105 cursor-pointer z-20"
        >
          <span className="text-[9px] text-[#0891b2] font-bold">state</span>
          <span>→</span>
          <span>view</span>

          {/* Connecting Line & Popover Pill (to Left Open Space) */}
          <div className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 flex items-center flex-row-reverse opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300 z-30">
            <div className="flex items-center w-6 relative shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0891b2] shadow-[0_0_8px_#0891b2]" />
              <span className="h-[1.5px] w-full bg-gradient-to-r from-cyan-300 via-cyan-400 to-[#0891b2]" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#0891b2]" />
            </div>
            <span className="mr-1.5 whitespace-nowrap bg-background/95 text-[#0891b2] dark:text-cyan-300 border border-[#0891b2] px-2.5 py-0.5 rounded-full text-[9.5px] font-mono shadow-[0_0_12px_rgba(8,145,178,0.25)] backdrop-blur-md font-semibold">
              sync: reactive ✓
            </span>
          </div>
        </motion.div>

        {/* 10. PLAYWRIGHT & TESTING */}
        <motion.div
          animate={
            reducedMotion
              ? {}
              : {
                  y: [0, 20, -25, 15, 0],
                  x: [0, -25, 20, -10, 0],
                  rotate: [0, -1, 1.2, -1, 0],
                }
          }
          transition={{
            duration: 31,
            delay: 2.1,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          className="group absolute top-[130px] right-[16%] hidden xl:flex items-center gap-1.5 font-mono text-[9.5px] border border-border/50 bg-card/30 text-muted-foreground/70 px-2.5 py-1 rounded-full transition-all duration-300 backdrop-blur-md opacity-50 hover:opacity-100 hover:border-[#0891b2] hover:bg-[#0891b2]/20 hover:text-foreground hover:shadow-[0_0_12px_rgba(8,145,178,0.25)] hover:scale-105 cursor-pointer z-20"
        >
          <span>playwright</span>
          <span className="text-muted-foreground/40">•</span>
          <span className="text-[#0891b2] font-medium">unit test</span>

          {/* Connecting Line & Popover Pill (to Left Open Space) */}
          <div className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 flex items-center flex-row-reverse opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300 z-30">
            <div className="flex items-center w-6 relative shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0891b2] shadow-[0_0_8px_#0891b2]" />
              <span className="h-[1.5px] w-full bg-gradient-to-r from-cyan-300 via-cyan-400 to-[#0891b2]" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#0891b2]" />
            </div>
            <span className="mr-1.5 whitespace-nowrap bg-background/95 text-[#0891b2] dark:text-cyan-300 border border-[#0891b2] px-2.5 py-0.5 rounded-full text-[9.5px] font-mono shadow-[0_0_12px_rgba(8,145,178,0.25)] backdrop-blur-md font-semibold">
              test: 100% pass ✓
            </span>
          </div>
        </motion.div>

        {/* 11. TAILWIND & CSS TOKENS */}
        <motion.div
          animate={
            reducedMotion
              ? {}
              : {
                  y: [0, -25, 30, -15, 0],
                  x: [0, -20, 25, -10, 0],
                  rotate: [0, 1.2, -1, 1, 0],
                }
          }
          transition={{
            duration: 26,
            delay: 0.9,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          className="group absolute top-[370px] right-[13%] hidden xl:flex items-center gap-1.5 font-mono text-[9.5px] border border-border/50 bg-card/30 text-muted-foreground/70 px-2.5 py-1 rounded-full transition-all duration-300 backdrop-blur-md opacity-50 hover:opacity-100 hover:border-[#0891b2] hover:bg-[#0891b2]/20 hover:text-foreground hover:shadow-[0_0_12px_rgba(8,145,178,0.25)] hover:scale-105 cursor-pointer z-20"
        >
          <span className="text-[#0891b2] font-bold">tokens: css</span>
          <span className="text-muted-foreground/40">•</span>
          <span>tailwind</span>

          {/* Connecting Line & Popover Pill (to Left Open Space) */}
          <div className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 flex items-center flex-row-reverse opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300 z-30">
            <div className="flex items-center w-6 relative shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0891b2] shadow-[0_0_8px_#0891b2]" />
              <span className="h-[1.5px] w-full bg-gradient-to-r from-cyan-300 via-cyan-400 to-[#0891b2]" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#0891b2]" />
            </div>
            <span className="mr-1.5 whitespace-nowrap bg-background/95 text-[#0891b2] dark:text-cyan-300 border border-[#0891b2] px-2.5 py-0.5 rounded-full text-[9.5px] font-mono shadow-[0_0_12px_rgba(8,145,178,0.25)] backdrop-blur-md font-semibold">
              design tokens v4 ✓
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
