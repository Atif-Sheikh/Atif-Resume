import { formatDate, getPosts } from '@/lib/blog';
import Icon from './Icon';
import SectionHead from './SectionHead';

// Links the newest posts from the homepage, the site's strongest page, so they
// get found and crawled sooner than through the blog index alone.
export default function LatestPosts() {
    const posts = getPosts().slice(0, 3);
    if (!posts.length) return null;
    return (
        <section id="writing" className="section">
            <div className="container">
                <SectionHead no="08" label="Writing">
                    Latest <em>from the blog</em>
                </SectionHead>
                <ul className="writing-list">
                    {posts.map((p) => (
                        <li className="writing-item" data-reveal key={p.slug}>
                            <time dateTime={p.date}>{formatDate(p.date)}</time>
                            <div>
                                <h3>
                                    <a href={`/blog/${p.slug}`}>{p.title}</a>
                                </h3>
                                <p>{p.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <a href="/blog/" className="btn btn-ghost writing-all">
                    All posts <Icon name="i-arrow-right" />
                </a>
            </div>
        </section>
    );
}
