/** @type {import('next').NextConfig} */
const nextConfig = {
    // GitHub Pages serves plain files — no Node runtime, so everything is
    // pre-rendered to ./out at build time.
    output: 'export',
    images: { unoptimized: true },
    // Inlines the stylesheet into the HTML so first paint needs zero extra
    // round-trips. This is what the old hand-rolled critical-CSS block did.
    experimental: { inlineCss: true },
};

export default nextConfig;
