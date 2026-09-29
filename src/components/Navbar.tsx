import { useEffect, useState } from "react";
import { NAV } from "../data";
import { IconArrowRight, IconClose, IconMenu } from "./Icons";
import { cn } from "../utils/cn";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const ids = NAV.map((n) => n.id);
      let current = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top < 140) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-white/6 bg-[#06080f]/80 backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-5 lg:px-8">
        <button onClick={() => go("home")} className="text-[22px] font-extrabold tracking-tight text-white">
          AB
        </button>

        <nav className="hidden items-center gap-4 xl:flex 2xl:gap-5">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={cn(
                "nav-link text-[12px] font-medium text-white/55 transition-colors hover:text-white",
                active === item.id && "active text-white"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => go("contact")}
            className="hidden items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-[12px] font-medium text-white transition hover:border-white/50 hover:bg-white/5 md:inline-flex"
          >
            Let's Talk
            <IconArrowRight size={13} />
          </button>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white xl:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/8 bg-[#06080f]/95 px-5 py-4 backdrop-blur-xl xl:hidden">
          <div className="flex flex-col gap-1">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-left text-sm text-white/70 hover:bg-white/5 hover:text-white",
                  active === item.id && "bg-white/5 text-white"
                )}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => go("contact")}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-[#06080f]"
            >
              Let's Talk <IconArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
