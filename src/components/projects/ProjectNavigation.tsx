import { useState } from 'react';

// Define the interface for the project data based on Astro CollectionEntry
export interface Project {
  id: string;
  data: {
    title: string;
    description: string;
    image?: string;
    technologies?: {
      frontend?: string[];
      backend?: string[];
      database?: string[];
      engineering?: string[];
    };
  };
}

interface ProjectNavigationProps {
  projects: Project[];
}

export default function ProjectNavigation({ projects }: ProjectNavigationProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!projects || projects.length === 0) {
    return null;
  }

  const project = projects[currentIndex];
  const { data } = project;
  const number = (currentIndex + 1).toString();

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <div className="bg-card text-card-foreground border rounded-3xl p-6 md:p-10 shadow-card w-full flex flex-col md:flex-row gap-8 relative overflow-hidden group transition-all duration-300">
      
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl md:text-2xl font-bold mb-4 font-sans">
            {number}. {data.title}:
          </h3>
          <p className="text-muted-foreground mb-8 font-mono text-sm leading-relaxed max-w-md min-h-[80px]">
            {data.description}
          </p>
          
          {data.technologies && (
            <div className="flex flex-col gap-3 font-mono text-xs mb-8 min-h-[120px]">
              {data.technologies.frontend && (
                <div className="flex gap-2">
                  <span className="text-accent min-w-[80px]"># Frontend:</span>
                  <span className="text-muted-foreground">{data.technologies.frontend.join(', ')}</span>
                </div>
              )}
              {data.technologies.backend && (
                <div className="flex gap-2">
                  <span className="text-accent min-w-[80px]"># Backend:</span>
                  <span className="text-muted-foreground">{data.technologies.backend.join(', ')}</span>
                </div>
              )}
              {data.technologies.database && (
                <div className="flex gap-2">
                  <span className="text-accent min-w-[80px]"># Database:</span>
                  <span className="text-muted-foreground">{data.technologies.database.join(', ')}</span>
                </div>
              )}
              {data.technologies.engineering && (
                <div className="flex gap-2">
                  <span className="text-accent min-w-[80px]"># Engineering:</span>
                  <span className="text-muted-foreground">{data.technologies.engineering.join(', ')}</span>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="mt-auto hidden md:flex items-center justify-between border-t border-border pt-6 w-full">
          <button 
            onClick={handlePrev}
            className="text-muted-foreground hover:text-accent transition-colors p-2 -ml-2 rounded-full hover:bg-accent/10" 
            aria-label="Previous project"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <a href={`/projects/${project.id}`} className="text-accent font-medium hover:underline">View details</a>
          <button 
            onClick={handleNext}
            className="text-muted-foreground hover:text-accent transition-colors p-2 -mr-2 rounded-full hover:bg-accent/10" 
            aria-label="Next project"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex justify-center items-center">
        {data.image && (
          <a href={`/projects/${project.id}`} className="block w-full max-w-[400px]">
            <img 
              src={data.image} 
              alt={data.title} 
              className="w-full h-auto rounded-xl shadow-md border group-hover:scale-[1.02] transition-transform duration-300 object-cover aspect-[4/3]"
              loading="lazy"
            />
          </a>
        )}
      </div>

      <div className="md:hidden flex items-center justify-between border-t border-border pt-4 w-full mt-6">
        <button 
          onClick={handlePrev}
          className="text-muted-foreground hover:text-accent transition-colors p-2 -ml-2 rounded-full hover:bg-accent/10" 
          aria-label="Previous project"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <a href={`/projects/${project.id}`} className="text-accent font-medium hover:underline text-sm">View details</a>
        <button 
          onClick={handleNext}
          className="text-muted-foreground hover:text-accent transition-colors p-2 -mr-2 rounded-full hover:bg-accent/10" 
          aria-label="Next project"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  );
}
