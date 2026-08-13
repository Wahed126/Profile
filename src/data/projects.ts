export interface Project {
  id: string;
  data: {
    title: string;
    description: string;
    slug: string;
    featured: boolean;
    publishedAt: string;
    role: string[];
    technologies: {
      frontend?: string[];
      backend?: string[];
      database?: string[];
      engineering?: string[];
    };
    image: string;
    github: string;
    demo: string;
  };
}

export const projects: Project[] = [
  {
    id: "time-tracker",
    data: {
      title: "Time Tracker Application",
      description: "A Full stack web application for managing and tracking your time efficiently.",
      slug: "time-tracker",
      featured: true,
      publishedAt: "2026-08-01",
      role: [
        "Software Engineer",
        "UI/UX Designer"
      ],
      technologies: {
        frontend: [
          "React",
          "Typescript",
          "Tailwind.css",
          "Framer Motion"
        ],
        backend: [
          "Springboot",
          "RestAPI"
        ],
        database: [
          "PostgreSQL"
        ],
        engineering: [
          "Authentication",
          "Testing",
          "CI/CD"
        ]
      },
      image: "/images/projects/time-tracker.png",
      github: "https://github.com",
      demo: "https://demo.com"
    }
  },
  {
    id: "ai-design-system",
    data: {
      title: "AI Design System Builder",
      description: "An intelligent platform for generating and managing scalable, tokenized design systems.",
      slug: "ai-design-system",
      featured: true,
      publishedAt: "2026-07-15",
      role: [
        "Frontend Engineer",
        "Design Technologist"
      ],
      technologies: {
        frontend: [
          "Next.js",
          "TypeScript",
          "Tailwind CSS",
          "Radix UI"
        ],
        backend: [
          "Node.js",
          "GraphQL API"
        ],
        database: [
          "Redis",
          "PostgreSQL"
        ],
        engineering: [
          "AI Pipelines",
          "Monorepo Architecture",
          "Docker"
        ]
      },
      image: "/images/projects/time-tracker.png",
      github: "https://github.com",
      demo: "https://demo.com"
    }
  },
  {
    id: "cloud-analytics-dashboard",
    data: {
      title: "Cloud Analytics Dashboard",
      description: "Real-time metrics visualization platform for monitoring microservices and system health.",
      slug: "cloud-analytics-dashboard",
      featured: true,
      publishedAt: "2026-06-20",
      role: [
        "Full Stack Developer"
      ],
      technologies: {
        frontend: [
          "Vue.js",
          "Chart.js",
          "Tailwind CSS"
        ],
        backend: [
          "Go",
          "gRPC",
          "WebSockets"
        ],
        database: [
          "TimescaleDB"
        ],
        engineering: [
          "Kubernetes",
          "Prometheus",
          "Grafana"
        ]
      },
      image: "/images/projects/time-tracker.png",
      github: "https://github.com",
      demo: "https://demo.com"
    }
  }
];
