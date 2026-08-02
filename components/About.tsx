import Icon from './Icon';
import SectionHead from './SectionHead';

const EXPERTISE = [
    { icon: 'i-spider', label: 'Data Scraping' },
    { icon: 'i-mobile', label: 'Hybrid Mobile Apps' },
    { icon: 'i-code', label: 'Web Platforms & Tech' },
    { icon: 'i-building', label: 'Enterprise Applications' },
];

export default function About() {
    return (
        <section id="about" className="section section-about">
            <div className="container">
                <SectionHead no="01" label="About">
                    The <em>philosophy</em>
                </SectionHead>
                <div className="about-grid">
                    <p className="about-statement" data-reveal>
                        I build <em>web, mobile &amp; automation</em> products that hold up under
                        real-world scale — and ship on time.
                    </p>
                    <div className="about-body" data-reveal>
                        <p>
                            A passionate developer of web apps, hybrid mobile apps and data-scraping
                            systems, with 9+ years of progressive, hands-on experience. Brilliant track
                            record of delivering the required tasks on time — calm under pressure, and
                            able to find the optimum way out of even the most critical problems.
                        </p>
                        <p>
                            Self-motivated, quick learner, team player and a strong problem solver. I
                            plan, prioritize and execute to meet deadlines, and I&rsquo;ve led teams
                            efficiently across full project lifecycles.
                        </p>
                        <ul className="about-expertise">
                            {EXPERTISE.map((e) => (
                                <li key={e.label}>
                                    <Icon name={e.icon} /> {e.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
