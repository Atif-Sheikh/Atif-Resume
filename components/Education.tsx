import Icon from './Icon';
import SectionHead from './SectionHead';

const EDUCATION = [
    {
        icon: 'i-university',
        title: "Bachelor's Degree",
        place: 'Federal Urdu University',
        year: '2015 — 2019',
    },
    {
        icon: 'i-certificate',
        title: 'Professional Certification',
        place: 'Certified Web & Mobile Developer',
        year: 'Advanced Full Stack',
    },
];

export default function Education() {
    return (
        <section id="education" className="section">
            <div className="container">
                <SectionHead no="06" label="Education">
                    Academic <em>background</em>
                </SectionHead>
                <div className="edu-grid">
                    {EDUCATION.map((e) => (
                        <div className="edu-card" data-reveal key={e.title}>
                            <Icon name={e.icon} className="edu-icon" />
                            <h3>{e.title}</h3>
                            <p>{e.place}</p>
                            <span className="edu-year">{e.year}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
