import { IconArrowRight, IconDownload, IconInstagram, IconLinkedin, IconX, IconYoutube } from "./Icons";
import { RESUME_TEXT } from "../data";

function downloadResume() {
  const blob = new Blob([RESUME_TEXT], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Abhishek_Bhardwaj_Resume.txt";
  a.click();
  URL.revokeObjectURL(url);
}

const socials = [
  { icon: IconInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: IconLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: IconX, href: "https://x.com", label: "X" },
  { icon: IconYoutube, href: "https://youtube.com", label: "YouTube" },
];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-[72px]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-10%] right-[8%] h-[520px] w-[520px] rounded-full bg-[#8b7cff]/12 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[380px] w-[380px] rounded-full bg-[#4c3bd4]/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto grid max-w-[1280px] items-center gap-8 px-5 pt-10 pb-16 lg:grid-cols-2 lg:px-8 lg:pt-16 lg:pb-20">
        <div className="hero-in relative z-10 max-w-[620px]">
          <p className="mb-4 text-[11px] font-semibold tracking-[0.28em] text-[#9aa3d6]">HI, I'M ABHISHEK</p>
          <h1 className="text-[40px] leading-[1.08] font-bold tracking-[-0.03em] text-white sm:text-[52px] lg:text-[58px]">
            I create digital
            <br />
            experiences, brands
            <br />
            and <span className="text-[#8b7cff]">content.</span>
          </h1>
          <p className="mt-6 max-w-[460px] text-[14px] leading-relaxed text-white/50">
            I'm a creative Graphic & UI Designer who turns ideas into impactful visuals. I specialize in branding, social media design, UI, video editing, reel shooting and short-form content creation.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href="#uiux"
              className="inline-flex items-center gap-2 rounded-full bg-[#8b7cff] px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#7a6bef]"
            >
              View My Work
              <IconArrowRight size={14} />
            </a>
            <button
              onClick={downloadResume}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[13px] font-medium text-white/80 transition hover:border-white/30 hover:text-white"
            >
              Download Resume
              <IconDownload size={14} />
            </button>
          </div>

          <div className="mt-10">
            <p className="mb-3 text-[11px] font-medium tracking-wide text-white/40">Tools I Use</p>
            <div className="flex flex-wrap items-center gap-3">
              {["Canva", "Figma", "Illustrator", "Photoshop", "Premiere Pro", "CapCut"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mx-auto h-[420px] w-full max-w-[560px] overflow-hidden lg:h-[560px] lg:max-w-none">
          <div className="absolute top-[10%] right-[4%] z-20 hidden rotate-[16deg] sm:block">
            <p className="font-hand text-[28px] leading-[1.05] font-semibold text-[#c4b5fd] lg:text-[34px]">
              Better
              <br />
              Ideas
              <br />
              Better
              <br />
              Products
            </p>
            <svg className="mt-1 ml-6 h-4 w-24 text-[#8b7cff]" viewBox="0 0 120 16" fill="none">
              <path d="M2 10C28 2 54 14 78 8C94 4 108 7 118 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          <div className="absolute top-[6%] right-[10%] h-[72%] w-[72%] rounded-full bg-white/10 blur-[90px]" />

          <img
            src="/images/hero-portrait.png"
            alt="Abhishek Bhardwaj"
            className="absolute right-0 bottom-0 h-full w-[92%] object-cover object-[center_top] [mask-image:linear-gradient(to_right,transparent_0%,black_18%,black_100%)]"
          />
          <div className="absolute right-0 bottom-0 left-0 h-28 bg-gradient-to-t from-[#06080f] to-transparent" />
        </div>
      </div>
      <div className="h-px bg-white/6" />
    </section>
  );
}
