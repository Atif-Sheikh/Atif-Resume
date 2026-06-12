/* ATIF — Portfolio 2026 interactions */
(function () {
    'use strict';

    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var finePointer = window.matchMedia('(pointer: fine)').matches;
    var hasGsap = typeof gsap !== 'undefined';

    if (reducedMotion) document.documentElement.classList.add('no-motion');

    /* ----------------------------------
       Preloader
    ---------------------------------- */
    var preloader = document.getElementById('preloader');
    var preloaderCount = document.getElementById('preloaderCount');

    function finishPreloader() {
        if (!preloader) return;
        preloader.classList.add('done');
        setTimeout(function () { preloader.remove(); }, 900);
        startHeroIntro();
    }

    if (reducedMotion || !preloader) {
        if (preloader) preloader.remove();
        startHeroIntro();
    } else {
        var progress = 0;
        var tick = setInterval(function () {
            progress = Math.min(100, progress + Math.ceil(Math.random() * 14));
            if (preloaderCount) preloaderCount.textContent = progress;
            if (progress >= 100) {
                clearInterval(tick);
                setTimeout(finishPreloader, 250);
            }
        }, 70);
    }

    /* ----------------------------------
       Hero name split + intro
    ---------------------------------- */
    document.querySelectorAll('[data-split]').forEach(function (el) {
        var text = '';
        var emChar = null;
        el.childNodes.forEach(function (node) {
            if (node.nodeType === 3) text += node.textContent;
            else if (node.nodeName === 'EM') emChar = node.textContent;
        });
        el.textContent = '';
        text.split('').forEach(function (ch) {
            var span = document.createElement('span');
            span.className = 'char';
            span.textContent = ch;
            el.appendChild(span);
        });
        if (emChar) {
            var em = document.createElement('em');
            var span = document.createElement('span');
            span.className = 'char';
            span.textContent = emChar;
            em.appendChild(span);
            el.appendChild(em);
        }
    });

    var introStarted = false;
    function startHeroIntro() {
        if (introStarted) return;
        introStarted = true;
        var chars = document.querySelectorAll('.hero-name .char');
        if (reducedMotion || !hasGsap) {
            chars.forEach(function (c) { c.style.transform = 'none'; });
            return;
        }
        gsap.to(chars, {
            y: 0,
            duration: 1,
            ease: 'power4.out',
            stagger: 0.035,
            delay: 0.15,
            onComplete: function () {
                chars.forEach(function (c) { c.style.transform = 'none'; });
            }
        });
        gsap.from(['.hero-eyebrow', '.hero-roles', '.hero-tagline', '.hero-btns'], {
            y: 28, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1, delay: 0.5
        });
        gsap.from('.hero-portrait', {
            y: 40, opacity: 0, duration: 1.1, ease: 'power3.out', delay: 0.65
        });
        gsap.from('.hero-stats > *', {
            y: 24, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08, delay: 0.9
        });
    }

    /* ----------------------------------
       Smooth scrolling (Lenis)
    ---------------------------------- */
    var lenis = null;
    var hasScrollTrigger = hasGsap && typeof ScrollTrigger !== 'undefined';
    if (hasScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    if (!reducedMotion && typeof Lenis !== 'undefined') {
        lenis = new Lenis({ lerp: 0.12, smoothWheel: true });

        // Drive Lenis from GSAP's ticker and keep ScrollTrigger in sync —
        // two competing rAF loops cause visible stutter.
        if (hasScrollTrigger) {
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
            gsap.ticker.lagSmoothing(0);
        } else {
            requestAnimationFrame(function raf(time) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            });
        }

        document.querySelectorAll('a[href^="#"]').forEach(function (a) {
            a.addEventListener('click', function (e) {
                var id = a.getAttribute('href');
                if (id.length > 1) {
                    var target = document.querySelector(id);
                    if (target) {
                        e.preventDefault();
                        lenis.scrollTo(target, { offset: -80 });
                    }
                } else {
                    e.preventDefault();
                    lenis.scrollTo(0);
                }
            });
        });
    }

    /* ----------------------------------
       Hero particle constellation
    ---------------------------------- */
    var canvas = document.getElementById('heroCanvas');
    if (canvas && !reducedMotion) {
        var ctx = canvas.getContext('2d');
        var particles = [];
        var mouse = { x: -9999, y: -9999 };
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        var running = true;

        function sizeCanvas() {
            var rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            canvas.style.width = rect.width + 'px';
            canvas.style.height = rect.height + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        function buildParticles() {
            var w = canvas.width / dpr, h = canvas.height / dpr;
            var count = Math.min(70, Math.floor((w * h) / 18000));
            particles = [];
            for (var i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    vx: (Math.random() - 0.5) * 0.35,
                    vy: (Math.random() - 0.5) * 0.35,
                    r: Math.random() * 1.6 + 0.4
                });
            }
        }

        function drawFrame() {
            if (!running) return;
            var w = canvas.width / dpr, h = canvas.height / dpr;
            ctx.clearRect(0, 0, w, h);

            for (var i = 0; i < particles.length; i++) {
                var p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                var dx = mouse.x - p.x, dy = mouse.y - p.y;
                var dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 140 && dist > 0.01) {
                    p.x -= (dx / dist) * 0.6;
                    p.y -= (dy / dist) * 0.6;
                }

                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;
                p.x = Math.max(0, Math.min(w, p.x));
                p.y = Math.max(0, Math.min(h, p.y));

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 140, 70, 0.5)';
                ctx.fill();

                for (var j = i + 1; j < particles.length; j++) {
                    var q = particles[j];
                    var ddx = p.x - q.x, ddy = p.y - q.y;
                    var d2 = ddx * ddx + ddy * ddy;
                    if (d2 < 14400) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(q.x, q.y);
                        ctx.strokeStyle = 'rgba(255, 120, 50,' + (0.14 * (1 - d2 / 14400)) + ')';
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(drawFrame);
        }

        sizeCanvas();
        buildParticles();
        drawFrame();

        window.addEventListener('resize', function () {
            sizeCanvas();
            buildParticles();
        });

        window.addEventListener('mousemove', function (e) {
            var rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        // Pause when hero offscreen
        new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                var was = running;
                running = entry.isIntersecting;
                if (running && !was) drawFrame();
            });
        }, { threshold: 0 }).observe(canvas);
    }

    /* ----------------------------------
       Custom cursor
    ---------------------------------- */
    var dot = document.getElementById('cursorDot');
    var ring = document.getElementById('cursorRing');
    if (finePointer && !reducedMotion && dot && ring) {
        var cx = -100, cy = -100, rx = -100, ry = -100;

        window.addEventListener('mousemove', function (e) {
            cx = e.clientX;
            cy = e.clientY;
            dot.style.transform = 'translate(' + (cx - 4) + 'px,' + (cy - 4) + 'px)';
        });

        (function ringLoop() {
            rx += (cx - rx) * 0.16;
            ry += (cy - ry) * 0.16;
            ring.style.transform = 'translate(' + (rx - 18) + 'px,' + (ry - 18) + 'px)';
            requestAnimationFrame(ringLoop);
        })();

        document.querySelectorAll('a, button, .project-card, .service-row').forEach(function (el) {
            el.addEventListener('mouseenter', function () { ring.classList.add('hovering'); });
            el.addEventListener('mouseleave', function () { ring.classList.remove('hovering'); });
        });
    }

    /* ----------------------------------
       Magnetic buttons
    ---------------------------------- */
    if (finePointer && !reducedMotion) {
        document.querySelectorAll('[data-magnetic]').forEach(function (el) {
            var strength = 0.35;
            el.addEventListener('mousemove', function (e) {
                var rect = el.getBoundingClientRect();
                var x = e.clientX - rect.left - rect.width / 2;
                var y = e.clientY - rect.top - rect.height / 2;
                el.style.transform = 'translate(' + x * strength + 'px,' + y * strength + 'px)';
            });
            el.addEventListener('mouseleave', function () {
                el.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
                el.style.transform = 'translate(0, 0)';
                setTimeout(function () { el.style.transition = ''; }, 500);
            });
        });
    }

    /* ----------------------------------
       Rotating hero roles
    ---------------------------------- */
    var roles = document.querySelectorAll('.hero-roles-rotator .role');
    if (roles.length > 1 && !reducedMotion) {
        var roleIdx = 0;
        setInterval(function () {
            var current = roles[roleIdx];
            roleIdx = (roleIdx + 1) % roles.length;
            var next = roles[roleIdx];
            current.classList.remove('active');
            current.classList.add('leaving');
            setTimeout(function () { current.classList.remove('leaving'); }, 600);
            next.classList.add('active');
        }, 2600);
    }

    /* ----------------------------------
       Header: scroll state + progress
    ---------------------------------- */
    var header = document.getElementById('header');
    var progressBar = document.getElementById('scrollProgress');
    var sections = document.querySelectorAll('section[id]');

    // Cache layout metrics — reading offsetTop/scrollHeight inside the scroll
    // handler forces synchronous layout and makes scrolling stutter.
    var sectionRanges = [];
    var maxScroll = 0;
    function measureLayout() {
        maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        sectionRanges = [];
        sections.forEach(function (section) {
            var link = document.querySelector('.nav-links a[href="#' + section.id + '"]');
            if (!link) return;
            sectionRanges.push({
                top: section.offsetTop,
                bottom: section.offsetTop + section.offsetHeight,
                link: link
            });
        });
    }

    var activeLink = null;
    function onScroll() {
        var y = window.scrollY;
        if (header) header.classList.toggle('scrolled', y > 50);
        if (progressBar) {
            progressBar.style.width = (maxScroll > 0 ? (y / maxScroll) * 100 : 0) + '%';
        }
        var pos = y + 120;
        for (var i = 0; i < sectionRanges.length; i++) {
            var r = sectionRanges[i];
            if (pos >= r.top && pos < r.bottom) {
                if (activeLink !== r.link) {
                    if (activeLink) activeLink.classList.remove('active');
                    r.link.classList.add('active');
                    activeLink = r.link;
                }
                break;
            }
        }
    }

    var scrollQueued = false;
    window.addEventListener('scroll', function () {
        if (scrollQueued) return;
        scrollQueued = true;
        requestAnimationFrame(function () {
            onScroll();
            scrollQueued = false;
        });
    }, { passive: true });

    window.addEventListener('resize', measureLayout, { passive: true });
    window.addEventListener('load', function () {
        measureLayout();
        onScroll();
        if (hasScrollTrigger) ScrollTrigger.refresh();
    });
    measureLayout();
    onScroll();

    /* ----------------------------------
       Mobile menu
    ---------------------------------- */
    var hamburger = document.getElementById('hamburger');
    var mobileMenu = document.getElementById('mobileMenu');
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function () {
            var open = mobileMenu.classList.toggle('active');
            hamburger.classList.toggle('active', open);
            hamburger.setAttribute('aria-expanded', open);
            document.body.style.overflow = open ? 'hidden' : '';
            if (lenis) open ? lenis.stop() : lenis.start();
        });

        mobileMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                if (lenis) lenis.start();
            });
        });
    }

    /* ----------------------------------
       Scroll reveals
    ---------------------------------- */
    var revealEls = document.querySelectorAll('[data-reveal]');
    if (reducedMotion) {
        revealEls.forEach(function (el) { el.classList.add('revealed'); });
    } else {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        revealEls.forEach(function (el) { revealObserver.observe(el); });
    }

    /* ----------------------------------
       Stat counters
    ---------------------------------- */
    var counters = document.querySelectorAll('[data-count]');
    var counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var el = entry.target;
            var target = parseInt(el.getAttribute('data-count'), 10);
            counterObserver.unobserve(el);
            if (reducedMotion) { el.textContent = target; return; }
            var start = null;
            var dur = 1400;
            function step(ts) {
                if (!start) start = ts;
                var p = Math.min((ts - start) / dur, 1);
                el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
                if (p < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
        });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { counterObserver.observe(el); });

    /* ----------------------------------
       Timeline draw-on-scroll
    ---------------------------------- */
    var timelineProgress = document.getElementById('timelineProgress');
    var timeline = document.getElementById('timeline');
    if (timelineProgress && timeline && hasScrollTrigger && !reducedMotion) {
        gsap.to(timelineProgress, {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
                trigger: timeline,
                start: 'top 75%',
                end: 'bottom 45%',
                scrub: 0.6
            }
        });
    } else if (timelineProgress) {
        timelineProgress.style.height = '100%';
    }

    /* ----------------------------------
       Project card 3D tilt
    ---------------------------------- */
    if (finePointer && !reducedMotion) {
        document.querySelectorAll('[data-tilt]').forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                var rect = card.getBoundingClientRect();
                var px = (e.clientX - rect.left) / rect.width - 0.5;
                var py = (e.clientY - rect.top) / rect.height - 0.5;
                card.style.transform =
                    'perspective(900px) rotateX(' + (-py * 5) + 'deg) rotateY(' + (px * 5) + 'deg) translateY(-4px)';
            });
            card.addEventListener('mouseleave', function () {
                card.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
                card.style.transform = 'perspective(900px) rotateX(0) rotateY(0)';
                setTimeout(function () { card.style.transition = ''; }, 600);
            });
        });
    }

    /* ----------------------------------
       Copy email
    ---------------------------------- */
    var copyBtn = document.getElementById('copyEmail');
    if (copyBtn) {
        copyBtn.addEventListener('click', function () {
            navigator.clipboard.writeText('atifsiddiquissg@gmail.com').then(function () {
                var tip = copyBtn.querySelector('.copy-tip');
                var icon = copyBtn.querySelector('i');
                if (tip) tip.textContent = 'Copied!';
                if (icon) icon.className = 'fas fa-check';
                setTimeout(function () {
                    if (tip) tip.textContent = 'Copy';
                    if (icon) icon.className = 'far fa-copy';
                }, 2000);
            });
        });
    }
})();
