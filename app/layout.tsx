import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import IconSprite from '@/components/IconSprite';

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

const SITE = 'https://atifsiddique.com';
const DESCRIPTION =
    'Muhammad Atif (Atif Siddique) — Senior Full Stack JavaScript Developer in Karachi, Pakistan with 9+ years building React, React Native, Vue.js, Node.js and Ruby on Rails apps, plus large-scale data scraping systems. Available for hire.';
const SHORT_DESCRIPTION =
    '9+ years building web, mobile and automation solutions. React, React Native, Vue.js, Node.js, Ruby on Rails and large-scale data scraping.';

export const metadata: Metadata = {
    metadataBase: new URL(SITE),
    title: 'Muhammad Atif — Senior Full Stack JavaScript Developer | React, Node.js & Data Scraping',
    description: DESCRIPTION,
    authors: [{ name: 'Muhammad Atif' }],
    // No `alternates.canonical` here — Next normalises it to an origin with no
    // trailing slash, and the indexed URL has one. Emitted by hand in <head>.
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
        title: 'Muhammad Atif — Senior Full Stack JavaScript Developer',
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
                alt: 'Portrait of Muhammad Atif, Full Stack JavaScript Developer',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@AtifSiddiqui55',
        creator: '@AtifSiddiqui55',
        title: 'Muhammad Atif — Senior Full Stack JavaScript Developer',
        description: SHORT_DESCRIPTION,
        images: [
            {
                url: `${SITE}/assets/profile.jpeg`,
                alt: 'Portrait of Muhammad Atif, Full Stack JavaScript Developer',
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

const JSON_LD = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Person',
            '@id': `${SITE}/#person`,
            name: 'Muhammad Atif',
            alternateName: ['Atif Siddique', 'Muhammad Atif Siddique'],
            url: `${SITE}/`,
            image: {
                '@type': 'ImageObject',
                url: `${SITE}/assets/profile.jpeg`,
                caption: 'Muhammad Atif, Full Stack JavaScript Developer',
            },
            jobTitle: 'Senior Full Stack JavaScript Developer',
            description:
                'Senior Full Stack JavaScript Developer with 9+ years of experience in web apps, hybrid mobile apps and large-scale data scraping.',
            worksFor: { '@type': 'Organization', name: 'Crawlbase', url: 'https://crawlbase.com/' },
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'Karachi',
                addressRegion: 'Sindh',
                addressCountry: 'PK',
            },
            email: 'mailto:atifsiddiquissg@gmail.com',
            nationality: { '@type': 'Country', name: 'Pakistan' },
            alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'Federal Urdu University of Arts, Science & Technology',
            },
            knowsLanguage: ['en', 'ur'],
            hasOccupation: {
                '@type': 'Occupation',
                name: 'Full Stack JavaScript Developer',
                occupationLocation: { '@type': 'City', name: 'Karachi' },
                skills:
                    'React, React Native, Vue.js, Node.js, Express, Ruby on Rails, GraphQL, Firebase, Docker, Kubernetes, Puppeteer, Web Scraping',
            },
            knowsAbout: [
                'React', 'React Native', 'Vue.js', 'Node.js', 'Express',
                'Ruby on Rails', 'GraphQL', 'Firebase', 'Google Cloud Platform',
                'Docker', 'Kubernetes', 'Puppeteer', 'Web Scraping', 'JavaScript', 'TypeScript',
            ],
            sameAs: [
                'https://github.com/atif-sheikh',
                'https://linkedin.com/in/muhammadatif007',
                'https://twitter.com/AtifSiddiqui55',
                'https://instagram.com/iamatifsiddiqui/',
                'https://www.facebook.com/king.atif.52',
                'https://www.upwork.com/freelancers/~01e5b356a9c3a67e23',
                'https://www.fiverr.com/atifengrr',
            ],
        },
        {
            '@type': 'WebSite',
            '@id': `${SITE}/#website`,
            url: `${SITE}/`,
            name: 'Muhammad Atif — Full Stack JavaScript Developer',
            inLanguage: 'en',
            publisher: { '@id': `${SITE}/#person` },
        },
        {
            '@type': 'ProfilePage',
            '@id': `${SITE}/#webpage`,
            url: `${SITE}/`,
            name: 'Muhammad Atif — Senior Full Stack JavaScript Developer',
            isPartOf: { '@id': `${SITE}/#website` },
            // ProfilePage requires mainEntity (the subject). `about` alone
            // isn't enough — Google flags "Missing field mainEntity".
            mainEntity: { '@id': `${SITE}/#person` },
            about: { '@id': `${SITE}/#person` },
            inLanguage: 'en',
        },
    ],
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
                <link rel="canonical" href={`${SITE}/`} />
                <script dangerouslySetInnerHTML={{ __html: REVEAL_GATE }} />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
                />
            </head>
            <body suppressHydrationWarning>
                <IconSprite />
                {children}
            </body>
        </html>
    );
}
