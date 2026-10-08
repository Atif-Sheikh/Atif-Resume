import REVIEWS from '@/data/fiverr-reviews.json';
import { UPWORK } from '@/data/resume';
import Icon from './Icon';
import SectionHead from './SectionHead';

const fiverrAverage = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(2);

const JOBS = [
    {
        date: 'Jun 2021 — Present',
        duration: '5 yrs · UAE',
        company: 'Crawlbase',
        role: 'Full Stack JS Developer',
        body: 'Delivering interactive and user-focused frontend interfaces for enterprise applications. Specializing in Vue.js, PugJS, Ruby on Rails, Tailwind CSS, and sophisticated data extraction logic.',
    },
    {
        date: 'Oct 2020 — Aug 2021',
        duration: '11 mos · Denmark',
        company: 'MeeW',
        role: 'JavaScript Developer',
        body: 'Architected and developed high-scale web applications using the React ecosystem, GraphQL, and Firebase.',
    },
    {
        date: 'Nov 2017 — Nov 2020',
        duration: '3 yrs 1 mo · Pakistan',
        company: 'Panacloud Pvt Ltd',
        role: 'Full Stack JS Developer',
        body: 'Full Stack JavaScript Developer working across React, React Native, Node.js, and Express for enterprise-grade solutions.',
    },
];

const FREELANCE = [
    {
        href: 'https://www.upwork.com/freelancers/~01e5b356a9c3a67e23',
        modifier: 'upwork',
        logo: <span className="freelance-logo freelance-logo--upwork">up</span>,
        years: { value: '2', rest: ' yrs 5 mos' },
        name: 'Upwork',
        role: 'Expert ReactJS · React Native · GraphQL · Firebase Developer',
        record: `${UPWORK.rating} rating on all ${UPWORK.jobs} jobs`,
        date: 'Jan 2019 — May 2021',
    },
    {
        href: 'https://www.fiverr.com/atifengrr',
        modifier: 'fiverr',
        logo: (
            <span className="freelance-logo freelance-logo--fiverr">
                fi<em>.</em>
            </span>
        ),
        years: { value: '3', rest: ' yrs 10 mos' },
        name: 'Fiverr',
        role: 'Level 2 Seller — Web, Mobile & Data Scraping',
        record: `${fiverrAverage} rating across ${REVIEWS.length} reviews`,
        date: 'Apr 2017 — Jan 2021',
    },
];

export default function Experience() {
    return (
        <section id="experience" className="section">
            <div className="container">
                <SectionHead no="05" label="Journey">
                    Where <em>I&rsquo;ve worked</em>
                </SectionHead>

                <div className="timeline" id="timeline">
                    <div className="timeline-line" aria-hidden="true">
                        <span id="timelineProgress" />
                    </div>
                    {JOBS.map((job) => (
                        <div className="timeline-item" data-reveal key={job.company}>
                            <div className="timeline-node" aria-hidden="true" />
                            <div className="timeline-meta">
                                <span className="timeline-date">{job.date}</span>
                                <span className="timeline-duration">{job.duration}</span>
                                <span className="timeline-company">{job.company}</span>
                            </div>
                            <div className="timeline-content">
                                <h3>{job.role}</h3>
                                <p>{job.body}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="freelance" data-reveal>
                    <div className="freelance-head">
                        <span className="eyebrow-line" />
                        <p className="freelance-label">
                            4 years freelancing — trusted on Upwork &amp; Fiverr
                        </p>
                    </div>
                    <div className="freelance-grid">
                        {FREELANCE.map((f) => (
                            <a
                                key={f.name}
                                href={f.href}
                                target="_blank"
                                rel="noopener"
                                className={`freelance-card freelance-card--${f.modifier}`}
                                data-tilt
                            >
                                <div className="freelance-top">
                                    {f.logo}
                                    <span className="freelance-years">
                                        <strong>{f.years.value}</strong>
                                        {f.years.rest}
                                    </span>
                                </div>
                                <h3>{f.name}</h3>
                                <p className="freelance-role">{f.role}</p>
                                <p className="freelance-record">
                                    <svg viewBox="0 0 16 15" aria-hidden="true">
                                        <path d="M8 0l2.47 4.9 5.53.79-4 3.83.94 5.48L8 12.4 3.06 15 4 9.52 0 5.69l5.53-.79z" />
                                    </svg>
                                    {f.record}
                                </p>
                                <div className="freelance-foot">
                                    <span className="freelance-date">{f.date}</span>
                                    <span className="freelance-link">
                                        View profile <Icon name="i-external" />
                                    </span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
