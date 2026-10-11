import { ImageResponse } from 'next/og';
import { FIGURES, FONTS } from '../../covers';

// Build-time article figures: out/og/fig/<name>.png, embedded in posts with a
// plain <img>. Same ".png in the param" trick as ../../[slug]/route.tsx.
export const dynamic = 'force-static';
export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(FIGURES).map((name) => ({ name: `${name}.png` }));

export async function GET(_: Request, { params }: { params: Promise<{ name: string }> }) {
    const { width, height, render: Figure } = FIGURES[(await params).name.replace(/\.png$/, '')];
    return new ImageResponse(<Figure />, { width, height, fonts: FONTS });
}
