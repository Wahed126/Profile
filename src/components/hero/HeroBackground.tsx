import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface NodeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

export default function HeroBackground() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHoveringHero, setIsHoveringHero] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Motion values for smooth cursor parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

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

  // Full Hero mouse position tracking
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

  // Dynamic Interactive Constellation Canvas Engine
  useEffect(() => {
    if (reducedMotion || isMobile || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 500;
    };
    window.addEventListener('resize', handleResize);

    // Initialize 20 floating constellation particles
    const particleCount = 22;
    const particles: NodeParticle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 1.5 + 1.5,
        color: i % 3 === 0 ? '16, 185, 129' : '6, 182, 212',
      });
    }

    const mousePos = { x: -1000, y: -1000 };
    const unsubscribeX = cursorX.on('change', (v) => (mousePos.x = v));
    const unsubscribeY = cursorY.on('change', (v) => (mousePos.y = v));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on screen edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse attraction physics when cursor is inside Hero
        if (isHoveringHero) {
          const dx = mousePos.x - p.x;
          const dy = mousePos.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            p.x += (dx / dist) * 0.4;
            p.y += (dy / dist) * 0.4;

            // Draw line to mouse
            const lineAlpha = (1 - dist / 180) * 0.35;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.strokeStyle = `rgba(${p.color}, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw connections between nearby nodes
        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const dx = p2.x - p.x;
          const dy = p2.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const lineAlpha = (1 - dist / 140) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${p.color}, ${lineAlpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, 0.65)`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      unsubscribeX();
      unsubscribeY();
    };
  }, [reducedMotion, isMobile, isHoveringHero]);

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

      {/* Dynamic 60fps Constellation Vector Network Canvas */}
      {!reducedMotion && !isMobile && (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60 dark:opacity-50" />
      )}

      {/* Living Interface Design & Code Floating Components with Micro Animations */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="w-full h-full relative"
      >
        {/* TOP LEFT FAR NEGATIVE SPACE: Floating Design Token Chip */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-14 left-[5%] hidden lg:flex flex-col gap-2 pointer-events-auto"
        >
          <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground/80 bg-card/40 border border-border/60 hover:border-accent/60 hover:text-foreground px-3 py-1.5 rounded-full backdrop-blur-md shadow-sm transition-all duration-300 hover:scale-105 cursor-pointer">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>DesignToken::radius(12px)</span>
          </div>
        </motion.div>

        {/* TOP RIGHT FAR NEGATIVE SPACE: Floating Code Fragment Badge */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute top-10 right-[5%] hidden md:flex flex-col items-end gap-2 pointer-events-auto"
        >
          <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground/80 bg-card/40 border border-border/60 hover:border-emerald-500/60 hover:text-foreground px-3 py-1.5 rounded-xl backdrop-blur-md shadow-sm transition-all duration-300 hover:scale-105 cursor-pointer">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>&lt;Button variant="ghost" /&gt;</span>
          </div>
          <div className="font-mono text-[9px] text-muted-foreground/60 tracking-wider">
            display: flex; gap: 16px;
          </div>
        </motion.div>

        {/* BOTTOM LEFT FAR NEGATIVE SPACE: UI Component Frame Outline */}
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-20 left-[4%] hidden lg:block pointer-events-auto"
        >
          <div className="border border-border/60 bg-card/30 hover:border-accent/50 rounded-xl p-3.5 w-48 font-mono text-[10px] text-muted-foreground/80 flex flex-col gap-2 relative backdrop-blur-md shadow-sm transition-all duration-300 hover:scale-105 cursor-pointer">
            <div className="flex items-center justify-between text-[9px] border-b border-border/40 pb-1.5">
              <span className="font-bold text-foreground/80">UI::Card</span>
              <span className="text-accent font-semibold">16px</span>
            </div>
            <div className="h-2 w-3/4 bg-muted-foreground/20 rounded" />
            <div className="h-1.5 w-1/2 bg-muted-foreground/15 rounded" />
          </div>
        </motion.div>

        {/* BOTTOM RIGHT FAR NEGATIVE SPACE: Design to Code Node Relationship */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-16 right-[6%] hidden md:flex flex-col gap-2 pointer-events-auto"
        >
          <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground/80 bg-card/40 border border-border/60 hover:border-accent/60 hover:text-foreground px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-sm transition-all duration-300 hover:scale-105 cursor-pointer">
            <span className="text-accent font-semibold">Design</span>
            <span className="text-muted-foreground/40">→</span>
            <span>Component</span>
            <span className="text-muted-foreground/40">→</span>
            <span className="text-emerald-500 font-bold">Code</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
