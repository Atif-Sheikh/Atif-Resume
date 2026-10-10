import fs from 'node:fs';
import path from 'node:path';
import { Marked, Renderer, type Tokens } from 'marked';

// One Markdown file per post; the filename is the URL slug (/blog/<slug>).
const DIR = path.join(process.cwd(), 'content/blog');

export type Post = {
    slug: string;
    title: string;
    description: string;
    date: string; // YYYY-MM-DD
    updated?: string;
    tags: string[];
    minutes: number;
    html: string;
    toc: { id: string; text: string }[];
};

const slugify = (text: string) =>
    text
        .toLowerCase()
        .replace(/<[^>]+>|[`*_]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

// Sections get ids and self-links so they can be deep-linked and listed in the
// table of contents; code blocks get a language label and a copy button (the
// click handler lives in components/PostEnhancements.tsx).
const md = new Marked({
    renderer: {
        heading({ tokens, depth, text }: Tokens.Heading) {
            const id = slugify(text);
            return `<h${depth} id="${id}"><a href="#${id}">${this.parser.parseInline(tokens)}</a></h${depth}>\n`;
        },
        code(token: Tokens.Code) {
            const lang = token.lang?.split(/\s/)[0] ?? '';
            return `<div class="code-block"><div class="code-bar"><span>${lang || 'code'}</span><button type="button" class="code-copy"><svg class="ico" aria-hidden="true"><use href="#i-copy"></use></svg><span>Copy</span></button></div>${Renderer.prototype.code.call(this, token)}</div>\n`;
        },
    },
});

// ponytail: flat `key: value` frontmatter only (tags comma-separated). Swap in
// gray-matter if a post ever needs nested YAML.
function parse(slug: string, raw: string): Post {
    const [, head = '', body = raw] = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/) ?? [];
    const meta: Record<string, string> = {};
    for (const line of head.split('\n')) {
        const i = line.indexOf(':');
        if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
    if (!meta.title || !meta.description || !meta.date) {
        throw new Error(`content/blog/${slug}.md needs title, description and date in its frontmatter`);
    }
    return {
        slug,
        title: meta.title,
        description: meta.description,
        date: meta.date,
        updated: meta.updated,
        tags: meta.tags ? meta.tags.split(',').map((t) => t.trim()) : [],
        minutes: Math.max(1, Math.round(body.split(/\s+/).length / 220)),
        html: md.parse(body, { async: false }),
        toc: md
            .lexer(body)
            .filter((t): t is Tokens.Heading => t.type === 'heading' && t.depth === 2)
            .map((t) => ({ id: slugify(t.text), text: t.text.replace(/[`*_]/g, '') })),
    };
}

export function getPosts(): Post[] {
    return fs
        .readdirSync(DIR)
        .filter((f) => f.endsWith('.md'))
        .map((f) => parse(f.slice(0, -3), fs.readFileSync(path.join(DIR, f), 'utf8')))
        .sort((a, b) => b.date.localeCompare(a.date));
}

export const getPost = (slug: string) => getPosts().find((p) => p.slug === slug);

export const formatDate = (date: string) =>
    new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
    });
