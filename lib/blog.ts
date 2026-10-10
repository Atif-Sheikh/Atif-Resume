import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

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
};

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
        html: marked.parse(body, { async: false }),
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
