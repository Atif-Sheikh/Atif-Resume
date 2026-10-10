import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import IconSprite from '@/components/IconSprite';
import { SITE } from '@/lib/site';

const clash = localFont({
    variable: '--font-clash',
    display: 'swap',
    src: [
        { path: './fonts/clash-display-600.woff2', weight: '500 600', style: 'normal' },
        { path: './fonts/clash-display-700.woff2', weight: '700', style: 'normal' },
    ],
});

const satoshi = localFont({
    variable: '--font-satoshi',
    display: 'swap',
    src: [
        { path: './fonts/satoshi-400.woff2', weight: '400', style: 'normal' },
        { path: './fonts/satoshi-700.woff2', weight: '500 700', style: 'normal' },
    ],
});


// Kept under ~155 characters (and the title under ~60) so Google shows them untruncated.
const DESCRIPTION =
    'Muhammad Atif (Atif Siddique), software developer in Karachi with 9+ years building React, React Native, Node.js and Rails apps and data scrapers.';
const SHORT_DESCRIPTION =
    '9+ years building web, mobile and automation solutions. React, React Native, Vue.js, Node.js, Ruby on Rails and large-scale data scraping.';

export const metadata: Metadata = {
    metadataBase: new URL(SITE),
    title: 'Muhammad Atif Siddique | Full Stack Software Developer',
    description: DESCRIPTION,
    authors: [{ name: 'Muhammad Atif' }],
    // Canonical and JSON-LD live on each page, not here: the layout is shared by
    // `/` and `/home.html`, and each needs its own.
    robots: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
    },
    icons: {
        icon: { url: '/assets/favicon.svg', type: 'image/svg+xml' },
        apple: '/assets/profile-400.webp',
    },
    openGraph: {
        siteName: 'Muhammad Atif',
        title: 'Muhammad Atif Siddique | Full Stack Software Developer',
        description: SHORT_DESCRIPTION,
        type: 'profile',
        url: SITE,
        locale: 'en_US',
        firstName: 'Muhammad',
        lastName: 'Atif',
        images: [
            {
                url: `${SITE}/assets/profile.jpeg`,
                width: 960,
                height: 1280,
                alt: 'Portrait of Muhammad Atif (Atif Siddique), software developer',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@AtifSiddiqui55',
        creator: '@AtifSiddiqui55',
        title: 'Muhammad Atif Siddique | Full Stack Software Developer',
        description: SHORT_DESCRIPTION,
        images: [
            {
                url: `${SITE}/assets/profile.jpeg`,
                alt: 'Portrait of Muhammad Atif (Atif Siddique), software developer',
            },
        ],
    },
    other: {
        'geo.region': 'PK-SD',
        'geo.placename': 'Karachi',
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#070708',
};


/* Runs before paint so the reveal animations never hide content from a crawler
   that executes JS. The watchdog strips the class again if hydration never
   happens, so a failed bundle can't leave the page blank. */
const REVEAL_GATE = `document.documentElement.className+=' js';window.__revealFailsafe=setTimeout(function(){document.documentElement.classList.remove('js')},2500)`;

// suppressHydrationWarning on <html>: REVEAL_GATE adds the `js` class before
// React hydrates, which is exactly the pre-hydration mutation that attribute
// exists for. React leaves the class in place.
// Same on <body>, for extensions that stamp attributes on it before hydration
// (Grammarly's data-gr-ext-installed is the usual one). It only suppresses this
// element's own attributes, so real mismatches in children still report.
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="en"
            className={`${clash.variable} ${satoshi.variable}`}
            suppressHydrationWarning
        >
            <head>
                <script dangerouslySetInnerHTML={{ __html: REVEAL_GATE }} />
            </head>
            <body suppressHydrationWarning>
                <IconSprite />
                {children}
            </body>
        </html>
    );
}
