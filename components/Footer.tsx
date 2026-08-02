import Icon from './Icon';

const SOCIALS = [
    { href: 'https://github.com/atif-sheikh', icon: 'i-github', label: 'GitHub' },
    { href: 'https://linkedin.com/in/muhammadatif007', icon: 'i-linkedin', label: 'LinkedIn' },
    { href: 'https://twitter.com/AtifSiddiqui55', icon: 'i-x', label: 'X / Twitter' },
    { href: 'https://instagram.com/iamatifsiddiqui/', icon: 'i-instagram', label: 'Instagram' },
    { href: 'https://www.facebook.com/king.atif.52', icon: 'i-facebook', label: 'Facebook' },
];

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-inner">
                <a href="#home" className="logo">
                    MA<em>.</em>
                </a>
                <div className="social-links">
                    {SOCIALS.map((s) => (
                        <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener"
                            className="social-link"
                            aria-label={s.label}
                        >
                            <Icon name={s.icon} />
                        </a>
                    ))}
                </div>
                <p className="footer-copy">© {new Date().getFullYear()} Muhammad Atif. All rights reserved.</p>
            </div>
        </footer>
    );
}
