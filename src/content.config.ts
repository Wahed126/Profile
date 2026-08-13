import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string().optional(),
    featured: z.boolean().default(false),
    publishedAt: z.coerce.date().optional(),
    role: z.array(z.string()).optional(),
    technologies: z.object({
      frontend: z.array(z.string()).optional(),
      backend: z.array(z.string()).optional(),
      database: z.array(z.string()).optional(),
      engineering: z.array(z.string()).optional(),
    }).optional(),
    image: z.string().optional(),
    github: z.string().optional(),
    demo: z.string().optional(),
  }),
});

export const collections = {
  projects,
};
