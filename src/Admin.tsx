import { useEffect, useState } from "react";

interface Personal {
  fullName: string;
  role: string;
  greeting: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  heroImage: string;
}

interface About {
  heading: string;
  paragraphs: string[];
}

interface Project {
  id: string;
  title: string;
  category: string;
  platform: string;
  liveLink: string;
  description: string;
  tags: string[];
  image: string;
}

interface Skill {
  name: string;
  color: string;
  category: string;
}

interface Experience {
  id: string;
  title: string;
  period: string;
  description: string;
  tags: string[];
}

const defaultPersonal: Personal = {
  fullName: "Abhishek Bhardwaj",
  role: "Graphic & UI Designer",
  greeting: "Hi, I'm",
  bio: "I'm a creative Graphic & UI Designer who turns ideas into impactful visuals. I specialize in branding, social media design, UI, video editing and short-form content creation.",
  email: "iabhishekbhardwaj07@gmail.com",
  phone: "+91 98827 00510",
  location: "Mandi, Himachal Pradesh",
  heroImage: "/images/hero-portrait.png",
};

const defaultAbout: About = {
  heading: "A little about me",
  paragraphs: [
    "I'm Abhishek Bhardwaj — a Graphic & UI Designer focused on creating modern, impactful visuals and user-friendly interfaces.",
    "I specialize in branding, social media design, UI mockups, video editing and short-form content creation.",
  ],
};

const defaultProjects: Project[] = [
  { id: "p1", title: "Accessories Website UI", category: "UI/UX", platform: "Figma", liveLink: "", description: "Created a basic wireframe and UI mockup of an Accessories Website using Figma.", tags: ["Figma", "Wireframe", "UI"], image: "/images/ui-laptop.png" },
  { id: "p2", title: "Social Media Campaign", category: "Content", platform: "Canva + CapCut", liveLink: "", description: "Designed Instagram and Facebook post templates, videos and gifs for real brands.", tags: ["Canva", "Figma", "CapCut"], image: "/images/content-impact.png" },
  { id: "p3", title: "Brand Identity", category: "Graphic", platform: "Illustrator", liveLink: "", description: "Developed branding elements (logo, business card, letterhead) for companies.", tags: ["Logo", "Stationery", "Illustrator"], image: "/images/poster-brand.png" },
  { id: "p4", title: "Poster & Banner Design", category: "Graphic", platform: "Photoshop", liveLink: "", description: "High-impact posters and banners designed for brand campaigns.", tags: ["Poster", "Banner", "Print"], image: "/images/poster-good-things.png" },
];

const defaultSkills: Skill[] = [
  { name: "Figma", color: "#A259FF", category: "Design" },
  { name: "Photoshop", color: "#31A8FF", category: "Design" },
  { name: "Illustrator", color: "#FF9A00", category: "Design" },
  { name: "Premiere Pro", color: "#9999FF", category: "Video" },
  { name: "Canva", color: "#00C4CC", category: "Design" },
  { name: "CapCut", color: "#000000", category: "Video" },
  { name: "HTML5", color: "#E34F26", category: "Frontend" },
  { name: "CSS3", color: "#1572B6", category: "Frontend" },
];

const defaultExperience: Experience[] = [
  { id: "e1", title: "Graphic Designer, Social Media Content Creator & UI/UX Designer", period: "2024 – Present", description: "Working at Cuilsoft Pvt. Ltd. Creating branding, social media content, UI designs and video content.", tags: ["Branding", "Social Media", "UI/UX"] },
  { id: "e2", title: "Graphic Designing & UI/UX Intern", period: "2023 – 2024", description: "6 months internship at Pisoft Informatics Pvt. Ltd. (Mohali). Worked on real client projects.", tags: ["Internship", "UI/UX", "Graphic Design"] },
];

export default function Admin() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [section, setSection] = useState("personal");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [personal, setPersonal] = useState<Personal>(defaultPersonal);
  const [about, setAbout] = useState<About>(defaultAbout);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [skills, setSkills] = useState<Skill[]>(defaultSkills);
  const [experience, setExperience] = useState<Experience[]>(defaultExperience);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    if (urlToken) {
      localStorage.setItem("gh_token", urlToken);
      setToken(urlToken);
      window.history.replaceState({}, "", "/admin");
    } else {
      const saved = localStorage.getItem("gh_token");
      if (saved) setToken(saved);
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    fetch("https://api.github.com/user", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((u) => {
        if (u.login) setUser(u);
        else { localStorage.removeItem("gh_token"); setToken(null); }
      })
      .catch(() => { localStorage.removeItem("gh_token"); setToken(null); });
  }, [token]);

  const login = () => (window.location.href = "/api/auth/login");
  const logout = () => { localStorage.removeItem("gh_token"); setToken(null); setUser(null); };

  const saveToGitHub = async (path: string, data: any, msg: string) => {
    if (!token) return false;
    try {
      let sha: string | undefined;
      const getRes = await fetch(`https://api.github.com/repos/abhishek-bhardwaj01/portfolio/contents/${path}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (getRes.ok) sha = (await getRes.json()).sha;
      const content = btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2))));
      const putRes = await fetch(`https://api.github.com/repos/abhishek-bhardwaj01/portfolio/contents/${path}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, content, sha, branch: "main" }),
      });
      return putRes.ok;
    } catch { return false; }
  };

  const publish = async () => {
    setSaving(true);
    setMessage("");
    const results = await Promise.all([
      saveToGitHub("public/content/personal.json", personal, "CMS: Update personal"),
      saveToGitHub("public/content/about.json", about, "CMS: Update about"),
      saveToGitHub("public/content/projects.json", projects, "CMS: Update projects"),
      saveToGitHub("public/content/skills.json", skills, "CMS: Update skills"),
      saveToGitHub("public/content/experience.json", experience, "CMS: Update experience"),
    ]);
    setMessage(results.every(Boolean) ? "✅ Published successfully! Site will update in 1-2 min." : "⚠️ Some files failed to save.");
    setSaving(false);
  };

  if (!token || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0f19] px-4">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#121826] p-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white">AB</div>
          <h1 className="text-2xl font-bold text-white">Portfolio CMS</h1>
          <p className="mt-2 text-sm text-white/50">Login with GitHub to manage content</p>
          <button onClick={login} className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-white px-6 py-3.5 font-semibold text-black hover:bg-white/90">
            Login with GitHub
          </button>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: "personal", label: "Personal" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
  ];

  const inputCls = "w-full rounded-lg border border-white/10 bg-[#0b0f19] px-3.5 py-2.5 text-sm text-white outline-none focus:border-blue-500";
  const labelCls = "mb-1.5 block text-xs font-medium text-white/50";

  return (
    <div className="flex min-h-screen bg-[#0b0f19] text-white">
      <aside className="fixed inset-y-0 left-0 z-40 flex w-56 flex-col border-r border-white/8 bg-[#121826]">
        <div className="flex items-center gap-2.5 px-5 py-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold">AB</div>
          <span className="text-sm font-semibold">Portfolio CMS</span>
        </div>
        <nav className="mt-1 flex-1 space-y-0.5 px-3">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => setSection(item.id)} className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${section === item.id ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/5 hover:text-white"}`}>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-white/8 p-3">
          <button onClick={logout} className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-400 hover:bg-white/5">Logout</button>
        </div>
      </aside>

      <div className="ml-56 flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/8 bg-[#0b0f19]/90 px-8 py-4 backdrop-blur">
          <h1 className="text-xl font-semibold capitalize">{section}</h1>
          <button onClick={publish} disabled={saving} className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-60">
            {saving ? "Publishing..." : "Publish Changes"}
          </button>
        </header>

        <main className="flex-1 overflow-y-auto px-8 py-8">
          {message && <div className="mb-6 rounded-lg border border-white/10 bg-[#121826] px-4 py-3 text-sm">{message}</div>}

          {section === "personal" && (
            <div className="max-w-3xl space-y-4 rounded-xl border border-white/8 bg-[#121826] p-6">
              <h2 className="font-semibold">Personal</h2>
              {(["fullName", "role", "greeting", "bio", "email", "phone", "location", "heroImage"] as const).map((key) => (
                <div key={key}>
                  <label className={labelCls}>{key}</label>
                  {key === "bio" ? (
                    <textarea className={inputCls} rows={4} value={personal[key]} onChange={(e) => setPersonal({ ...personal, [key]: e.target.value })} />
                  ) : (
                    <input className={inputCls} value={personal[key]} onChange={(e) => setPersonal({ ...personal, [key]: e.target.value })} />
                  )}
                </div>
              ))}
            </div>
          )}

          {section === "about" && (
            <div className="max-w-3xl space-y-4 rounded-xl border border-white/8 bg-[#121826] p-6">
              <h2 className="font-semibold">About</h2>
              <input className={inputCls} value={about.heading} onChange={(e) => setAbout({ ...about, heading: e.target.value })} />
              {about.paragraphs.map((p, i) => (
                <textarea key={i} className={inputCls} rows={3} value={p} onChange={(e) => { const next = [...about.paragraphs]; next[i] = e.target.value; setAbout({ ...about, paragraphs: next }); }} />
              ))}
              <button onClick={() => setAbout({ ...about, paragraphs: [...about.paragraphs, ""] })} className="text-sm text-blue-400">+ Add Paragraph</button>
            </div>
          )}

          {section === "projects" && (
            <div className="max-w-3xl space-y-4">
              <div className="flex justify-between">
                <h2 className="font-semibold">Projects</h2>
                <button onClick={() => setProjects([...projects, { id: "p" + Date.now(), title: "New Project", category: "UI/UX", platform: "", liveLink: "", description: "", tags: [], image: "" }])} className="rounded-lg bg-blue-600 px-4 py-2 text-sm">+ Add</button>
              </div>
              {projects.map((p, idx) => (
                <div key={p.id} className="rounded-xl border border-white/8 bg-[#121826] p-4 space-y-2">
                  <input className={inputCls} value={p.title} onChange={(e) => { const next = [...projects]; next[idx] = { ...p, title: e.target.value }; setProjects(next); }} />
                  <input className={inputCls} value={p.category} onChange={(e) => { const next = [...projects]; next[idx] = { ...p, category: e.target.value }; setProjects(next); }} />
                  <textarea className={inputCls} rows={2} value={p.description} onChange={(e) => { const next = [...projects]; next[idx] = { ...p, description: e.target.value }; setProjects(next); }} />
                  <button onClick={() => setProjects(projects.filter((_, i) => i !== idx))} className="text-xs text-red-400">Delete</button>
                </div>
              ))}
            </div>
          )}

          {section === "skills" && (
            <div className="max-w-3xl space-y-4 rounded-xl border border-white/8 bg-[#121826] p-6">
              <h2 className="font-semibold">Skills</h2>
              {skills.map((s, idx) => (
                <div key={idx} className="flex gap-2">
                  <input className={inputCls} value={s.name} onChange={(e) => { const next = [...skills]; next[idx] = { ...s, name: e.target.value }; setSkills(next); }} />
                  <button onClick={() => setSkills(skills.filter((_, i) => i !== idx))} className="text-xs text-red-400">X</button>
                </div>
              ))}
              <button onClick={() => setSkills([...skills, { name: "New", color: "#888", category: "Design" }])} className="text-sm text-blue-400">+ Add Skill</button>
            </div>
          )}

          {section === "experience" && (
            <div className="max-w-3xl space-y-4 rounded-xl border border-white/8 bg-[#121826] p-6">
              <h2 className="font-semibold">Experience</h2>
              {experience.map((exp, idx) => (
                <div key={exp.id} className="space-y-2 border-b border-white/10 pb-4">
                  <input className={inputCls} value={exp.title} onChange={(e) => { const next = [...experience]; next[idx] = { ...exp, title: e.target.value }; setExperience(next); }} />
                  <input className={inputCls} value={exp.period} onChange={(e) => { const next = [...experience]; next[idx] = { ...exp, period: e.target.value }; setExperience(next); }} />
                  <textarea className={inputCls} rows={2} value={exp.description} onChange={(e) => { const next = [...experience]; next[idx] = { ...exp, description: e.target.value }; setExperience(next); }} />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
