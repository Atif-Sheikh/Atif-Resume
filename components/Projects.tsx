import Icon from './Icon';
import SectionHead from './SectionHead';

/* Each card's artwork is pure CSS (see the PROJECT VISUALS block in globals.css)
   rather than an image — nothing to download, and it recolours with the theme. */
const PROJECTS = [
    {
        visual: 'visual-crawlbase',
        icon: 'i-server',
        title: 'Crawlbase',
        body: 'Scalable backend architecture for large-scale data extraction and processing, serving millions of requests daily.',
        tags: ['Node.js', 'Vue.js', 'Cloud'],
    },
    {
        visual: 'visual-mobile',
        icon: 'i-mobile',
        title: 'Mobile Solution',
        body: 'Cross-platform mobile application with real-time sync, offline capabilities, and cloud functions integration.',
        tags: ['React Native', 'Firebase'],
    },
    {
        visual: 'visual-scraper',
        icon: 'i-spider',
        title: 'Intelligent Scraper',
        body: 'High-performance data scraping engine designed to bypass anti-bot systems and extract unstructured data at scale.',
        tags: ['Python/JS', 'Puppeteer'],
    },
    {
        visual: 'visual-analytics',
        icon: 'i-chart',
        title: 'Analytics Dashboard',
        body: 'Real-time analytics platform with interactive charts, custom reports, and automated data pipeline processing.',
        tags: ['React', 'GraphQL', 'D3.js'],
    },
];

function Visual({ kind }: { kind: string }) {
    if (kind === 'visual-crawlbase') {
        return (
            <div className="visual-servers" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                    <div className="server-unit" key={i}>
                        <span className="led" />
                        <span className="slot" />
                        <span className="slot" />
                    </div>
                ))}
            </div>
        );
    }
    if (kind === 'visual-mobile') {
        return (
            <div className="visual-phone" aria-hidden="true">
                <span />
                <span />
                <span />
            </div>
        );
    }
    if (kind === 'visual-scraper') {
        return (
            <>
                <div className="visual-grid" aria-hidden="true" />
                <Icon name="i-spider" className="visual-icon" />
            </>
        );
    }
    return (
        <div className="visual-bars" aria-hidden="true">
            {[0, 1, 2, 3, 4, 5].map((i) => (
                <span key={i} />
            ))}
        </div>
    );
}

export default function Projects() {
    return (
        <section id="projects" className="section">
            <div className="container">
                <SectionHead no="02" label="Selected Work">
                    Projects <em>I&rsquo;ve built</em>
                </SectionHead>
                <div className="projects-grid">
                    {PROJECTS.map((p) => (
                        <article className="project-card" data-tilt data-reveal key={p.title}>
                            <div className={`project-visual ${p.visual}`}>
                                <Visual kind={p.visual} />
                            </div>
                            <div className="project-body">
                                <div className="project-top">
                                    <span className="project-icon">
                                        <Icon name={p.icon} />
                                    </span>
                                    <h3>{p.title}</h3>
                                </div>
                                <p>{p.body}</p>
                                <div className="project-tags">
                                    {p.tags.map((t) => (
                                        <span key={t}>{t}</span>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
