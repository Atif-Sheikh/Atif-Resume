import type { Metadata } from 'next';
import CookieBanner from '@/components/CookieBanner';
import Footer from '@/components/Footer';
import REVIEWS from '@/data/fiverr-reviews.json';
import { CONTACT, EDUCATION, EXPERIENCE, FOCUS, HEADLINE, LANGUAGES, PROJECTS, SKILLS, SUMMARY, UPWORK } from '@/data/resume';
import { OG_BASE, SITE, TWITTER_BASE } from '@/lib/site';

// Static export writes this route to out/home.html, so the indexed URL
// /home.html keeps working on GitHub Pages.
const URL = `${SITE}/home.html`;
const TITLE = `Résumé | Muhammad Atif, ${HEADLINE}`;
const DESCRIPTION =
    'Résumé of Muhammad Atif (Atif Siddique), Senior Frontend Lead in Karachi with 8+ years building production web and mobile apps in React, TypeScript and React Native.';

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: URL },
    openGraph: { ...OG_BASE, title: TITLE, description: DESCRIPTION, url: URL, type: 'profile' },
    twitter: { ...TWITTER_BASE, title: TITLE, description: DESCRIPTION },
};

const CONTACT_LINKS = [
    { label: CONTACT.location },
    { label: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { label: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\s/g, '')}` },
    { label: CONTACT.site, href: '/' },
    { label: CONTACT.github, href: `https://${CONTACT.github}` },
    { label: CONTACT.linkedin, href: `https://${CONTACT.linkedin}` },
];

const average = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(2);

const external = (href: string) => (href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {});

export default function Resume() {
    return (
        <>
            <a href="#main" className="skip-link">
                Skip to content
            </a>

            {/* id="home" so the shared footer's logo link scrolls back up here too. */}
            <header className="resume-bar" id="home">
                <div className="resume-wrap resume-bar-inner">
                    <a href="/" className="logo" aria-label="Muhammad Atif, portfolio home">
                        MA<em>.</em>
                    </a>
                    <nav className="resume-actions" aria-label="Résumé">
                        <a href="/" className="resume-link">
                            Portfolio
                        </a>
                        <a href="/blog/" className="resume-link">
                            Blog
                        </a>
                        <a href={`mailto:${CONTACT.email}`} className="btn btn-ghost btn-sm">
                            Email me
                        </a>
                        <a href="/Muhammad_Atif_Resume.pdf" download className="btn btn-primary btn-sm">
                            Download résumé
                        </a>
                    </nav>
                </div>
            </header>

            <main id="main" className="resume-wrap">
                <article className="resume-sheet">
                    <header className="resume-head">
                        <div className="resume-intro">
                            <h1 className="resume-name">
                                <span>Muhammad</span>
                                <span>
                                    Atif<em>.</em>
                                </span>
                            </h1>
                            <p className="resume-role">{HEADLINE}</p>
                            <p className="resume-focus">{FOCUS}</p>
                        </div>
                        <img
                            className="resume-photo"
                            src="/assets/profile-400.webp"
                            alt="Portrait of Muhammad Atif"
                            width={300}
                            height={400}
                            fetchPriority="high"
                        />
                        <ul className="resume-contact">
                            {CONTACT_LINKS.map((c) => (
                                <li key={c.label}>
                                    {c.href ? (
                                        <a href={c.href} {...external(c.href)}>
                                            {c.label}
                                        </a>
                                    ) : (
                                        c.label
                                    )}
                                </li>
                            ))}
                        </ul>
                    </header>

                    <div className="resume-body">
                        <div className="resume-main">
                            <section aria-labelledby="r-summary">
                                <h2 id="r-summary">Summary</h2>
                                <p className="resume-summary">{SUMMARY}</p>
                            </section>

                            <section aria-labelledby="r-experience">
                                <h2 id="r-experience">Experience</h2>
                                <ol className="resume-timeline">
                                    {EXPERIENCE.map((j) => (
                                        <li className="resume-entry" key={j.company}>
                                            <div className="resume-when">
                                                <span>{j.date}</span>
                                                <span>{j.location}</span>
                                            </div>
                                            <div>
                                                <h3>{j.company}</h3>
                                                <p className="resume-title">{j.role}</p>
                                                <ul className="resume-bullets">
                                                    {j.bullets.map((b) => (
                                                        <li key={b}>{b}</li>
                                                    ))}
                                                    {j.reviews && (
                                                        <li>
                                                            Rated {UPWORK.rating} on all {UPWORK.jobs} Upwork jobs and{' '}
                                                            {average} across{' '}
                                                            <a href="/#reviews">{REVIEWS.length} Fiverr client reviews</a>.
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </section>

                            <section aria-labelledby="r-projects">
                                <h2 id="r-projects">Key projects</h2>
                                <ul className="resume-projects">
                                    {PROJECTS.map((p) => (
                                        <li key={p.name}>
                                            <h3>
                                                <a href={p.url} {...external(p.url)}>
                                                    {p.name}
                                                </a>
                                            </h3>
                                            <p className="resume-title">{p.role}</p>
                                            <p>{p.body}</p>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </div>

                        <aside className="resume-side">
                            <section aria-labelledby="r-skills">
                                <h2 id="r-skills">Skills</h2>
                                <dl className="resume-skills">
                                    {SKILLS.map((s) => (
                                        <div key={s.group}>
                                            <dt>{s.group}</dt>
                                            <dd>{s.items.join(', ')}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </section>

                            <section aria-labelledby="r-education">
                                <h2 id="r-education">Education</h2>
                                <ul className="resume-list">
                                    {EDUCATION.map((e) => (
                                        <li key={e.title}>
                                            <strong>{e.title}</strong>
                                            <span>{e.place}</span>
                                            <span>{e.year}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section aria-labelledby="r-languages">
                                <h2 id="r-languages">Languages</h2>
                                <ul className="resume-list">
                                    {LANGUAGES.map((l) => (
                                        <li key={l.name}>
                                            <strong>{l.name}</strong>
                                            <span>{l.level}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </aside>
                    </div>
                </article>
            </main>

            <Footer />
            <CookieBanner />
        </>
    );
}
