// Résumé content for /home.html, taken from Muhammad_Atif_Resume.pdf.
// Edit here and the page (and its printed PDF) follow.

export const CONTACT = {
    location: 'Karachi, Pakistan',
    phone: '+92 300 2410353',
    email: 'atifsiddiquissg@gmail.com',
    linkedin: 'linkedin.com/in/muhammadatif007',
    github: 'github.com/Atif-Sheikh',
    site: 'atifsiddique.com',
};

export const HEADLINE = 'Senior Frontend Lead';
export const FOCUS = 'React, TypeScript, React Native and frontend architecture';

export const SUMMARY =
    'Senior Frontend Lead with 8+ years building and scaling production web and mobile applications in React.js, TypeScript, and React Native. Currently lead a team of 3 engineers, owning frontend architecture, code quality, and delivery for a commercial API platform. Deep expertise in component-driven architecture, state management, performance optimization, and design-system consistency, backed by full-stack fluency across Node.js, GraphQL, and Ruby on Rails. Proven at mentoring developers, establishing code-review and CI/CD standards, and shipping polished interfaces for clients across the UAE, Denmark, and the United States.';

export const SKILLS = [
    { group: 'Core frontend', items: ['React.js', 'TypeScript', 'JavaScript (ES6+)', 'React Native', 'Next.js', 'Redux', 'Vue.js', 'HTML5', 'CSS3'] },
    { group: 'UI & styling', items: ['Tailwind CSS', 'Responsive Design', 'Component Libraries', 'Design Systems', 'Cross-Browser Compatibility', 'Accessibility'] },
    { group: 'Architecture & performance', items: ['Component-Driven Architecture', 'State Management', 'Code Splitting', 'Lazy Loading', 'Rendering Optimization', 'Reusable Component Design'] },
    { group: 'Frontend engineering', items: ['REST & GraphQL Integration', 'API Design', 'Authentication (OAuth, Firebase)', 'Unit & Integration Testing', 'Debugging'] },
    { group: 'Backend & data', items: ['Node.js', 'Express.js', 'Ruby on Rails', 'GraphQL', 'MongoDB', 'PostgreSQL', 'Firebase'] },
    { group: 'Tooling & DevOps', items: ['Git/GitHub', 'Docker', 'CI/CD', 'Webpack', 'Jira', 'Confluence', 'Linux'] },
    { group: 'Leadership', items: ['Frontend Leadership', 'Team Mentoring', 'Code Review', 'Architecture Decisions', 'Sprint Planning', 'Agile/Scrum'] },
];

export const EXPERIENCE = [
    {
        role: 'Senior Frontend Engineer / Frontend Lead',
        company: 'DevAndGo',
        location: 'United Arab Emirates (Remote)',
        date: 'Jun 2021 - Present',
        bullets: [
            'Lead frontend architecture and delivery for Crawlbase, a commercial web-data API platform, directing a team of 3 engineers and owning code quality across the codebase.',
            'Architect component-driven React and TypeScript interfaces, establishing reusable component patterns and a consistent design system that accelerated feature development.',
            'Drive frontend performance improvements through code splitting, lazy loading, and rendering optimization, improving load times on data-heavy dashboards.',
            'Build full-stack features end to end using React, Node.js, Ruby on Rails, and GraphQL, integrating REST/GraphQL APIs with polished, responsive UI.',
            'Established code-review standards and Docker-based CI/CD pipelines, reducing production defects and shortening release cycles.',
            'Mentor junior and mid-level engineers through pair programming, architecture guidance, and structured feedback.',
        ],
    },
    {
        role: 'React Native Developer',
        company: 'MeeW World',
        location: 'Copenhagen, Denmark (Remote)',
        date: 'May 2020 - May 2021',
        bullets: [
            'Developed cross-platform mobile features in React Native within a distributed, remote-first European team on two-week Agile sprints.',
            'Built reusable components and integrated Firebase and GraphQL services, improving code maintainability and reducing duplication.',
            'Optimized mobile rendering and app performance, collaborating with product and design to ship polished, on-schedule releases.',
        ],
    },
    {
        role: 'Full Stack JavaScript Developer',
        company: 'Panacloud',
        location: 'Karachi, Pakistan',
        date: 'Nov 2017 - Apr 2020',
        bullets: [
            'Developed responsive web and hybrid mobile applications with React.js, Vue.js, and React Native across multiple client projects.',
            'Built reusable UI components and integrated third-party services including Google OAuth, Firebase Authentication, and payment gateways.',
            'Diagnosed and resolved production defects, improving application stability and frontend reliability.',
        ],
    },
    {
        role: 'Freelance Frontend Developer',
        company: 'Upwork & Fiverr',
        location: 'Remote',
        date: 'Apr 2017 - Jan 2021',
        bullets: [
            'Delivered 25+ React.js, React Native, and GraphQL projects for international clients across the US, Europe, and the Middle East.',
            'Owned the full frontend lifecycle from requirements to deployment, earning repeat engagements through quality and reliability.',
        ],
        // Adds the live Fiverr rating line, computed from data/fiverr-reviews.json.
        reviews: true,
    },
];

export const PROJECTS = [
    {
        name: 'Crawlbase',
        role: 'Frontend Lead',
        url: 'https://crawlbase.com',
        body: 'Web-data API platform. Led frontend architecture and shipped customer-facing dashboard features in React, TypeScript, and Ruby on Rails.',
    },
    {
        name: 'Autonomiq',
        role: 'Test automation platform',
        url: 'https://autonomiq.io',
        body: 'Built React interfaces and Node.js services for an AI-driven test automation tool, covering test creation and reporting UIs.',
    },
    {
        name: 'SubtitleBee',
        role: 'Automated subtitling',
        url: 'https://subtitlebee.com',
        body: 'Developed frontend and API features for an automated video subtitling product used by content creators.',
    },
    {
        name: 'EonVPN',
        role: 'VPN application',
        url: 'https://eonvpn.com',
        body: 'Built cross-platform application UI with React Native and supporting backend services.',
    },
];

export const EDUCATION = [
    { title: 'Bachelor of Science, International Relations', place: 'Federal Urdu University, Karachi, Pakistan', year: '2019' },
    { title: 'Certification, Web and Mobile Application Development', place: 'Memon Federation, Karachi, Pakistan', year: '2017' },
];

// Not in the PDF; carried over from the previous résumé page.
export const LANGUAGES = [
    { name: 'English', level: 'Professional' },
    { name: 'Urdu', level: 'Native' },
];
