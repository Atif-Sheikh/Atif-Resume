/* ATIF — Portfolio 2026
   Zero dependencies. Everything below replaces GSAP + ScrollTrigger + Lenis (128 KB). */
(function () {
    'use strict';

    // Script booted — cancel the head watchdog that would unhide everything.
    if (window.__revealFailsafe) clearTimeout(window.__revealFailsafe);

    var reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    var finePointer = matchMedia('(pointer: fine)').matches;
    var isMobile = matchMedia('(max-width: 768px)').matches;

    var $ = function (s, c) { return (c || document).querySelector(s); };
    var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

    /* ----------------------------------
       Preloader
    ---------------------------------- */
    var preloader = $('#preloader');
    var preloaderCount = $('#preloaderCount');
    var preloaderDone = false;

    function finishPreloader() {
        if (!preloader || preloaderDone) return;
        preloaderDone = true;
        preloader.classList.add('done');
        setTimeout(function () { preloader.remove(); }, 900);
        startHeroIntro();
    }

    setTimeout(finishPreloader, 3500); // hard ceiling — overlay can never stick

    if (reducedMotion || !preloader) {
        if (preloader) preloader.remove();
        startHeroIntro();
    } else {
        var progress = 0;
        var tick = setInterval(function () {
            progress = Math.min(100, progress + Math.ceil(Math.random() * 16));
            if (preloaderCount) preloaderCount.textContent = progress;
            if (progress >= 100) {
                clearInterval(tick);
                setTimeout(finishPreloader, 200);
            }
        }, 60);
    }

    /* ----------------------------------
       Hero name split + intro (CSS transitions, no library)
    ---------------------------------- */
    $$('[data-split]').forEach(function (el) {
        var text = '', emChar = null;
        Array.prototype.forEach.call(el.childNodes, function (node) {
            if (node.nodeType === 3) text += node.textContent;
            else if (node.nodeName === 'EM') emChar = node.textContent;
        });
        el.textContent = '';
        var frag = document.createDocumentFragment();
        text.split('').forEach(function (ch) {
            var s = document.createElement('span');
            s.className = 'char';
            s.textContent = ch;
            frag.appendChild(s);
        });
        if (emChar) {
            var em = document.createElement('em');
            var s2 = document.createElement('span');
            s2.className = 'char';
            s2.textContent = emChar;
            em.appendChild(s2);
            frag.appendChild(em);
        }
        el.appendChild(frag);
    });

    var introStarted = false;
    function startHeroIntro() {
        if (introStarted) return;
        introStarted = true;
        var chars = $$('.hero-name .char');
        if (reducedMotion) {
            chars.forEach(function (c) { c.style.transform = 'none'; });
            document.body.classList.add('hero-in');
            return;
        }
        chars.forEach(function (c, i) { c.style.transitionDelay = (i * 32) + 'ms'; });
        requestAnimationFrame(function () {
            document.body.classList.add('hero-in');
        });
    }

    /* ----------------------------------
       Rotating hero roles
    ---------------------------------- */
    var roles = $$('.hero-roles-rotator .role');
    if (roles.length > 1 && !reducedMotion) {
        var roleIdx = 0;
        setInterval(function () {
            var cur = roles[roleIdx];
            roleIdx = (roleIdx + 1) % roles.length;
            cur.classList.remove('active');
            cur.classList.add('leaving');
            setTimeout(function () {
                // Snap back to the start position with animation off, otherwise it
                // slides down through the visible slot and collides with the incoming role.
                cur.style.transition = 'none';
                cur.classList.remove('leaving');
                void cur.offsetHeight;
                cur.style.transition = '';
            }, 600);
            roles[roleIdx].classList.add('active');
        }, 2600);
    }

    /* ----------------------------------
       Scroll reveals
    ---------------------------------- */
    var revealEls = $$('[data-reveal]');
    if (reducedMotion || !('IntersectionObserver' in window)) {
        revealEls.forEach(function (el) { el.classList.add('revealed'); });
    } else {
        var revealObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add('revealed');
                    revealObs.unobserve(e.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        revealEls.forEach(function (el) { revealObs.observe(el); });
    }

    /* ----------------------------------
       Stat counters
    ---------------------------------- */
    if ('IntersectionObserver' in window) {
        var counterObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (!e.isIntersecting) return;
                var el = e.target;
                var target = parseInt(el.getAttribute('data-count'), 10);
                counterObs.unobserve(el);
                if (reducedMotion) { el.textContent = target; return; }
                var start = null, dur = 1400;
                (function step(ts) {
                    // rAF is throttled in background tabs; bailing to the final
                    // value keeps a frozen animation from showing a wrong number.
                    if (document.hidden) { el.textContent = target; return; }
                    if (!start) start = ts;
                    var p = Math.min((ts - start) / dur, 1);
                    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
                    if (p < 1) requestAnimationFrame(step);
                })(performance.now());
            });
        }, { threshold: 0.5 });
        $$('[data-count]').forEach(function (el) { counterObs.observe(el); });
    }

    /* ----------------------------------
       ONE rAF-throttled scroll handler drives everything
    ---------------------------------- */
    var header = $('#header');
    var progressBar = $('#scrollProgress');
    var timeline = $('#timeline');
    var timelineProgress = $('#timelineProgress');
    var sectionNos = reducedMotion ? [] : $$('.section-no');
    var navSections = [];
    var maxScroll = 0;
    var vh = window.innerHeight;

    function measure() {
        vh = window.innerHeight;
        maxScroll = document.documentElement.scrollHeight - vh;
        navSections = [];
        $$('section[id]').forEach(function (sec) {
            var link = $('.nav-links a[href="#' + sec.id + '"]');
            if (!link) return;
            navSections.push({ top: sec.offsetTop, bottom: sec.offsetTop + sec.offsetHeight, link: link });
        });
    }

    var activeLink = null;
    function onScroll() {
        var y = window.scrollY;

        if (header) header.classList.toggle('scrolled', y > 50);
        if (progressBar) progressBar.style.width = (maxScroll > 0 ? (y / maxScroll) * 100 : 0) + '%';

        // active nav
        for (var i = 0; i < navSections.length; i++) {
            var r = navSections[i];
            if (y + 120 >= r.top && y + 120 < r.bottom) {
                if (activeLink !== r.link) {
                    if (activeLink) activeLink.classList.remove('active');
                    r.link.classList.add('active');
                    activeLink = r.link;
                }
                break;
            }
        }

        if (reducedMotion) return;

        // timeline draw
        if (timeline && timelineProgress) {
            var tRect = timeline.getBoundingClientRect();
            var p = (vh * 0.75 - tRect.top) / (tRect.height * 0.7);
            timelineProgress.style.height = Math.max(0, Math.min(1, p)) * 100 + '%';
        }

        // ghost section numbers drift (transform only — no layout)
        sectionNos.forEach(function (el) {
            var r = el.getBoundingClientRect();
            if (r.bottom < 0 || r.top > vh) return;
            var prog = (r.top + r.height / 2 - vh / 2) / vh;
            el.style.transform = 'translate3d(0,' + (prog * -22).toFixed(1) + '%,0)';
        });
    }

    var queued = false;
    addEventListener('scroll', function () {
        if (queued) return;
        queued = true;
        requestAnimationFrame(function () { onScroll(); queued = false; });
    }, { passive: true });

    var resizeT;
    addEventListener('resize', function () {
        clearTimeout(resizeT);
        resizeT = setTimeout(function () { measure(); onScroll(); }, 150);
    }, { passive: true });

    measure();
    onScroll();
    addEventListener('load', function () { measure(); onScroll(); });

    /* ----------------------------------
       Mobile menu
    ---------------------------------- */
    var hamburger = $('#hamburger');
    var mobileMenu = $('#mobileMenu');
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function () {
            var open = mobileMenu.classList.toggle('active');
            hamburger.classList.toggle('active', open);
            hamburger.setAttribute('aria-expanded', open);
            document.body.style.overflow = open ? 'hidden' : '';
        });
        $$('a', mobileMenu).forEach(function (link) {
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    /* ----------------------------------
       Copy email
    ---------------------------------- */
    var copyBtn = $('#copyEmail');
    if (copyBtn && navigator.clipboard) {
        copyBtn.addEventListener('click', function () {
            navigator.clipboard.writeText('atifsiddiquissg@gmail.com').then(function () {
                var tip = $('.copy-tip', copyBtn);
                var use = $('#copyIcon use');
                if (tip) tip.textContent = 'Copied!';
                if (use) use.setAttribute('href', '#i-check');
                setTimeout(function () {
                    if (tip) tip.textContent = 'Copy';
                    if (use) use.setAttribute('href', '#i-copy');
                }, 2000);
            });
        });
    }

    /* ----------------------------------
       Desktop-only enhancements (skipped on mobile to protect the main thread)
    ---------------------------------- */
    if (finePointer && !reducedMotion) {
        // Custom cursor
        var dot = $('#cursorDot'), ring = $('#cursorRing');
        if (dot && ring) {
            var cx = -100, cy = -100, rx = -100, ry = -100, cursorRaf = false;
            addEventListener('mousemove', function (e) {
                cx = e.clientX; cy = e.clientY;
                dot.style.transform = 'translate3d(' + (cx - 4) + 'px,' + (cy - 4) + 'px,0)';
                if (!cursorRaf) { cursorRaf = true; requestAnimationFrame(ringLoop); }
            }, { passive: true });
            function ringLoop() {
                rx += (cx - rx) * 0.16; ry += (cy - ry) * 0.16;
                ring.style.transform = 'translate3d(' + (rx - 18) + 'px,' + (ry - 18) + 'px,0)';
                if (Math.abs(cx - rx) > 0.5 || Math.abs(cy - ry) > 0.5) requestAnimationFrame(ringLoop);
                else cursorRaf = false;
            }
            $$('a, button, .project-card, .service-row').forEach(function (el) {
                el.addEventListener('mouseenter', function () { ring.classList.add('hovering'); });
                el.addEventListener('mouseleave', function () { ring.classList.remove('hovering'); });
            });
        }

        // Magnetic buttons
        $$('[data-magnetic]').forEach(function (el) {
            el.addEventListener('mousemove', function (e) {
                var r = el.getBoundingClientRect();
                el.style.transform = 'translate3d(' + (e.clientX - r.left - r.width / 2) * 0.35 + 'px,' +
                    (e.clientY - r.top - r.height / 2) * 0.35 + 'px,0)';
            });
            el.addEventListener('mouseleave', function () {
                el.style.transition = 'transform .5s cubic-bezier(.22,1,.36,1)';
                el.style.transform = 'translate3d(0,0,0)';
                setTimeout(function () { el.style.transition = ''; }, 500);
            });
        });

        // Card tilt
        $$('[data-tilt]').forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                var r = card.getBoundingClientRect();
                var px = (e.clientX - r.left) / r.width - 0.5;
                var py = (e.clientY - r.top) / r.height - 0.5;
                card.style.transform = 'perspective(900px) rotateX(' + (-py * 5) + 'deg) rotateY(' + (px * 5) + 'deg) translateY(-4px)';
            });
            card.addEventListener('mouseleave', function () {
                card.style.transition = 'transform .6s cubic-bezier(.22,1,.36,1)';
                card.style.transform = 'perspective(900px) rotateX(0) rotateY(0)';
                setTimeout(function () { card.style.transition = ''; }, 600);
            });
        });
    }

    /* ----------------------------------
       Hero particle constellation — desktop only, idle-deferred
    ---------------------------------- */
    var canvas = $('#heroCanvas');
    if (canvas && !reducedMotion && !isMobile && finePointer) {
        var idle = window.requestIdleCallback || function (f) { return setTimeout(f, 400); };
        idle(function () {
            var ctx = canvas.getContext('2d', { alpha: true });
            var particles = [], mouse = { x: -9999, y: -9999 };
            var dpr = Math.min(devicePixelRatio || 1, 1.5);
            var running = true, w = 0, h = 0;

            function size() {
                var r = canvas.parentElement.getBoundingClientRect();
                w = r.width; h = r.height;
                canvas.width = w * dpr; canvas.height = h * dpr;
                canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            }
            function build() {
                var n = Math.min(60, Math.floor((w * h) / 22000));
                particles = [];
                for (var i = 0; i < n; i++) particles.push({
                    x: Math.random() * w, y: Math.random() * h,
                    vx: (Math.random() - 0.5) * 0.32, vy: (Math.random() - 0.5) * 0.32,
                    r: Math.random() * 1.5 + 0.4
                });
            }
            function draw() {
                if (!running) return;
                ctx.clearRect(0, 0, w, h);
                for (var i = 0; i < particles.length; i++) {
                    var p = particles[i];
                    p.x += p.vx; p.y += p.vy;
                    var dx = mouse.x - p.x, dy = mouse.y - p.y;
                    var d = Math.sqrt(dx * dx + dy * dy);
                    if (d < 140 && d > 0.01) { p.x -= (dx / d) * 0.6; p.y -= (dy / d) * 0.6; }
                    if (p.x < 0 || p.x > w) p.vx *= -1;
                    if (p.y < 0 || p.y > h) p.vy *= -1;
                    p.x = Math.max(0, Math.min(w, p.x)); p.y = Math.max(0, Math.min(h, p.y));
                    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283);
                    ctx.fillStyle = 'rgba(255,140,70,.5)'; ctx.fill();
                    for (var j = i + 1; j < particles.length; j++) {
                        var q = particles[j], ax = p.x - q.x, ay = p.y - q.y, d2 = ax * ax + ay * ay;
                        if (d2 < 14400) {
                            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
                            ctx.strokeStyle = 'rgba(255,120,50,' + (0.14 * (1 - d2 / 14400)) + ')';
                            ctx.lineWidth = 1; ctx.stroke();
                        }
                    }
                }
                requestAnimationFrame(draw);
            }
            size(); build(); draw();
            addEventListener('resize', function () { size(); build(); }, { passive: true });
            addEventListener('mousemove', function (e) {
                var r = canvas.getBoundingClientRect();
                mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
            }, { passive: true });
            new IntersectionObserver(function (es) {
                es.forEach(function (e) {
                    var was = running; running = e.isIntersecting;
                    if (running && !was) draw();
                });
            }, { threshold: 0 }).observe(canvas);
        });
    }

    /* ----------------------------------
       Chat widget — 288 KB, loaded only when the user opens it
    ---------------------------------- */
    var chatFab = $('#chatFab');
    if (chatFab) {
        chatFab.addEventListener('click', function load() {
            chatFab.removeEventListener('click', load);
            chatFab.classList.add('loading');
            import('https://cdn.jsdelivr.net/npm/agent-embed-widget/dist/agent-embed-widget.es.js')
                .then(function (m) {
                    m.embedWidget({
                        type: 'tray',
                        url: 'https://console.thesys.dev/app/Cjv-fsVdqbHT2JCqC5nJr',
                        theme: 'light'
                    });
                    chatFab.remove();
                })
                .catch(function () {
                    chatFab.classList.remove('loading');
                    chatFab.addEventListener('click', load);
                });
        });
    }

    /* ----------------------------------
       Analytics — consent-gated, then deferred to idle
    ---------------------------------- */
    var banner = $('#cookie-banner');

    function loadAnalytics() {
        if (window.__gaLoaded) return;
        window.__gaLoaded = true;
        var run = function () {
            var s = document.createElement('script');
            s.async = true;
            s.src = 'https://www.googletagmanager.com/gtag/js?id=G-8C0PN10WNY';
            document.head.appendChild(s);
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', 'G-8C0PN10WNY');
        };
        if (window.requestIdleCallback) requestIdleCallback(run, { timeout: 6000 });
        else setTimeout(run, 3000);
    }

    if (banner) {
        var consent = localStorage.getItem('cookieConsent');
        if (!consent) banner.classList.add('visible');
        else if (consent === 'accepted') loadAnalytics();

        $('#accept-cookies').addEventListener('click', function () {
            localStorage.setItem('cookieConsent', 'accepted');
            banner.classList.remove('visible');
            loadAnalytics();
        });
        $('#decline-cookies').addEventListener('click', function () {
            localStorage.setItem('cookieConsent', 'declined');
            banner.classList.remove('visible');
        });
    }
})();
