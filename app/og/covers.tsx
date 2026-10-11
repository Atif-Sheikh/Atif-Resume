import fs from 'node:fs';
import path from 'node:path';
import type { ReactElement, ReactNode } from 'react';

// Per-post cover illustrations, keyed by slug and rendered to PNG by
// ./[slug]/route.tsx (a post without one falls back to the title card there),
// plus in-article figures rendered by ./fig/[name]/route.tsx.
// Satori layout rules apply: any element with several children needs
// display:flex, and the fonts only cover Latin, so dots, arrows and tree lines are boxes.

// Satori can't read woff2; these are the brand fonts converted to TTF, plus
// JetBrains Mono (OFL) for code.
const font = (file: string) => fs.readFileSync(path.join(process.cwd(), 'lib/og-fonts', file));
export const FONTS = [
    { name: 'Clash', data: font('clash-display-700.ttf'), weight: 700 as const },
    { name: 'Satoshi', data: font('satoshi-400.ttf'), weight: 400 as const },
    { name: 'Satoshi', data: font('satoshi-700.ttf'), weight: 700 as const },
    { name: 'Mono', data: font('jetbrains-mono-400.woff'), weight: 400 as const },
    { name: 'Mono', data: font('jetbrains-mono-700.woff'), weight: 700 as const },
];

export const C = {
    bg: '#070708',
    card: '#101013',
    elevated: '#0e0e10',
    text: '#f2efea',
    dim: '#9b968e',
    faint: '#55524d',
    accent: '#ff6b2b',
    soft: '#ffb02e',
    line: 'rgba(242,239,234,0.16)',
};

const Dot = ({ color = C.soft, size = 10 }: { color?: string; size?: number }) => (
    <div style={{ width: size, height: size, borderRadius: size, background: color, flexShrink: 0 }} />
);

/** One terminal line; `parts` are [text, colour] pairs so a line can mix colours. */
const Line = ({ parts, indent = 0, dot }: { parts: [string, string][]; indent?: number; dot?: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingLeft: indent, height: 34 }}>
        {dot && <Dot color={dot} />}
        {parts.map(([text, color], i) => (
            <span key={i} style={{ color, whiteSpace: 'pre' }}>
                {text}
            </span>
        ))}
    </div>
);

/** A file-tree row: depth draws the guide line, `note` is the right-hand label. */
const Node = ({ name, depth = 0, note, folder }: { name: string; depth?: number; note?: string; folder?: boolean }) => (
    <div style={{ display: 'flex', alignItems: 'center', height: 40 }}>
        {depth > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', width: 26 * depth, height: 40 }}>
                <div style={{ width: 1, height: 40, marginLeft: 8, background: C.line }} />
                <div style={{ width: 12, height: 1, background: C.line }} />
            </div>
        )}
        <span style={{ color: folder ? C.dim : C.text, flex: 1 }}>{name}</span>
        {note && (
            <span
                style={{
                    fontFamily: 'Satoshi',
                    fontSize: 16,
                    fontWeight: 700,
                    color: C.soft,
                    padding: '3px 12px',
                    border: `1px solid ${C.line}`,
                    borderRadius: 999,
                }}
            >
                {note}
            </span>
        )}
    </div>
);

function ClaudeCodeCover() {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                position: 'relative',
                background: C.bg,
                backgroundImage:
                    'radial-gradient(circle at 78% 40%, rgba(255,107,43,0.30), rgba(255,107,43,0) 42%)',
                fontFamily: 'Mono',
                fontSize: 21,
                color: C.text,
            }}
        >
            {/* Terminal: a session that plans before it edits and verifies after. */}
            <div
                style={{
                    position: 'absolute',
                    left: 56,
                    top: 74,
                    width: 720,
                    display: 'flex',
                    flexDirection: 'column',
                    background: C.card,
                    border: `1px solid ${C.line}`,
                    borderRadius: 20,
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        height: 52,
                        padding: '0 22px',
                        borderBottom: `1px solid ${C.line}`,
                        background: C.elevated,
                    }}
                >
                    <Dot color="#3a3836" size={13} />
                    <Dot color="#3a3836" size={13} />
                    <Dot color={C.accent} size={13} />
                    <span style={{ marginLeft: 18, fontSize: 17, color: C.faint }}>~/projects/portfolio — claude</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', padding: '22px 30px' }}>
                    <Line parts={[['$', C.faint], ['claude', C.text]]} />
                    <Line parts={[['plan mode on', C.soft], ['  (shift+tab to cycle)', C.faint]]} dot={C.soft} />
                    <div style={{ height: 14 }} />
                    <Line parts={[['>', C.accent], ['Add a /blog route with post cards', C.text]]} />
                    <div style={{ height: 14 }} />
                    <Line parts={[['Read ', C.dim], ['CLAUDE.md', C.text]]} dot={C.faint} />
                    <Line parts={[['Explore ', C.dim], ['app/  lib/  components/', C.text]]} dot={C.faint} />
                    <Line parts={[['Plan', C.text]]} dot={C.accent} />
                    <Line parts={[['1  lib/blog.ts       ', C.text], ['parse Markdown', C.faint]]} indent={24} />
                    <Line parts={[['2  app/blog/         ', C.text], ['cards + posts', C.faint]]} indent={24} />
                    <Line parts={[['3  verify            ', C.text], ['tsc, build, browser', C.faint]]} indent={24} />
                    <div style={{ height: 14 }} />
                    <Line parts={[['Build passed', C.text], ['  0 type errors', C.faint]]} dot="#3ecf8e" />
                </div>
            </div>

            {/* The setup around it: memory, commands, subagents, hooks, MCP. */}
            <div
                style={{
                    position: 'absolute',
                    right: 56,
                    top: 160,
                    width: 410,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '22px 26px 18px',
                    background: C.elevated,
                    border: `1px solid ${C.line}`,
                    borderRadius: 20,
                    boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
                    fontSize: 19,
                }}
            >
                <span style={{ fontFamily: 'Satoshi', fontSize: 16, color: C.faint, marginBottom: 8 }}>
                    project setup
                </span>
                <Node name="CLAUDE.md" note="memory" />
                <Node name=".claude/" folder />
                <Node name="commands/" depth={1} note="/commands" />
                <Node name="agents/" depth={1} note="subagents" />
                <Node name="settings.json" depth={1} note="hooks" />
                <Node name=".mcp.json" note="MCP" />
            </div>
        </div>
    );
}

/** Clash's space glyph is narrow, so each word is its own box and the gap sets the spacing. */
const Words = ({ text, size, color = C.text }: { text: string; size: number; color?: string }) => (
    <div
        style={{
            display: 'flex',
            flexWrap: 'wrap',
            fontFamily: 'Clash',
            fontSize: size,
            lineHeight: 1.1,
            letterSpacing: -size * 0.01,
            columnGap: size * 0.26,
            color,
        }}
    >
        {text.split(' ').map((word, i) => (
            <span key={i}>{word}</span>
        ))}
    </div>
);

/** A window with a title bar: the editor or terminal each tool lives in. */
const Window = ({ title, children, height }: { title: string; children: ReactNode; height: number }) => (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            width: 352,
            height,
            background: C.card,
            border: `1px solid ${C.line}`,
            borderRadius: 18,
            overflow: 'hidden',
        }}
    >
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                height: 44,
                padding: '0 18px',
                borderBottom: `1px solid ${C.line}`,
                background: C.elevated,
            }}
        >
            <Dot color="#3a3836" size={11} />
            <Dot color="#3a3836" size={11} />
            <Dot color="#3a3836" size={11} />
            <span style={{ marginLeft: 12, fontSize: 15, color: C.faint }}>{title}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '18px 20px', fontSize: 17 }}>{children}</div>
    </div>
);

/** An editor line with a line number; `ghost` lines are the not-yet-accepted suggestion. */
const Code = ({ n, text, ghost }: { n: number; text: string; ghost?: boolean }) => (
    <div style={{ display: 'flex', height: 32, alignItems: 'center' }}>
        <span style={{ width: 30, color: C.faint }}>{n}</span>
        <span style={{ whiteSpace: 'pre', color: ghost ? C.faint : C.text }}>{text}</span>
    </div>
);

const Pill = ({ children, color = C.soft }: { children: string; color?: string }) => (
    <span
        style={{
            fontFamily: 'Satoshi',
            fontSize: 15,
            fontWeight: 700,
            color,
            padding: '3px 12px',
            border: `1px solid ${C.line}`,
            borderRadius: 999,
        }}
    >
        {children}
    </span>
);

const ToolLabel = ({ name, note }: { name: string; note: string }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 352 }}>
        <Words text={name} size={30} />
        <span style={{ fontFamily: 'Satoshi', fontSize: 19, color: C.dim }}>{note}</span>
    </div>
);

// Three tools, three ways of working: a suggestion waiting for Tab, agents in
// parallel worktrees, and a terminal agent that plans, edits and checks.
function ComparisonCover() {
    const GREEN = '#3ecf8e';
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 26,
                padding: '0 48px',
                background: C.bg,
                backgroundImage:
                    'radial-gradient(circle at 50% 110%, rgba(255,107,43,0.30), rgba(255,107,43,0) 55%)',
                fontFamily: 'Mono',
                color: C.text,
            }}
        >
            <div style={{ display: 'flex', gap: 24 }}>
                <Window title="editor" height={370}>
                    <Code n={1} text="function total(items) {" />
                    <Code n={2} text="  return items" />
                    <Code n={3} text="    .filter(i => i.qty)" ghost />
                    <Code n={4} text="    .reduce((s, i) =>" ghost />
                    <Code n={5} text="      s + i.price, 0);" ghost />
                    <Code n={6} text="}" />
                    <div style={{ display: 'flex', marginTop: 22 }}>
                        <Pill>Tab to accept</Pill>
                    </div>
                </Window>
                <Window title="agents" height={370}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
                        <Pill color={C.text}>Agent 1</Pill>
                        <Pill color={C.dim}>Agent 2</Pill>
                        <Pill color={C.dim}>Agent 3</Pill>
                    </div>
                    <Line parts={[['refactor auth', C.text]]} dot={GREEN} />
                    <Line parts={[['add tests', C.text]]} dot={C.soft} />
                    <Line parts={[['fix issue 42', C.text]]} dot={C.soft} />
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginTop: 16,
                            paddingTop: 12,
                            borderTop: `1px solid ${C.line}`,
                        }}
                    >
                        <Line parts={[['3 worktrees', C.dim]]} />
                        <Line parts={[['+128 ', GREEN], ['-41', C.accent]]} />
                    </div>
                </Window>
                <Window title="terminal" height={370}>
                    <Line parts={[['$', C.faint], ['claude', C.text]]} />
                    <Line parts={[['>', C.accent], ['Add rate limiting', C.text]]} />
                    <div style={{ height: 10 }} />
                    <Line parts={[['Plan  ', C.text], ['4 steps', C.faint]]} dot={C.accent} />
                    <Line parts={[['Edit  ', C.text], ['6 files', C.faint]]} dot={C.faint} />
                    <Line parts={[['Test  ', C.text], ['24 passed', C.faint]]} dot={GREEN} />
                    <Line parts={[['Commit', C.text]]} dot={C.faint} />
                </Window>
            </div>
            <div style={{ display: 'flex', gap: 24 }}>
                <ToolLabel name="GitHub Copilot" note="Suggests as you type" />
                <ToolLabel name="Cursor" note="Agents beside your code" />
                <ToolLabel name="Claude Code" note="Takes the whole task" />
            </div>
        </div>
    );
}

export const COVERS: Record<string, () => ReactElement> = {
    'how-to-unlock-claude-code-potential': ClaudeCodeCover,
    'claude-code-vs-cursor-vs-github-copilot': ComparisonCover,
};

/* ---- In-article figures: out/og/fig/<name>.png ---- */

const Figure = ({ title, children }: { title: string; children: ReactNode }) => (
    <div
        style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '48px 56px',
            background: C.bg,
            backgroundImage: 'radial-gradient(circle at 100% 0%, rgba(255,107,43,0.16), rgba(255,107,43,0) 45%)',
            fontFamily: 'Satoshi',
            color: C.text,
        }}
    >
        <Words text={title} size={40} />
        {children}
    </div>
);

const TRACK = 820;

/** One tool's reach along the hand-over scale: the bar is its range, the dot its home. */
const Reach = ({ name, from, to, home }: { name: string; from: number; to: number; home: number }) => (
    <div style={{ display: 'flex', alignItems: 'center', height: 96, borderTop: `1px solid ${C.line}` }}>
        <span style={{ width: 268, fontSize: 28, fontWeight: 700 }}>{name}</span>
        <div style={{ display: 'flex', position: 'relative', width: TRACK, height: 40 }}>
            <div style={{ position: 'absolute', left: 0, right: 0, top: 19, height: 2, background: C.line }} />
            <div
                style={{
                    position: 'absolute',
                    left: TRACK * from,
                    width: TRACK * (to - from),
                    top: 12,
                    height: 16,
                    borderRadius: 16,
                    background: 'rgba(255,107,43,0.28)',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    left: TRACK * home - 20,
                    top: 0,
                    width: 40,
                    height: 40,
                    borderRadius: 40,
                    background: C.accent,
                    border: `6px solid ${C.bg}`,
                }}
            />
        </div>
    </div>
);

function HandoverFigure() {
    const stages = [
        ['You type, it suggests', 'inline completions'],
        ['You ask, it edits', 'chat and in-editor agents'],
        ['You describe, it delivers', 'agents run whole tasks'],
    ];
    return (
        <Figure title="How much of the work you hand over">
            <div style={{ display: 'flex', marginTop: 40, paddingLeft: 268 }}>
                {stages.map(([head, sub], i) => (
                    <div
                        key={head}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: TRACK / 3,
                            alignItems: ['flex-start', 'center', 'flex-end'][i],
                        }}
                    >
                        <span style={{ fontSize: 21, fontWeight: 700 }}>{head}</span>
                        <span style={{ fontSize: 18, color: C.dim }}>{sub}</span>
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: 22 }}>
                <Reach name="GitHub Copilot" from={0} to={1} home={0.1} />
                <Reach name="Cursor" from={0} to={0.85} home={0.42} />
                <Reach name="Claude Code" from={0.38} to={1} home={0.88} />
            </div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 28,
                    paddingTop: 22,
                    borderTop: `1px solid ${C.line}`,
                    fontSize: 18,
                    color: C.dim,
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Dot color={C.accent} size={18} />
                    <span>Where it is strongest</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 40, height: 14, borderRadius: 14, background: 'rgba(255,107,43,0.28)' }} />
                    <span>What else it covers</span>
                </div>
            </div>
        </Figure>
    );
}

const MAX = 200;
const BAR_H = 300;
type Plan = [name: string, price: number];

const PriceGroup = ({ tool, plans, note }: { tool: string; plans: Plan[]; note: string }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 340 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18, height: BAR_H + 34 }}>
            {plans.map(([name, price]) => (
                <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 68 }}>
                    <span style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>{`$${price}`}</span>
                    <div
                        style={{
                            width: 68,
                            height: Math.max(4, (price / MAX) * BAR_H),
                            borderRadius: '8px 8px 0 0',
                            background: price ? C.accent : C.faint,
                        }}
                    />
                </div>
            ))}
        </div>
        <div style={{ display: 'flex', gap: 18, paddingTop: 10, borderTop: `2px solid ${C.line}` }}>
            {plans.map(([name]) => (
                <span key={name} style={{ width: 68, fontSize: 16, color: C.dim, textAlign: 'center', whiteSpace: 'nowrap' }}>
                    {name}
                </span>
            ))}
        </div>
        <span style={{ marginTop: 18, fontSize: 26, fontWeight: 700 }}>{tool}</span>
        <span style={{ fontSize: 17, color: C.faint }}>{note}</span>
    </div>
);

function PricingFigure() {
    return (
        <Figure title="Monthly price for individuals, October 2026">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 36 }}>
                <PriceGroup
                    tool="GitHub Copilot"
                    note="AI credits, billed by token"
                    plans={[
                        ['Free', 0],
                        ['Pro', 10],
                        ['Pro+', 39],
                        ['Max', 100],
                    ]}
                />
                <PriceGroup
                    tool="Cursor"
                    note="Usage pool, then on demand"
                    plans={[
                        ['Hobby', 0],
                        ['Pro', 20],
                        ['Pro+', 60],
                        ['Ultra', 200],
                    ]}
                />
                <PriceGroup
                    tool="Claude Code"
                    note="5-hour and weekly limits"
                    plans={[
                        ['Pro', 20],
                        ['Max 5x', 100],
                        ['Max 20x', 200],
                    ]}
                />
            </div>
        </Figure>
    );
}

const Choice = ({ want, tool, points }: { want: string; tool: string; points: string[] }) => (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            width: 344,
            padding: '26px 28px',
            background: C.card,
            border: `1px solid ${C.line}`,
            borderRadius: 20,
        }}
    >
        <span style={{ fontSize: 20, color: C.dim, lineHeight: 1.35, height: 54 }}>{want}</span>
        <div style={{ display: 'flex', marginTop: 16, marginBottom: 18 }}>
            <Words text={tool} size={34} color={C.accent} />
        </div>
        {points.map((p) => (
            <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 12, height: 38, fontSize: 19 }}>
                <Dot color={C.soft} size={8} />
                <span>{p}</span>
            </div>
        ))}
    </div>
);

function DecisionFigure() {
    // Connector: down from the question, across, and down into each card.
    const line = { position: 'absolute' as const, background: C.line };
    return (
        <Figure title="What do you want from an AI coding tool?">
            <div style={{ display: 'flex', position: 'relative', height: 64 }}>
                <div style={{ ...line, left: 543, top: 14, width: 2, height: 25 }} />
                <div style={{ ...line, left: 172, top: 38, width: 744, height: 2 }} />
                <div style={{ ...line, left: 172, top: 38, width: 2, height: 26 }} />
                <div style={{ ...line, left: 543, top: 38, width: 2, height: 26 }} />
                <div style={{ ...line, left: 914, top: 38, width: 2, height: 26 }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Choice
                    want="Help while I type, in the editor I already use"
                    tool="GitHub Copilot"
                    points={['From $10 a month', 'VS Code, JetBrains, Xcode', 'Issues to pull requests']}
                />
                <Choice
                    want="An AI-first editor with agents beside my code"
                    tool="Cursor"
                    points={['Best Tab completions', 'Parallel agents', 'Models from many labs']}
                />
                <Choice
                    want="Hand over whole tasks and review the result"
                    tool="Claude Code"
                    points={['Multi-file features', 'Runs your tests itself', 'Terminal, IDE, web, CI']}
                />
            </div>
        </Figure>
    );
}

export const FIGURES: Record<string, { width: number; height: number; render: () => ReactElement }> = {
    'ai-coding-tools-handover': { width: 1200, height: 600, render: HandoverFigure },
    'ai-coding-tools-pricing': { width: 1200, height: 640, render: PricingFigure },
    'ai-coding-tools-decision': { width: 1200, height: 520, render: DecisionFigure },
};
