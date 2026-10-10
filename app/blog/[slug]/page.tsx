import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogBar from '@/components/BlogBar';
import CookieBanner from '@/components/CookieBanner';
import Footer from '@/components/Footer';
import Icon from '@/components/Icon';
import PostEnhancements from '@/components/PostEnhancements';
import { formatDate, getPost, getPosts } from '@/lib/blog';
import { OG_BASE, SITE, TWITTER_BASE } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

// Static export: every post is pre-rendered, nothing else exists.
export const dynamicParams = false;
export const generateStaticParams = () => getPosts().map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = getPost((await params).slug);
    if (!post) return {};
    const url = `${SITE}/blog/${post.slug}`;
    // Built by app/og/[slug]/route.tsx.
    const image = { url: `${SITE}/og/${post.slug}.png`, width: 1200, height: 630, alt: post.title };
    return {
        title: post.title,
        description: post.description,
        keywords: post.tags,
        alternates: { canonical: url },
        openGraph: {
            ...OG_BASE,
            title: post.title,
            description: post.description,
            url,
            type: 'article',
            publishedTime: post.date,
            modifiedTime: post.updated ?? post.date,
            authors: [`${SITE}/`],
            tags: post.tags,
            images: [image],
        },
        twitter: { ...TWITTER_BASE, title: post.title, description: post.description, images: [image] },
    };
}

export default async function BlogPost({ params }: Props) {
    const post = getPost((await params).slug);
    if (!post) notFound();
    const url = `${SITE}/blog/${post.slug}`;
    const share = encodeURIComponent(url);
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'BlogPosting',
                '@id': `${url}#article`,
                headline: post.title,
                description: post.description,
                url,
                mainEntityOfPage: url,
                datePublished: post.date,
                dateModified: post.updated ?? post.date,
                keywords: post.tags.join(', '),
                inLanguage: 'en',
                image: `${SITE}/og/${post.slug}.png`,
                author: { '@type': 'Person', '@id': `${SITE}/#person`, name: 'Muhammad Atif', url: `${SITE}/` },
                publisher: { '@id': `${SITE}/#person` },
                isPartOf: { '@id': `${SITE}/blog/#blog` },
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
                    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog/` },
                    { '@type': 'ListItem', position: 3, name: post.title, item: url },
                ],
            },
        ],
    };

    return (
        <>
            <a href="#main" className="skip-link">
                Skip to content
            </a>
            {/* Scroll-linked in CSS; browsers without scroll timelines just don't show it. */}
            <div className="read-progress" aria-hidden="true" />
            <BlogBar />

            <main id="main" className="resume-wrap blog blog-post">
                <article className="post">
                    <header className="post-head">
                        <a href="/blog/" className="post-back">
                            <Icon name="i-arrow-right" /> All posts
                        </a>
                        <h1>{post.title}</h1>
                        <img
                            className="blog-cover post-cover"
                            src={`/og/${post.slug}.png`}
                            alt={`Cover image for ${post.title}`}
                            width={1200}
                            height={630}
                            fetchPriority="high"
                        />
                        <p className="blog-meta">
                            <span>By Muhammad Atif</span>
                            <time dateTime={post.date}>{formatDate(post.date)}</time>
                            <span>{post.minutes} min read</span>
                        </p>
                        <p className="post-lede">{post.description}</p>
                    </header>

                    <div className="post-layout">
                        <div className="post-main">
                            {/* Rendered from our own Markdown in content/blog at build time. */}
                            <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />

                            <div className="post-share">
                                <p>Found this useful? Share it.</p>
                                <div>
                                    <a
                                        className="btn btn-ghost btn-sm"
                                        href={`https://twitter.com/intent/tweet?url=${share}&text=${encodeURIComponent(post.title)}`}
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        <Icon name="i-x" /> Post
                                    </a>
                                    <a
                                        className="btn btn-ghost btn-sm"
                                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${share}`}
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        <Icon name="i-linkedin" /> Share
                                    </a>
                                    <button type="button" className="btn btn-ghost btn-sm" data-copy-link>
                                        <Icon name="i-copy" />
                                        <span>Copy link</span>
                                    </button>
                                </div>
                            </div>

                            <aside className="post-cta">
                                <p>
                                    I&rsquo;m Muhammad Atif, a full stack developer in Karachi with 9+ years of
                                    shipping web apps, mobile apps and scrapers. Need a hand with yours?
                                </p>
                                <a href="mailto:atifsiddiquissg@gmail.com" className="btn btn-primary btn-sm">
                                    Email me
                                </a>
                            </aside>
                        </div>

                        {post.toc.length > 1 && (
                            <nav className="post-toc" aria-label="On this page">
                                <p>On this page</p>
                                <ol>
                                    {post.toc.map((h) => (
                                        <li key={h.id}>
                                            <a href={`#${h.id}`}>{h.text}</a>
                                        </li>
                                    ))}
                                </ol>
                            </nav>
                        )}
                    </div>
                </article>
                <PostEnhancements />
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
