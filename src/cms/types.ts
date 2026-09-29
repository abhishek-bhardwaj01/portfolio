/** CMS content types — every editable field on the portfolio */

export interface NavItem {
  id: string;
  label: string;
  href: string; // section id or URL
  enabled: boolean;
  order: number;
}

export interface SocialLink {
  id: string;
  platform: string;
  label: string;
  url: string;
  enabled: boolean;
  order: number;
}

export interface ButtonConfig {
  text: string;
  url: string;
  openInNewTab: boolean;
  enabled: boolean;
}

export interface SiteSettings {
  siteName: string;
  logoText: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  copyright: string;
  faviconText: string;
  seoTitle: string;
  seoDescription: string;
  ogImage: string;
  resumeText: string;
  resumeFilename: string;
  navCta: ButtonConfig;
}

export interface HeroContent {
  greeting: string;
  headlineLine1: string;
  headlineHighlight: string;
  headlineLine2: string;
  description: string;
  primaryCta: ButtonConfig;
  secondaryCta: ButtonConfig;
  toolsLabel: string;
  tools: string[];
  image: string;
  imageAlt: string;
  handwriting: string;
  enabled: boolean;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  enabled: boolean;
  order: number;
}

export interface AboutContent {
  badge: string;
  heading: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  resumeButton: ButtonConfig;
  enabled: boolean;
}

export interface ContactInfoContent {
  badge: string;
  heading: string;
  enabled: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  type: string;
  image: string;
  imageAlt: string;
  gallery: string[];
  tags: string[];
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  client: string;
  date: string;
  featured: boolean;
  published: boolean;
  order: number;
}

export interface ProjectCategory {
  id: string;
  label: string;
  slug: string;
  order: number;
  enabled: boolean;
}

export interface ProjectsSection {
  badge: string;
  heading: string;
  enabled: boolean;
  categories: ProjectCategory[];
  items: ProjectItem[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  color: string;
  icon: string;
  enabled: boolean;
  order: number;
}

export interface SkillsSection {
  badge: string;
  heading: string;
  enabled: boolean;
  items: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  employmentType: string;
  period: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  location: string;
  companyUrl: string;
  logo: string;
  enabled: boolean;
  order: number;
}

export interface ExperienceSection {
  badge: string;
  heading: string;
  enabled: boolean;
  items: ExperienceItem[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  button: ButtonConfig;
  enabled: boolean;
  order: number;
}

export interface ServicesSection {
  badge: string;
  heading: string;
  enabled: boolean;
  items: ServiceItem[];
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  position: string;
  company: string;
  image: string;
  text: string;
  rating: number;
  companyLogo: string;
  enabled: boolean;
  order: number;
}

export interface TestimonialsSection {
  badge: string;
  heading: string;
  enabled: boolean;
  items: TestimonialItem[];
}

export interface CtaSection {
  heading: string;
  description: string;
  button: ButtonConfig;
  enabled: boolean;
}

export interface ContactSection {
  badge: string;
  heading: string;
  headingHighlight: string;
  description: string;
  formNameLabel: string;
  formEmailLabel: string;
  formMessageLabel: string;
  submitText: string;
  successMessage: string;
  errorMessage: string;
  enabled: boolean;
}

export interface FooterContent {
  copyright: string;
  showSocials: boolean;
  enabled: boolean;
}

export interface CMSData {
  site: SiteSettings;
  navigation: NavItem[];
  socials: SocialLink[];
  hero: HeroContent;
  stats: StatItem[];
  about: AboutContent;
  contactInfo: ContactInfoContent;
  projects: ProjectsSection;
  skills: SkillsSection;
  experience: ExperienceSection;
  services: ServicesSection;
  testimonials: TestimonialsSection;
  cta: CtaSection;
  contact: ContactSection;
  footer: FooterContent;
}
