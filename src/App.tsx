import { useEffect, useState } from "react";
import { IconArrowRight, IconDownload, IconMail, IconPhone, IconPin, IconClose, IconMenu } from "./components/Icons";
import { cn } from "./utils/cn";
import { useCMS } from "./hooks/useCMS";
import type { CMSData, ButtonConfig, ProjectItem } from "./cms/types";

function IconExternal({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M14 5H19V10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 5L10 14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 14V18C19 18.6 18.6 19 18 19H6C5.4 19 5 18.6 5 18V6C5 5.4 5.4 5 6 5H10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconGithub({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function ProjectModal({ project, onClose }: { project: ProjectItem; onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-black/70 p-4 pt-16 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative mb-10 w-full max-w-2xl rounded-3xl border border-white/8 bg-[#080b12] p-5 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] tracking-[0.2em] text-white/40 uppercase">{project.type || project.category}</p>
            <h3 className="mt-1 text-2xl font-semibold text-white">{project.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/70 hover:text-white"
            aria-label="Close"
          >
            <IconClose size={16} />
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl">
          <img
            src={project.image}
            alt={project.imageAlt || project.title}
            className="aspect-[16/10] w-full object-cover"
          />
        </div>

        <p className="mt-5 text-[15px] leading-relaxed text-white/60">
          {project.fullDescription || project.shortDescription}
        </p>

        {project.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span key={t} className="rounded-full bg-white/5 px-3 py-1 text-[12px] text-white/55">
                {t}
              </span>
            ))}
          </div>
        )}

        {(project.liveUrl || project.githubUrl) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#8b7cff] px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#7a6bef]"
              >
                Live Demo <IconExternal size={14} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[13px] font-medium text-white/80 transition hover:border-white/30 hover:text-white"
              >
                <IconGithub size={14} /> GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function downloadResume(cms: CMSData) {
  const blob = new Blob([cms.site.resumeText], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = cms.site.resumeFilename || "Resume.txt";
  a.click();
  URL.revokeObjectURL(url);
}

function handleCta(btn: ButtonConfig, cms: CMSData) {
  if (!btn.enabled) return;
  if (btn.url === "#resume") {
    downloadResume(cms);
    return;
  }
  if (btn.url.startsWith("#")) {
    document.getElementById(btn.url.slice(1))?.scrollIntoView({ behavior: "smooth" });
    return;
  }
  if (btn.openInNewTab) window.open(btn.url, "_blank", "noopener,noreferrer");
  else window.location.href = btn.url;
}

function Navbar({ cms }: { cms: CMSData }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const nav = cms.navigation.filter((n) => n.enabled).sort((a, b) => a.order - b.order);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      let current = "home";
      for (const item of nav) {
        const el = document.getElementById(item.href);
        if (el && el.getBoundingClientRect().top < 140) current = item.href;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [nav]);

  const go = (href: string) => {
    setOpen(false);
    if (href.startsWith("http") || href.startsWith("/")) {
      window.location.href = href;
      return;
    }
    document.getElementById(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={cn("fixed top-0 right-0 left-0 z-50 transition-all duration-300", scrolled ? "border-b border-white/6 bg-[#06080f]/85 backdrop-blur-xl" : "bg-transparent")}>
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-5 lg:px-8">
        <button onClick={() => go("home")} className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#8b7cff] text-sm font-bold text-white">{cms.site.logoText}</span>
          <div className="hidden text-left sm:block">
            <p className="text-[13px] font-semibold leading-none text-white">{cms.site.siteName}</p>
            <p className="text-[10px] text-white/50">{cms.site.tagline}</p>
          </div>
        </button>
        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <button key={item.id} onClick={() => go(item.href)} className={cn("text-[13px] font-medium transition", active === item.href ? "text-white" : "text-white/55 hover:text-white")}>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {cms.site.navCta?.enabled !== false && (
            <button
              onClick={() => {
                const u = cms.site.navCta?.url || "#contact";
                if (u.startsWith("#")) document.getElementById(u.slice(1))?.scrollIntoView({ behavior: "smooth" });
                else if (cms.site.navCta?.openInNewTab) window.open(u, "_blank", "noopener,noreferrer");
                else window.location.href = u;
              }}
              className="hidden items-center gap-2 rounded-full bg-[#8b7cff] px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#7a6bef] md:inline-flex"
            >
              {cms.site.navCta?.text || "Let's Talk"} <IconArrowRight size={14} />
            </button>
          )}
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-white/8 bg-[#06080f]/95 px-5 py-4 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <button key={item.id} onClick={() => go(item.href)} className="rounded-lg px-3 py-2.5 text-left text-sm text-white/70 hover:bg-white/5 hover:text-white">{item.label}</button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default function App() {
  const { data: cms, loading } = useCMS();
  const [filter, setFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(4);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    document.title = cms.site.seoTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", cms.site.seoDescription);
  }, [cms.site.seoTitle, cms.site.seoDescription]);

  useEffect(() => {
    setVisibleCount(4);
  }, [filter]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#06080f] text-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#8b7cff] border-t-transparent" />
      </div>
    );
  }

  const projectCats = cms.projects.categories.filter((c) => c.enabled).sort((a, b) => a.order - b.order);
  const allProjects = cms.projects.items.filter((p) => p.published).filter((p) => filter === "all" || p.category === filter).sort((a, b) => a.order - b.order);
  const projects = allProjects.slice(0, visibleCount);
  const hasMore = visibleCount < allProjects.length;
  const skills = cms.skills.items.filter((s) => s.enabled).sort((a, b) => a.order - b.order);
  const experience = cms.experience.items.filter((e) => e.enabled).sort((a, b) => a.order - b.order);
  const stats = cms.stats.filter((s) => s.enabled).sort((a, b) => a.order - b.order);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "459d8fb3-657d-4ca3-8d64-f223eb9bfbee",
          subject: `Portfolio Contact from ${form.name}`,
          from_name: form.name,
          email: form.email,
          message: form.message,
          to: "ak19813528@gmail.com",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const copyright = (cms.footer.copyright || cms.site.copyright).replace("{year}", String(new Date().getFullYear()));

  return (
    <div className="min-h-screen bg-[#06080f] text-white">
      <Navbar cms={cms} />
      {cms.hero.enabled && (
        <section id="home" className="relative overflow-hidden pt-[72px]">
          <div className="pointer-events-none absolute inset-0"><div className="absolute top-[-10%] right-[8%] h-[520px] w-[520px] rounded-full bg-[#8b7cff]/15 blur-[120px]" /></div>
          <div className="relative mx-auto grid max-w-[1280px] items-center gap-10 px-5 pt-12 pb-20 lg:grid-cols-2 lg:px-8 lg:pt-16">
            <div className="max-w-[580px]">
              <p className="mb-4 text-[12px] font-semibold tracking-[0.2em] text-[#9aa3d6]">{cms.hero.greeting}</p>
              <h1 className="text-[40px] leading-[1.1] font-bold tracking-tight text-white sm:text-[52px] lg:text-[56px]">
                {cms.hero.headlineLine1}<br /><span className="text-[#8b7cff]">{cms.hero.headlineHighlight}</span><br />{cms.hero.headlineLine2}
              </h1>
              <p className="mt-6 max-w-[460px] text-[15px] leading-relaxed text-white/55">{cms.hero.description}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                {cms.hero.primaryCta.enabled && (
                  <button onClick={() => handleCta(cms.hero.primaryCta, cms)} className="inline-flex items-center gap-2 rounded-full bg-[#8b7cff] px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-[#7a6bef]">
                    {cms.hero.primaryCta.text} <IconArrowRight size={16} />
                  </button>
                )}
                {cms.hero.secondaryCta.enabled && (
                  <button onClick={() => handleCta(cms.hero.secondaryCta, cms)} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[14px] font-medium text-white/80 transition hover:border-white/40 hover:text-white">
                    {cms.hero.secondaryCta.text} <IconDownload size={16} />
                  </button>
                )}
              </div>
              {cms.hero.tools.length > 0 && (
                <div className="mt-10">
                  <p className="mb-3 text-[11px] font-medium tracking-wide text-white/40">{cms.hero.toolsLabel}</p>
                  <div className="flex flex-wrap gap-2">
                    {cms.hero.tools.map((t) => (
                      <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] font-medium text-white/70">{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="relative mx-auto h-[400px] w-full max-w-[480px] lg:h-[520px]">
              {cms.hero.handwriting && (
                <div className="absolute top-[8%] right-[0%] z-20 hidden rotate-[12deg] sm:block">
                  <p className="font-hand text-[30px] leading-[1.05] font-semibold whitespace-pre-line text-[#c4b5fd] lg:text-[36px]">{cms.hero.handwriting}</p>
                </div>
              )}
              <div className="absolute inset-0 rounded-full bg-[#8b7cff]/20 blur-[80px]" />
              <img src={cms.hero.image} alt={cms.hero.imageAlt} className="relative z-10 h-full w-full object-cover object-top" style={{ maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)" }} />
            </div>
          </div>
        </section>
      )}
      {stats.length > 0 && (
        <section className="border-t border-white/6 py-12">
          <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-6 px-5 sm:grid-cols-4 lg:px-8">
            {stats.map((s) => (
              <div key={s.id} className="text-center">
                <p className="text-[32px] font-bold text-white sm:text-[36px]">{s.value}</p>
                <p className="mt-1 text-[13px] text-white/45">{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      {(cms.about.enabled || cms.contactInfo.enabled) && (
        <section id="about" className="border-t border-white/6 py-20">
          <div className="mx-auto grid max-w-[1280px] gap-8 px-5 lg:grid-cols-2 lg:px-8">
            {cms.about.enabled && (
              <div className="rounded-2xl border border-white/8 bg-[#0c1018] p-6 lg:p-8">
                <p className="text-[12px] font-semibold tracking-[0.2em] text-[#8b7cff]">{cms.about.badge}</p>
                <h2 className="mt-2 text-[28px] font-bold text-white">{cms.about.heading}</h2>
                <div className="mt-6 flex items-start gap-4">
                  <img src={cms.about.image || cms.hero.image} alt={cms.about.imageAlt} className="h-20 w-20 rounded-full object-cover" />
                  <div>
                    <p className="text-[15px] font-semibold text-white">{cms.site.siteName}</p>
                    <p className="text-[13px] text-white/50">Location: {cms.site.location}</p>
                    <p className="text-[13px] text-white/50">Role: {cms.site.tagline}</p>
                  </div>
                </div>
                {cms.about.paragraphs.map((para, i) => (
                  <p key={i} className="mt-4 text-[14px] leading-relaxed text-white/55">{para}</p>
                ))}
                {cms.about.resumeButton.enabled && (
                  <button onClick={() => handleCta(cms.about.resumeButton, cms)} className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[13px] font-medium text-white/80 transition hover:border-white/30 hover:text-white">
                    {cms.about.resumeButton.text} <IconDownload size={14} />
                  </button>
                )}
              </div>
            )}
            {cms.contactInfo.enabled && (
              <div className="rounded-2xl border border-white/8 bg-[#0c1018] p-6 lg:p-8">
                <p className="text-[12px] font-semibold tracking-[0.2em] text-[#8b7cff]">{cms.contactInfo.badge}</p>
                <h2 className="mt-2 text-[28px] font-bold text-white">{cms.contactInfo.heading}</h2>
                <div className="mt-8 space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10"><IconMail size={16} /></span>
                    <div><p className="text-[12px] text-white/40">Email</p><p className="text-[14px] text-white/80">{cms.site.email}</p></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10"><IconPhone size={16} /></span>
                    <div><p className="text-[12px] text-white/40">Phone</p><p className="text-[14px] text-white/80">{cms.site.phone}</p></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10"><IconPin size={16} /></span>
                    <div><p className="text-[12px] text-white/40">Location</p><p className="text-[14px] text-white/80">{cms.site.location}</p></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
      {cms.projects.enabled && (
        <section id="work" className="border-t border-white/6 py-20">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
            <p className="text-[12px] font-semibold tracking-[0.2em] text-[#8b7cff]">{cms.projects.badge}</p>
            <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-[32px] font-bold text-white sm:text-[40px]">{cms.projects.heading}</h2>
              <div className="flex flex-wrap gap-2">
                {projectCats.map((f) => (
                  <button key={f.id} onClick={() => setFilter(f.slug)} className={cn("rounded-full px-4 py-1.5 text-[12px] font-medium capitalize transition", filter === f.slug ? "bg-[#8b7cff] text-white" : "border border-white/15 text-white/60 hover:border-white/30 hover:text-white")}>{f.label}</button>
                ))}
              </div>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <div
                  key={p.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedProject(p)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedProject(p); } }}
                  className="group cursor-pointer overflow-hidden rounded-2xl border border-white/8 bg-[#0c1018] transition hover:border-[#8b7cff]/30"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={p.image} alt={p.imageAlt || p.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-[15px] font-semibold text-white">{p.title}</h3>
                    <p className="mt-1 text-[12px] text-white/45">{p.type || p.shortDescription}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (<span key={t} className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-white/50">{t}</span>))}
                    </div>
                    {(p.liveUrl || p.githubUrl) && (
                      <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-white/6 pt-3" onClick={(e) => e.stopPropagation()}>
                        {p.liveUrl && (
                          <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#8b7cff] transition hover:text-[#a99dff]">
                            Live Demo <IconExternal size={12} />
                          </a>
                        )}
                        {p.githubUrl && (
                          <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[12px] font-medium text-white/55 transition hover:text-white">
                            <IconGithub size={12} /> GitHub
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {hasMore && (
              <div className="mt-10 flex justify-center">
                <button onClick={() => setVisibleCount((c) => c + 3)} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-2.5 text-[13px] font-medium text-white/80 transition hover:border-[#8b7cff]/50 hover:text-white">
                  Load More
                </button>
              </div>
            )}
          </div>
        </section>
      )}
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      {cms.skills.enabled && (
        <section id="skills" className="border-t border-white/6 py-20">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
            <p className="text-[12px] font-semibold tracking-[0.2em] text-[#8b7cff]">{cms.skills.badge}</p>
            <h2 className="mt-2 text-[32px] font-bold text-white sm:text-[40px]">{cms.skills.heading}</h2>
            <div className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
              {skills.map((t) => (
                <div key={t.id} className="flex flex-col items-center gap-2 rounded-2xl border border-white/8 bg-[#0c1018] p-4 transition hover:border-[#8b7cff]/40">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-[14px] font-bold text-white/80">{t.name.slice(0, 2)}</div>
                  <span className="text-[11px] text-white/50">{t.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {cms.experience.enabled && (
        <section id="experience" className="border-t border-white/6 py-20">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
            <p className="text-[12px] font-semibold tracking-[0.2em] text-[#8b7cff]">{cms.experience.badge}</p>
            <h2 className="mt-2 text-[32px] font-bold text-white sm:text-[40px]">{cms.experience.heading}</h2>
            <div className="mt-10 space-y-6">
              {experience.map((exp, i) => (
                <div key={exp.id} className="relative pl-6">
                  <span className={cn("absolute top-1.5 left-0 h-3 w-3 rounded-full", i === 0 ? "bg-[#8b7cff] ring-4 ring-[#8b7cff]/20" : "bg-white/30")} />
                  <p className="text-[12px] text-white/40">{exp.period}</p>
                  <p className="mt-1 text-[16px] font-semibold text-white">{exp.title}</p>
                  <p className="text-[13px] text-white/55">{exp.description || exp.company}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {cms.cta.enabled && (
        <section className="py-10">
          <div className="mx-auto max-w-[1280px] px-5 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-gradient-to-r from-[#6d5ce7] to-[#8b7cff] px-8 py-10 sm:flex-row">
              <div>
                <h3 className="text-[24px] font-bold text-white sm:text-[28px]">{cms.cta.heading}</h3>
                <p className="mt-1 text-[15px] text-white/80">{cms.cta.description}</p>
              </div>
              {cms.cta.button.enabled && (
                <button onClick={() => handleCta(cms.cta.button, cms)} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-semibold text-[#4c3bd4] transition hover:bg-white/90">
                  {cms.cta.button.text} <IconArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        </section>
      )}
      {cms.contact.enabled && (
        <section id="contact" className="border-t border-white/6 py-20">
          <div className="mx-auto grid max-w-[1280px] gap-10 px-5 lg:grid-cols-2 lg:px-8">
            <div>
              <p className="text-[12px] font-semibold tracking-[0.2em] text-[#8b7cff]">{cms.contact.badge}</p>
              <h2 className="mt-2 text-[32px] font-bold text-white sm:text-[40px]">
                {cms.contact.heading} <span className="text-[#8b7cff]">{cms.contact.headingHighlight}</span>
              </h2>
              <p className="mt-4 max-w-md text-[15px] text-white/55">{cms.contact.description}</p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10"><IconMail size={16} /></span>
                  <div>
                    <p className="text-[12px] text-white/40">Email</p>
                    <p className="text-[14px] text-white/80">{cms.site.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10"><IconPhone size={16} /></span>
                  <div>
                    <p className="text-[12px] text-white/40">Phone</p>
                    <p className="text-[14px] text-white/80">{cms.site.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10"><IconPin size={16} /></span>
                  <div>
                    <p className="text-[12px] text-white/40">Location</p>
                    <p className="text-[14px] text-white/80">{cms.site.location}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/8 bg-[#0c1018] p-6">
              {status === "sent" ? (
                <div className="flex h-full min-h-[260px] flex-col items-center justify-center text-center">
                  <p className="text-lg font-semibold text-white">{cms.contact.successMessage}</p>
                  <button onClick={() => setStatus("idle")} className="mt-6 text-[13px] text-[#8b7cff] hover:text-white">Send another</button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-[12px] text-white/50">{cms.contact.formNameLabel}</label>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-white/10 bg-[#06080f] px-4 py-3 text-[14px] text-white outline-none focus:border-[#8b7cff]" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[12px] text-white/50">{cms.contact.formEmailLabel}</label>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border border-white/10 bg-[#06080f] px-4 py-3 text-[14px] text-white outline-none focus:border-[#8b7cff]" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[12px] text-white/50">{cms.contact.formMessageLabel}</label>
                    <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-xl border border-white/10 bg-[#06080f] px-4 py-3 text-[14px] text-white outline-none focus:border-[#8b7cff]" />
                  </div>
                  {status === "error" && (
                    <p className="text-[13px] text-red-400">{cms.contact.errorMessage || "Something went wrong. Please try again."}</p>
                  )}
                  <button type="submit" disabled={status === "sending"} className="w-full rounded-full bg-[#8b7cff] py-3 text-[14px] font-semibold text-white transition hover:bg-[#7a6bef] disabled:opacity-60">
                    {status === "sending" ? "Sending..." : cms.contact.submitText}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      )}
      {cms.footer.enabled && (
        <footer className="border-t border-white/6 py-8 text-center text-sm text-white/40">{copyright}</footer>
      )}
    </div>
  );
}
