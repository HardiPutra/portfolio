/**
 * Single source of truth for every piece of content on the site.
 *
 * Edit this file to update the portfolio — no component needs to change.
 * Anything written in UPPER_SNAKE_CASE (YOUR_EMAIL, YOUR_GITHUB_URL, ...) is a
 * placeholder waiting for a real value.
 */

// ---------------------------------------------------------------------------
// Identity
// ---------------------------------------------------------------------------

export const profile = {
  name: 'Hardi',
  role: 'Software Developer & Tech Enthusiast',
  headline: "I'm Hardi Putra.",
  summary:
    'I work across web development and AI. What I enjoy most is taking an idea apart and turning it into something that works',
  location: 'YOUR_LOCATION',
  email: 'YOUR_EMAIL',
  resumeUrl: '/resume.pdf',
};

// ---------------------------------------------------------------------------
// Navigation — drives both the navbar links and the scroll-spy observer.
// `id` must match the id of the corresponding <section>.
// ---------------------------------------------------------------------------

export const navigation = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

// ---------------------------------------------------------------------------
// About
// ---------------------------------------------------------------------------

export const about = {
  eyebrow: 'About',
  title: 'Curious by nature. Building with technology.',
  // The first paragraph is rendered as the lead — keep it the strongest one.
  paragraphs: [
    'I studied Computer Science, where I built my foundation in software development, systems, and data. Over time, I found myself enjoying the process of turning ideas into things that actually work.',
    'Before focusing more on software, I spent years working hands-on as a smartphone technician. Working with hardware taught me to approach problems differently — break them down, understand how things work, find the root cause, and fix them properly. That mindset still shapes the way I approach technology today.',
    'Now, I work across web development, data, and AI, while continuing to explore new technologies. I enjoy learning by building, experimenting with ideas, and creating practical solutions that can make a real difference.',
  ],
};

// ---------------------------------------------------------------------------
// Skills — grouped, no progress bars. Icon names map to lucide-react.
// ---------------------------------------------------------------------------

export const skillGroups = [
  {
    title: 'Programming',
    icon: 'CodeXml',
    description: 'Languages I write day to day.',
    items: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Python', 'Java'],
  },
  {
    title: 'Web Development',
    icon: 'PanelsTopLeft',
    description: 'Building interfaces and the services behind them.',
    items: ['React', 'Laravel', 'Front-End Development', 'Responsive Design', 'REST API'],
  },
  {
    title: 'Database',
    icon: 'Database',
    description: 'Modelling and managing persistent data.',
    items: ['MySQL', 'Database Design', 'Query Optimization'],
  },
  {
    title: 'AI & Data',
    icon: 'BrainCircuit',
    description: 'Turning data into something that makes a decision.',
    items: ['Machine Learning', 'Natural Language Processing', 'Data Analysis', 'Scikit-learn'],
  },
  {
    title: 'Tools',
    icon: 'Wrench',
    description: 'The workbench.',
    items: ['Git', 'GitHub', 'VS Code', 'Figma'],
  },
];

// ---------------------------------------------------------------------------
// Projects — 3 to 5 is the right number. `url: null` renders a disabled state
// instead of a dead link, so an unfinished entry never ships as broken.
//
// `image` points at /public. Replace the placeholder SVGs with real
// screenshots (JPG/WebP, ~1600x1000) and update the path here.
// ---------------------------------------------------------------------------

export const projects = [
  {
    id: 'hardstech',
    name: 'HardsTech',
    category: 'Web Platform',
    year: 'YEAR',
    description:
      'A platform for smartphone repair services and parts, connecting customers with technicians through a single storefront.',
    tech: ['Laravel', 'PHP', 'MySQL', 'JavaScript'],
    image: '/projects/hardstech.svg',
    imageAlt: 'HardsTech — smartphone repair service platform',
    url: 'YOUR_PROJECT_URL',
    repo: 'YOUR_REPO_URL',
    featured: true,
  },
  {
    id: 'mobilemedics',
    name: 'MobileMedics',
    category: 'Marketplace',
    year: 'YEAR',
    description:
      'A marketplace for smartphone repair services, covering technician discovery, service listings, and booking.',
    tech: ['React', 'REST API', 'MySQL'],
    image: '/projects/mobilemedics.svg',
    imageAlt: 'MobileMedics — smartphone repair marketplace',
    url: 'YOUR_PROJECT_URL',
    repo: 'YOUR_REPO_URL',
    featured: true,
  },
  {
    id: 'smartphone-classification',
    name: 'Smartphone Preference Classification',
    category: 'Machine Learning',
    year: 'YEAR',
    description:
      'A classification model that predicts smartphone user preferences using the Naive Bayes algorithm.',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'Naive Bayes'],
    image: '/projects/classification.svg',
    imageAlt: 'Smartphone preference classification — machine learning project',
    url: 'YOUR_PROJECT_URL',
    repo: 'YOUR_REPO_URL',
    featured: false,
  },
  {
    id: 'sentiment-analysis',
    name: 'Sentiment Analysis',
    category: 'Natural Language Processing',
    year: 'YEAR',
    description:
      'An NLP project that classifies sentiment in text, covering preprocessing, feature extraction, and model evaluation.',
    tech: ['Python', 'NLP', 'Scikit-learn'],
    image: '/projects/sentiment.svg',
    imageAlt: 'Sentiment analysis — natural language processing project',
    url: 'YOUR_PROJECT_URL',
    repo: 'YOUR_REPO_URL',
    featured: false,
  },
];

// ---------------------------------------------------------------------------
// Social links — `icon` maps to a key in components/ui/SocialIcon.jsx
// ---------------------------------------------------------------------------

export const socials = [
  { id: 'github', label: 'GitHub', icon: 'github', url: 'YOUR_GITHUB_URL' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'linkedin', url: 'YOUR_LINKEDIN_URL' },
  { id: 'instagram', label: 'Instagram', icon: 'instagram', url: 'YOUR_INSTAGRAM_URL' },
  { id: 'facebook', label: 'Facebook', icon: 'facebook', url: 'YOUR_FACEBOOK_URL' },
  { id: 'email', label: 'Email', icon: 'mail', url: 'mailto:YOUR_EMAIL' },
];

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------

export const contact = {
  eyebrow: 'Contact',
  title: "Let's work together.",
  description: 'Have a project, idea, or opportunity? Feel free to get in touch.',
  ctaLabel: 'Get In Touch',
  // Shown as rows inside the contact card.
  channels: [
    { id: 'email', label: 'Email', value: 'YOUR_EMAIL', href: 'mailto:YOUR_EMAIL', icon: 'mail' },
    { id: 'github', label: 'GitHub', value: 'YOUR_GITHUB_HANDLE', href: 'YOUR_GITHUB_URL', icon: 'github' },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      value: 'YOUR_LINKEDIN_HANDLE',
      href: 'YOUR_LINKEDIN_URL',
      icon: 'linkedin',
    },
  ],
};

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export const footer = {
  tagline: 'Built with passion for technology.',
  // Rendered as `Hardi © <year>`; computed at runtime so it never goes stale.
  copyrightName: 'Hardi',
};
