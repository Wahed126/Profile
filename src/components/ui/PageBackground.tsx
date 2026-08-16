import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const floatingShapes = [
  // 1. Circle with periodic bright cyan light flare
  {
    shape: "w-3 h-3 rounded-full",
    left: "8%",
    top: "12%",
    duration: 18,
    delay: 0,
    x: [0, 120, -90, 60, 0],
    y: [0, -140, 100, -80, 0],
    rotate: [0, 90, -180, 0],
    opacity: [0, 0.4, 1.0, 0.2, 0.95, 0],
    scale: [0.7, 1.0, 1.6, 0.85, 1.3, 0.7],
  },
  // 2. Square with light burst
  {
    shape: "w-4 h-4 rounded-sm",
    left: "18%",
    top: "45%",
    duration: 22,
    delay: 1.5,
    x: [0, -110, 130, -70, 0],
    y: [0, 160, -120, 90, 0],
    rotate: [0, -120, 240, 0],
    opacity: [0, 0.9, 0.15, 1.0, 0.3, 0],
    scale: [0.8, 1.4, 0.7, 1.5, 0.8],
  },
  // 3. Rectangle with light flare
  {
    shape: "w-7 h-3 rounded-sm",
    left: "32%",
    top: "20%",
    duration: 26,
    delay: 0.8,
    x: [0, 140, -100, 80, 0],
    y: [0, 180, -150, 110, 0],
    rotate: [0, 180, -90, 0],
    opacity: [0, 0.3, 1.0, 0.25, 0.9, 0],
    scale: [0.7, 1.5, 0.8, 1.3, 0.7],
  },
  // 4. Capsule Pill
  {
    shape: "w-8 h-2.5 rounded-full",
    left: "48%",
    top: "60%",
    duration: 20,
    delay: 2.2,
    x: [0, -130, 90, -50, 0],
    y: [0, -170, 130, -100, 0],
    rotate: [0, -90, 180, 0],
    opacity: [0, 0.95, 0.2, 1.0, 0.3, 0],
    scale: [0.8, 1.3, 0.9, 1.5, 0.8],
  },
  // 5. Circle
  {
    shape: "w-4 h-4 rounded-full",
    left: "62%",
    top: "15%",
    duration: 24,
    delay: 3.1,
    x: [0, -150, 110, -80, 0],
    y: [0, 140, -160, 70, 0],
    rotate: [0, 120, -240, 0],
    opacity: [0, 0.35, 1.0, 0.2, 0.85, 0],
    scale: [0.7, 1.45, 0.8, 1.25, 0.7],
  },
  // 6. Square
  {
    shape: "w-3 h-3 rounded-sm",
    left: "76%",
    top: "38%",
    duration: 19,
    delay: 1.0,
    x: [0, 100, -120, 60, 0],
    y: [0, -130, 150, -90, 0],
    rotate: [0, 90, -180, 0],
    opacity: [0, 1.0, 0.2, 0.9, 0.15, 0],
    scale: [0.8, 1.5, 0.75, 1.35, 0.8],
  },
  // 7. Wide Rectangle
  {
    shape: "w-9 h-2.5 rounded-sm",
    left: "88%",
    top: "68%",
    duration: 27,
    delay: 4.0,
    x: [0, -120, 140, -90, 0],
    y: [0, 190, -180, 100, 0],
    rotate: [0, -180, 90, 0],
    opacity: [0, 0.4, 0.95, 0.25, 1.0, 0],
    scale: [0.75, 1.3, 0.8, 1.5, 0.75],
  },
  // 8. Micro Circle
  {
    shape: "w-2.5 h-2.5 rounded-full",
    left: "12%",
    top: "75%",
    duration: 21,
    delay: 2.8,
    x: [0, 130, -80, 110, 0],
    y: [0, -160, 120, -70, 0],
    rotate: [0, 360, 0],
    opacity: [0, 0.9, 0.2, 1.0, 0.3, 0],
    scale: [0.7, 1.6, 0.8, 1.4, 0.7],
  },
];

// Ultra-realistic shooting star meteor streaks appearing ONE AT A TIME with long delays (> 30s)
const skyShowers = [
  { left: "2%", top: "6%", angle: 36, duration: 1.2, delay: 35, repeatDelay: 175, tailWidth: "w-44" },
  { left: "35%", top: "3%", angle: 42, duration: 1.0, delay: 80, repeatDelay: 175, tailWidth: "w-56" },
  { left: "60%", top: "10%", angle: 32, duration: 1.3, delay: 125, repeatDelay: 175, tailWidth: "w-48" },
  { left: "15%", top: "32%", angle: 40, duration: 1.1, delay: 170, repeatDelay: 175, tailWidth: "w-52" },
];

export default function PageBackground() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [spotlightOpacity, setSpotlightOpacity] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const rawCursorX = useMotionValue(0);
  const rawCursorY = useMotionValue(0);
  const springConfig = { stiffness: 280, damping: 26 };
  const smoothCursorX = useSpring(rawCursorX, springConfig);
  const smoothCursorY = useSpring(rawCursorY, springConfig);

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
    const handleMouseMove = (e: MouseEvent) => {
      if (reducedMotion || isMobile || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - containerRect.left;
      const y = e.clientY - containerRect.top;

      rawCursorX.set(x);
      rawCursorY.set(y);
      setIsHovering(true);

      // Smooth spotlight fade out near bottom of page/footer instead of abrupt cutoff
      const distFromBottom = containerRect.bottom - e.clientY;
      const opacity = distFromBottom > 100 
        ? 1 
        : Math.max(0, distFromBottom / 100);
      setSpotlightOpacity(opacity);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setSpotlightOpacity(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [reducedMotion, isMobile]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-[calc(100%+120px)] pointer-events-none select-none overflow-hidden z-0 [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]"
    >
      {/* 1. Active #0891b2 Cursor Spotlight Glow Following Mouse */}
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

      {/* 2. Faded Ambient Glow Shapes */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[550px] h-[400px] rounded-full bg-[#0891b2]/10 dark:bg-[#0891b2]/15 blur-3xl opacity-80 pointer-events-none" />
      <div className="absolute top-[380px] left-[15%] w-[320px] h-[320px] rounded-full bg-[#0891b2]/5 dark:bg-[#0891b2]/10 blur-3xl opacity-60 pointer-events-none" />

      {/* 3. Multi-Directional Geometric Shapes with Periodic Bright Light Flares */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingShapes.map((item, i) => (
          <motion.div
            key={i}
            animate={
              reducedMotion
                ? {}
                : {
                    x: item.x,
                    y: item.y,
                    rotate: item.rotate,
                    opacity: item.opacity,
                    scale: item.scale,
                  }
            }
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            style={{ left: item.left, top: item.top }}
            className={`absolute ${item.shape} border border-[#0891b2]/60 bg-[#0891b2]/20 backdrop-blur-[1px] shadow-md shadow-[#0891b2]/40`}
          />
        ))}
      </div>

      {/* 4. Ultra-Realistic Shooting Star Meteors (Strictly ONE AT A TIME with >30s Delays) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {skyShowers.map((shower, i) => (
          <motion.div
            key={i}
            animate={
              reducedMotion
                ? {}
                : {
                    x: [-200, 900, 2000],
                    y: [-120, 600, 1320],
                    opacity: [0, 1, 0.8, 0],
                    scaleX: [0.1, 1.4, 0.3],
                  }
            }
            transition={{
              duration: shower.duration,
              delay: shower.delay,
              repeat: Infinity,
              repeatDelay: shower.repeatDelay,
              ease: "easeIn",
            }}
            style={{
              left: shower.left,
              top: shower.top,
              transform: `rotate(${shower.angle}deg)`,
            }}
            className="absolute flex items-center opacity-0 origin-left pointer-events-none"
          >
            {/* Realistic Trailing Light Stream (BEHIND the movement direction) */}
            <div className={`${shower.tailWidth} h-[1.5px] bg-gradient-to-r from-transparent via-[#0891b2]/40 to-cyan-300 shadow-[0_0_8px_#0891b2]`} />
            {/* Glowing White Nucleus Head Leading at the FRONT */}
            <div className="w-2.5 h-2.5 -ml-1 rounded-full bg-white dark:bg-cyan-100 shadow-[0_0_14px_#0891b2,0_0_28px_#0891b2] z-10" />
          </motion.div>
        ))}
      </div>

      {/* 5. Smooth Random Gray Background Vector Lines (Previous Design) */}
      <svg className="w-full h-full absolute inset-0">
        <g stroke="currentColor" fill="none" strokeWidth="0.85" className="text-neutral-400/25 dark:text-neutral-600/25">
          <path d="M -50 120 C 250 20, 450 350, 750 180" strokeDasharray="4 4" />
          <path d="M 120 450 Q 400 100, 950 380" strokeDasharray="3 3" opacity="0.7" />
          <path d="M 5% 40 Q 18% 280 4% 520" strokeDasharray="5 4" />
          <path d="M 95% 60 Q 82% 320 96% 560" strokeDasharray="5 4" />
          <path d="M 200 -30 C 500 300, 300 600, 800 500" opacity="0.5" />
          <path d="M 85% 150 Q 60% 400 90% 680" strokeDasharray="3 3" opacity="0.6" />
        </g>
      </svg>
    </div>
  );
}
