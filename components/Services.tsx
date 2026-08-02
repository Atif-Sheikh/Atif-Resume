import Icon from './Icon';
import SectionHead from './SectionHead';

const SERVICES = [
    {
        title: 'Full Stack Development',
        body: 'End-to-end web applications with modern architectures, REST & GraphQL APIs, and production-grade deployment.',
        techs: ['React', 'Node.js', 'Vue.js', 'Ruby on Rails'],
    },
    {
        title: 'Mobile App Development',
        body: 'Cross-platform mobile applications with native performance, real-time sync, push notifications, and offline support.',
        techs: ['React Native', 'Firebase'],
    },
    {
        title: 'Data Scraping & Automation',
        body: 'Sophisticated web scraping systems that bypass anti-bot protections and extract structured data at massive scale.',
        techs: ['Puppeteer', 'Python', 'Node.js'],
    },
    {
        title: 'Frontend Engineering',
        body: 'Pixel-perfect, responsive interfaces with smooth animations, component systems, and performance optimization.',
        techs: ['React', 'Tailwind', 'GraphQL'],
    },
];

export default function Services() {
    return (
        <section id="skills" className="section">
            <div className="container">
                <SectionHead no="04" label="Services">
                    What <em>I do</em>
                </SectionHead>
                <div className="services">
                    {SERVICES.map((s, i) => (
                        <div className="service-row" data-reveal key={s.title}>
                            <span className="service-index" aria-hidden="true">
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <div className="service-main">
                                <h3>{s.title}</h3>
                                <p>{s.body}</p>
                            </div>
                            <div className="service-techs">
                                {s.techs.map((t) => (
                                    <span key={t}>{t}</span>
                                ))}
                            </div>
                            <span className="service-arrow" aria-hidden="true">
                                <Icon name="i-arrow-right" />
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
