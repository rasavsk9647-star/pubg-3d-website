import React, { useEffect, useState } from 'react';
import { Star, ShoppingBag } from 'lucide-react';

/**
 * Sticky Sunburn-inspired PUBG HUD Navbar with Wanted/Tier Stars,
 * rolling BP counter, and Crate Stash drawer trigger.
 */
export default function NavbarHUD({ bpTotal, stashCount, onOpenStash }) {
  const [displayBp, setDisplayBp] = useState(bpTotal);

  useEffect(() => {
    if (displayBp === bpTotal) return;
    const diff = bpTotal - displayBp;
    const step = Math.max(1, Math.ceil(Math.abs(diff) / 14));
    const timer = setTimeout(() => {
      setDisplayBp((prev) =>
        prev < bpTotal ? Math.min(bpTotal, prev + step) : Math.max(bpTotal, prev - step)
      );
    }, 24);
    return () => clearTimeout(timer);
  }, [displayBp, bpTotal]);

  // 1 star per 250 BP (up to 5 stars)
  const activeStars = Math.min(5, Math.floor(bpTotal / 250));
  const paddedBp = String(displayBp).padStart(8, '0');

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#0b0710]/85 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <a href="#hero" className="flex items-baseline gap-1.5 shrink-0">
          <span className="font-script text-2xl sm:text-3xl text-amber-300 leading-none">
            Erangel
          </span>
          <span className="font-display text-xl sm:text-2xl tracking-wider text-white">
            DROP
          </span>
        </a>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono-hud tracking-widest text-white/70">
          <a href="#crate" className="hover:text-amber-300 transition-colors">
            01 THE CRATE
          </a>
          <a href="#loadout" className="hover:text-pink-400 transition-colors">
            02 LOADOUT
          </a>
          <a href="#garage" className="hover:text-cyan-300 transition-colors">
            03 GARAGE
          </a>
          <a href="#brief" className="hover:text-white transition-colors">
            04 THE BRIEF
          </a>
        </nav>

        {/* PUBG HUD Status */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Tier / Wanted Stars */}
          <div
            className="hidden sm:flex items-center gap-1"
            title={`Crate Tier: ${activeStars}/5 Stars`}
          >
            {[0, 1, 2, 3, 4].map((idx) => (
              <Star
                key={idx}
                className={`w-4 h-4 transition-all duration-300 ${
                  idx < activeStars
                    ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.85)]'
                    : 'text-white/25'
                }`}
              />
            ))}
          </div>

          {/* Rolling BP Counter */}
          <div className="font-mono-hud text-sm sm:text-base font-bold tracking-wider text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded">
            BP {paddedBp}
          </div>

          {/* Stash Button */}
          <button
            onClick={onOpenStash}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-pink-500/25 border border-white/15 hover:border-pink-400/50 transition-all text-xs font-mono-hud font-semibold tracking-wider cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-pink-400" />
            <span>STASH</span>
            <span className="inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-pink-500 text-white text-[11px]">
              {stashCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
