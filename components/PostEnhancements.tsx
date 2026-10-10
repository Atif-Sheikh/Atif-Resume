'use client';

import { useEffect } from 'react';

// The post body is static HTML from lib/blog.ts, so these hook into it after
// hydration instead of rendering it: copy buttons on code blocks and the share
// bar, and the "On this page" link for the section being read.
export default function PostEnhancements() {
    useEffect(() => {
        const flash = (button: HTMLElement, text: string, ok: boolean) => {
            const label = button.querySelector('span:last-child') ?? button;
            const icon = button.querySelector('use');
            const original = label.textContent;
            label.textContent = text;
            if (ok) icon?.setAttribute('href', '#i-check');
            setTimeout(() => {
                label.textContent = original;
                icon?.setAttribute('href', '#i-copy');
            }, 1600);
        };

        const onClick = (e: MouseEvent) => {
            const button = (e.target as Element).closest<HTMLElement>('.code-copy, [data-copy-link]');
            if (!button) return;
            const pre = button.closest('.code-block')?.querySelector('pre');
            const text = pre ? pre.innerText : location.href.split('#')[0];
            navigator.clipboard.writeText(text).then(
                () => flash(button, 'Copied', true),
                () => {
                    // Clipboard blocked: select the code so the keyboard shortcut works.
                    if (pre) getSelection()?.selectAllChildren(pre);
                    flash(button, pre ? 'Press Ctrl+C' : 'Copy failed', false);
                },
            );
        };
        document.addEventListener('click', onClick);

        // The last section heading above the reading line is the current one.
        const links = new Map(
            [...document.querySelectorAll<HTMLAnchorElement>('.post-toc a')].map((a) => [a.hash.slice(1), a]),
        );
        const headings = [...document.querySelectorAll<HTMLElement>('.prose h2[id]')];
        let current: HTMLAnchorElement | undefined;
        const update = () => {
            const line = innerHeight * 0.3;
            const active = headings.filter((h) => h.getBoundingClientRect().top < line).pop() ?? headings[0];
            const link = active && links.get(active.id);
            if (link === current) return;
            current?.removeAttribute('aria-current');
            link?.setAttribute('aria-current', 'location');
            current = link;
        };
        let frame = 0;
        const onScroll = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(update);
        };
        if (links.size) {
            update();
            addEventListener('scroll', onScroll, { passive: true });
        }

        return () => {
            document.removeEventListener('click', onClick);
            removeEventListener('scroll', onScroll);
            cancelAnimationFrame(frame);
        };
    }, []);

    return null;
}
