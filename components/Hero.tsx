'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import HeroCanvas from './HeroCanvas';

const ROLES = [
    'React & React Native',
    'Node.js & Rails',
    'Vue.js interfaces',
    'data extraction at scale',
];

const STATS = [
    { count: 9, suffix: '+', label: 'Years of experience' },
    { count: 3, suffix: '', label: 'Companies, one craft' },
    { count: 12, suffix: '+', label: 'Technologies mastered' },
];

/** Splits a word into per-character spans. `offset` keeps the stagger running
 *  across both lines of the name instead of restarting on the second one. */
function SplitChars({ text, offset }: { text: string; offset: number }) {
    return (
        <>
            {text.split('').map((ch, i) => (
                <span key={i} className="char" style={{ transitionDelay: `${(offset + i) * 32}ms` }}>
                    {ch}
                </span>
            ))}
        </>
    );
}

export default function Hero() {
    const [role, setRole] = useState(0);
    const [leaving, setLeaving] = useState<number | null>(null);
    const roleRef = useRef(0);

    useEffect(() => {
        // Only flips a class; the character transforms themselves live in CSS.
        const id = requestAnimationFrame(() => document.body.classList.add('hero-in'));
        return () => cancelAnimationFrame(id);
    }, []);

    useEffect(() => {
        if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const id = setInterval(() => {
            setLeaving(roleRef.current);
            roleRef.current = (roleRef.current + 1) % ROLES.length;
            setRole(roleRef.current);
        }, 2600);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        if (leaving === null) return;
        const t = setTimeout(() => setLeaving(null), 600);
        return () => clearTimeout(t);
    }, [leaving]);

    return (
        <section className="hero" id="home">
            <HeroCanvas />
            <div className="hero-inner container">
                <div className="hero-content">
                    <p className="hero-eyebrow">
                        <span className="eyebrow-line" />
                        Full Stack JS Developer — Karachi, PK
                    </p>
                    <h1 className="hero-name" aria-label="Muhammad Atif">
                        <span className="hero-name-line outline">
                            <SplitChars text="MUHAMMAD" offset={0} />
                        </span>
                        <span className="hero-name-line filled">
                            <SplitChars text="ATIF" offset={8} />
                            <em>
                                <span className="char" style={{ transitionDelay: '384ms' }}>
                                    .
                                </span>
                            </em>
                        </span>
                    </h1>
                    <div className="hero-roles" aria-hidden="true">
                        <span className="hero-roles-static">I build with</span>
                        <span className="hero-roles-rotator">
                            {ROLES.map((r, i) => (
                                <span
                                    key={r}
                                    className={
                                        i === role ? 'role active' : i === leaving ? 'role leaving' : 'role'
                                    }
                                >
                                    {r}
                                </span>
                            ))}
                        </span>
                    </div>
                    <p className="hero-tagline">
                        Turning ideas into scalable products — web, mobile and automation solutions
                        engineered for the real world.
                    </p>
                    <div className="hero-btns">
                        <a href="mailto:atifsiddiquissg@gmail.com" className="btn btn-primary" data-magnetic>
                            Let&rsquo;s work together <Icon name="i-arrow-right" />
                        </a>
                        <a href="#projects" className="btn btn-ghost" data-magnetic>
                            See my work
                        </a>
                    </div>
                </div>
                <div className="hero-portrait">
                    <div className="portrait-frame">
                        {/* Plain <img>: next/image adds no value under output:export with
                            images.unoptimized, and this needs fetchpriority=high. */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/assets/profile-680.webp"
                            srcSet="/assets/profile-400.webp 400w, /assets/profile-680.webp 680w"
                            sizes="(max-width:768px) 70vw, 340px"
                            width={680}
                            height={850}
                            fetchPriority="high"
                            decoding="async"
                            alt="Muhammad Atif, Full Stack JavaScript Developer"
                        />
                        <div className="portrait-ring" aria-hidden="true" />
                    </div>
                    <div className="portrait-badge badge-exp">
                        <strong>9+</strong> years shipping
                    </div>
                    <div className="portrait-badge badge-loc">
                        <Icon name="i-pin" /> Karachi, PK
                    </div>
                </div>
            </div>
            <div className="hero-stats container">
                {STATS.map((s) => (
                    <div className="stat" key={s.label}>
                        <span className="stat-num">
                            <span data-count={s.count}>{s.count}</span>
                            {s.suffix}
                        </span>
                        <span className="stat-label">{s.label}</span>
                    </div>
                ))}
                <a className="scroll-hint" href="#about" aria-label="Scroll to about">
                    <span className="scroll-hint-track">
                        <span className="scroll-hint-dot" />
                    </span>
                    scroll
                </a>
            </div>
        </section>
    );
}
