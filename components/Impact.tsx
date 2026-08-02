const ITEMS = [
    { count: 9, suffix: '+', label: 'Years of experience' },
    { count: 6, suffix: '', label: 'Companies & clients' },
    { count: 2, suffix: '', label: 'Freelance platforms' },
    { count: null, suffix: 'M+', label: 'Requests handled daily' },
];

export default function Impact() {
    return (
        <section className="impact" aria-label="Impact at a glance">
            <div className="container impact-grid">
                {ITEMS.map((item) => (
                    <div className="impact-item" data-reveal key={item.label}>
                        <span className="impact-num">
                            {item.count !== null && <span data-count={item.count}>{item.count}</span>}
                            {item.suffix}
                        </span>
                        <span className="impact-label">{item.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
