'use client';

import { useEffect, useRef } from 'react';

type Particle = { x: number; y: number; vx: number; vy: number; r: number };

/* Particle constellation behind the hero. Desktop only and deferred to idle —
   it is decoration, so it must never compete with first paint or eat the
   main thread on a phone. */
export default function HeroCanvas() {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;
        if (
            matchMedia('(prefers-reduced-motion: reduce)').matches ||
            matchMedia('(max-width: 768px)').matches ||
            !matchMedia('(pointer: fine)').matches
        ) {
            return;
        }

        const ctx = canvas.getContext('2d', { alpha: true });
        const parent = canvas.parentElement;
        if (!ctx || !parent) return;

        let particles: Particle[] = [];
        const mouse = { x: -9999, y: -9999 };
        const dpr = Math.min(devicePixelRatio || 1, 1.5);
        let running = true;
        let disposed = false;
        let w = 0;
        let h = 0;

        const size = () => {
            const r = parent.getBoundingClientRect();
            w = r.width;
            h = r.height;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const build = () => {
            const n = Math.min(60, Math.floor((w * h) / 22000));
            particles = Array.from({ length: n }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.32,
                vy: (Math.random() - 0.5) * 0.32,
                r: Math.random() * 1.5 + 0.4,
            }));
        };

        const draw = () => {
            if (!running || disposed) return;
            ctx.clearRect(0, 0, w, h);
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < 140 && d > 0.01) {
                    p.x -= (dx / d) * 0.6;
                    p.y -= (dy / d) * 0.6;
                }
                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;
                p.x = Math.max(0, Math.min(w, p.x));
                p.y = Math.max(0, Math.min(h, p.y));
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, 6.283);
                ctx.fillStyle = 'rgba(255,140,70,.5)';
                ctx.fill();
                for (let j = i + 1; j < particles.length; j++) {
                    const q = particles[j];
                    const ax = p.x - q.x;
                    const ay = p.y - q.y;
                    const d2 = ax * ax + ay * ay;
                    if (d2 < 14400) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(q.x, q.y);
                        ctx.strokeStyle = `rgba(255,120,50,${0.14 * (1 - d2 / 14400)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(draw);
        };

        const onResize = () => {
            size();
            build();
        };
        const onMove = (e: MouseEvent) => {
            const r = canvas.getBoundingClientRect();
            mouse.x = e.clientX - r.left;
            mouse.y = e.clientY - r.top;
        };

        let observer: IntersectionObserver | undefined;
        const start = () => {
            if (disposed) return;
            size();
            build();
            draw();
            addEventListener('resize', onResize, { passive: true });
            addEventListener('mousemove', onMove, { passive: true });
            // Stop burning frames once the hero scrolls out of view.
            observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((e) => {
                        const was = running;
                        running = e.isIntersecting;
                        if (running && !was) draw();
                    });
                },
                { threshold: 0 },
            );
            observer.observe(canvas);
        };

        // Feature-detect by key: the DOM lib types declare requestIdleCallback as
        // always present, but Safari only shipped it recently.
        const hasIdle = 'requestIdleCallback' in window;
        const handle: number = hasIdle ? requestIdleCallback(start) : window.setTimeout(start, 400);

        return () => {
            disposed = true;
            running = false;
            if (hasIdle) cancelIdleCallback(handle);
            else clearTimeout(handle);
            removeEventListener('resize', onResize);
            removeEventListener('mousemove', onMove);
            observer?.disconnect();
        };
    }, []);

    return <canvas id="heroCanvas" ref={ref} aria-hidden="true" />;
}
