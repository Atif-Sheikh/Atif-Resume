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
import Services from '@/components/Services';
import SiteEffects from '@/components/SiteEffects';
import Stack from '@/components/Stack';

export default function Page() {
    return (
        <>
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
                <Contact />
            </main>

            <Footer />
            <ChatFab />
            <CookieBanner />
            <SiteEffects />
        </>
    );
}
