import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('tech', ({ data }) => !data.draft);
  return rss({
    title: 'CreatorKhata Tech',
    description: 'Plain-English guides on AI, LLMs and the tools changing how we work.',
    site: context.site ?? 'https://creatorkhata.com',
    items: posts
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map(post => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/blog/tech/${post.slug}`,
      })),
    customData: '<language>en-in</language>',
  });
}
