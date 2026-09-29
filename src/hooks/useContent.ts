import { useEffect, useState } from "react";

export interface Personal {
  fullName: string;
  role: string;
  greeting: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  heroImage: string;
}

export interface About {
  heading: string;
  paragraphs: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  platform?: string;
  liveLink?: string;
  description?: string;
  tags: string[];
  image: string;
  type?: string;
}

export interface Skill {
  name: string;
  color: string;
  category: string;
}

export interface Experience {
  id: string;
  title: string;
  period: string;
  description: string;
  tags: string[];
}

const fallbackPersonal: Personal = {
  fullName: "Abhishek Bhardwaj",
  role: "Graphic & UI Designer",
  greeting: "Hi, I'm",
  bio: "I'm a creative Graphic & UI Designer who turns ideas into impactful visuals. I specialize in branding, social media design, UI, video editing and short-form content creation.",
  email: "iabhishekbhardwaj07@gmail.com",
  phone: "+91 98827 00510",
  location: "Mandi, Himachal Pradesh",
  heroImage: "/images/hero-portrait.png",
};

const fallbackProjects: Project[] = [
  { id: "p1", title: "Accessories Website UI", category: "uiux", tags: ["Figma", "Wireframe", "UI"], image: "/images/ui-laptop.png", type: "UI Mockup" },
  { id: "p2", title: "Social Media Campaign", category: "content", tags: ["Canva", "Figma", "CapCut"], image: "/images/content-impact.png", type: "Campaign" },
  { id: "p3", title: "Brand Identity", category: "graphic", tags: ["Logo", "Stationery", "Illustrator"], image: "/images/poster-brand.png", type: "Branding" },
  { id: "p4", title: "Poster & Banner Design", category: "graphic", tags: ["Poster", "Banner", "Print"], image: "/images/poster-good-things.png", type: "Graphic" },
];

const fallbackSkills: Skill[] = [
  { name: "Figma", color: "#A259FF", category: "Design" },
  { name: "Photoshop", color: "#31A8FF", category: "Design" },
  { name: "Illustrator", color: "#FF9A00", category: "Design" },
  { name: "Premiere Pro", color: "#9999FF", category: "Video" },
  { name: "Canva", color: "#00C4CC", category: "Design" },
  { name: "CapCut", color: "#000000", category: "Video" },
  { name: "HTML5", color: "#E34F26", category: "Frontend" },
  { name: "CSS3", color: "#1572B6", category: "Frontend" },
];

const fallbackExperience: Experience[] = [
  { id: "e1", title: "Graphic Designer, Social Media Content Creator & UI/UX Designer", period: "2024 – Present", description: "Cuilsoft Pvt. Ltd.", tags: ["Branding", "Social Media", "UI/UX"] },
  { id: "e2", title: "Graphic Designing & UI/UX Intern", period: "2023 – 2024", description: "Pisoft Informatics Pvt. Ltd. (Mohali) · 6 months", tags: ["Internship"] },
];

export function useContent() {
  const [personal, setPersonal] = useState<Personal>(fallbackPersonal);
  const [about, setAbout] = useState<About>({ heading: "About Me", paragraphs: [fallbackPersonal.bio] });
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [skills, setSkills] = useState<Skill[]>(fallbackSkills);
  const [experience, setExperience] = useState<Experience[]>(fallbackExperience);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [p, a, pr, s, e] = await Promise.all([
          fetch("/content/personal.json").then((r) => (r.ok ? r.json() : null)).catch(() => null),
          fetch("/content/about.json").then((r) => (r.ok ? r.json() : null)).catch(() => null),
          fetch("/content/projects.json").then((r) => (r.ok ? r.json() : null)).catch(() => null),
          fetch("/content/skills.json").then((r) => (r.ok ? r.json() : null)).catch(() => null),
          fetch("/content/experience.json").then((r) => (r.ok ? r.json() : null)).catch(() => null),
        ]);
        if (p) setPersonal({ ...fallbackPersonal, ...p });
        if (a) setAbout(a);
        if (pr && Array.isArray(pr) && pr.length) setProjects(pr);
        if (s && Array.isArray(s) && s.length) setSkills(s);
        if (e && Array.isArray(e) && e.length) setExperience(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { personal, about, projects, skills, experience, loading };
}
