export const SITE = 'https://atifsiddique.com';

// A page that sets its own openGraph/twitter replaces the layout's wholesale
// (Next doesn't deep-merge them), so pages spread these back in.
const IMAGE = {
    url: `${SITE}/assets/profile.jpeg`,
    width: 960,
    height: 1280,
    alt: 'Portrait of Muhammad Atif (Atif Siddique), software developer',
};

export const OG_BASE = { siteName: 'Muhammad Atif', locale: 'en_US', images: [IMAGE] };

export const TWITTER_BASE = {
    card: 'summary_large_image' as const,
    site: '@AtifSiddiqui55',
    creator: '@AtifSiddiqui55',
    images: [{ url: IMAGE.url, alt: IMAGE.alt }],
};
