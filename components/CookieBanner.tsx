'use client';

import { useEffect, useState } from 'react';

const GA_ID = 'G-8C0PN10WNY';

declare global {
    interface Window {
        dataLayer?: unknown[];
        __gaLoaded?: boolean;
    }
}

function loadAnalytics() {
    if (window.__gaLoaded) return;
    window.__gaLoaded = true;
    const run = () => {
        const s = document.createElement('script');
        s.async = true;
        s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
        document.head.appendChild(s);
        window.dataLayer = window.dataLayer || [];
        // gtag has to forward `arguments`, so it can't be an arrow function.
        function gtag(...args: unknown[]) {
            window.dataLayer!.push(args);
        }
        gtag('js', new Date());
        gtag('config', GA_ID);
    };
    // Safari only shipped requestIdleCallback recently — feature-detect by key,
    // since the DOM lib types declare it as always present.
    if ('requestIdleCallback' in window) requestIdleCallback(run, { timeout: 6000 });
    else setTimeout(run, 3000);
}

export default function CookieBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Read on the client only — localStorage does not exist at build time,
        // and rendering the banner in the HTML would flash it for people who
        // already answered.
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) setVisible(true);
        else if (consent === 'accepted') loadAnalytics();
    }, []);

    const decide = (choice: 'accepted' | 'declined') => {
        localStorage.setItem('cookieConsent', choice);
        setVisible(false);
        if (choice === 'accepted') loadAnalytics();
    };

    return (
        <div
            id="cookie-banner"
            className={visible ? 'cookie-banner visible' : 'cookie-banner'}
            role="region"
            aria-label="Cookie consent"
        >
            <p>
                We use cookies to improve your experience. By using our website, you agree to our
                cookie policy.
            </p>
            <div className="cookie-actions">
                <button className="btn btn-primary btn-sm" onClick={() => decide('accepted')}>
                    Accept
                </button>
                <button className="btn btn-ghost btn-sm" onClick={() => decide('declined')}>
                    Decline
                </button>
            </div>
        </div>
    );
}
