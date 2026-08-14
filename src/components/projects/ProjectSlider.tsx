import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/data/projects';

interface ProjectSliderProps {
  projects: Project[];
}

// Text variants: slides from opposite side with a subtle settling spring bounce
const contentVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -40 : 40,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: {
      x: { type: 'spring', stiffness: 280, damping: 20, mass: 0.9 }, // Gentle settling bounce
      opacity: { duration: 0.3 },
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction < 0 ? -40 : 40,
    transition: {
      x: { type: 'spring', stiffness: 280, damping: 24 },
      opacity: { duration: 0.2 },
    },
  }),
};

// Image variants: slides from the right/left opposite direction
const imageVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 45 : -45,
    scale: 0.95,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      x: { type: 'spring', stiffness: 240, damping: 24, mass: 0.8 },
      scale: { type: 'spring', stiffness: 240, damping: 24 },
      opacity: { duration: 0.35 },
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction < 0 ? 45 : -45,
    scale: 0.95,
    transition: {
      x: { type: 'spring', stiffness: 240, damping: 24 },
      scale: { duration: 0.2 },
      opacity: { duration: 0.2 },
    },
  }),
};

export default function ProjectSlider({ projects }: ProjectSliderProps) {
  const [[page, direction], setPage] = useState([0, 0]);

  if (!projects || projects.length === 0) return null;

  const activeIndex = ((page % projects.length) + projects.length) % projects.length;
  const project = projects[activeIndex];
  const { data } = project;
  const number = (activeIndex + 1).toString();

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <motion.section
      id="projects"
      className="pt-0 pb-0 md:pt-2 md:pb-2"
      initial={{ opacity: 0, y: 32, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Section Header with Working Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
        <h2 className="section-heading mb-0 text-2xl font-bold font-mono tracking-tight text-foreground">
          ./projects
        </h2>
        <div className="flex gap-6 text-sm">
          <button
            onClick={() => paginate(-1)}
            className="text-accent hover:underline font-mono cursor-pointer transition-colors active:scale-95"
            aria-label="Previous project"
          >
            ./previous
          </button>
          <button
            onClick={() => paginate(1)}
            className="text-accent hover:underline font-mono cursor-pointer transition-colors active:scale-95"
            aria-label="Next project"
          >
            ./next
          </button>
        </div>
      </div>

      {/* Stationary Outer Card Container */}
      <div className="bg-card text-card-foreground border border-border/80 rounded-[1.5rem] p-6 md:p-8 shadow-sm w-full grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start group relative overflow-hidden">

        {/* Left Column: Text Section */}
        <div className="lg:col-span-6 flex flex-col justify-start relative overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={page}
              custom={direction}
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full flex flex-col justify-start"
            >
              {/* Meta info */}
              <h3 className="text-sm md:text-base font-bold mb-2 font-mono tracking-tight">
                {number}. {data.title}:
              </h3>
              <p className="text-foreground/90 mb-3 font-mono text-[11px] md:text-xs leading-relaxed max-w-md">
                {data.description}
              </p>

              {/* Tech Stack */}
              {data.technologies && (
                <div className="flex flex-col font-mono text-[10px] md:text-[11px] leading-snug">
                  <div className="text-accent font-medium mb-1"># Teck stacks:</div>
                  <div className="flex flex-col gap-1">
                    {data.technologies.frontend && (
                      <div className="flex gap-1.5">
                        <span className="text-accent min-w-[80px] shrink-0">./Front-end:</span>
                        <span className="text-foreground/80">{data.technologies.frontend.join(', ')}</span>
                      </div>
                    )}
                    {data.technologies.backend && (
                      <div className="flex gap-1.5">
                        <span className="text-accent min-w-[80px] shrink-0">./Back-end:</span>
                        <span className="text-foreground/80">{data.technologies.backend.join(', ')}</span>
                      </div>
                    )}
                    {data.technologies.database && (
                      <div className="flex gap-1.5">
                        <span className="text-accent min-w-[80px] shrink-0">./Database:</span>
                        <span className="text-foreground/80">{data.technologies.database.join(', ')}</span>
                      </div>
                    )}
                    {data.technologies.engineering && (
                      <div className="flex gap-1.5">
                        <span className="text-accent min-w-[80px] shrink-0">./Engineering:</span>
                        <span className="text-foreground/80">{data.technologies.engineering.join(', ')}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Symmetrical 6-column Image Preview */}
        <div className="lg:col-span-6 flex flex-col justify-start">
          <div className="w-full mx-auto">

            {/* Image viewport with popLayout */}
            <div className="relative w-full flex items-start justify-center overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={page}
                  custom={direction}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full"
                >
                  {data.image && (
                    <a href={`/projects/${project.id}`} className="block w-full">
                      <img
                        src={data.image}
                        alt={data.title}
                        className="w-full h-auto rounded-xl group-hover:scale-[1.01] transition-transform duration-300 object-cover"
                        loading="lazy"
                      />
                    </a>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
