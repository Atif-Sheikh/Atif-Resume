'use client';

import { AnimatePresence, LazyMotion, MotionConfig, m } from 'framer-motion';
import { useState, type Ref } from 'react';
import REVIEWS from '@/data/fiverr-reviews.json';
import Icon from './Icon';
import SectionHead from './SectionHead';

type Review = (typeof REVIEWS)[number] & { id: number };

// Animation + layout features load after hydration; the SSR'd cards don't wait on them.
const loadFeatures = () => import('framer-motion').then((mod) => mod.domMax);

const PROFILE = 'https://www.fiverr.com/atifengrr';
const PAGE = 9;

// Fiverr's category names, shortened for chips and card tags.
const CATEGORIES: Record<string, string> = {
    'Cross-Platform Development': 'Mobile apps',
    'Custom Websites': 'Web apps',
    'Browser Extensions': 'Extensions',
};

const projectsByClient = REVIEWS.reduce<Record<string, number>>((acc, r) => {
    acc[r.user] = (acc[r.user] ?? 0) + 1;
    return acc;
}, {});

const clients = Object.keys(projectsByClient).length;
const STATS = [
    { value: REVIEWS.length, label: 'Reviews' },
    { value: clients, label: 'Clients' },
    { value: new Set(REVIEWS.map((r) => r.country)).size, label: 'Countries' },
    {
        value: Math.round((Object.values(projectsByClient).filter((n) => n > 1).length / clients) * 100),
        suffix: '%',
        label: 'Came back',
    },
];
const average = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(2);
const perfect = REVIEWS.filter((r) => r.rating === 5).length;

// Longest first so the substantive reviews lead; a photo counts as ~80 extra
// characters, which pulls faces into the first screen without burying detail.
const weight = (r: (typeof REVIEWS)[number]) => r.text.length + (r.avatar ? 80 : 0);
const SORTED: Review[] = REVIEWS.map((r, id) => ({ ...r, id })).sort((a, b) => weight(b) - weight(a));

const FILTERS = [
    { key: 'all', label: 'All', count: REVIEWS.length },
    ...Object.entries(CATEGORIES).map(([key, label]) => ({
        key,
        label,
        count: REVIEWS.filter((r) => r.category === key).length,
    })),
];

// Fiverr anonymises some buyers as "user12345678".
const displayName = (user: string) => (/^user\d+$/.test(user) ? 'Fiverr client' : user);

function Stars({ rating }: { rating: number }) {
    const filled = Math.round(rating);
    return (
        <span className="review-stars" role="img" aria-label={`Rated ${rating.toFixed(1)} out of 5`}>
            {[0, 1, 2, 3, 4].map((i) => (
                <svg key={i} viewBox="0 0 16 15" aria-hidden="true" className={i < filled ? 'on' : undefined}>
                    <path d="M8 0l2.47 4.9 5.53.79-4 3.83.94 5.48L8 12.4 3.06 15 4 9.52 0 5.69l5.53-.79z" />
                </svg>
            ))}
        </span>
    );
}

// AnimatePresence mode="popLayout" hands each child a ref to pop it out of flow
// while it exits; without it the leaving cards hold their grid cells.
function ReviewCard({ review, delay, ref }: { review: Review; delay: number; ref?: Ref<HTMLElement> }) {
    const name = displayName(review.user);
    const repeat = projectsByClient[review.user] > 1;
    return (
        <m.figure
            ref={ref}
            layout
            className="review-card"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
            whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 30 } }}
        >
            <div className="review-top">
                <Stars rating={review.rating} />
                <span className="review-rating">{review.rating.toFixed(1)}</span>
                {review.category && <span className="review-tag">{CATEGORIES[review.category]}</span>}
            </div>
            <blockquote>
                <p>{review.text}</p>
            </blockquote>
            <figcaption>
                {review.avatar ? (
                    // Self-hosted copies of the clients' Fiverr photos (100px for 2x).
                    // alt="" — the name sits right beside it.
                    <img
                        className="review-avatar"
                        src={`/assets/reviews/${review.user}.webp`}
                        alt={`${displayName(review.user)}'s profile photo`}
                        width={40}
                        height={40}
                        loading="lazy"
                        decoding="async"
                    />
                ) : (
                    <span className="review-avatar" aria-hidden="true">
                        {name[0].toUpperCase()}
                    </span>
                )}
                <span className="review-who">
                    <strong>{name}</strong>
                    <span>{review.country}</span>
                </span>
                {repeat && <span className="review-badge">Repeat client</span>}
            </figcaption>
        </m.figure>
    );
}

export default function Reviews() {
    const [filter, setFilter] = useState('all');
    const [shown, setShown] = useState(PAGE);
    // Cards revealed by "show more" stagger in from where the last batch ended.
    const [batchStart, setBatchStart] = useState(0);

    const list = filter === 'all' ? SORTED : SORTED.filter((r) => r.category === filter);
    const visible = list.slice(0, shown);
    const remaining = list.length - visible.length;

    const pick = (key: string) => {
        setFilter(key);
        setShown(PAGE);
        setBatchStart(0);
    };

    return (
        <section id="reviews" className="section">
            <div className="container">
                <SectionHead no="07" label="Client Reviews">
                    What clients <em>say</em>
                </SectionHead>

                <div className="reviews-summary" data-reveal>
                    <div className="reviews-score">
                        <span className="reviews-avg">{average}</span>
                        <div>
                            <Stars rating={5} />
                            <p>
                                {perfect} of {REVIEWS.length} projects rated a perfect 5.0
                            </p>
                        </div>
                    </div>
                    <dl className="reviews-stats">
                        {STATS.map((s) => (
                            <div key={s.label}>
                                <dt>{s.label}</dt>
                                <dd>
                                    <span data-count={s.value}>{s.value}</span>
                                    {s.suffix}
                                </dd>
                            </div>
                        ))}
                    </dl>
                    <a href={PROFILE} target="_blank" rel="noopener" className="btn btn-ghost btn-sm reviews-verify">
                        Verify on Fiverr <Icon name="i-external" />
                    </a>
                </div>

                <LazyMotion features={loadFeatures} strict>
                    <MotionConfig reducedMotion="user">
                        <div className="reviews-filters" data-reveal role="group" aria-label="Filter reviews by service">
                            {FILTERS.map((f) => (
                                <button
                                    key={f.key}
                                    type="button"
                                    className="reviews-filter"
                                    aria-pressed={filter === f.key}
                                    onClick={() => pick(f.key)}
                                >
                                    {filter === f.key && (
                                        <m.span
                                            layoutId="reviews-pill"
                                            className="reviews-pill"
                                            transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                                        />
                                    )}
                                    <span className="reviews-filter-label">
                                        {f.label} <small>{f.count}</small>
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* No data-reveal here: at 0.12 threshold a 9-card column on a landscape
                            phone never shows enough of itself to trigger, and stays hidden. */}
                        <div className="reviews-grid">
                            <AnimatePresence initial={false} mode="popLayout">
                                {visible.map((r, i) => (
                                    <ReviewCard
                                        key={r.id}
                                        review={r}
                                        delay={Math.max(0, i - batchStart) * 0.04}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    </MotionConfig>
                </LazyMotion>

                <div className="reviews-more">
                    <p aria-live="polite">
                        Showing {visible.length} of {list.length} reviews
                    </p>
                    {remaining > 0 && (
                        <button
                            type="button"
                            className="btn btn-ghost"
                            onClick={() => {
                                setBatchStart(shown);
                                setShown(shown + PAGE);
                            }}
                        >
                            Show {Math.min(PAGE, remaining)} more
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}
