import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Page not found — Muhammad Atif',
    robots: { index: false, follow: true },
};

export default function NotFound() {
    return (
        <main className="notfound">
            <div className="notfound-glow" aria-hidden="true" />
            <div className="notfound-code" aria-hidden="true">
                404
            </div>
            <h1>
                This page took a <em>wrong turn</em>.
            </h1>
            <p>
                The page you&rsquo;re looking for doesn&rsquo;t exist or has moved. Let&rsquo;s get you
                back to the work.
            </p>
            <a href="/" className="btn btn-primary">
                Back to portfolio →
            </a>
        </main>
    );
}
