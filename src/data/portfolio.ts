export type ProjectIcon = 'github' | 'message' | 'contacts' | 'components' | 'button' | 'invite' | 'timer' | 'coins';
export type WorkIcon = 'graduate' | 'zap' | 'activity' | 'code';

export interface Project {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: ProjectIcon;
  badge?: string;
  highlights?: { value: string; label: string }[];
}

export interface WorkProject {
  id: string;
  name: string;
  shortDescription: string;
  category: string;
  description: string;
  stack: string[];
  impact: string;
  organization: string;
  icon: WorkIcon;
  tone?: 'cii' | 'onboarding' | 'edocket';
  products?: string[];
}

// Edit this file to update the portfolio without changing presentation components.
// Facts below follow the November 2026 resume.
export const portfolio = {
  name: 'Sai Nagendra',
  fullName: 'Sai Nagendra Yakkaladevara',
  role: 'Software engineer, building products end to end',
  avatar: '/images/headshot.png',
  initials: 'SN',
  location: 'Hyderabad, India',
  email: 'nagendrayakkaladevara@gmail.com',
  intro: 'I build software across the interface, the API, and the data behind it. Five years in, that work spans ReactJS, Angular, Node.js, ExpressJS, .NET, and PostgreSQL, with AI tools helping the team ship more consistently.',
  current: {
    company: 'GE Vernova',
    role: 'Software Engineer',
    period: 'May 2025–present',
    focus: 'building full-stack features, a shared UI library, and AI-assisted engineering tools',
    description: 'I work on a call-taker application, the GX-UI component library, and AI tools that take repetitive engineering tasks off the team. The stack is Angular, .NET, C#, PostgreSQL, and TypeScript.',
    note: 'Recent work includes REST APIs in a microservices setup, reusable GX-UI components, and AI tools for host files and daily instance pipelines.',
  },
  previous: {
    company: 'Prodapt Solutions',
    role: 'Software Developer',
    period: 'Mar 2022–May 2025',
    focus: 'designed and developed four products from the ground up with React, Express, and PostgreSQL',
    description: 'Designed and developed four major products from the ground up with React, Express.js, and PostgreSQL. The work drove significant efficiency improvements, and the Prodapt University project earned a Spotlight Award in March 2024.',
  },
  socials: [
    { label: 'GitHub', href: 'https://github.com/nagendrayakkaladevara' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sai-nagendra-yakkaladevara-67317419a/' },
    { label: 'Twitter', href: 'https://twitter.com/nagendra_s_y' },
    { label: 'Email', href: 'mailto:nagendrayakkaladevara@gmail.com' },
  ],
  resume: { href: '/Sai-Nagendra-Resume.pdf', label: 'Resume', date: 'November 2026', fileName: 'Sai-Nagendra-Resume.pdf' },
  projects: [
    { id: 'running-staff', name: 'Running Staff Contacts', icon: 'contacts', href: 'https://wat-runningstaffcontacts.netlify.app/', description: 'Indian Railways contact management, with search, documents, and analytics.', highlights: [{ value: 'Railways', label: 'contact book' }, { value: 'Search', label: 'documents & analytics' }] },
    { id: 'bus-ticketing', name: 'Bus Ticketing Tool', icon: 'message', href: 'https://samanviticketingtool.netlify.app/', description: 'Role-based ticket management, with dashboards, tracking, workflow, and user management.', highlights: [{ value: 'Role-based', label: 'ticket workflow' }, { value: 'Live', label: 'dashboards' }] },
    { id: 'invitation', name: 'Digital Wedding Invitation', icon: 'invite', href: 'https://sainagendra-weds-sushma.netlify.app/', description: 'An interactive digital invitation with an AI-powered chat built in.', highlights: [{ value: 'AI chat', label: 'built in' }, { value: 'Live', label: 'invitation' }] },
    { id: 'examflow', name: 'ExamFlow', icon: 'components', href: 'https://exam-flow-fe.vercel.app/', description: 'A college platform for examinations and assessment management.', highlights: [{ value: 'College', label: 'examinations' }, { value: 'Live', label: 'assessments' }] },
    { id: 'bus-stop', name: 'Bus Stop Announcement App', icon: 'github', href: 'https://nagendrayakkaladevara.github.io/samanvi_stop_announcement_app_v2_walkthough/', description: 'This is an Android app developed using React Native and Expo.', highlights: [{ value: 'Android', label: 'React Native' }, { value: 'Expo', label: 'route audio' }] },
    { id: 'pomodoro', name: 'Pomodoro', icon: 'timer', href: 'https://nagendrayakkaladevara.github.io/pomodoro/', description: 'A focus timer with tasks, session analytics, and ambient sounds.', highlights: [{ value: 'Focus', label: 'timer' }, { value: 'Tasks', label: 'and sounds' }] },
  ] satisfies Project[],
  smallProjects: [
    { id: 'github-wrapped', name: 'GitHub Wrapped', icon: 'github', href: 'https://wrappedgithub.netlify.app/', description: 'A year of contributions and stars.' },
    { id: 'contacts-admin', name: 'Contacts Admin', icon: 'contacts', href: 'https://wat-runningstaffcontacts-admin.netlify.app/', description: 'Admin for railway staff contacts.' },
    { id: 'crypto-prices', name: 'Crypto Prices', icon: 'coins', href: 'https://cryptopriceapplication.netlify.app/', description: 'Live cryptocurrency prices.' },
  ] satisfies Project[],
  workProjects: [
    { id: 'call-taker', name: 'Call Taker', shortDescription: 'Features from the UI through the API', category: 'full stack', organization: 'GE Vernova', icon: 'activity', tone: 'edocket', description: 'A call-taker application where I deliver features end to end. I built REST APIs in a microservices architecture, led application-wide unit testing to improve coverage and code quality, and wrote AI agent instructions and skills so coding practices stay consistent.', stack: ['Angular', '.NET', 'C#', 'PostgreSQL'], impact: 'End-to-end features on a microservices API, with broader unit-test coverage across the application.' },
    { id: 'gx-ui', name: 'GX-UI Library', shortDescription: 'Shared components, clearer docs', category: 'ui systems', organization: 'GE Vernova', icon: 'code', tone: 'cii', description: 'A shared Angular and TypeScript UI library. I audited the documentation, set up standard templates, fixed library defects, built reusable components, and added AI-powered testing agents. Technical spikes turned into component enhancements.', stack: ['Angular', 'TypeScript'], impact: 'Clearer documentation and a more reliable set of shared components for teams building on GX-UI.' },
    { id: 'ai-tools', name: 'AI Engineering Tools', shortDescription: 'Less repetitive day-to-day work', category: 'automation', organization: 'GE Vernova', icon: 'zap', tone: 'onboarding', description: 'Internal AI tools for everyday engineering. One generates environment-specific host-file URLs. Another is wired into internal tools so the daily instance pipeline can start without a manual run.', stack: ['JavaScript', 'TypeScript', 'AI APIs'], impact: 'Automated host-file setup and the daily start of the instance pipeline.' },
    { id: 'prodapt-products', name: 'Four products at Prodapt', shortDescription: 'Built from the ground up', category: 'product', organization: 'Prodapt', icon: 'graduate', description: 'Four major products designed and developed from the ground up with React, Express.js, and PostgreSQL. The work focused on efficiency. The Prodapt University project was recognized with a Spotlight Award in March 2024.', products: ['Prodapt University Portal', '306090', 'CII', 'eDocket'], stack: ['React', 'Express.js', 'PostgreSQL'], impact: 'Significant efficiency improvements across the products, and a Spotlight Award for Prodapt University.' },
  ] satisfies WorkProject[],
  workNote: 'GE Vernova, and earlier product work at Prodapt Solutions.',
  skills: [
    { category: 'Languages', value: 'JavaScript · TypeScript · C# · HTML & CSS' },
    { category: 'Frameworks', value: 'React · Angular · .NET · Node.js · Express' },
    { category: 'Data & APIs', value: 'PostgreSQL · SQL · REST · WebSockets' },
    { category: 'Cloud & tools', value: 'AWS · Git · SVN · Postman · DBeaver' },
    { category: 'AI tools', value: 'Copilot · Claude Code · Codex · Cursor · GEV AMP' },
  ],
  courses: [
    { title: 'AWS Technical Essentials', detail: 'Amazon Web Services', description: 'Certification in the essentials of AWS.' },
    { title: 'Claude Foundation workshop', detail: 'AWS · at GE Vernova', description: 'An in-person Claude foundation workshop hosted by AWS at GE Vernova.' },
    { title: 'Generative AI fundamentals', detail: 'Udemy', description: 'A course on the fundamentals of generative AI.' },
  ],
  recognition: [{ title: 'Spotlight Award', detail: 'Prodapt · March 2024', description: 'Recognized for exceptional performance on the Prodapt University project.' }],
  education: { degree: 'Bachelor of Technology', institution: 'Gayatri Vidya Parishad College of Engineering', period: '2017–2021', detail: 'Autonomous · Engineering' },
  contactMail: {
    subject: 'Hello from your portfolio',
    body: `Hi Sai,

I came across your portfolio and would like to get in touch.

`,
  },
  interests: [
    { id: 'building', title: 'Always building', eyebrow: 'Side projects', text: 'I enjoy turning everyday problems into small, useful products. Side projects are where I experiment, learn, and follow an idea all the way through.', icon: 'code' },
    { id: 'learning', title: 'Always curious', eyebrow: 'Learning', text: 'There is always something new to understand. I like exploring technologies, following industry trends, and expanding what I can build.', icon: 'book' },
    { id: 'balance', title: 'Beyond the screen', eyebrow: 'A little balance', text: 'Away from code, I make time for fitness and keeping up with the world. A little movement and a fresh perspective help me come back with more focus.', icon: 'activity' },
  ],
};

/** Opens the default mail app with subject and body prefilled (`mailto:`). */
export function contactMailtoHref(): string {
  const { email, contactMail } = portfolio;
  const query = new URLSearchParams({
    subject: contactMail.subject,
    body: contactMail.body,
  });
  return `mailto:${email}?${query.toString()}`;
}

/** Opens Gmail compose in the browser or Gmail app with subject and body prefilled. */
export function contactGmailComposeHref(): string {
  const { email, contactMail } = portfolio;
  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: email,
    su: contactMail.subject,
    body: contactMail.body,
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}
