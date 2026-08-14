import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function HeroBackground() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

      const inHeroArea = e.clientY >= heroRect.top - 80 && e.clientY <= heroRect.bottom + 80;

      if (inHeroArea) {
        setIsHovering(true);

        const x = e.clientX - containerRect.left;
        const y = e.clientY - containerRect.top;

        rawCursorX.set(x);
        rawCursorY.set(y);

        const screenCenterX = window.innerWidth / 2;
        const heroCenterY = heroRect.height / 2;
        const heroMouseY = e.clientY - heroRect.top;

        mouseX.set(((e.clientX - screenCenterX) / screenCenterX) * 8);
        mouseY.set(((heroMouseY - heroCenterY) / heroCenterY) * 8);

        // Responsive node positions for 11 software engineering background badges
        const w = containerRect.width;
        const nodePositions = [
          { id: 'degree', x: w * 0.11, y: 40 },
          { id: 'git', x: w * 0.025, y: 140 },
          { id: 'system', x: w * 0.075, y: 260 },
          { id: 'build', x: w * 0.03, y: 390 },
          { id: 'spring', x: w * 0.22, y: 110 },
          { id: 'perf', x: w * 0.18, y: 310 },
          { id: 'deploy', x: w * 0.955, y: 60 },
          { id: 'component', x: w * 0.895, y: 190 },
          { id: 'state', x: w * 0.98, y: 340 },
          { id: 'test', x: w * 0.76, y: 140 },
          { id: 'tokens', x: w * 0.82, y: 360 },
        ];

        let closestId: string | null = null;
        let minDistance = 220;

        nodePositions.forEach((node) => {
          const dist = Math.hypot(x - node.x, y - node.y);
          if (dist < minDistance) {
            minDistance = dist;
            closestId = node.id;
          }
        });

        setActiveNode(closestId);
      } else {
        setIsHovering(false);
        setActiveNode(null);
        mouseX.set(0);
        mouseY.set(0);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setActiveNode(null);
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
      className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-full pointer-events-none select-none overflow-hidden z-0"
    >
      {/* 1. Accent #0891b2 Cursor Spotlight Glow */}
      {!reducedMotion && !isMobile && (
        <motion.div
          className="absolute w-[420px] h-[420px] rounded-full pointer-events-none transition-opacity duration-500 blur-3xl bg-[#0891b2]/20 dark:bg-[#0891b2]/30"
          style={{
            x: smoothCursorX,
            y: smoothCursorY,
            translateX: '-50%',
            translateY: '-50%',
            opacity: isHovering ? 1 : 0,
          }}
        />
      )}

      {/* 2. Precision SVG Vector Blueprint Network */}
      <svg className="w-full h-full absolute inset-0">
        <defs>
          <pattern
            id="hero-dot-grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="16"
              cy="16"
              r="0.75"
              className="fill-neutral-400/30 dark:fill-neutral-600/30"
            />
          </pattern>
        </defs>

        {/* Minimal dot grid background */}
        <rect width="100%" height="100%" fill="url(#hero-dot-grid)" opacity="0.85" />

        {/* Dynamic blueprint lines in negative space */}
        <g stroke="currentColor" fill="none" strokeWidth="0.75" className="text-neutral-400/25 dark:text-neutral-600/25">
          <path d="M 11% 40 Q 2% 90 2.5% 140" strokeDasharray="3 3" />
          <path d="M 2.5% 140 Q 9% 200 7.5% 260" strokeDasharray="3 3" />
          <path d="M 7.5% 260 Q 1% 330 3% 390" strokeDasharray="3 3" />
          <path d="M 95.5% 60 Q 88% 125 89.5% 190" strokeDasharray="3 3" />
          <path d="M 89.5% 190 Q 99% 265 98% 340" strokeDasharray="3 3" />
        </g>
      </svg>

      {/* 3. 11 Software Engineering Badges Floating & Traversing Across Entire Hero Width & Height */}
      <motion.div
        style={{ x: springMouseX, y: springMouseY }}
        className="w-full h-full relative"
      >
        {/* ================= LEFT MARGIN BADGES ================= */}

        {/* 1. DOCKER NODE (Full Hero Traversal 26s) */}
        <motion.div
          animate={
            reducedMotion
              ? {}
              : {
                  y: [0, 180, -40, 260, 90, 0],
                  x: [0, 140, -60, 200, -80, 0],
                  rotate: [0, 2, -1.5, 2.5, -1, 0],
                }
          }
          transition={{
            duration: 26,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          className={`absolute top-[40px] left-[11%] hidden xl:flex items-center gap-1.5 font-mono text-[10px] border px-2.5 py-1 rounded-full transition-all duration-300 backdrop-blur-md opacity-70 hover:opacity-100 ${
            activeNode === 'degree'
              ? 'border-[#0891b2] bg-[#0891b2]/20 text-[#0891b2] dark:text-cyan-300 shadow-sm shadow-[#0891b2]/20 scale-105 opacity-100'
              : 'border-border/60 bg-card/50 text-muted-foreground/80'
          }`}
        >
          <span className="text-[#0891b2] font-bold">docker:</span>
          <span>{activeNode === 'degree' ? 'container: ready' : 'containerized'}</span>
        </motion.div>

        {/* 2. GIT PUSH NODE (Full Hero Traversal 30s) */}
        <motion.div
          animate={
            reducedMotion
              ? {}
              : {
                  y: [0, -90, 220, -50, 160, 0],
                  x: [0, 220, -40, 180, -100, 0],
                  rotate: [0, -2.5, 2, -1.8, 1, 0],
                }
          }
          transition={{
            duration: 30,
            delay: 2,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          className={`absolute top-[140px] left-[2.5%] hidden xl:flex items-center gap-1.5 font-mono text-[10px] border px-2.5 py-1 rounded-full transition-all duration-300 backdrop-blur-md opacity-70 hover:opacity-100 ${
            activeNode === 'git'
              ? 'border-[#0891b2] bg-[#0891b2]/20 text-[#0891b2] dark:text-cyan-300 shadow-sm shadow-[#0891b2]/20 scale-105 opacity-100'
              : 'border-border/60 bg-card/40 text-muted-foreground/80'
          }`}
        >
          <span className="text-[#0891b2] font-bold">git:</span>
          <span>{activeNode === 'git' ? 'commit: 9f8a2d' : 'push'}</span>
        </motion.div>

        {/* 3. API SYSTEM FLOW NODE (Full Hero Traversal 28s) */}
        <motion.div
          animate={
            reducedMotion
              ? {}
              : {
                  y: [0, 160, -120, 200, -60, 0],
                  x: [0, -160, 120, -180, 80, 0],
                  rotate: [0, 1.8, -2.2, 1.5, 0],
                }
          }
          transition={{
            duration: 28,
            delay: 1,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          className={`absolute top-[260px] left-[7.5%] hidden xl:flex items-center gap-2 font-mono text-[10px] border px-3 py-1 rounded-full transition-all duration-300 backdrop-blur-md opacity-70 hover:opacity-100 ${
            activeNode === 'system'
              ? 'border-[#0891b2] bg-[#0891b2]/20 text-[#0891b2] dark:text-cyan-300 shadow-sm shadow-[#0891b2]/20 scale-105 opacity-100'
              : 'border-border/60 bg-card/40 text-muted-foreground/80'
          }`}
        >
          <span>API</span>
          <span className="text-muted-foreground/40">→</span>
          <span>Service</span>
          <span className="text-muted-foreground/40">→</span>
          <span className="text-[#0891b2] font-medium">UI</span>
        </motion.div>

        {/* 4. MAIN BUILD STATUS NODE (Full Hero Traversal 32s) */}
        <motion.div
          animate={
            reducedMotion
              ? {}
              : {
                  y: [0, -220, 90, -180, 140, 0],
                  x: [0, 180, -120, 240, -60, 0],
                  rotate: [0, -2, 2.5, -1.5, 0],
                }
          }
          transition={{
            duration: 32,
            delay: 3,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          className={`absolute top-[390px] left-[3%] hidden xl:flex items-center gap-2 font-mono text-[10px] border px-2.5 py-1 rounded-full transition-all duration-300 backdrop-blur-md opacity-70 hover:opacity-100 ${
            activeNode === 'build'
              ? 'border-[#0891b2] bg-[#0891b2]/20 text-[#0891b2] dark:text-cyan-300 shadow-sm shadow-[#0891b2]/20 scale-105 opacity-100'
              : 'border-border/60 bg-card/40 text-muted-foreground/85'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#0891b2] animate-pulse" />
          <span>{activeNode === 'build' ? 'build: passing ✓' : 'main • v2.4'}</span>
        </motion.div>

        {/* 5. NEW SUBTLE BACKGROUND BADGE: SPRING BOOT & POSTGRESQL (Lower Opacity: 35%) */}
        <motion.div
          animate={
            reducedMotion
              ? {}
              : {
                  y: [0, 210, -130, 190, -70, 0],
                  x: [0, 160, -120, 210, -90, 0],
                  rotate: [0, -1.8, 2.1, -1.2, 0],
                }
          }
          transition={{
            duration: 31,
            delay: 1.2,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          className={`absolute top-[110px] left-[22%] hidden xl:flex items-center gap-1.5 font-mono text-[9.5px] border px-2.5 py-1 rounded-full transition-all duration-300 backdrop-blur-md opacity-35 hover:opacity-100 ${
            activeNode === 'spring'
              ? 'border-[#0891b2] bg-[#0891b2]/20 text-[#0891b2] dark:text-cyan-300 shadow-sm shadow-[#0891b2]/20 scale-105 opacity-100'
              : 'border-border/50 bg-card/30 text-muted-foreground/70'
          }`}
        >
          <span className="text-[#0891b2] font-bold">spring boot</span>
          <span className="text-muted-foreground/40">•</span>
          <span>postgresql</span>
        </motion.div>

        {/* 6. NEW SUBTLE BACKGROUND BADGE: PERFORMANCE & LIGHTHOUSE (Lower Opacity: 40%) */}
        <motion.div
          animate={
            reducedMotion
              ? {}
              : {
                  y: [0, -180, 140, -210, 80, 0],
                  x: [0, 190, -140, 170, -60, 0],
                  rotate: [0, 1.5, -2, 1.3, 0],
                }
          }
          transition={{
            duration: 25,
            delay: 3.5,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          className={`absolute top-[310px] left-[18%] hidden xl:flex items-center gap-1.5 font-mono text-[9.5px] border px-2.5 py-1 rounded-full transition-all duration-300 backdrop-blur-md opacity-40 hover:opacity-100 ${
            activeNode === 'perf'
              ? 'border-[#0891b2] bg-[#0891b2]/20 text-[#0891b2] dark:text-cyan-300 shadow-sm shadow-[#0891b2]/20 scale-105 opacity-100'
              : 'border-border/50 bg-card/30 text-muted-foreground/70'
          }`}
        >
          <span>perf: 99/100</span>
          <span className="text-muted-foreground/40">•</span>
          <span className="text-[#0891b2] font-medium">{activeNode === 'perf' ? 'lcp: 1.1s ✓' : 'lighthouse'}</span>
        </motion.div>


        {/* ================= RIGHT MARGIN BADGES ================= */}

        {/* 7. DESIGN TO CODE DEPLOY NODE (Full Hero Traversal 24s) */}
        <motion.div
          animate={
            reducedMotion
              ? {}
              : {
                  y: [0, 210, -80, 260, -120, 0],
                  x: [0, -200, 100, -240, 80, 0],
                  rotate: [0, 2.2, -1.8, 2, 0],
                }
          }
          transition={{
            duration: 24,
            delay: 0.5,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          className={`absolute top-[60px] right-[4.5%] hidden xl:flex items-center gap-1.5 font-mono text-[10px] border px-2.5 py-1 rounded-md transition-all duration-300 backdrop-blur-md opacity-70 hover:opacity-100 ${
            activeNode === 'deploy'
              ? 'border-[#0891b2] bg-[#0891b2]/20 text-[#0891b2] dark:text-cyan-300 shadow-sm shadow-[#0891b2]/20 scale-105 opacity-100'
              : 'border-border/60 bg-card/50 text-muted-foreground/80'
          }`}
        >
          <span>design</span>
          <span className="text-muted-foreground/40">→</span>
          <span className="text-[#0891b2] font-medium">{activeNode === 'deploy' ? 'deploy: success' : 'code'}</span>
        </motion.div>

        {/* 8. ASYNC COMPONENT NODE (Full Hero Traversal 29s) */}
        <motion.div
          animate={
            reducedMotion
              ? {}
              : {
                  y: [0, -160, 180, -90, 210, 0],
                  x: [0, -140, 160, -180, 90, 0],
                  rotate: [0, -2, 1.8, -2.2, 0],
                }
          }
          transition={{
            duration: 29,
            delay: 2.5,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          className={`absolute top-[190px] right-[10.5%] hidden xl:flex items-center gap-2 font-mono text-[10px] border px-2.5 py-1 rounded-lg transition-all duration-300 backdrop-blur-md opacity-70 hover:opacity-100 ${
            activeNode === 'component'
              ? 'border-[#0891b2] bg-[#0891b2]/20 text-[#0891b2] dark:text-cyan-300 shadow-sm shadow-[#0891b2]/20 scale-105 opacity-100'
              : 'border-border/60 bg-card/50 text-muted-foreground/85'
          }`}
        >
          <span>{activeNode === 'component' ? 'bundle: 4.2kB' : '<AsyncComponent />'}</span>
        </motion.div>

        {/* 9. STATE FLOW NODE (Full Hero Traversal 27s) */}
        <motion.div
          animate={
            reducedMotion
              ? {}
              : {
                  y: [0, -240, 110, -190, 80, 0],
                  x: [0, -220, 140, -160, 60, 0],
                  rotate: [0, 2, -2.4, 1.6, 0],
                }
          }
          transition={{
            duration: 27,
            delay: 4,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          className={`absolute top-[340px] right-[2%] hidden xl:flex items-center gap-1.5 font-mono text-[10px] border px-2.5 py-1 rounded-md transition-all duration-300 backdrop-blur-md opacity-70 hover:opacity-100 ${
            activeNode === 'state'
              ? 'border-[#0891b2] bg-[#0891b2]/20 text-[#0891b2] dark:text-cyan-300 shadow-sm shadow-[#0891b2]/20 scale-105 opacity-100'
              : 'border-border/60 bg-card/50 text-muted-foreground/80'
          }`}
        >
          <span className="text-[9px] text-[#0891b2] font-bold">state</span>
          <span>→</span>
          <span>view</span>
        </motion.div>

        {/* 10. NEW SUBTLE BACKGROUND BADGE: PLAYWRIGHT & TESTING (Lower Opacity: 35%) */}
        <motion.div
          animate={
            reducedMotion
              ? {}
              : {
                  y: [0, 190, -150, 220, -80, 0],
                  x: [0, -180, 130, -210, 70, 0],
                  rotate: [0, -1.6, 2.2, -1.4, 0],
                }
          }
          transition={{
            duration: 33,
            delay: 2.1,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          className={`absolute top-[140px] right-[24%] hidden xl:flex items-center gap-1.5 font-mono text-[9.5px] border px-2.5 py-1 rounded-full transition-all duration-300 backdrop-blur-md opacity-35 hover:opacity-100 ${
            activeNode === 'test'
              ? 'border-[#0891b2] bg-[#0891b2]/20 text-[#0891b2] dark:text-cyan-300 shadow-sm shadow-[#0891b2]/20 scale-105 opacity-100'
              : 'border-border/50 bg-card/30 text-muted-foreground/70'
          }`}
        >
          <span>playwright</span>
          <span className="text-muted-foreground/40">•</span>
          <span className="text-[#0891b2] font-medium">{activeNode === 'test' ? 'test: 100% pass' : 'unit test'}</span>
        </motion.div>

        {/* 11. NEW SUBTLE BACKGROUND BADGE: TAILWIND & CSS TOKENS (Lower Opacity: 40%) */}
        <motion.div
          animate={
            reducedMotion
              ? {}
              : {
                  y: [0, -200, 130, -170, 90, 0],
                  x: [0, -160, 110, -190, 60, 0],
                  rotate: [0, 1.7, -1.9, 1.2, 0],
                }
          }
          transition={{
            duration: 27,
            delay: 0.9,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
          className={`absolute top-[360px] right-[18%] hidden xl:flex items-center gap-1.5 font-mono text-[9.5px] border px-2.5 py-1 rounded-full transition-all duration-300 backdrop-blur-md opacity-40 hover:opacity-100 ${
            activeNode === 'tokens'
              ? 'border-[#0891b2] bg-[#0891b2]/20 text-[#0891b2] dark:text-cyan-300 shadow-sm shadow-[#0891b2]/20 scale-105 opacity-100'
              : 'border-border/50 bg-card/30 text-muted-foreground/70'
          }`}
        >
          <span className="text-[#0891b2] font-bold">tokens: css</span>
          <span className="text-muted-foreground/40">•</span>
          <span>tailwind</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
