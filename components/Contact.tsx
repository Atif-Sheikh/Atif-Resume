'use client';

import { useEffect, useState } from 'react';
import Icon from './Icon';

const EMAIL = 'atifsiddiquissg@gmail.com';

export default function Contact() {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!copied) return;
        const t = setTimeout(() => setCopied(false), 2000);
        return () => clearTimeout(t);
    }, [copied]);

    const copy = () => {
        navigator.clipboard?.writeText(EMAIL).then(() => setCopied(true));
    };

    return (
        <section id="contact" className="contact">
            <div className="container">
                <p className="section-label" data-reveal>
                    // Get in touch
                </p>
                <h2 className="contact-title" data-reveal>
                    Let&rsquo;s build
                    <br />
                    <em>something.</em>
                </h2>
                <p className="contact-sub" data-reveal>
                    Have a project in mind? Need a developer? Let&rsquo;s talk.
                </p>
                <div className="contact-email" data-reveal>
                    <a href={`mailto:${EMAIL}`} className="contact-email-link" data-magnetic>
                        {EMAIL}
                    </a>
                    <button
                        className="copy-btn"
                        id="copyEmail"
                        data-magnetic
                        onClick={copy}
                        aria-label={copied ? 'Email address copied' : 'Copy email address'}
                    >
                        <Icon name={copied ? 'i-check' : 'i-copy'} />
                        <span className="copy-tip">{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                    {/* Announced to screen readers without stealing focus. */}
                    <span className="sr-only" role="status" aria-live="polite">
                        {copied ? 'Email address copied to clipboard' : ''}
                    </span>
                </div>
            </div>
        </section>
    );
}
