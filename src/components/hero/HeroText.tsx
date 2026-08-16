import { motion } from 'framer-motion';

export default function HeroText() {
  const words = [
    { text: "I", isAccent: false },
    { text: "Design", isAccent: false },
    { text: "Digital", isAccent: true },
    { text: "Experiences", isAccent: true },
    { text: "&", isAccent: false },
    { text: "Build", isAccent: false },
    { text: "Software.", isAccent: true },
  ];

  return (
    <div className="flex flex-col">
      {/* 1. Greeting Badge with Entrance Animation */}
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="inline-flex items-center gap-3 mb-9 text-sm font-medium"
      >
        <span className="relative flex h-3 w-3 items-center justify-center shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0891b2]/40 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0891b2] shadow-[0_0_6px_rgba(8,145,178,0.5)]"></span>
        </span>
        <span className="text-muted-foreground font-mono">
          Hi, I am Wahed, a software engineer,
        </span>
      </motion.div>

      {/* 2. Hero Title with Staggered Entrance Reveal & Steady Cyan Gradient Accent */}
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-h2 mb-9 max-w-2xl leading-tight font-bold tracking-tight"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 22, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.55,
              delay: 0.12 + index * 0.07,
              ease: "easeOut",
            }}
            className={`inline-block mr-3 ${
              word.isAccent
                ? "bg-gradient-to-r from-[#0891b2] via-cyan-300 to-[#0891b2] bg-[length:200%_auto] animate-text-shimmer bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(8,145,178,0.3)]"
                : "text-foreground"
            }`}
          >
            {word.text}
          </motion.span>
        ))}
      </motion.h1>

      {/* 3. Hero Sub-Text Description with Entrance Animation */}
      <motion.p 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
        className="text-body text-muted-foreground max-w-xl font-mono leading-relaxed"
      >
        Software Engineer focused on frontend development, scalable web applications, and thoughtful user experiences.
      </motion.p>
    </div>
  );
}
