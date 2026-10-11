'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

// The head script in app/layout.tsx sets data-theme before first paint (saved
// choice, else the OS setting), so this only reads it back and flips it.
const current = (): Theme => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');

function apply(theme: Theme) {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f6f5f2' : '#070708');
}

export default function ThemeToggle() {
    // null until mounted: the server can't know the theme, so aria-pressed is
    // only set once the real value is read.
    const [theme, setTheme] = useState<Theme | null>(null);

    useEffect(() => {
        apply(current());
        setTheme(current());
        // Follow the OS while the visitor hasn't picked a theme themselves.
        const media = matchMedia('(prefers-color-scheme: light)');
        const onChange = () => {
            let saved = null;
            try {
                saved = localStorage.getItem('theme');
            } catch {}
            if (saved) return;
            const next = media.matches ? 'light' : 'dark';
            apply(next);
            setTheme(next);
        };
        media.addEventListener('change', onChange);
        return () => media.removeEventListener('change', onChange);
    }, []);

    const toggle = () => {
        const next: Theme = current() === 'light' ? 'dark' : 'light';
        try {
            localStorage.setItem('theme', next);
        } catch {}
        const swap = () => {
            apply(next);
            setTheme(next);
        };
        // A short crossfade instead of every colour snapping at once.
        if (document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.startViewTransition(swap);
        } else {
            swap();
        }
    };

    return (
        <button
            type="button"
            className="theme-toggle"
            onClick={toggle}
            aria-label="Dark theme"
            aria-pressed={theme === null ? undefined : theme === 'dark'}
            title={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
        >
            {/* Both icons ship; CSS shows the one for the theme you'd switch to. */}
            <svg className="ico theme-icon-sun" aria-hidden="true">
                <use href="#i-sun" />
            </svg>
            <svg className="ico theme-icon-moon" aria-hidden="true">
                <use href="#i-moon" />
            </svg>
        </button>
    );
}
