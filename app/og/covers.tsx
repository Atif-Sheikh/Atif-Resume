import type { ReactElement } from 'react';

// Per-post cover illustrations, keyed by slug and rendered to PNG by
// ./[slug]/route.tsx. A post without one falls back to the title card there.
// Satori layout rules apply: any element with several children needs
// display:flex, and the fonts only cover Latin, so dots and tree lines are boxes.

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

export const COVERS: Record<string, () => ReactElement> = {
    'how-to-unlock-claude-code-potential': ClaudeCodeCover,
};
