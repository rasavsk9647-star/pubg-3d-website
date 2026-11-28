import React, { useState } from 'react';
import { ArrowRight, Crosshair, Flame, PackageOpen, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const [crateOpened, setCrateOpened] = useState(false);

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-24 pb-12 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#170b14] via-[#210f1b] to-[#0b0710]"
    >
      {/* Warm Erangel Sunset Atmospheric Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[780px] h-[540px] rounded-full bg-gradient-to-b from-amber-500/20 via-rose-600/15 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 grid lg:grid-cols-12 gap-10 items-center my-auto">
        {/* Left Story Copy */}
        <div className="lg:col-span-6 space-y-6 story-reveal">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/35 text-[11px] font-mono-hud tracking-[0.2em] text-amber-300">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            CHAPTER 01 · PLANE DROP &amp; AIRDROP FLARE
          </div>

          <div>
            <h1 className="leading-[0.88] select-none">
              <span className="block font-script text-5xl sm:text-7xl text-amber-200 -mb-2">
                Erangel
              </span>
              <span className="block font-display text-7xl sm:text-8xl lg:text-[6.8rem] uppercase text-sunset-gradient drop-shadow-[0_10px_35px_rgba(245,158,11,0.28)]">
                AIRDROP VI
              </span>
            </h1>
            <p className="mt-4 font-mono-hud text-xs sm:text-sm tracking-[0.22em] text-amber-300 uppercase">
              FROM PLANE JUMP TO FINAL CIRCLE ESCAPE
            </p>
          </div>

          <p className="text-white/75 max-w-lg text-sm sm:text-base leading-relaxed">
            Pop the red smoke, inspect studio-grade <strong className="text-white">Dress, Pants,
              Helmet, Gun &amp; Shoes</strong>, build your full operator loadout, and extract in the{' '}
            <strong className="text-white">Sunset Coupe RB</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              onClick={() => setCrateOpened((v) => !v)}
              className="btn-sunset inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-mono-hud text-xs font-bold tracking-widest text-white shadow-lg shadow-rose-500/30 transition-transform active:scale-95 cursor-pointer"
            >
              <PackageOpen className="w-4 h-4" />
              {crateOpened ? 'AIRDROP UNLOCKED ✓' : 'POP RED SMOKE & OPEN CRATE'}
            </button>
            <a
              href="#crate"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 font-mono-hud text-xs font-bold tracking-widest text-white transition-all"
            >
              ENTER ARMORY <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right Interactive Airdrop Crate Reveal Card */}
        <div className="lg:col-span-6 relative story-reveal">
          <div className="relative rounded-3xl border border-white/15 bg-gradient-to-b from-[#1d111a] to-[#0c080f] p-6 sm:p-8 overflow-hidden shadow-2xl">
            {/* Red Flare Smoke Glow */}
            <div
              className={`pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-3xl transition-all duration-700 ${crateOpened
                  ? 'bg-gradient-to-t from-rose-600/55 via-amber-400/45 to-transparent scale-125 opacity-100'
                  : 'bg-rose-600/25 scale-90 opacity-60'
                }`}
            />

            {/* Crate Visual + Rarity Reveal */}
            <div className="relative z-10 flex flex-col items-center text-center py-4">
              <div className="relative w-full max-w-[340px] aspect-square rounded-2xl overflow-hidden border border-white/10 bg-[#0a080d] shadow-inner">
                <img
                  src={crateOpened ? '/assets/dress-shirt.jpg' : '/assets/operator-outfit.jpg'}
                  alt="PUBG Airdrop Featured Gear"
                  className={`w-full h-full object-cover transition-all duration-700 ${crateOpened ? 'scale-105 brightness-110' : 'scale-100 brightness-90'
                    }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-600/85 text-[10px] font-mono-hud font-bold tracking-widest text-white">
                  <Flame className="w-3 h-3" />
                  {crateOpened ? 'MYTHIC DROP REVEALED' : 'FLARE SIGNAL ACTIVE'}
                </div>

                <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-left">
                  <div>
                    <div className="font-mono-hud text-[10px] text-amber-300 tracking-widest">
                      {crateOpened ? 'CRATE LOOT // 01' : 'SIGNATURE SET'}
                    </div>
                    <div className="font-display text-xl uppercase text-white">
                      {crateOpened ? 'PLAYERUNKNOWN SHIRT & TIE' : 'ERANGEL SURVIVOR KIT'}
                    </div>
                  </div>
                  <Sparkles className="w-5 h-5 text-amber-300 shrink-0" />
                </div>
              </div>

              {/* Mini-Map Radar Footer */}
              <div className="mt-5 w-full flex items-center justify-between gap-3 bg-black/55 border border-white/10 rounded-2xl p-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full border border-cyan-400/50 bg-cyan-950/50 flex items-center justify-center">
                    <span className="absolute w-7 h-7 rounded-full border border-cyan-400/70 animate-pulse-ring" />
                    <Crosshair className="w-4 h-4 text-amber-300" />
                  </div>
                  <div className="text-left">
                    <div className="font-mono-hud text-[10px] text-cyan-300 tracking-widest">
                      SAFE ZONE · POCHINKI
                    </div>
                    <div className="font-mono-hud text-xs font-bold text-white">
                      SCROLL TO CONTINUE STORY
                    </div>
                  </div>
                </div>
                <span className="font-mono-hud text-[11px] text-emerald-400 font-bold">
                  100 ALIVE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Ticker */}
      <div className="relative z-10 mt-10 border-y border-amber-400/25 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-purple-600/10 py-2.5 overflow-hidden">
        <div className="animate-marquee font-mono-hud text-xs tracking-[0.25em] text-amber-200 uppercase">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center gap-8 pr-8">
              <span>★ PLANE DROP</span>
              <span className="text-rose-400">•</span>
              <span>AIRDROP CRATE OPENING</span>
              <span className="text-rose-400">•</span>
              <span>DRESS + PANTS + HELMET + GUN + SHOES</span>
              <span className="text-rose-400">•</span>
              <span>COUPE RB &amp; UAZ GARAGE</span>
              <span className="text-rose-400">•</span>
              <span>WINNER WINNER CHICKEN DINNER</span>
              <span className="text-rose-400">•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
