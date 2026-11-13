export const personalInfo = {
  name: "BADRINATH M H",
  role: "Software Developer",
  shortRole: "Full-Stack Developer",
  tagline: "Building & deploying production-grade web applications, ERP systems & REST APIs",
  bio: "Full-stack developer with 2.8 years of experience building and deploying production-grade web applications, ERP systems, logistics platforms, and IoT-integrated solutions. Experienced in backend architecture, scalable REST APIs, system optimization, and independently managing end-to-end development lifecycles.",
  location: "Tamil Nadu, India",
  phone: "+91 9360148336",
  email: "badrinath.sde@gmail.com",
  socials: {
    github: "https://github.com/badrinath-sde",
    linkedin: "https://linkedin.com/in/badrinathsde",
  },
  stats: [
    { value: "2.8 Yrs", label: "Professional Experience" },
    { value: "70+", label: "Projects Guided & Supported" },
    { value: "6+", label: "Real-World Client Projects" },
    { value: "40–60%", label: "Workflow Effort Reduced" },
  ],
};

export const projects = [
  // --- PRODUCTION PROJECTS ---
  {
    id: "sakthi-classifieds",
    name: "Sakthi Classifieds",
    type: "Production",
    category: "MARKETPLACE & ADS",
    period: "Production Platform",
    impact: "Led team building product-based resale marketplace connecting companies & users",
    description:
      "Led the development team in building and enhancing a product-based resale marketplace platform connecting companies posting advertisements with users browsing listed products.",
    features: [
      "Developed role-based modules for Admin, Company, and User, with secure authentication, access control, and session management.",
      "Implemented subscription plan management, enabling administrators to create and update plans and companies to purchase subscriptions to publish advertisements.",
      "Managed advertisement workflows, company accounts, subscription plans, and centralized platform administration.",
      "Contributed to ongoing product enhancements, feature development, and production releases using PHP, JavaScript, and MySQL.",
    ],
    tags: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3", "Role-Based Auth", "Session Management"],
    links: {
      demo: "https://github.com/badrinath-sde",
      github: "https://github.com/badrinath-sde",
      casestudy: "#",
    },
    color: "#3b82f6",
  },
  {
    id: "hanvith-jobs",
    name: "Hanvith Jobs",
    type: "Production",
    category: "RECRUITMENT PLATFORM",
    period: "Production Platform",
    impact: "Recruitment platform with role-based access, recruiter approvals & resume access",
    description:
      "Led the development team in building a recruitment platform connecting companies and recruiters with students, freshers, and experienced professionals.",
    features: [
      "Implemented role-based access control for Admin, Recruiter/HR, and Job Seeker, including recruiter approval and secure authentication.",
      "Developed job and internship posting, candidate applications, application tracking, and email notification features.",
      "Implemented subscription-based plans that enable recruiters to access and download candidate resumes.",
      "Built administrative modules for managing recruiters, job listings, subscriptions, and platform-wide activities, with ongoing feature enhancements and product releases.",
    ],
    tags: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3", "RBAC", "Subscription Engine"],
    links: {
      demo: "https://github.com/badrinath-sde",
      github: "https://github.com/badrinath-sde",
      casestudy: "#",
    },
    color: "#10b981",
  },
  {
    id: "company-erp-crm",
    name: "Enterprise ERP & CRM",
    type: "Production",
    category: "ERP & WORKFLOW CRM",
    period: "Enterprise Operations",
    impact: "Centralized employee management, marketing pipeline, billing & finance workflows",
    description:
      "Contributed to the development and enhancement of an integrated ERP and CRM platform to manage employee operations, marketing workflows, customer data, and company finances.",
    features: [
      "Developed role-based dashboards for Admin, HR, Marketing, and Employees, supporting employee management, leave applications, task allocation, and leave tracking.",
      "Implemented marketing workflow management, including contact databases, call tracking, follow-up scheduling, internship coordination, and campus drive management.",
      "Enhanced CRM modules for centralized customer data management, revenue and expense tracking, tax calculations, billing, and receipt generation.",
      "Supported ongoing feature development, maintenance, and product releases to improve internal business operations and workflow efficiency.",
    ],
    tags: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3", "CRM Architecture", "Billing & Tax"],
    links: {
      demo: "https://github.com/badrinath-sde",
      github: "https://github.com/badrinath-sde",
      casestudy: "#",
    },
    color: "#8b5cf6",
  },

  // --- FREELANCE CLIENT PROJECTS ---
  {
    id: "sv-logistics",
    name: "SV Logistics",
    type: "Freelance",
    category: "LOGISTICS AUTOMATION",
    period: "Client Project",
    impact: "Reduced manual workflow effort by ~60% with automated invoices & live tracking",
    description:
      "Developed a logistics management platform with automated invoice generation, shipment tracking, and real-time status management supporting daily operational workflows.",
    features: [
      "Developed a logistics management platform with automated invoice generation, shipment tracking, and real-time status management supporting daily operational workflows.",
      "Added downloadable billing, notifications, and tracking features.",
      "Implemented admin and employee authentication with secure session handling.",
      "Managed deployment and live production hosting independently.",
      "Improved operational efficiency and reduced manual workflow effort by approximately 60%.",
    ],
    tags: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3", "Invoice Generation", "Tracking"],
    links: {
      demo: "https://github.com/badrinath-sde",
      github: "https://github.com/badrinath-sde",
      casestudy: "#",
    },
    color: "#06b6d4",
  },
  {
    id: "yuva-cargo-movers",
    name: "Yuva Cargo Movers",
    type: "Freelance",
    category: "LOGISTICS CLIENT WEB",
    period: "Live Client Website",
    impact: "Complete development lifecycle from UI design to production hosting",
    description:
      "Designed and developed a client-specific logistics website from scratch, translating business requirements into a functional and responsive web solution.",
    features: [
      "Managed the complete development lifecycle independently, including UI design, frontend and backend development, testing, and deployment.",
      "Handled production hosting, website configuration, and ongoing maintenance to ensure reliable website operation.",
      "Delivered an end-to-end solution tailored to the client's business needs, managing the project independently from initial planning to live deployment.",
      "Provided continuous uptime and performance monitoring for commercial logistics operations.",
    ],
    tags: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3", "cPanel Deployment"],
    links: {
      demo: "https://yuvacargomovers.com/",
      github: "https://github.com/badrinath-sde",
      casestudy: "https://yuvacargomovers.com/",
    },
    color: "#f59e0b",
  },
  {
    id: "rk-engineering-works",
    name: "RK Engineering Works",
    type: "Freelance",
    category: "DESKTOP BILLING APP",
    period: "Machinery Business Software",
    impact: "Automated auto-fill billing, direct printing, & local financial record tracking",
    description:
      "Designed and developed a client-specific desktop application for a machinery business to streamline billing and financial record management.",
    features: [
      "Implemented automated bill generation with auto-fill functionality, bill downloading, direct printing, and centralized bill history tracking.",
      "Developed income and expense tracking features to help the client monitor financial transactions and maintain business records.",
      "Delivered a standalone, locally operated desktop application tailored to the client's requirements without cloud dependency.",
      "Managed the complete development lifecycle independently, from requirement analysis and application development to local deployment.",
    ],
    tags: ["Electron.js", "JavaScript", "HTML5", "CSS3", "Desktop Software", "Auto-Fill Engine"],
    links: {
      demo: "https://github.com/badrinath-sde",
      github: "https://github.com/badrinath-sde",
      casestudy: "#",
    },
    color: "#ec4899",
  },
  {
    id: "sannedhan-homes",
    name: "Sannedhan Homes",
    type: "Freelance",
    category: "INTERIOR BUSINESS WEB",
    period: "Live Client Website",
    impact: "Modern multi-page Next.js web application with integrated email automation",
    description:
      "Designed and developed a multi-page business website for an interior design company, showcasing its services and business offerings.",
    features: [
      "Built a responsive website with 5–6 pages, including service information and a contact form for customer inquiries.",
      "Integrated PHP and PHPMailer to process contact form submissions and deliver email notifications.",
      "Managed the complete project lifecycle independently, from requirement gathering and UI design to development, testing, and deployment.",
      "Handled website hosting, configuration, and ongoing maintenance to support the client's online presence.",
    ],
    tags: ["Next.js", "Tailwind CSS", "JavaScript", "PHPMailer", "Responsive UI"],
    links: {
      demo: "https://www.sannedhanhomes.in/",
      github: "https://github.com/badrinath-sde",
      casestudy: "https://www.sannedhanhomes.in/",
    },
    color: "#14b8a6",
  },
  {
    id: "etsy-printify-automation",
    name: "Olive & Sikes Etsy Automation Tool",
    type: "Freelance",
    category: "E-COMMERCE AUTOMATION",
    period: "Client Automation Tool",
    impact: "Automated cross-platform listings, reducing manual effort by ~92–95%",
    description:
      "Designed and developed a client-specific MERN stack automation application to streamline product listing workflows across Etsy and Printify.",
    features: [
      "Integrated Etsy and Printify APIs to automate product draft creation, title and description generation, product details management, and cross-platform listing workflows.",
      "Implemented centralized product and order management features, including viewing, editing, deleting, and tracking product details and orders.",
      "Automated repetitive listing tasks, including product information preparation and synchronization between platforms, reducing manual effort by approximately 92–95% according to the client's workflow estimates.",
      "Managed end-to-end application development and delivered a locally operated solution tailored to the client's requirements, without cloud hosting.",
    ],
    tags: ["React.js", "Express.js", "Node.js", "MongoDB", "Etsy API", "Printify API", "Automation"],
    links: {
      demo: "https://github.com/badrinath-sde",
      github: "https://github.com/badrinath-sde",
      casestudy: "#",
    },
    color: "#6366f1",
  },
  {
    id: "thirumoolar-gurupeedam",
    name: "Thirumoolar Gurupeedam",
    type: "Freelance",
    category: "TEMPLE CMS & BILLING",
    period: "Live Client CMS",
    impact: "Reduced manual administrative & billing workflow effort by approximately 50%",
    description:
      "Developed a dynamic temple management website with CMS functionality, donor receipt generation, expense management, and offline billing operations.",
    features: [
      "Developed a dynamic temple management website with CMS functionality.",
      "Built admin panel for events, products, donation management, and offline billing operations.",
      "Developed donor receipt generation and expense receipt management systems.",
      "Managed hosting configuration and deployment.",
      "Reduced manual administrative and billing workflow effort by approximately 50%.",
    ],
    tags: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3", "CMS Panel", "Receipt Generation"],
    links: {
      demo: "https://thirumoolargurupeedam.com/",
      github: "https://github.com/badrinath-sde",
      casestudy: "https://thirumoolargurupeedam.com/",
    },
    color: "#f97316",
  },
];

export const skillsByCategory = {
  languages: {
    title: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "PHP"],
  },
  frontend: {
    title: "Frontend",
    items: ["React.js", "Next.js", "Redux Toolkit", "HTML", "CSS"],
  },
  backend: {
    title: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "Socket.io",
      "REST API Development",
      "Authentication & Authorization",
      "Session Management",
    ],
  },
  database: {
    title: "Database",
    items: ["MongoDB", "MySQL"],
  },
  tools: {
    title: "Tools",
    items: ["Git", "Postman", "cPanel"],
  },
  concepts: {
    title: "Concepts",
    items: [
      "REST APIs",
      "JWT",
      "MVC",
      "System Design",
      "WebSockets",
      "Deployment Management",
      "File Upload Handling",
      "API Integration",
    ],
  },
};

export const tools = skillsByCategory;

export const experience = [
  {
    period: "05/2026 – Present",
    role: "Freelance Full-Stack Developer",
    company: "Self-Employed",
    location: "Remote / Tamil Nadu, India",
    type: "Freelance",
    description:
      "Delivered 6+ real-world client projects across manufacturing, logistics, e-commerce automation, and business management systems.",
    highlights: [
      "Delivered 6+ real-world client projects across manufacturing, logistics, e-commerce automation, and business management systems.",
      "Designed and developed end-to-end web applications, including backend APIs, database architecture, authentication, admin workflows, and responsive user interfaces.",
      "Worked directly with clients to understand requirements, translate business workflows into software solutions, and independently manage development, testing, deployment, and production support.",
      "Built and integrated automation solutions for product listing and maintenance, logistics operations, billing, tracking, and other client-specific business processes.",
    ],
  },
  {
    period: "07/2023 – 05/2026",
    role: "Software Developer – MERN Stack",
    company: "Techvolt Software",
    location: "Tamil Nadu, India",
    type: "Full-Time",
    description:
      "Led backend development and workflow optimization for ERP and CRM systems used in internal business operations.",
    highlights: [
      "Led backend development and workflow optimization for ERP and CRM systems used in internal business operations.",
      "Designed backend modules using PHP and MySQL, reducing manual workflow effort by approximately 40%.",
      "Guided junior developers in MERN Stack, Python, Embedded Systems, and IoT development while assisting in project architecture and debugging.",
      "Reviewed, debugged, and optimized application code while providing architectural guidance and production issue resolution.",
      "Guided and supported 70+ academic and client-based projects involving full-stack and hardware-integrated systems.",
      "Worked directly with clients to gather requirements and implement production enhancements.",
    ],
  },
];

export const education = {
  degree: "Bachelor of Engineering in Computer Science",
  institution: "Christian College of Engineering and Technology",
  period: "06/2019 – 05/2023",
  location: "Tamil Nadu, India",
};

