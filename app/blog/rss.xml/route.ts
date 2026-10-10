import { getPosts } from '@/lib/blog';
import { SITE } from '@/lib/site';

// Written to out/blog/rss.xml at build time. dev.to and Hashnode can import
// new posts from this feed (with the canonical pointing back here).
export const dynamic = 'force-static';

const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function GET() {
    const items = getPosts()
        .map(
            (p) => `
    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE}/blog/${p.slug}</link>
      <guid>${SITE}/blog/${p.slug}</guid>
      <pubDate>${new Date(`${p.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(p.description)}</description>
      <content:encoded><![CDATA[${p.html.replace(/]]>/g, ']]]]><![CDATA[>')}]]></content:encoded>
    </item>`,
        )
        .join('');

    return new Response(
        `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Muhammad Atif Siddique — Blog</title>
    <link>${SITE}/blog/</link>
    <atom:link href="${SITE}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    <description>Notes on AI-assisted development, React, React Native, Node.js and web scraping.</description>
    <language>en</language>${items}
  </channel>
</rss>
`,
        { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } },
    );
}
