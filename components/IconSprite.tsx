/* Inline sprite: ~6 KB of symbols instead of a 253 KB icon webfont, zero requests.
   Referenced everywhere via <Icon name="i-arrow-right" />. */
export default function IconSprite() {
    const stroke = {
        fill: 'none',
        stroke: 'currentColor',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
    } as const;

    return (
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
            <defs>
                <symbol id="i-arrow-right" viewBox="0 0 24 24" {...stroke} strokeWidth="2.2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                </symbol>
                <symbol id="i-external" viewBox="0 0 24 24" {...stroke} strokeWidth="2">
                    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                </symbol>
                <symbol id="i-pin" viewBox="0 0 24 24" {...stroke} strokeWidth="2">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                </symbol>
                <symbol id="i-server" viewBox="0 0 24 24" {...stroke} strokeWidth="2">
                    <rect x="2" y="3" width="20" height="7" rx="2" />
                    <rect x="2" y="14" width="20" height="7" rx="2" />
                    <path d="M6 6.5h.01M6 17.5h.01" />
                </symbol>
                <symbol id="i-mobile" viewBox="0 0 24 24" {...stroke} strokeWidth="2">
                    <rect x="6" y="2" width="12" height="20" rx="2.5" />
                    <path d="M11 18.5h2" />
                </symbol>
                <symbol id="i-spider" viewBox="0 0 24 24" {...stroke} strokeWidth="2">
                    <ellipse cx="12" cy="13" rx="4" ry="5" />
                    <circle cx="12" cy="6" r="2.2" />
                    <path d="M8 10 3 7M8 13H2.5M8.5 16.5 4 20M16 10l5-3M16 13h5.5M15.5 16.5 20 20" />
                </symbol>
                <symbol id="i-chart" viewBox="0 0 24 24" {...stroke} strokeWidth="2">
                    <path d="M3 3v16a2 2 0 0 0 2 2h16" />
                    <path d="m7 15 4-4 3 3 5-6" />
                </symbol>
                <symbol id="i-code" viewBox="0 0 24 24" {...stroke} strokeWidth="2">
                    <path d="m8 6-6 6 6 6M16 6l6 6-6 6" />
                </symbol>
                <symbol id="i-building" viewBox="0 0 24 24" {...stroke} strokeWidth="2">
                    <rect x="4" y="2" width="16" height="20" rx="1.5" />
                    <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h6v7H9z" />
                </symbol>
                <symbol id="i-university" viewBox="0 0 24 24" {...stroke} strokeWidth="2">
                    <path d="M2 9 12 4l10 5-10 5Z" />
                    <path d="M5 11.5V18M9.5 13V18M14.5 13V18M19 11.5V18M3 21h18" />
                </symbol>
                <symbol id="i-certificate" viewBox="0 0 24 24" {...stroke} strokeWidth="2">
                    <circle cx="12" cy="9" r="6" />
                    <path d="m8.5 14-1.5 8 5-3 5 3-1.5-8" />
                </symbol>
                <symbol id="i-copy" viewBox="0 0 24 24" {...stroke} strokeWidth="2">
                    <rect x="9" y="9" width="12" height="12" rx="2" />
                    <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
                </symbol>
                <symbol id="i-check" viewBox="0 0 24 24" {...stroke} strokeWidth="2.5">
                    <path d="M20 6 9 17l-5-5" />
                </symbol>
                <symbol id="i-chat" viewBox="0 0 24 24" {...stroke} strokeWidth="2">
                    <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.9-.9L3 21l1.9-4.1A8.4 8.4 0 0 1 4 11.5a8.5 8.5 0 0 1 8.5-8.4A8.4 8.4 0 0 1 21 11.5Z" />
                </symbol>
                <symbol id="i-graphql" viewBox="0 0 24 24" {...stroke} strokeWidth="1.8">
                    <path d="M12 3 4 17h16Z" />
                    <circle cx="12" cy="3" r="1.9" fill="currentColor" stroke="none" />
                    <circle cx="4" cy="17" r="1.9" fill="currentColor" stroke="none" />
                    <circle cx="20" cy="17" r="1.9" fill="currentColor" stroke="none" />
                </symbol>
                <symbol id="i-gem" viewBox="0 0 24 24" {...stroke} strokeWidth="1.9">
                    <path d="M6 3h12l4 6-10 12L2 9Z" />
                    <path d="M2 9h20M9 3 6.5 9 12 21M15 3l2.5 6L12 21" />
                </symbol>
                <symbol id="i-fire" viewBox="0 0 24 24" {...stroke} strokeWidth="1.9">
                    <path d="M12 22a7 7 0 0 0 7-7c0-5-4-6-4-11 0 0-3 1.5-3 5.5C12 7 10 6 10 6c0 2.5-3 3.5-3 9a7 7 0 0 0 5 7Z" />
                </symbol>
                <symbol id="i-k8s" viewBox="0 0 24 24" {...stroke} strokeWidth="1.8">
                    <path d="m12 2 8.5 4.8v10.4L12 22l-8.5-4.8V6.8Z" />
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 4.5V9M12 15v4.5M6.5 8.8 10 11M14 13l3.5 2.2M17.5 8.8 14 11M10 13l-3.5 2.2" />
                </symbol>
                <symbol id="i-react" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <circle cx="12" cy="12" r="2.1" fill="currentColor" stroke="none" />
                    <ellipse cx="12" cy="12" rx="10.5" ry="4" />
                    <ellipse cx="12" cy="12" rx="10.5" ry="4" transform="rotate(60 12 12)" />
                    <ellipse cx="12" cy="12" rx="10.5" ry="4" transform="rotate(120 12 12)" />
                </symbol>
                <symbol id="i-vue" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 1.61h-9.94L12 5.16 9.94 1.61H0l12 20.78ZM12 14.08 5.16 2.23h4.43L12 6.41l2.41-4.18h4.43Z" />
                </symbol>
                <symbol id="i-node" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
                    <path d="M12 2.2 21 7.1v9.8L12 21.8 3 16.9V7.1Z" />
                    <path d="M9.2 9.4v5.6c0 1-1.1 1.6-2 1.1M12.2 15.9c1.6.5 3.3.2 3.3-1.2 0-2.2-4.4-1.1-4.4-3.4 0-1.2 1.4-1.6 2.9-1.2" strokeLinecap="round" />
                </symbol>
                <symbol id="i-docker" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
                    <path d="M3 11h16.5c.8 0 1.5.5 1.8 1.3.6-.4 1.2-.9 1.7-1.5-.5 1.9-1.5 3.6-3 4.9-1.9 1.6-4.4 2.4-7.2 2.4-4.4 0-8-2.1-9.6-5.6A6 6 0 0 1 3 11Z" />
                    <path d="M6 11V8.5h2.4V11M9.3 11V8.5h2.4V11M12.6 11V8.5H15V11M9.3 8V5.5h2.4V8" />
                </symbol>
                <symbol id="i-html5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.2 2h17.6l-1.6 18L12 22l-7.2-2L3.2 2Zm13.9 4H7l.2 2.4h9.7l-.6 7.2-4.3 1.2-4.3-1.2-.3-3.2h2.4l.15 1.5 2.1.6 2.1-.6.25-2.5H7.1l-.6-7.4h10.8L17.1 6Z" />
                </symbol>
                <symbol id="i-js" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 2h20v20H2V2Zm10.9 16.7c.7 1.3 1.8 2 3.6 2 1.9 0 3.3-1 3.3-2.9 0-1.7-1-2.5-2.7-3.2l-.5-.2c-.9-.4-1.3-.6-1.3-1.2 0-.5.4-.9 1-.9s1 .3 1.4 1l1.6-1c-.7-1.2-1.6-1.6-3-1.6-1.9 0-3.1 1.2-3.1 2.8 0 1.7 1 2.5 2.5 3.1l.5.2c1 .4 1.5.7 1.5 1.4 0 .6-.5 1-1.4 1-1 0-1.6-.5-2.1-1.3l-1.7 1Zm-6.7.2c.5 1.1 1.5 1.8 3 1.8 1.8 0 3-1 3-3v-7H9.4v7c0 .9-.4 1.2-1 1.2s-.9-.4-1.2-1l-1.6 1Z" />
                </symbol>
                <symbol id="i-github" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </symbol>
                <symbol id="i-linkedin" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </symbol>
                <symbol id="i-x" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
                </symbol>
                <symbol id="i-instagram" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
                </symbol>
                <symbol id="i-facebook" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z" />
                </symbol>
            </defs>
        </svg>
    );
}
