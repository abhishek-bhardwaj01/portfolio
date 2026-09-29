import type { CMSData } from "./types";

/** Full default CMS content — mirrors the live portfolio exactly */
export const defaultCMS: CMSData = {
  site: {
    siteName: "Abhishek Bhardwaj",
    logoText: "AB",
    tagline: "Graphic & UI Designer",
    email: "iabhishekbhardwaj07@gmail.com",
    phone: "+91 98827 00510",
    location: "Mandi, Himachal Pradesh",
    copyright: "© {year} Abhishek Bhardwaj. All rights reserved.",
    faviconText: "AB",
    seoTitle: "AB — Abhishek Bhardwaj | Designer & Content Creator",
    seoDescription:
      "Abhishek Bhardwaj — creative designer and content creator. UI/UX, graphic design, video and content that connect with people.",
    ogImage: "/images/hero-portrait.png",
    resumeText: `ABHISHEK BHARDWAJ
Graphic / UI & UX Designer

Email: iabhishekbhardwaj07@gmail.com
Phone: +91 98827 00510
Location: Mandi (175001), Himachal Pradesh

ABOUT
I'm a creative Graphic & UI Designer who turns ideas into impactful visuals. I specialize in branding, social media design, and UI, along with video editing, reel shooting, and short-form content creation.

EDUCATION
• Masters in Computer Applications (2025) - Himachal Pradesh Technical University, Hamirpur
• Bachelors in Computer Applications (2023) - Vallabh Govt. College, Mandi

EXPERIENCE
2024 – Present  | Graphic Designer, Social Media Content Creator & UI/UX Designer - Cuilsoft Pvt. Ltd.
2023 – 2024     | Graphic Designing & UI/UX Intern (6 months) - Pisoft Informatics Pvt. Ltd. (Mohali)

SKILLS
Logo Design, Branding, Social Media Graphics, UI Mockups, Poster & Banner Design, Video Editing, Reel Shooting, Short-Form Content
Tools: Canva, Figma, Adobe Illustrator, Photoshop, Premiere Pro, CapCut
`,
    resumeFilename: "Abhishek_Bhardwaj_Resume.txt",
    navCta: { text: "Let's Talk", url: "#contact", openInNewTab: false, enabled: true },
  },

  navigation: [
    { id: "home", label: "Home", href: "home", enabled: true, order: 0 },
    { id: "about", label: "About", href: "about", enabled: true, order: 1 },
    { id: "work", label: "Work", href: "work", enabled: true, order: 2 },
    { id: "skills", label: "Skills", href: "skills", enabled: true, order: 3 },
    { id: "experience", label: "Experience", href: "experience", enabled: true, order: 4 },
    { id: "contact", label: "Contact", href: "contact", enabled: true, order: 5 },
  ],

  socials: [
    { id: "s1", platform: "instagram", label: "Instagram", url: "https://instagram.com", enabled: true, order: 0 },
    { id: "s2", platform: "linkedin", label: "LinkedIn", url: "https://linkedin.com", enabled: true, order: 1 },
    { id: "s3", platform: "x", label: "X", url: "https://x.com", enabled: true, order: 2 },
    { id: "s4", platform: "youtube", label: "YouTube", url: "https://youtube.com", enabled: true, order: 3 },
  ],

  hero: {
    greeting: "HI, I'M ABHISHEK",
    headlineLine1: "I create digital",
    headlineHighlight: "experiences, brands",
    headlineLine2: "and content.",
    description:
      "I'm a creative Graphic & UI Designer who turns ideas into impactful visuals. I specialize in branding, social media design, UI, video editing and short-form content creation.",
    primaryCta: { text: "View My Work", url: "#work", openInNewTab: false, enabled: true },
    secondaryCta: { text: "Download Resume", url: "#resume", openInNewTab: false, enabled: true },
    toolsLabel: "Tools I Use",
    tools: ["Figma", "Photoshop", "Illustrator", "Premiere Pro", "Canva", "CapCut"],
    image: "/images/hero-portrait.png",
    imageAlt: "Abhishek Bhardwaj",
    handwriting: "Better\nIdeas\nBetter\nProducts",
    enabled: true,
  },

  stats: [
    { id: "st1", value: "15+", label: "Projects Completed", enabled: true, order: 0 },
    { id: "st2", value: "10+", label: "Happy Clients", enabled: true, order: 1 },
    { id: "st3", value: "1+", label: "Years Experience", enabled: true, order: 2 },
    { id: "st4", value: "100%", label: "Client Satisfaction", enabled: true, order: 3 },
  ],

  about: {
    badge: "ABOUT ME",
    heading: "About Me",
    paragraphs: [
      "I'm a creative Graphic & UI Designer who turns ideas into impactful visuals. I specialize in branding, social media design, UI, video editing and short-form content creation.",
    ],
    image: "/images/about-portrait.png",
    imageAlt: "Abhishek Bhardwaj",
    resumeButton: { text: "Download Resume", url: "#resume", openInNewTab: false, enabled: true },
    enabled: true,
  },

  contactInfo: {
    badge: "CONTACT INFO",
    heading: "Get in touch",
    enabled: true,
  },

  projects: {
    badge: "FEATURED WORK",
    heading: "Selected Projects",
    enabled: true,
    categories: [
      { id: "all", label: "All", slug: "all", order: 0, enabled: true },
      { id: "uiux", label: "UI/UX", slug: "uiux", order: 1, enabled: true },
      { id: "graphic", label: "Graphic", slug: "graphic", order: 2, enabled: true },
      { id: "video", label: "Video", slug: "video", order: 3, enabled: true },
      { id: "content", label: "Content", slug: "content", order: 4, enabled: true },
    ],
    items: [
      {
        id: "p1",
        title: "Accessories Website UI",
        shortDescription: "UI Mockup",
        fullDescription: "Created a basic wireframe and UI mockup of an Accessories Website using Figma.",
        category: "uiux",
        type: "UI Mockup",
        image: "/images/ui-laptop.png",
        imageAlt: "Accessories Website UI",
        gallery: [],
        tags: ["Figma", "Wireframe", "UI"],
        technologies: ["Figma"],
        liveUrl: "",
        githubUrl: "",
        client: "",
        date: "",
        featured: true,
        published: true,
        order: 0,
      },
      {
        id: "p2",
        title: "Social Media Campaign",
        shortDescription: "Campaign",
        fullDescription: "Designed Instagram and Facebook post templates, videos and gifs for real brands.",
        category: "content",
        type: "Campaign",
        image: "/images/content-impact.png",
        imageAlt: "Social Media Campaign",
        gallery: [],
        tags: ["Canva", "Figma", "CapCut"],
        technologies: ["Canva", "CapCut"],
        liveUrl: "",
        githubUrl: "",
        client: "",
        date: "",
        featured: true,
        published: true,
        order: 1,
      },
      {
        id: "p3",
        title: "Brand Identity",
        shortDescription: "Branding",
        fullDescription: "Developed branding elements (logo, business card, letterhead) for companies.",
        category: "graphic",
        type: "Branding",
        image: "/images/poster-brand.png",
        imageAlt: "Brand Identity",
        gallery: [],
        tags: ["Logo", "Stationery", "Illustrator"],
        technologies: ["Illustrator"],
        liveUrl: "",
        githubUrl: "",
        client: "",
        date: "",
        featured: true,
        published: true,
        order: 2,
      },
      {
        id: "p4",
        title: "Poster & Banner Design",
        shortDescription: "Graphic",
        fullDescription: "High-impact posters and banners designed for brand campaigns.",
        category: "graphic",
        type: "Graphic",
        image: "/images/poster-good-things.png",
        imageAlt: "Poster & Banner Design",
        gallery: [],
        tags: ["Poster", "Banner", "Print"],
        technologies: ["Photoshop"],
        liveUrl: "",
        githubUrl: "",
        client: "",
        date: "",
        featured: true,
        published: true,
        order: 3,
      },
    ],
  },

  skills: {
    badge: "SKILLS & TOOLS",
    heading: "Technologies I Work With",
    enabled: true,
    items: [
      { id: "sk1", name: "Figma", category: "Design", color: "#A259FF", icon: "", enabled: true, order: 0 },
      { id: "sk2", name: "Photoshop", category: "Design", color: "#31A8FF", icon: "", enabled: true, order: 1 },
      { id: "sk3", name: "Illustrator", category: "Design", color: "#FF9A00", icon: "", enabled: true, order: 2 },
      { id: "sk4", name: "Premiere Pro", category: "Video", color: "#9999FF", icon: "", enabled: true, order: 3 },
      { id: "sk5", name: "Canva", category: "Design", color: "#00C4CC", icon: "", enabled: true, order: 4 },
      { id: "sk6", name: "CapCut", category: "Video", color: "#000000", icon: "", enabled: true, order: 5 },
      { id: "sk7", name: "HTML5", category: "Frontend", color: "#E34F26", icon: "", enabled: true, order: 6 },
      { id: "sk8", name: "CSS3", category: "Frontend", color: "#1572B6", icon: "", enabled: true, order: 7 },
    ],
  },

  experience: {
    badge: "EXPERIENCE",
    heading: "Work Experience",
    enabled: true,
    items: [
      {
        id: "e1",
        title: "Graphic Designer, Social Media Content Creator & UI/UX Designer",
        company: "Cuilsoft Pvt. Ltd.",
        employmentType: "Full-time",
        period: "2024 – Present",
        startDate: "2024",
        endDate: "",
        isCurrent: true,
        description: "Cuilsoft Pvt. Ltd.",
        responsibilities: [],
        technologies: ["Branding", "Social Media", "UI/UX"],
        location: "",
        companyUrl: "",
        logo: "",
        enabled: true,
        order: 0,
      },
      {
        id: "e2",
        title: "Graphic Designing & UI/UX Intern",
        company: "Pisoft Informatics Pvt. Ltd. (Mohali)",
        employmentType: "Internship",
        period: "2023 – 2024",
        startDate: "2023",
        endDate: "2024",
        isCurrent: false,
        description: "Pisoft Informatics Pvt. Ltd. (Mohali) · 6 months",
        responsibilities: [],
        technologies: ["Internship"],
        location: "Mohali",
        companyUrl: "",
        logo: "",
        enabled: true,
        order: 1,
      },
    ],
  },

  services: {
    badge: "SERVICES",
    heading: "What I Offer",
    enabled: false,
    items: [
      {
        id: "sv1",
        title: "UI/UX Design",
        description: "Clean, user-friendly designs that improve engagement and experience.",
        icon: "monitor",
        button: { text: "Learn More", url: "#contact", openInNewTab: false, enabled: true },
        enabled: true,
        order: 0,
      },
      {
        id: "sv2",
        title: "Graphic Design",
        description: "Visual content that communicates ideas and builds brand identity.",
        icon: "pen",
        button: { text: "Learn More", url: "#contact", openInNewTab: false, enabled: true },
        enabled: true,
        order: 1,
      },
      {
        id: "sv3",
        title: "Video Editing",
        description: "Engaging videos and reels that tell stories and connect with your audience.",
        icon: "play",
        button: { text: "Learn More", url: "#contact", openInNewTab: false, enabled: true },
        enabled: true,
        order: 2,
      },
      {
        id: "sv4",
        title: "Content Creation",
        description: "Social media graphics, campaigns and strategically effective content.",
        icon: "content",
        button: { text: "Learn More", url: "#contact", openInNewTab: false, enabled: true },
        enabled: true,
        order: 3,
      },
    ],
  },

  testimonials: {
    badge: "TESTIMONIALS",
    heading: "What Clients Say",
    enabled: false,
    items: [],
  },

  cta: {
    heading: "Have a project in mind?",
    description: "Let's create something amazing together.",
    button: { text: "Let's Talk", url: "#contact", openInNewTab: false, enabled: true },
    enabled: true,
  },

  contact: {
    badge: "CONTACT",
    heading: "Let's create",
    headingHighlight: "something great.",
    description: "I'm available for freelance projects and full-time opportunities.",
    formNameLabel: "Name",
    formEmailLabel: "Email",
    formMessageLabel: "Message",
    submitText: "Send Message",
    successMessage: "Message sent! I'll get back to you soon.",
    errorMessage: "Something went wrong. Please try again.",
    enabled: true,
  },

  footer: {
    copyright: "© {year} Abhishek Bhardwaj. All rights reserved.",
    showSocials: false,
    enabled: true,
  },
};
