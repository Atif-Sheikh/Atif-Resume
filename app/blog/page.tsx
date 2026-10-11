import type { Metadata } from 'next';
import BlogBar from '@/components/BlogBar';
import CookieBanner from '@/components/CookieBanner';
import Footer from '@/components/Footer';
import { formatDate, getPosts } from '@/lib/blog';
import { OG_BASE, SITE, TWITTER_BASE } from '@/lib/site';

// Trailing slash: the build moves this page to out/blog/index.html, because
// GitHub Pages redirects /blog to /blog/ once the blog/ folder of posts exists.
const URL = `${SITE}/blog/`;
const TITLE = 'Blog: AI Coding and Software Development | Muhammad Atif';
const DESCRIPTION =
    'Practical notes from 9+ years of shipping software: AI coding tools like Claude Code, Cursor and Copilot, and how to get real work done with them.';

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: URL, types: { 'application/rss+xml': `${SITE}/blog/rss.xml` } },
    openGraph: { ...OG_BASE, title: TITLE, description: DESCRIPTION, url: URL, type: 'website' },
    twitter: { ...TWITTER_BASE, title: TITLE, description: DESCRIPTION },
};

export default function Blog() {
    const posts = getPosts();
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        '@id': `${URL}#blog`,
        url: URL,
        name: TITLE,
        description: DESCRIPTION,
        author: { '@id': `${SITE}/#person` },
        blogPost: posts.map((p) => ({
            '@type': 'BlogPosting',
            headline: p.title,
            url: `${SITE}/blog/${p.slug}`,
            datePublished: p.date,
            image: `${SITE}/og/${p.slug}.png`,
            author: { '@id': `${SITE}/#person` },
        })),
    };

    return (
        <>
            <a href="#main" className="skip-link">
                Skip to content
            </a>
            <BlogBar />

            <main id="main" className="resume-wrap blog">
                <header className="blog-head">
                    {/* Like the homepage hero, the eyebrow sits inside the h1 so the heading
                        carries the topics, not just the one-word title. */}
                    <h1>
                        <span className="blog-eyebrow">Notes on AI coding and shipping software</span>{' '}
                        Writing<em>.</em>
                    </h1>
                    <p>
                        Practical notes from building web apps, mobile apps and scrapers for clients, and
                        the tools that make me faster at it.
                    </p>
                </header>

                <ul className="blog-grid">
                    {posts.map((p, i) => (
                        <li key={p.slug}>
                            <article className="blog-card">
                                <img
                                    className="blog-cover"
                                    src={`/og/${p.slug}.png`}
                                    alt={`Cover image for ${p.title}`}
                                    width={1200}
                                    height={630}
                                    // The first cover is the likely LCP element, so it isn't lazy.
                                    loading={i ? 'lazy' : 'eager'}
                                    fetchPriority={i ? undefined : 'high'}
                                    decoding="async"
                                />
                                <div className="blog-card-body">
                                    <p className="blog-meta">
                                        <time dateTime={p.date}>{formatDate(p.date)}</time>
                                        <span>{p.minutes} min read</span>
                                    </p>
                                    <h2>
                                        {/* The link's ::after covers the whole card, so the card
                                            is one click target without nesting block content in <a>. */}
                                        <a href={`/blog/${p.slug}`}>{p.title}</a>
                                    </h2>
                                    <p className="blog-card-desc">{p.description}</p>
                                    {p.tags.length > 0 && (
                                        <ul className="blog-tags" aria-label="Topics">
                                            {p.tags.map((t) => (
                                                <li key={t}>{t}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>
            </main>

            <Footer />
            <CookieBanner />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
            />
        </>
    );
}
