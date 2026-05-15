import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return rss({
    title: 'CreatorKhata Blog',
    description: 'Tax, GST, TDS and business guides for Indian content creators.',
    site: context.site ?? 'https://creatorkhata.com',
    items: posts
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map(post => ({
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: `/blog/${post.slug}`,
      })),
    customData: '<language>en-in</language>',
  });
}
