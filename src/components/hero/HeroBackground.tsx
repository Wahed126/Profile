import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function HeroBackground() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHoveringHero, setIsHoveringHero] = useState(false);
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

  useEffect(() => {
    const heroElement = document.getElementById('home');
    if (!heroElement) return;

    const handleHeroMouseMove = (e: MouseEvent) => {
      if (reducedMotion || isMobile) return;
      const rect = heroElement.getBoundingClientRect();

      // Verify cursor position is within Hero section viewport bounds
      if (
        e.clientY >= rect.top - 50 &&
        e.clientY <= rect.bottom + 50 &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right
      ) {
        setIsHoveringHero(true);
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        cursorX.set(x);
        cursorY.set(y);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Smooth parallax offset
        mouseX.set(((x - centerX) / centerX) * 16);
        mouseY.set(((y - centerY) / centerY) * 16);
      } else {
        setIsHoveringHero(false);
        mouseX.set(0);
        mouseY.set(0);
      }
    };

    window.addEventListener('mousemove', handleHeroMouseMove);
    return () => window.removeEventListener('mousemove', handleHeroMouseMove);
  }, [reducedMotion, isMobile]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-full pointer-events-none select-none overflow-hidden z-0"
    >
      {/* Ambient Organic Light Orbs in Negative Space */}
      <div className="absolute top-[-10%] left-[-5%] w-[450px] h-[450px] rounded-full bg-accent/10 dark:bg-accent/15 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 blur-[120px] pointer-events-none" />

      {/* Full Hero Mouse Hover Spotlight Lens Beam */}
      {!reducedMotion && !isMobile && (
        <motion.div
          className="absolute w-[450px] h-[450px] rounded-full pointer-events-none transition-opacity duration-700 blur-3xl bg-accent/25 dark:bg-accent/35"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
            opacity: isHoveringHero ? 1 : 0,
          }}
        />
      )}

      {/* SVG Organic Vector Connections */}
      <svg className="w-full h-full absolute inset-0 opacity-40 dark:opacity-35">
        <defs>
          <linearGradient id="gradient-line-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.2" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Elegant Curved Vector Connections across screen boundaries */}
        <g stroke="url(#gradient-line-1)" fill="none" strokeWidth="1.2" strokeDasharray="6 4">
          <path d="M 50 120 Q 250 40 450 180 T 850 100" className="animate-pulse duration-1000" />
          <path d="M 1000 350 Q 750 450 500 320 T 150 420" opacity="0.6" />
        </g>

        {/* Dynamic Nodes along the vector path */}
        <circle cx="250" cy="80" r="4" className="fill-accent animate-ping" opacity="0.4" />
        <circle cx="250" cy="80" r="2.5" className="fill-accent" />

        <circle cx="750" cy="425" r="4" className="fill-emerald-500 animate-ping" opacity="0.4" />
        <circle cx="750" cy="425" r="2.5" className="fill-emerald-500" />
      </svg>

      {/* Living Interface Design & Code Floating Components with Parallax */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="w-full h-full relative"
      >
        {/* TOP LEFT FAR NEGATIVE SPACE: Floating Design Token Chip */}
        <div className="absolute top-14 left-[5%] hidden lg:flex flex-col gap-2 pointer-events-auto">
          <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground/80 bg-card/40 border border-border/60 hover:border-accent/60 hover:text-foreground px-3 py-1.5 rounded-full backdrop-blur-md shadow-sm transition-all duration-300 hover:scale-105 cursor-pointer">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>DesignToken::radius(12px)</span>
          </div>
        </div>

        {/* TOP RIGHT FAR NEGATIVE SPACE: Floating Code Fragment Badge */}
        <div className="absolute top-10 right-[5%] hidden md:flex flex-col items-end gap-2 pointer-events-auto">
          <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground/80 bg-card/40 border border-border/60 hover:border-emerald-500/60 hover:text-foreground px-3 py-1.5 rounded-xl backdrop-blur-md shadow-sm transition-all duration-300 hover:scale-105 cursor-pointer">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>&lt;Button variant="ghost" /&gt;</span>
          </div>
          <div className="font-mono text-[9px] text-muted-foreground/60 tracking-wider">
            display: flex; gap: 16px;
          </div>
        </div>

        {/* BOTTOM LEFT FAR NEGATIVE SPACE: UI Component Frame Outline */}
        <div className="absolute bottom-20 left-[4%] hidden lg:block pointer-events-auto">
          <div className="border border-border/60 bg-card/30 hover:border-accent/50 rounded-xl p-3.5 w-48 font-mono text-[10px] text-muted-foreground/80 flex flex-col gap-2 relative backdrop-blur-md shadow-sm transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="flex items-center justify-between text-[9px] border-b border-border/40 pb-1.5">
              <span className="font-bold text-foreground/80">UI::Card</span>
              <span className="text-accent font-semibold">16px</span>
            </div>
            <div className="h-2 w-3/4 bg-muted-foreground/20 rounded" />
            <div className="h-1.5 w-1/2 bg-muted-foreground/15 rounded" />
          </div>
        </div>

        {/* BOTTOM RIGHT FAR NEGATIVE SPACE: Design to Code Node Relationship */}
        <div className="absolute bottom-16 right-[6%] hidden md:flex flex-col gap-2 pointer-events-auto">
          <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground/80 bg-card/40 border border-border/60 hover:border-accent/60 hover:text-foreground px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-sm transition-all duration-300 hover:scale-105 cursor-pointer">
            <span className="text-accent font-semibold">Design</span>
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
