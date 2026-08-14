import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactCard() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="w-full h-full">
      <motion.div
        className="bg-card text-card-foreground border border-border/80 rounded-[1.5rem] p-6 md:p-8 shadow-sm h-full flex flex-col justify-between relative overflow-hidden transition-all duration-300"
        initial={{ opacity: 0, x: 36, scale: 0.96 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.05 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0 }}
      >
        <AnimatePresence mode="wait">
          {!showForm ? (
            /* Call-to-Action View */
            <motion.div
              key="cta"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col justify-between h-full w-full"
            >
              <div>
                <div className="mb-4">
                  <h2 className="section-heading tracking-widest text-sm mb-0">
                    ./Let's Build Something Great
                  </h2>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                    Have a project in mind?
                  </h3>

                  <p className="font-mono text-xs md:text-sm text-muted-foreground leading-relaxed mt-1">
                    I am open to discussing product design, engineering, or partnership opportunities.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4">
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center gap-2 text-accent font-mono text-xs md:text-sm font-medium hover:underline cursor-pointer group active:scale-95 transition-transform"
                >
                  <span>./Start a project</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ) : (
            /* Interactive Contact Form View */
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col justify-between h-full w-full"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="section-heading tracking-widest text-sm mb-0">
                    ./Send Message
                  </h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    [ ✕ Close ]
                  </button>
                </div>

                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold text-lg">
                      ✓
                    </div>
                    <div className="font-bold text-sm text-foreground">Message Sent!</div>
                    <div className="font-mono text-xs text-muted-foreground max-w-xs">
                      Thanks for reaching out. I'll get back to you shortly.
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3 font-mono">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full text-xs font-mono bg-muted/40 border border-border/80 rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full text-xs font-mono bg-muted/40 border border-border/80 rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                    <div>
                      <textarea
                        required
                        rows={2}
                        placeholder="Tell me about your project..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full text-xs font-mono bg-muted/40 border border-border/80 rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 text-accent font-mono text-xs md:text-sm font-medium hover:underline cursor-pointer active:scale-95 transition-transform"
                      >
                        <span>./Submit Message</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="text-[11px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
