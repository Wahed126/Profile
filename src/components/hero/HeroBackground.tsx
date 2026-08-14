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

      // Active across the entire screen width within the hero section height
      const inHeroArea = e.clientY >= heroRect.top - 80 && e.clientY <= heroRect.bottom + 80;

      if (inHeroArea) {
        setIsHovering(true);

        // Exact 1:1 mouse coordinates across full screen width
        const x = e.clientX - containerRect.left;
        const y = e.clientY - containerRect.top;

        rawCursorX.set(x);
        rawCursorY.set(y);

        const screenCenterX = window.innerWidth / 2;
        const heroCenterY = heroRect.height / 2;
        const heroMouseY = e.clientY - heroRect.top;

        mouseX.set(((e.clientX - screenCenterX) / screenCenterX) * 8);
        mouseY.set(((heroMouseY - heroCenterY) / heroCenterY) * 8);

        // Responsive node positions for software engineering concepts
        const w = containerRect.width;
        const nodePositions = [
          { id: 'build', x: w * 0.08, y: 55 },
          { id: 'state', x: w * 0.04, y: 290 },
          { id: 'component', x: w * 0.88, y: 75 },
          { id: 'system', x: w * 0.94, y: 230 },
        ];

        let closestId: string | null = null;
        let minDistance = 200;

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
      {/* 1. Subtle Radial Glow spotlight following cursor */}
      {!reducedMotion && !isMobile && (
        <motion.div
          className="absolute w-[360px] h-[360px] rounded-full pointer-events-none transition-opacity duration-500 blur-3xl bg-emerald-500/10 dark:bg-emerald-400/15"
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

        {/* Subtle dashed vector blueprint lines in negative space */}
        <g stroke="currentColor" fill="none" strokeWidth="0.75" className="text-neutral-400/25 dark:text-neutral-600/25">
          <path d="M 4% 55 Q 8% 180 4% 290" strokeDasharray="3 3" />
          <path d="M 88% 75 Q 92% 150 94% 230" strokeDasharray="3 3" />
          <path d="M 4% 290 Q 20% 320 35% 340" strokeDasharray="4 4" opacity="0.4" />
          <path d="M 94% 230 Q 80% 280 65% 320" strokeDasharray="4 4" opacity="0.4" />
        </g>
      </svg>

      {/* 3. Software Engineering Blueprint Badges positioned strictly in outer negative space */}
      <motion.div
        style={{ x: springMouseX, y: springMouseY }}
        className="w-full h-full relative"
      >
        {/* ================= LEFT NEGATIVE SPACE MARGIN ================= */}

        {/* TOP-LEFT NODE: CI/CD & Build Status */}
        <div
          className={`absolute top-[55px] left-[8.5%] hidden xl:flex items-center gap-2 font-mono text-[10px] border px-2.5 py-1 rounded-full transition-all duration-300 backdrop-blur-sm ${
            activeNode === 'build'
              ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-sm shadow-emerald-500/10 scale-105'
              : 'border-border/60 bg-card/40 text-muted-foreground/80'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>{activeNode === 'build' ? 'build: passing ✓' : 'main • v2.4'}</span>
        </div>

        {/* MID-LEFT NODE: Architecture & State Flow */}
        <div
          className={`absolute top-[290px] left-[4%] hidden xl:flex items-center gap-1.5 font-mono text-[10px] border px-2.5 py-1 rounded-md transition-all duration-300 backdrop-blur-sm ${
            activeNode === 'state'
              ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-sm shadow-emerald-500/10 scale-105'
              : 'border-border/60 bg-card/40 text-muted-foreground/75'
          }`}
        >
          <span className="text-[9px] text-emerald-500/80 font-bold">state</span>
          <span>→</span>
          <span>view</span>
        </div>

        {/* ================= RIGHT NEGATIVE SPACE MARGIN ================= */}

        {/* TOP-RIGHT NODE: Async Component & Bundle Size */}
        <div
          className={`absolute top-[75px] right-[12.5%] hidden xl:flex items-center gap-2 font-mono text-[10px] border px-2.5 py-1 rounded-lg transition-all duration-300 backdrop-blur-sm ${
            activeNode === 'component'
              ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-sm shadow-emerald-500/10 scale-105'
              : 'border-border/60 bg-card/40 text-muted-foreground/80'
          }`}
        >
          <span>{activeNode === 'component' ? 'bundle: 4.2kB' : '<AsyncComponent />'}</span>
        </div>

        {/* MID-RIGHT NODE: Full-Stack System Flow */}
        <div
          className={`absolute top-[230px] right-[4%] hidden xl:flex items-center gap-2 font-mono text-[10px] border px-3 py-1 rounded-full transition-all duration-300 backdrop-blur-sm ${
            activeNode === 'system'
              ? 'border-emerald-500/60 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-sm shadow-emerald-500/10 scale-105'
              : 'border-border/60 bg-card/40 text-muted-foreground/75'
          }`}
        >
          <span>API</span>
          <span className="text-muted-foreground/40">→</span>
          <span>Service</span>
          <span className="text-muted-foreground/40">→</span>
          <span className="text-emerald-500 font-medium">UI</span>
        </div>
      </motion.div>
    </div>
  );
}
