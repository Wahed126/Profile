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

  const springX = useSpring(mouseX, { stiffness: 45, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 25 });

  const cursorX = useSpring(0, { stiffness: 60, damping: 30 });
  const cursorY = useSpring(0, { stiffness: 60, damping: 30 });

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
    if (!heroElement) return;

    const handleHeroMouseMove = (e: MouseEvent) => {
      if (reducedMotion || isMobile) return;
      const rect = heroElement.getBoundingClientRect();

      if (
        e.clientY >= rect.top - 60 &&
        e.clientY <= rect.bottom + 60 &&
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
      {/* Dynamic Cursor Spotlight Proximity Lens */}
      {!reducedMotion && !isMobile && (
        <motion.div
          className="absolute w-[450px] h-[450px] rounded-full pointer-events-none transition-opacity duration-700 blur-3xl bg-cyan-500/15 dark:bg-cyan-500/25"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
            opacity: isHoveringHero ? 1 : 0,
          }}
        />
      )}

      {/* SVG Blueprint Vectors & Connecting Nodes */}
      <svg className="w-full h-full absolute inset-0 opacity-30 dark:opacity-20">
        <defs>
          <pattern
            id="dot-grid"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="12" cy="12" r="0.8" className="fill-neutral-400/30 dark:fill-neutral-700/40" />
          </pattern>
        </defs>

        {/* Fine Blueprint Dot Grid */}
        <rect width="100%" height="100%" fill="url(#dot-grid)" />

        {/* Vector Curved Paths linking Outer Margins */}
        <g stroke="currentColor" fill="none" strokeWidth="1" className="text-cyan-500/30 dark:text-cyan-400/20">
          <path d="M 50 120 Q 250 40 450 180" strokeDasharray="4 3" />
          <path d="M 1200 120 Q 1300 200 1350 350 T 1280 600" opacity="0.6" strokeDasharray="3 3" />
          <path d="M 100 180 Q 180 250 220 380" opacity="0.4" strokeDasharray="2 2" />
        </g>

        {/* Cyan Glowing Nodes along Outer Edge Paths */}
        <g className="fill-cyan-500/80 dark:fill-cyan-400/80">
          <circle cx="1200" cy="120" r="3" />
          <circle cx="1280" cy="280" r="3" />
          <circle cx="1220" cy="480" r="3" />
        </g>
      </svg>

      {/* Interactive Blueprint Elements & Cards Positioned Strictly in Outer Negative Space */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="w-full h-full relative"
      >
        {/* ================= LEFT MARGIN ELEMENTS ================= */}

        {/* 1. TOP LEFT: Spacing Scale Card & Typography Card */}
        <div className="absolute top-12 left-[1.5%] hidden xl:flex gap-3 pointer-events-auto">
          {/* Spacing Card */}
          <div className="border border-border/70 bg-card/50 rounded-xl p-2.5 font-mono text-[9px] text-muted-foreground flex flex-col gap-1 backdrop-blur-md shadow-sm hover:border-cyan-500/50 hover:text-foreground transition-all duration-300">
            <div className="text-cyan-500 font-bold text-[8px] uppercase tracking-wider mb-0.5">Spacing</div>
            <div>4</div>
            <div>8</div>
            <div>16</div>
            <div>24</div>
            <div>32</div>
            <div>48</div>
            <div>64</div>
          </div>

          {/* Typography Card */}
          <div className="border border-border/70 bg-card/50 rounded-xl p-3 font-mono text-[9px] text-muted-foreground flex flex-col gap-1 backdrop-blur-md shadow-sm h-fit hover:border-cyan-500/50 hover:text-foreground transition-all duration-300">
            <div className="text-xl font-sans font-bold text-foreground mb-1">Aa</div>
            <div className="text-[10px] text-foreground font-semibold">Inter</div>
            <div>16 / 24</div>
            <div>600</div>
          </div>
        </div>

        {/* 2. MID LEFT: Wireframe Component Box & Badges */}
        <div className="absolute top-[38%] left-[1.5%] hidden xl:flex flex-col items-center gap-2 pointer-events-auto">
          <div className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 font-mono text-[9px] px-2 py-0.5 rounded-full font-bold">
            24px
          </div>

          {/* Wireframe UI Box */}
          <div className="border border-dashed border-border/80 bg-card/30 rounded-xl p-3 w-36 flex flex-col gap-2 relative backdrop-blur-md shadow-sm">
            <span className="absolute -top-1 -left-1 w-2 h-2 border border-cyan-500 bg-background" />
            <span className="absolute -top-1 -right-1 w-2 h-2 border border-cyan-500 bg-background" />
            <span className="absolute -bottom-1 -left-1 w-2 h-2 border border-cyan-500 bg-background" />
            <span className="absolute -bottom-1 -right-1 w-2 h-2 border border-cyan-500 bg-background" />

            <div className="h-2 w-3/4 bg-muted-foreground/20 rounded" />
            <div className="h-3.5 w-full bg-cyan-500/20 border border-cyan-500/40 rounded flex items-center px-2">
              <div className="h-1.5 w-1/3 bg-cyan-500/60 rounded" />
            </div>
            <div className="h-2 w-1/2 bg-muted-foreground/20 rounded" />
          </div>

          <div className="border border-border/60 bg-card/40 text-muted-foreground font-mono text-[9px] px-2 py-0.5 rounded-md">
            radius: 12px
          </div>
        </div>

        {/* 3. BOTTOM LEFT: CSS Code Block Card */}
        <div className="absolute bottom-6 left-[1.5%] hidden xl:block pointer-events-auto">
          <div className="border border-border/70 bg-card/50 rounded-xl p-2.5 font-mono text-[8.5px] text-muted-foreground backdrop-blur-md shadow-sm w-44 flex flex-col gap-0.5 hover:border-cyan-500/50 transition-all duration-300">
            <div className="flex gap-2"><span className="text-muted-foreground/40">01</span><span><span className="text-cyan-500">.card</span> &#123;</span></div>
            <div className="flex gap-2"><span className="text-muted-foreground/40">02</span><span className="pl-2">display: flex;</span></div>
            <div className="flex gap-2"><span className="text-muted-foreground/40">03</span><span className="pl-2">gap: <span className="text-cyan-500">16px</span>;</span></div>
            <div className="flex gap-2"><span className="text-muted-foreground/40">04</span><span className="pl-2">padding: <span className="text-cyan-500">16px</span>;</span></div>
            <div className="flex gap-2"><span className="text-muted-foreground/40">05</span><span>&#125;</span></div>
          </div>
        </div>


        {/* ================= RIGHT MARGIN ELEMENTS (Clear of Hero Text) ================= */}

        {/* 4. TOP RIGHT OUTER MARGIN: UI -> Code Pill Badge & Button Snippet Card */}
        <div className="absolute top-8 right-[1.5%] hidden xl:flex flex-col items-end gap-2 pointer-events-auto">
          <div className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 font-mono text-[9px] px-2.5 py-1 rounded-full font-bold shadow-sm backdrop-blur-md">
            UI → Code
          </div>

          <div className="border border-border/70 bg-card/60 rounded-xl p-2.5 font-mono text-[8.5px] text-muted-foreground backdrop-blur-md shadow-sm w-40 flex flex-col gap-0.5 hover:border-cyan-500/50 transition-all duration-300">
            <div className="flex gap-2"><span className="text-muted-foreground/40">01</span><span>&lt;<span className="text-cyan-500 font-bold">Button</span></span></div>
            <div className="flex gap-2"><span className="text-muted-foreground/40">02</span><span className="pl-2">type="primary"</span></div>
            <div className="flex gap-2"><span className="text-muted-foreground/40">03</span><span className="pl-2">size="md"</span></div>
            <div className="flex gap-2"><span className="text-muted-foreground/40">04</span><span className="pl-2 text-foreground font-bold">Build</span></div>
            <div className="flex gap-2"><span className="text-muted-foreground/40">05</span><span>&lt;/<span className="text-cyan-500 font-bold">Button</span>&gt;</span></div>
          </div>
        </div>

        {/* 5. MID RIGHT MARGIN: Dev Mode & Commit Badges */}
        <div className="absolute top-[45%] right-[1.5%] hidden xl:flex flex-col items-end gap-2 pointer-events-auto">
          <div className="border border-border/70 bg-card/50 rounded-xl px-2.5 py-1.5 font-mono text-[9px] text-muted-foreground flex items-center gap-1.5 backdrop-blur-md shadow-sm hover:border-cyan-500/50 transition-all duration-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            <span>Dev Mode</span>
            <span className="text-cyan-500 font-bold pl-1">&gt;_</span>
          </div>

          <div className="border border-border/70 bg-card/50 rounded-xl px-2.5 py-1.5 font-mono text-[9px] text-muted-foreground flex flex-col gap-0.5 backdrop-blur-md shadow-sm hover:border-cyan-500/50 transition-all duration-300">
            <div>Commit</div>
            <div className="text-cyan-500 font-bold">a1b2c3d</div>
          </div>
        </div>

        {/* 6. BOTTOM RIGHT MARGIN: Design to Code Node Chain */}
        <div className="absolute bottom-6 right-[1.5%] hidden xl:block pointer-events-auto">
          <div className="flex items-center gap-2 font-mono text-[9px] text-muted-foreground/80 bg-card/40 border border-border/60 hover:border-cyan-500/60 hover:text-foreground px-3 py-1.5 rounded-full backdrop-blur-md shadow-sm transition-all duration-300">
            <span className="text-cyan-500 font-semibold">Design</span>
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
