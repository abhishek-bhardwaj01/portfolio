export function PhoneMockup() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#0b1020]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a1a55] via-[#12162a] to-[#0b1020]" />
      <div className="relative flex h-full flex-col px-3 py-3">
        <div className="mb-2 flex items-center justify-between text-[8px] text-white/50">
          <span>9:41</span>
          <span className="flex gap-0.5">
            <i className="block h-1.5 w-2.5 rounded-[1px] bg-white/40" />
            <i className="block h-1.5 w-1.5 rounded-[1px] bg-white/40" />
          </span>
        </div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-wider text-white">AB</span>
          <span className="h-4 w-4 rounded-full bg-white/10" />
        </div>
        <div className="mb-2 rounded-xl bg-gradient-to-br from-[#7c6bff] to-[#4b3bd6] p-2.5 shadow-lg shadow-indigo-900/40">
          <p className="text-[8px] text-white/70">This month</p>
          <p className="text-[13px] font-semibold text-white">$24,890</p>
          <div className="mt-2 flex h-8 items-end gap-[3px]">
            {[40, 55, 35, 70, 50, 85, 60, 90, 45, 75].map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-[2px] bg-white/80"
                style={{ height: `${h}%`, opacity: 0.45 + i * 0.05 }}
              />
            ))}
          </div>
        </div>
        <div className="space-y-1.5">
          {["Revenue", "Users", "Sessions"].map((l, i) => (
            <div key={l} className="flex items-center justify-between rounded-lg bg-white/5 px-2 py-1.5">
              <div className="flex items-center gap-1.5">
                <span
                  className="h-4 w-4 rounded-md"
                  style={{ background: ["#8b7cff", "#67e8f9", "#f0abfc"][i] }}
                />
                <span className="text-[8px] text-white/80">{l}</span>
              </div>
              <span className="text-[8px] text-white/50">{["+12%", "+8%", "+21%"][i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DashboardMockup() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#0b1020]">
      <div className="flex h-full">
        <div className="flex w-8 flex-col items-center gap-2 border-r border-white/5 bg-black/30 py-2">
          <span className="text-[8px] font-bold text-white">AB</span>
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={`h-2.5 w-2.5 rounded ${i === 0 ? "bg-[#8b7cff]" : "bg-white/15"}`} />
          ))}
        </div>
        <div className="flex-1 p-2">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[8px] font-medium text-white/80">Overview</span>
            <span className="h-3 w-8 rounded bg-white/10" />
          </div>
          <div className="mb-2 grid grid-cols-2 gap-1">
            {["12.4k", "86%", "4.2", "192"].map((n) => (
              <div key={n} className="rounded-md bg-white/5 px-1.5 py-1">
                <div className="h-1 w-6 rounded bg-white/20" />
                <p className="mt-0.5 text-[9px] font-semibold text-white">{n}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-1">
            <div className="flex h-16 flex-1 items-end gap-[2px] rounded-md bg-white/5 p-1">
              {[30, 50, 40, 70, 55, 90, 60, 80, 45, 75, 65, 85].map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-[1px] bg-gradient-to-t from-[#4c3bd4] to-[#a78bfa]"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="flex h-16 w-12 items-center justify-center rounded-md bg-white/5">
              <div className="h-8 w-8 rounded-full border-[3px] border-[#8b7cff] border-l-white/20 border-b-white/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WebsiteMockup() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#f4f1ea]">
      <div className="flex items-center gap-1 bg-[#e8e4dc] px-2 py-1">
        <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
        <span className="ml-1 h-2 flex-1 rounded-sm bg-white/70" />
      </div>
      <div className="relative h-[58%] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=700"
          alt="Mountain travel site"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <p className="absolute bottom-2 left-2 text-[9px] font-semibold text-white">Discover Places</p>
      </div>
      <div className="grid grid-cols-3 gap-1 p-1.5">
        {[
          "https://images.pexels.com/photos/1054222/pexels-photo-1054222.jpeg?auto=compress&cs=tinysrgb&w=300",
          "https://images.pexels.com/photos/11917565/pexels-photo-11917565.jpeg?auto=compress&cs=tinysrgb&w=300",
          "https://images.pexels.com/photos/35711550/pexels-photo-35711550.jpeg?auto=compress&cs=tinysrgb&w=300",
        ].map((src) => (
          <div key={src} className="h-10 overflow-hidden rounded-sm">
            <img src={src} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SocialMockup() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#0e121b]">
      <div className="flex items-center gap-2 px-3 py-2">
        <span className="h-6 w-6 rounded-full bg-gradient-to-br from-[#8b7cff] to-[#f0abfc]" />
        <div>
          <p className="text-[9px] font-semibold text-white">abhishek.creates</p>
          <p className="text-[7px] text-white/40">Sponsored · Campaign</p>
        </div>
      </div>
      <div className="relative h-[55%] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/15226551/pexels-photo-15226551.jpeg?auto=compress&cs=tinysrgb&w=700"
          alt="Social content"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="space-y-1.5 px-3 py-2">
        <div className="flex gap-2 text-white/70">
          <span className="text-[10px]">♥</span>
          <span className="text-[10px]">💬</span>
          <span className="text-[10px]">➤</span>
        </div>
        <p className="text-[8px] leading-relaxed text-white/70">
          <span className="font-semibold text-white">ab.studio</span> Ideas turn into impact — new drop this week.
        </p>
      </div>
    </div>
  );
}

export function IdeasCard() {
  return (
    <div className="flex h-full w-full items-end rounded-2xl bg-[#0c1018] p-5 ring-1 ring-white/8">
      <p className="text-[26px] leading-[1.05] font-semibold tracking-tight text-white">
        Ideas
        <br />
        Turn Into
        <br />
        Impact
      </p>
    </div>
  );
}
