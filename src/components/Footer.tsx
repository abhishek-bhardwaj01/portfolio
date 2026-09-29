import { IconInstagram, IconLinkedin, IconUp, IconX, IconYoutube } from "./Icons";

const socials = [
  { icon: IconInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: IconLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: IconX, href: "https://x.com", label: "X" },
  { icon: IconYoutube, href: "https://youtube.com", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-5 py-6 lg:px-8">
      <div className="flex items-center gap-4">
        <span className="text-[18px] font-extrabold tracking-tight">AB</span>
        <p className="hidden text-[12px] text-white/35 sm:block">© 2025 Abhishek Bhardwaj. All rights reserved.</p>
      </div>
      <div className="flex items-center gap-2">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            className="flex h-8 w-8 items-center justify-center text-white/45 hover:text-white"
          >
            <s.icon size={15} />
          </a>
        ))}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="ml-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/70 hover:bg-white/5 hover:text-white"
        >
          <IconUp size={14} />
        </button>
      </div>
    </footer>
  );
}
