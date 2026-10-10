import type { MetadataRoute } from 'next';
import { getPosts } from '@/lib/blog';
import { SITE } from '@/lib/site';

// Generated at build time so every new post lands in the sitemap on its own.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getPosts();
    return [
        { url: `${SITE}/`, lastModified: '2026-10-10', changeFrequency: 'monthly', priority: 1 },
        { url: `${SITE}/home.html`, lastModified: '2026-10-10', changeFrequency: 'monthly', priority: 0.7 },
        { url: `${SITE}/blog/`, lastModified: posts[0]?.date, changeFrequency: 'weekly', priority: 0.8 },
        ...posts.map((p) => ({
            url: `${SITE}/blog/${p.slug}`,
            lastModified: p.updated ?? p.date,
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        })),
    ];
}
