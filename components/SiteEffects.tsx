'use client';

import { useEffect } from 'react';

/* Scroll-driven and pointer-driven chrome. All of this reads and writes layout
   imperatively every frame, so it stays out of React state on purpose — a
   setState per scroll frame would re-render the whole page 60 times a second.
   Mounted once from the page; targets are found by data attribute. */
export default function SiteEffects() {
    useEffect(() => {
        // Hydration happened, so the head watchdog must not strip the .js class.
        const failsafe = (window as unknown as { __revealFailsafe?: number }).__revealFailsafe;
        if (failsafe) clearTimeout(failsafe);

        const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
        const finePointer = matchMedia('(pointer: fine)').matches;
        const $$ = <T extends Element>(s: string) => Array.from(document.querySelectorAll<T>(s));
        const cleanups: Array<() => void> = [];

        /* ---------- scroll reveals ---------- */
        const revealEls = $$<HTMLElement>('[data-reveal]');
        if (reducedMotion || !('IntersectionObserver' in window)) {
            revealEls.forEach((el) => el.classList.add('revealed'));
        } else {
            const obs = new IntersectionObserver(
                (entries) => {
                    entries.forEach((e) => {
                        if (!e.isIntersecting) return;
                        e.target.classList.add('revealed');
                        obs.unobserve(e.target);
                    });
                },
                { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
            );
            revealEls.forEach((el) => obs.observe(el));
            cleanups.push(() => obs.disconnect());
        }

        /* ---------- stat counters ---------- */
        if ('IntersectionObserver' in window) {
            const counterObs = new IntersectionObserver(
                (entries) => {
                    entries.forEach((e) => {
                        if (!e.isIntersecting) return;
                        const el = e.target as HTMLElement;
                        const target = parseInt(el.dataset.count ?? '0', 10);
                        counterObs.unobserve(el);
                        if (reducedMotion) {
                            el.textContent = String(target);
                            return;
                        }
                        let start: number | null = null;
                        const dur = 1400;
                        const step = (ts: number) => {
                            // rAF is throttled in background tabs; bailing to the final
                            // value keeps a frozen animation from showing a wrong number.
                            if (document.hidden) {
                                el.textContent = String(target);
                                return;
                            }
                            if (start === null) start = ts;
                            const p = Math.min((ts - start) / dur, 1);
                            el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
                            if (p < 1) requestAnimationFrame(step);
                        };
                        step(performance.now());
                    });
                },
                { threshold: 0.5 },
            );
            $$<HTMLElement>('[data-count]').forEach((el) => counterObs.observe(el));
            cleanups.push(() => counterObs.disconnect());
        }

        /* ---------- one rAF-throttled scroll handler drives everything ---------- */
        const header = document.getElementById('header');
        const progressBar = document.getElementById('scrollProgress');
        const timeline = document.getElementById('timeline');
        const timelineProgress = document.getElementById('timelineProgress');
        const sectionNos = reducedMotion ? [] : $$<HTMLElement>('.section-no');

        let navSections: Array<{ top: number; bottom: number; link: HTMLElement }> = [];
        let maxScroll = 0;
        let vh = window.innerHeight;
        let activeLink: HTMLElement | null = null;

        // Section offsets are cached here rather than read inside onScroll, so the
        // scroll handler never forces a synchronous layout.
        const measure = () => {
            vh = window.innerHeight;
            maxScroll = document.documentElement.scrollHeight - vh;
            navSections = [];
            $$<HTMLElement>('section[id]').forEach((sec) => {
                const link = document.querySelector<HTMLElement>(`.nav-links a[href="#${sec.id}"]`);
                if (!link) return;
                navSections.push({ top: sec.offsetTop, bottom: sec.offsetTop + sec.offsetHeight, link });
            });
        };

        const onScroll = () => {
            const y = window.scrollY;

            header?.classList.toggle('scrolled', y > 50);
            if (progressBar) {
                progressBar.style.width = `${maxScroll > 0 ? (y / maxScroll) * 100 : 0}%`;
            }

            for (const r of navSections) {
                if (y + 120 >= r.top && y + 120 < r.bottom) {
                    if (activeLink !== r.link) {
                        activeLink?.classList.remove('active');
                        r.link.classList.add('active');
                        activeLink = r.link;
                    }
                    break;
                }
            }

            if (reducedMotion) return;

            if (timeline && timelineProgress) {
                const t = timeline.getBoundingClientRect();
                const p = (vh * 0.75 - t.top) / (t.height * 0.7);
                timelineProgress.style.height = `${Math.max(0, Math.min(1, p)) * 100}%`;
            }

            // Ghost section numbers drift — transform only, so no layout is triggered.
            sectionNos.forEach((el) => {
                const r = el.getBoundingClientRect();
                if (r.bottom < 0 || r.top > vh) return;
                const prog = (r.top + r.height / 2 - vh / 2) / vh;
                el.style.transform = `translate3d(0,${(prog * -22).toFixed(1)}%,0)`;
            });
        };

        let queued = false;
        const scrollHandler = () => {
            if (queued) return;
            queued = true;
            requestAnimationFrame(() => {
                onScroll();
                queued = false;
            });
        };

        let resizeT: ReturnType<typeof setTimeout>;
        const resizeHandler = () => {
            clearTimeout(resizeT);
            resizeT = setTimeout(() => {
                measure();
                onScroll();
            }, 150);
        };
        const loadHandler = () => {
            measure();
            onScroll();
        };

        addEventListener('scroll', scrollHandler, { passive: true });
        addEventListener('resize', resizeHandler, { passive: true });
        addEventListener('load', loadHandler);
        measure();
        onScroll();

        cleanups.push(() => {
            removeEventListener('scroll', scrollHandler);
            removeEventListener('resize', resizeHandler);
            removeEventListener('load', loadHandler);
            clearTimeout(resizeT);
        });

        /* ---------- desktop-only pointer flourishes ---------- */
        if (finePointer && !reducedMotion) {
            const dot = document.getElementById('cursorDot');
            const ring = document.getElementById('cursorRing');

            if (dot && ring) {
                let cx = -100, cy = -100, rx = -100, ry = -100, running = false;
                const ringLoop = () => {
                    rx += (cx - rx) * 0.16;
                    ry += (cy - ry) * 0.16;
                    ring.style.transform = `translate3d(${rx - 18}px,${ry - 18}px,0)`;
                    if (Math.abs(cx - rx) > 0.5 || Math.abs(cy - ry) > 0.5) requestAnimationFrame(ringLoop);
                    else running = false;
                };
                const move = (e: MouseEvent) => {
                    cx = e.clientX;
                    cy = e.clientY;
                    dot.style.transform = `translate3d(${cx - 4}px,${cy - 4}px,0)`;
                    if (!running) {
                        running = true;
                        requestAnimationFrame(ringLoop);
                    }
                };
                addEventListener('mousemove', move, { passive: true });
                cleanups.push(() => removeEventListener('mousemove', move));

                const enter = () => ring.classList.add('hovering');
                const leave = () => ring.classList.remove('hovering');
                const hoverables = $$<HTMLElement>('a, button, .project-card, .service-row');
                hoverables.forEach((el) => {
                    el.addEventListener('mouseenter', enter);
                    el.addEventListener('mouseleave', leave);
                });
                cleanups.push(() =>
                    hoverables.forEach((el) => {
                        el.removeEventListener('mouseenter', enter);
                        el.removeEventListener('mouseleave', leave);
                    }),
                );
            }

            $$<HTMLElement>('[data-magnetic]').forEach((el) => {
                const move = (e: MouseEvent) => {
                    const r = el.getBoundingClientRect();
                    const x = (e.clientX - r.left - r.width / 2) * 0.35;
                    const y = (e.clientY - r.top - r.height / 2) * 0.35;
                    el.style.transform = `translate3d(${x}px,${y}px,0)`;
                };
                const leave = () => {
                    el.style.transition = 'transform .5s cubic-bezier(.22,1,.36,1)';
                    el.style.transform = 'translate3d(0,0,0)';
                    setTimeout(() => { el.style.transition = ''; }, 500);
                };
                el.addEventListener('mousemove', move);
                el.addEventListener('mouseleave', leave);
                cleanups.push(() => {
                    el.removeEventListener('mousemove', move);
                    el.removeEventListener('mouseleave', leave);
                });
            });

            $$<HTMLElement>('[data-tilt]').forEach((card) => {
                const move = (e: MouseEvent) => {
                    const r = card.getBoundingClientRect();
                    const px = (e.clientX - r.left) / r.width - 0.5;
                    const py = (e.clientY - r.top) / r.height - 0.5;
                    card.style.transform =
                        `perspective(900px) rotateX(${-py * 5}deg) rotateY(${px * 5}deg) translateY(-4px)`;
                };
                const leave = () => {
                    card.style.transition = 'transform .6s cubic-bezier(.22,1,.36,1)';
                    card.style.transform = 'perspective(900px) rotateX(0) rotateY(0)';
                    setTimeout(() => { card.style.transition = ''; }, 600);
                };
                card.addEventListener('mousemove', move);
                card.addEventListener('mouseleave', leave);
                cleanups.push(() => {
                    card.removeEventListener('mousemove', move);
                    card.removeEventListener('mouseleave', leave);
                });
            });
        }

        return () => cleanups.forEach((fn) => fn());
    }, []);

    return null;
}
