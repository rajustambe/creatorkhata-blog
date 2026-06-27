import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    author: z.string().default('CreatorKhata'),
    draft: z.boolean().default(false),
    ogImage: z.string().optional(),
  }),
});

// Technology / AI track. A separate section under the same domain (/blog/tech).
// Same shape as `posts` so the rendering pipeline is shared, but kept as its
// own collection so the two listings, RSS feeds and sitemaps never mix.
const tech = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    author: z.string().default('CreatorKhata'),
    draft: z.boolean().default(false),
    ogImage: z.string().optional(),
  }),
});

export const collections = { posts, tech };
