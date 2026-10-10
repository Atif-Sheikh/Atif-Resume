import About from '@/components/About';
import ChatFab from '@/components/ChatFab';
import Contact from '@/components/Contact';
import CookieBanner from '@/components/CookieBanner';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Impact from '@/components/Impact';
import Marquee from '@/components/Marquee';
import Projects from '@/components/Projects';
import Reviews from '@/components/Reviews';
import Services from '@/components/Services';
import SiteEffects from '@/components/SiteEffects';
import Stack from '@/components/Stack';
import { SITE } from '@/lib/site';

const JSON_LD = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Person',
            '@id': `${SITE}/#person`,
            name: 'Muhammad Atif',
            alternateName: ['Atif Siddique', 'Atif Siddiqui', 'Muhammad Atif Siddique', 'Atif'],
            url: `${SITE}/`,
            image: {
                '@type': 'ImageObject',
                url: `${SITE}/assets/profile.jpeg`,
                caption: 'Muhammad Atif, Full Stack JavaScript Developer',
            },
            jobTitle: ['Senior Full Stack JavaScript Developer', 'Software Developer'],
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
            // Google takes the site name shown in results from WebSite.name.
            name: 'Atif Siddique',
            alternateName: ['Muhammad Atif', 'atifsiddique.com'],
            inLanguage: 'en',
            publisher: { '@id': `${SITE}/#person` },
        },
        {
            '@type': 'ProfilePage',
            '@id': `${SITE}/#webpage`,
            url: `${SITE}/`,
            name: 'Muhammad Atif Siddique | Full Stack Software Developer',
            isPartOf: { '@id': `${SITE}/#website` },
            // ProfilePage requires mainEntity (the subject). `about` alone
            // isn't enough — Google flags "Missing field mainEntity".
            mainEntity: { '@id': `${SITE}/#person` },
            about: { '@id': `${SITE}/#person` },
            inLanguage: 'en',
        },
    ],
};

export default function Page() {
    return (
        <>
            {/* Hand-written rather than `alternates.canonical`: Next normalises the
                root URL to an origin with no trailing slash, and the indexed URL has
                one. React hoists this into <head>. */}
            <link rel="canonical" href={`${SITE}/`} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
            <a href="#main" className="skip-link">
                Skip to content
            </a>

            {/* Atmosphere — purely decorative, driven by CSS. */}
            <div className="grain" aria-hidden="true" />
            <div className="orb orb-1" aria-hidden="true" />
            <div className="orb orb-2" aria-hidden="true" />
            <div className="cursor-dot" id="cursorDot" aria-hidden="true" />
            <div className="cursor-ring" id="cursorRing" aria-hidden="true" />

            <Header />
            <Hero />
            <Marquee />

            <main id="main">
                <About />
                <Impact />
                <Projects />
                <Stack />
                <Services />
                <Experience />
                <Education />
                <Reviews />
                <Contact />
            </main>

            <Footer />
            <ChatFab />
            <CookieBanner />
            <SiteEffects />
        </>
    );
}
