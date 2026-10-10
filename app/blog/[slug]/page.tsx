import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogBar from '@/components/BlogBar';
import CookieBanner from '@/components/CookieBanner';
import Footer from '@/components/Footer';
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
        },
        twitter: { ...TWITTER_BASE, title: post.title, description: post.description },
    };
}

export default async function BlogPost({ params }: Props) {
    const post = getPost((await params).slug);
    if (!post) notFound();
    const url = `${SITE}/blog/${post.slug}`;
    const jsonLd = {
        '@context': 'https://schema.org',
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
        image: `${SITE}/assets/profile.jpeg`,
        author: { '@type': 'Person', '@id': `${SITE}/#person`, name: 'Muhammad Atif', url: `${SITE}/` },
        publisher: { '@id': `${SITE}/#person` },
        isPartOf: { '@id': `${SITE}/blog/#blog` },
    };

    return (
        <>
            <a href="#main" className="skip-link">
                Skip to content
            </a>
            <BlogBar />

            <main id="main" className="resume-wrap blog">
                <article className="post">
                    <header className="post-head">
                        <a href="/blog/" className="post-back">
                            ← All posts
                        </a>
                        <h1>{post.title}</h1>
                        <p className="post-lede">{post.description}</p>
                        <p className="blog-meta">
                            <span>By Muhammad Atif</span>
                            <time dateTime={post.date}>{formatDate(post.date)}</time>
                            <span>{post.minutes} min read</span>
                        </p>
                    </header>

                    {/* Rendered from our own Markdown in content/blog at build time. */}
                    <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />

                    <aside className="post-cta">
                        <p>
                            I&rsquo;m Muhammad Atif, a full stack developer in Karachi with 9+ years of shipping
                            web apps, mobile apps and scrapers. Need a hand with yours?
                        </p>
                        <a href="mailto:atifsiddiquissg@gmail.com" className="btn btn-primary btn-sm">
                            Email me
                        </a>
                    </aside>
                </article>
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
