import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkMermaid from './src/lib/remark-mermaid.mjs';

// Multi-zone setup: this Astro app is mounted at /blog under creatorkhata.com
// via a Vercel rewrite on the React frontend project. `base` ensures every
// internal link, asset URL, and the sitemap use the /blog prefix so the site
// works identically whether visited at the apex or directly on the blog's
// Vercel preview URL.
export default defineConfig({
  site: 'https://creatorkhata.com',
  base: '/blog',
  trailingSlash: 'never',
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [remarkMermaid],
  },
  build: {
    format: 'directory',
  },
});
