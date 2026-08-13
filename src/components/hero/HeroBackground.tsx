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

      {/* SVG Blueprint Vectors & Connecting Nodes Matching Reference Image */}
      <svg className="w-full h-full absolute inset-0 opacity-60 dark:opacity-40">
        <defs>
          <pattern
            id="dot-grid"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="12" cy="12" r="0.8" className="fill-neutral-400/40 dark:fill-neutral-700/50" />
          </pattern>
        </defs>

        {/* Fine Blueprint Dot Grid */}
        <rect width="100%" height="100%" fill="url(#dot-grid)" />

        {/* Vector Curved Paths linking Design -> Code -> Product -> Right Margin */}
        <g stroke="currentColor" fill="none" strokeWidth="1" className="text-cyan-500/40 dark:text-cyan-400/30">
          {/* Main Flow Line connecting across Hero center */}
          <path d="M 50 480 Q 250 450 450 510 T 850 480 Q 1100 420 1350 350" strokeDasharray="4 3" />
          <path d="M 1200 120 Q 1300 200 1350 350 T 1280 600" opacity="0.6" strokeDasharray="3 3" />
          <path d="M 100 180 Q 180 250 220 380" opacity="0.4" strokeDasharray="2 2" />
        </g>

        {/* Cyan Glowing Nodes along Vector Paths */}
        <g className="fill-cyan-500 dark:fill-cyan-400">
          <circle cx="220" cy="495" r="3.5" />
          <circle cx="450" cy="510" r="3.5" />
          <circle cx="680" cy="495" r="3.5" />
          <circle cx="1200" cy="120" r="3.5" />
          <circle cx="1280" cy="280" r="3.5" />
          <circle cx="1220" cy="480" r="3.5" />
          <circle cx="1280" cy="600" r="3.5" />
        </g>

        {/* Radar Ring Pulses */}
        <motion.circle
          cx="450"
          cy="510"
          animate={{ r: [4, 12, 4], opacity: [0.8, 0, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          fill="none"
          stroke="#06b6d4"
          strokeWidth="1"
        />
        <motion.circle
          cx="1280"
          cy="280"
          animate={{ r: [4, 12, 4], opacity: [0.8, 0, 0.8] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          fill="none"
          stroke="#06b6d4"
          strokeWidth="1"
        />
      </svg>

      {/* Interactive Blueprint Elements & Cards Matching Reference Image */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="w-full h-full relative"
      >
        {/* ================= LEFT MARGIN ELEMENTS ================= */}

        {/* 1. TOP LEFT: Spacing Scale Card & Typography Card */}
        <div className="absolute top-12 left-[2.5%] hidden xl:flex gap-3 pointer-events-auto">
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
        <div className="absolute top-[36%] left-[2%] hidden xl:flex flex-col items-center gap-2 pointer-events-auto">
          <div className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 font-mono text-[9px] px-2 py-0.5 rounded-full font-bold">
            24px
          </div>

          {/* Wireframe UI Box with Corner Anchor Handles */}
          <div className="border border-dashed border-border/80 bg-card/30 rounded-xl p-3 w-40 flex flex-col gap-2 relative backdrop-blur-md shadow-sm">
            <span className="absolute -top-1 -left-1 w-2 h-2 border border-cyan-500 bg-background" />
            <span className="absolute -top-1 -right-1 w-2 h-2 border border-cyan-500 bg-background" />
            <span className="absolute -bottom-1 -left-1 w-2 h-2 border border-cyan-500 bg-background" />
            <span className="absolute -bottom-1 -right-1 w-2 h-2 border border-cyan-500 bg-background" />

            <div className="h-2 w-3/4 bg-muted-foreground/20 rounded" />
            <div className="h-4 w-full bg-cyan-500/20 border border-cyan-500/40 rounded flex items-center px-2">
              <div className="h-1.5 w-1/3 bg-cyan-500/60 rounded" />
            </div>
            <div className="h-2 w-1/2 bg-muted-foreground/20 rounded" />
          </div>

          <div className="border border-border/60 bg-card/40 text-muted-foreground font-mono text-[9px] px-2 py-0.5 rounded-md">
            radius: 12px
          </div>
        </div>

        {/* 3. BOTTOM LEFT: CSS Code Block Card */}
        <div className="absolute bottom-16 left-[2%] hidden xl:block pointer-events-auto">
          <div className="border border-border/70 bg-card/50 rounded-xl p-3 font-mono text-[9px] text-muted-foreground backdrop-blur-md shadow-sm w-48 flex flex-col gap-1 hover:border-cyan-500/50 transition-all duration-300">
            <div className="flex gap-2"><span className="text-muted-foreground/40">01</span><span><span className="text-cyan-500">.card</span> &#123;</span></div>
            <div className="flex gap-2"><span className="text-muted-foreground/40">02</span><span className="pl-2">display: flex;</span></div>
            <div className="flex gap-2"><span className="text-muted-foreground/40">03</span><span className="pl-2">align-items: center;</span></div>
            <div className="flex gap-2"><span className="text-muted-foreground/40">04</span><span className="pl-2">gap: <span className="text-cyan-500">16px</span>;</span></div>
            <div className="flex gap-2"><span className="text-muted-foreground/40">05</span><span className="pl-2">padding: <span className="text-cyan-500">16px</span>;</span></div>
            <div className="flex gap-2"><span className="text-muted-foreground/40">06</span><span className="pl-2">border-radius: <span className="text-cyan-500">12px</span>;</span></div>
            <div className="flex gap-2"><span className="text-muted-foreground/40">07</span><span>&#125;</span></div>
          </div>
        </div>


        {/* ================= HERO CENTER ELEMENTS ================= */}

        {/* 4. TOP CENTER: UI -> Code Pill Badge */}
        <div className="absolute top-10 left-[48%] hidden lg:block pointer-events-auto">
          <div className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 font-mono text-[9px] px-2.5 py-1 rounded-full font-bold shadow-sm backdrop-blur-md">
            UI → Code
          </div>
        </div>

        {/* 5. CENTER RIGHT: React Button Component Code Snippet Card */}
        <div className="absolute top-24 right-[28%] hidden lg:block pointer-events-auto">
          <div className="border border-border/70 bg-card/60 rounded-xl p-3 font-mono text-[9px] text-muted-foreground backdrop-blur-md shadow-sm w-44 flex flex-col gap-1 hover:border-cyan-500/50 transition-all duration-300">
            <div className="flex gap-2"><span className="text-muted-foreground/40">01</span><span>&lt;<span className="text-cyan-500 font-bold">Button</span></span></div>
            <div className="flex gap-2"><span className="text-muted-foreground/40">02</span><span className="pl-2">type="primary"</span></div>
            <div className="flex gap-2"><span className="text-muted-foreground/40">03</span><span className="pl-2">size="md"</span></div>
            <div className="flex gap-2"><span className="text-muted-foreground/40">04</span><span className="pl-2">className="btn"</span></div>
            <div className="flex gap-2"><span className="text-muted-foreground/40">05</span><span>&gt;</span></div>
            <div className="flex gap-2"><span className="text-muted-foreground/40">06</span><span className="pl-2 text-foreground font-bold">Build</span></div>
            <div className="flex gap-2"><span className="text-muted-foreground/40">07</span><span>&lt;/<span className="text-cyan-500 font-bold">Button</span>&gt;</span></div>
          </div>
        </div>

        {/* 6. CENTER PIPELINE: Design, Code, Product Interactive Circle Badges */}
        <div className="absolute top-[52%] left-[18%] hidden lg:flex items-center gap-24 pointer-events-auto z-10">
          {/* Node 1: Design */}
          <div className="flex flex-col items-center gap-1 group cursor-pointer">
            <div className="w-12 h-12 rounded-full border border-border/80 bg-card/80 flex items-center justify-center text-foreground group-hover:border-cyan-500 group-hover:text-cyan-500 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </div>
            <span className="font-mono text-[9px] text-muted-foreground group-hover:text-cyan-500 font-bold transition-colors">Design</span>
          </div>

          {/* Node 2: Code */}
          <div className="flex flex-col items-center gap-1 group cursor-pointer">
            <div className="w-12 h-12 rounded-full border border-border/80 bg-card/80 flex items-center justify-center text-foreground group-hover:border-cyan-500 group-hover:text-cyan-500 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            </div>
            <span className="font-mono text-[9px] text-muted-foreground group-hover:text-cyan-500 font-bold transition-colors">Code</span>
          </div>

          {/* Node 3: Product */}
          <div className="flex flex-col items-center gap-1 group cursor-pointer">
            <div className="w-12 h-12 rounded-full border border-border/80 bg-card/80 flex items-center justify-center text-foreground group-hover:border-cyan-500 group-hover:text-cyan-500 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            </div>
            <span className="font-mono text-[9px] text-muted-foreground group-hover:text-cyan-500 font-bold transition-colors">Product</span>
          </div>
        </div>


        {/* ================= RIGHT MARGIN ELEMENTS ================= */}

        {/* 7. TOP RIGHT: Dev Mode Badge */}
        <div className="absolute top-28 right-[3%] hidden xl:block pointer-events-auto">
          <div className="border border-border/70 bg-card/50 rounded-xl px-3 py-1.5 font-mono text-[9px] text-muted-foreground flex items-center gap-1.5 backdrop-blur-md shadow-sm hover:border-cyan-500/50 transition-all duration-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            <span>Dev Mode</span>
            <span className="text-cyan-500 font-bold pl-1">&gt;_</span>
          </div>
        </div>

        {/* 8. BOTTOM RIGHT: Commit Badge */}
        <div className="absolute bottom-16 right-[3%] hidden xl:block pointer-events-auto">
          <div className="border border-border/70 bg-card/50 rounded-xl px-3 py-2 font-mono text-[9px] text-muted-foreground flex flex-col gap-0.5 backdrop-blur-md shadow-sm hover:border-cyan-500/50 transition-all duration-300">
            <div>Commit</div>
            <div className="text-cyan-500 font-bold">a1b2c3d</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
