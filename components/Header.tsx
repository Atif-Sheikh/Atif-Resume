'use client';

import { useEffect, useState } from 'react';
import Icon from './Icon';

const NAV = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Work' },
    { href: '#stack', label: 'Stack' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' },
    { href: '/home.html', label: 'Résumé' },
];

const MOBILE_NAV = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Work' },
    { href: '#stack', label: 'Stack' },
    { href: '#skills', label: 'Services' },
    { href: '#experience', label: 'Experience' },
    { href: '#education', label: 'Education' },
    { href: '#contact', label: 'Contact' },
    { href: '/home.html', label: 'Résumé' },
];

export default function Header() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        if (!open) return;
        // Escape is the expected way out of a full-screen overlay.
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        addEventListener('keydown', onKey);
        return () => removeEventListener('keydown', onKey);
    }, [open]);

    return (
        <>
            <header className="header" id="header">
                <div className="scroll-progress" id="scrollProgress" />
                <nav className="nav container" aria-label="Main">
                    <a href="#home" className="logo" data-magnetic>
                        MA<em>.</em>
                    </a>
                    <ul className="nav-links">
                        {NAV.map((item) => (
                            <li key={item.href}>
                                <a href={item.href} className="nav-link">
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <a href="mailto:atifsiddiquissg@gmail.com" className="nav-cta" data-magnetic>
                        Let&rsquo;s Talk <Icon name="i-arrow-right" />
                    </a>
                    <button
                        className={open ? 'hamburger active' : 'hamburger'}
                        id="hamburger"
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        aria-expanded={open}
                        aria-controls="mobileMenu"
                        onClick={() => setOpen((v) => !v)}
                    >
                        <span />
                        <span />
                    </button>
                </nav>
            </header>

            {/* visibility:hidden in the stylesheet already takes it out of the tab
                order and the a11y tree, so no `hidden` attribute here — that would
                set display:none and kill the fade transition. */}
            <div className={open ? 'mobile-menu active' : 'mobile-menu'} id="mobileMenu">
                <ul className="mobile-nav">
                    {MOBILE_NAV.map((item, i) => (
                        <li key={item.href} style={{ '--i': i } as React.CSSProperties}>
                            <a href={item.href} onClick={() => setOpen(false)}>
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="mobile-menu-footer">
                    <a href="mailto:atifsiddiquissg@gmail.com">atifsiddiquissg@gmail.com</a>
                </div>
            </div>
        </>
    );
}
