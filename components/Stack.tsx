import Icon from './Icon';
import SectionHead from './SectionHead';

/** `lvl` drives the proficiency bar width via the --lvl custom property. */
const STACK = [
    { icon: 'i-react', name: 'React.js', lvl: 90 },
    { icon: 'i-react', name: 'React Native', lvl: 90 },
    { icon: 'i-vue', name: 'Vue.js', lvl: 85 },
    { icon: 'i-node', name: 'Node / Express', lvl: 80 },
    { icon: 'i-gem', name: 'Ruby on Rails', lvl: 80 },
    { icon: 'i-js', name: 'JavaScript', lvl: 90 },
    { icon: 'i-graphql', name: 'GraphQL', lvl: 70 },
    { icon: 'i-fire', name: 'Firebase / GCP', lvl: 90 },
    { icon: 'i-docker', name: 'Docker', lvl: 70 },
    { icon: 'i-k8s', name: 'Kubernetes', lvl: 70 },
    { icon: 'i-spider', name: 'Puppeteer', lvl: 85 },
    { icon: 'i-html5', name: 'HTML5 / CSS3', lvl: 90 },
];

export default function Stack() {
    return (
        <section id="stack" className="section">
            <div className="container">
                <SectionHead no="03" label="Toolbox">
                    Tech <em>I work with</em>
                </SectionHead>
                <div className="stack-grid">
                    {STACK.map((s) => (
                        <div
                            className="stack-card"
                            data-reveal
                            key={s.name}
                            style={{ '--lvl': s.lvl } as React.CSSProperties}
                        >
                            <Icon name={s.icon} />
                            <span className="stack-name">{s.name}</span>
                            {/* Decorative: the number is not a claim a screen reader
                                needs, and the name above already carries the meaning. */}
                            <span className="stack-lvl" aria-hidden="true">
                                <i />
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
