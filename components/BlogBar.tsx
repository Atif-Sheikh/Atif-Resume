// Same sticky bar as the résumé page. id="home" lets the shared footer's logo
// link scroll back up here.
export default function BlogBar() {
    return (
        <header className="resume-bar" id="home">
            <div className="resume-wrap resume-bar-inner">
                <a href="/" className="logo" aria-label="Muhammad Atif, portfolio home">
                    MA<em>.</em>
                </a>
                <nav className="resume-actions" aria-label="Blog">
                    <a href="/" className="resume-link">
                        Home
                    </a>
                    <a href="/blog/" className="resume-link">
                        Blog
                    </a>
                    <a href="/home.html" className="resume-link">
                        Résumé
                    </a>
                    <a href="mailto:atifsiddiquissg@gmail.com" className="btn btn-primary btn-sm">
                        Hire me
                    </a>
                </nav>
            </div>
        </header>
    );
}
