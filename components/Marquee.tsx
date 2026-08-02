import { Fragment } from 'react';

const TECH = [
    'React', 'Node.js', 'Vue.js', 'React Native', 'Ruby on Rails', 'GraphQL',
    'Firebase', 'Docker', 'Kubernetes', 'Puppeteer', 'JavaScript', 'Tailwind',
];

export default function Marquee() {
    return (
        <div className="marquee" aria-hidden="true">
            <div className="marquee-track">
                {/* Duplicated once — the scroll keyframe translates by -50%, so the
                    track has to be exactly two identical halves. The separator is a
                    sibling, not a child: the track is a flex row and both are gap items. */}
                {[0, 1].map((pass) =>
                    TECH.map((t) => (
                        <Fragment key={`${pass}-${t}`}>
                            <span>{t}</span>
                            <i>✦</i>
                        </Fragment>
                    )),
                )}
            </div>
        </div>
    );
}
