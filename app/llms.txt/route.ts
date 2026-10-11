import { getPosts } from '@/lib/blog';
import { SITE } from '@/lib/site';

// out/llms.txt (llmstxt.org): a plain-Markdown map of the site for AI tools.
// Google Search ignores it; Lighthouse's agent audits count it.
export const dynamic = 'force-static';

export function GET() {
    const posts = getPosts()
        .map((p) => `- [${p.title}](${SITE}/blog/${p.slug}): ${p.description}`)
        .join('\n');
    const body = `# Muhammad Atif

> Muhammad Atif (Atif Siddique) is a full stack software developer in Karachi, Pakistan, with 9+ years building React, React Native, Node.js and Ruby on Rails apps and large-scale web scrapers. Available for freelance and contract work.

## Pages

- [Portfolio](${SITE}/): projects, services, experience, client reviews and contact details
- [Résumé](${SITE}/home.html): experience, key projects, skills and education
- [Résumé PDF](${SITE}/Muhammad_Atif_Resume.pdf): downloadable résumé
- [Blog](${SITE}/blog/): practical writing on AI-assisted development, React and web scraping

## Blog posts

${posts}

## Contact

- Email: atifsiddiquissg@gmail.com
- GitHub: https://github.com/atif-sheikh
- LinkedIn: https://linkedin.com/in/muhammadatif007
`;
    return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
