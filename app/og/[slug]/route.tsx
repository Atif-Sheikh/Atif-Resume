import fs from 'node:fs';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { formatDate, getPost, getPosts } from '@/lib/blog';
import { C, COVERS } from '../covers';

// Build-time cover + share images: out/og/<slug>.png, 1200×630. The ".png" lives in the
// param itself, so the static export writes a real .png file (GitHub Pages
// picks the content type from the extension) and no folder sits beside the
// post's .html to trigger a trailing-slash redirect.
export const dynamic = 'force-static';
export const dynamicParams = false;
export const generateStaticParams = () => getPosts().map((p) => ({ slug: `${p.slug}.png` }));

// Satori can't read woff2; these are the brand fonts converted to TTF, plus
// JetBrains Mono (OFL) for the code in cover illustrations.
const font = (file: string) => fs.readFileSync(path.join(process.cwd(), 'lib/og-fonts', file));
const portrait = `data:image/jpeg;base64,${fs
    .readFileSync(path.join(process.cwd(), 'public/assets/profile.jpeg'))
    .toString('base64')}`;

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
    const post = getPost((await params).slug.replace(/\.png$/, ''))!;
    const Cover = COVERS[post.slug];
    const size = post.title.length > 70 ? 60 : post.title.length > 45 ? 72 : 84;

    return new ImageResponse(
        Cover ? (
            <Cover />
        ) : (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '64px 72px',
                    background: C.bg,
                    backgroundImage:
                        'radial-gradient(circle at 92% 108%, rgba(255,107,43,0.38), rgba(255,107,43,0) 46%)',
                    color: C.text,
                    fontFamily: 'Satoshi',
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', fontFamily: 'Clash', fontSize: 44, letterSpacing: -1 }}>
                        MA<span style={{ color: C.accent }}>.</span>
                    </div>
                    <div style={{ fontSize: 26, color: C.dim }}>atifsiddique.com/blog</div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        fontFamily: 'Clash',
                        fontSize: size,
                        lineHeight: 1.04,
                        letterSpacing: -size * 0.01,
                        maxWidth: 1000,
                        flexWrap: 'wrap',
                        // Clash's space glyph is narrow at this size, so each word is
                        // its own box and the gap sets the word spacing.
                        columnGap: size * 0.26,
                    }}
                >
                    {post.title.split(' ').map((word, i) => (
                        <span key={i}>{word}</span>
                    ))}
                </div>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: 28,
                        borderTop: `1px solid ${C.line}`,
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={portrait}
                            width={64}
                            height={64}
                            style={{ borderRadius: 64, objectFit: 'cover', objectPosition: 'top' }}
                            alt=""
                        />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ fontSize: 28, fontWeight: 700 }}>Muhammad Atif</div>
                            <div style={{ fontSize: 22, color: C.dim }}>Full Stack Software Developer</div>
                        </div>
                    </div>
                    <div style={{ fontSize: 24, color: C.dim }}>
                        {`${formatDate(post.date)} · ${post.minutes} min read`}
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
            fonts: [
                { name: 'Clash', data: font('clash-display-700.ttf'), weight: 700 },
                { name: 'Satoshi', data: font('satoshi-400.ttf'), weight: 400 },
                { name: 'Satoshi', data: font('satoshi-700.ttf'), weight: 700 },
                { name: 'Mono', data: font('jetbrains-mono-400.woff'), weight: 400 },
                { name: 'Mono', data: font('jetbrains-mono-700.woff'), weight: 700 },
            ],
        },
    );
}
