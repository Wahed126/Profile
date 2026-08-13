import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function HeroBackground() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for smooth cursor parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for 95% calm, 5% response
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  const cursorX = useSpring(0, { stiffness: 60, damping: 30 });
  const cursorY = useSpring(0, { stiffness: 60, damping: 30 });

  useEffect(() => {
    // Check reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    // Check mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || isMobile || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cursorX.set(x);
    cursorY.set(y);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Very subtle normalized offset (-15px to 15px max)
    mouseX.set(((x - centerX) / centerX) * 12);
    mouseY.set(((y - centerY) / centerY) * 12);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
      className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-full pointer-events-none select-none overflow-hidden z-0"
    >
      {/* Dynamic Cursor Spotlight Proximity Glow */}
      {!reducedMotion && !isMobile && (
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full pointer-events-none transition-opacity duration-500 opacity-20 dark:opacity-25 blur-3xl bg-accent/20"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
          }}
        />
      )}

      {/* SVG Living Blueprint Design System Canvas */}
      <svg className="w-full h-full absolute inset-0 opacity-40 dark:opacity-30">
        <defs>
          {/* Subtle Grid Pattern */}
          <pattern
            id="hero-grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="currentColor"
              className="text-neutral-300/40 dark:text-neutral-800/40"
              strokeWidth="0.75"
            />
            <circle
              cx="32"
              cy="32"
              r="1"
              fill="currentColor"
              className="text-neutral-400/30 dark:text-neutral-700/30"
            />
          </pattern>

          {/* Linear Gradient for Connection Lines */}
          <linearGradient id="line-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.1" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Background Grid */}
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>

      {/* Abstract Design System Nodes & Annotations (Positioned in Negative Space) */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="w-full h-full relative"
      >
        {/* TOP LEFT / CENTER NEGATIVE SPACE: Design System Spacing Guide & Code Fragment */}
        <div className="absolute top-12 left-[12%] hidden lg:flex flex-col gap-1.5 opacity-60 dark:opacity-40">
          <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground/70">
            <span className="w-2 h-2 rounded-full bg-accent/60 animate-pulse"></span>
            <span>DesignSystem::Token</span>
          </div>
          <div className="border border-border/60 bg-card/30 rounded-md p-2 font-mono text-[10px] text-muted-foreground/80 flex flex-col gap-1 backdrop-blur-[1px]">
            <div><span className="text-accent">spacing</span>: 16px;</div>
            <div><span className="text-accent">radius</span>: 12px;</div>
          </div>
          {/* Spacing Measurement Indicator */}
          <div className="flex items-center gap-1 font-mono text-[9px] text-muted-foreground/50 pl-1">
            <span>|---</span>
            <span className="text-accent/80 font-bold">16px</span>
            <span>---|</span>
          </div>
        </div>

        {/* TOP RIGHT NEGATIVE SPACE (Behind/Above Profile Card area): Component Node Diagram */}
        <div className="absolute top-8 right-[8%] hidden md:flex flex-col items-end gap-2 opacity-60 dark:opacity-40">
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground/80 border border-border/50 bg-card/20 px-2 py-1 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>&lt;Button variant="ghost" /&gt;</span>
          </div>

          {/* Alignment & Anchor Guides */}
          <svg width="180" height="70" className="overflow-visible opacity-50">
            {/* Bezier Vector Curve linking Design to Code */}
            <path
              d="M 160 0 C 120 40, 60 20, 20 60"
              fill="none"
              stroke="currentColor"
              className="text-accent/50"
              strokeWidth="1"
              strokeDasharray="4 3"
            />
            {/* Floating Control Handles */}
            <circle cx="160" cy="0" r="3" className="fill-accent" />
            <circle cx="20" cy="60" r="3" className="fill-emerald-500" />
            <line x1="160" y1="0" x2="120" y2="40" stroke="currentColor" className="text-muted-foreground/40" strokeWidth="0.5" />
          </svg>

          <div className="font-mono text-[9px] text-muted-foreground/60 tracking-wider uppercase">
            flex-direction: row;
          </div>
        </div>

        {/* BOTTOM LEFT / MID NEGATIVE SPACE: UI Component Outline Frame */}
        <div className="absolute bottom-16 left-[5%] hidden lg:block opacity-50 dark:opacity-35">
          <div className="border border-dashed border-border/70 rounded-xl p-3 w-44 font-mono text-[10px] text-muted-foreground/70 flex flex-col gap-2 relative">
            {/* Corner Alignment Crosses */}
            <span className="absolute -top-1.5 -left-1.5 text-[10px] text-accent/60 font-bold">+</span>
            <span className="absolute -top-1.5 -right-1.5 text-[10px] text-accent/60 font-bold">+</span>
            <span className="absolute -bottom-1.5 -left-1.5 text-[10px] text-accent/60 font-bold">+</span>
            <span className="absolute -bottom-1.5 -right-1.5 text-[10px] text-accent/60 font-bold">+</span>

            <div className="flex items-center justify-between text-[9px] border-b border-border/40 pb-1">
              <span>UI::Card</span>
              <span className="text-accent">8px</span>
            </div>
            <div className="h-2 w-2/3 bg-muted-foreground/20 rounded-sm"></div>
            <div className="h-1.5 w-1/2 bg-muted-foreground/15 rounded-sm"></div>
          </div>
        </div>

        {/* MID RIGHT NEGATIVE SPACE: Interface Node Connection Graph */}
        <div className="absolute bottom-12 right-[12%] hidden md:flex flex-col gap-1.5 opacity-55 dark:opacity-35">
          <div className="flex items-center gap-2 font-mono text-[9px] text-muted-foreground/70 border border-border/40 bg-card/20 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
            <span>Design</span>
            <span className="text-muted-foreground/40">→</span>
            <span>Component</span>
            <span className="text-muted-foreground/40">→</span>
            <span className="text-emerald-500 font-bold">Code</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
