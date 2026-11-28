import React, { useState } from 'react';
import { Trash2, X, CheckCircle2 } from 'lucide-react';

export function BriefAndFooter() {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  const cards = [
    {
      num: '01',
      title: 'REAL-TIME 3D GEAR',
      desc: 'Every Dress, Pants, Helmet, Gun, Shoes, and Vehicle renders in interactive WebGL 3D.',
    },
    {
      num: '02',
      title: 'LIVE SKIN SWATCHES',
      desc: 'Swap Glacier, Sunburn, Desert Sand, and 24K Gold finishes with instant material updates.',
    },
    {
      num: '03',
      title: 'FULL OPERATOR SYNC',
      desc: 'Equipping any slot in the Armory Crate updates your 3D Operator in the Loadout bay.',
    },
    {
      num: '04',
      title: 'GARAGE EXTRACTION',
      desc: 'Finish your drop by customizing a Coupe RB, UAZ Armored, or Desert Buggy.',
    },
  ];

  return (
    <footer
      id="brief"
      className="relative pt-24 pb-12 scroll-mt-16 bg-gradient-to-b from-[#0b0710] via-[#1c0c24] to-[#08050c] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <div className="font-mono-hud text-xs tracking-[0.25em] text-amber-300 uppercase mb-2">
            04 // THE BRIEF
          </div>
          <h2 className="font-display text-4xl sm:text-5xl uppercase">
            DROP INTEL &amp; SPECS
          </h2>
        </div>

        {/* 4 Info Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {cards.map((c) => (
            <div
              key={c.num}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-pink-400/40 transition-colors"
            >
              <div className="font-mono-hud text-xs text-pink-400 font-bold mb-2">{c.num}</div>
              <h3 className="font-display text-xl uppercase tracking-wide mb-1.5">{c.title}</h3>
              <p className="text-xs sm:text-sm text-white/65 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Big Sunset Typographic Banner */}
        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-[#331130] via-[#4a1638] to-[#1a091f] py-16 px-6 text-center overflow-hidden">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-b from-amber-300/35 via-pink-500/25 to-transparent blur-2xl" />
          <div className="relative z-10">
            <h3 className="font-display text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight leading-none">
              NO CAMPERS.
            </h3>
            <div className="font-script text-4xl sm:text-6xl text-amber-200 -mt-2 sm:-mt-3">
              Only dinners.
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setJoined(true);
              }}
              className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-2.5"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setJoined(false);
                }}
                placeholder="squad@erangel.gg"
                className="flex-1 px-4 py-3 rounded-full bg-black/50 border border-white/20 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-pink-400"
              />
              <button
                type="submit"
                className="btn-sunset px-6 py-3 rounded-full font-mono-hud text-xs font-bold tracking-widest text-white cursor-pointer"
              >
                {joined ? 'ON THE DROP LIST ✓' : 'GET DROP ALERTS'}
              </button>
            </form>
            {joined && (
              <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-mono-hud text-emerald-300">
                <CheckCircle2 className="w-4 h-4" /> Flare gun ready. You&apos;re on the list.
              </div>
            )}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono-hud text-white/45 tracking-widest">
          <div>ERANGEL DROP SUPPLY CO.</div>
          <div>POCHINKI · SEASON VI · 3D INTERACTIVE SHOWCASE</div>
          <div>BUILT WITH VITE + REACT + TAILWIND + THREE.JS</div>
        </div>
      </div>
    </footer>
  );
}

export function StashDrawer({ open, onClose, stashItems, onRemoveItem, onClearStash }) {
  if (!open) return null;

  const totalBp = stashItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md h-full bg-[#120a1b] border-l border-white/15 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <div className="font-mono-hud text-[11px] text-amber-300 tracking-widest">
                AIRDROP INVENTORY
              </div>
              <h3 className="font-display text-3xl uppercase">YOUR STASH ({stashItems.length})</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-4 space-y-2.5 max-h-[62vh] overflow-y-auto pr-1">
            {stashItems.length === 0 ? (
              <div className="text-center py-16 text-white/45 text-sm font-mono-hud">
                YOUR STASH IS EMPTY. LOOT THE CRATE OR GARAGE!
              </div>
            ) : (
              stashItems.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="w-3.5 h-8 rounded-full shrink-0"
                      style={{ backgroundColor: item.color || '#ff3d7f' }}
                    />
                    <div className="min-w-0">
                      <div className="font-mono-hud text-[10px] text-amber-300">
                        {item.category} · {item.variant}
                      </div>
                      <div className="font-semibold text-sm text-white truncate">{item.name}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-mono-hud text-xs font-bold text-emerald-400">
                      BP {item.price}
                    </span>
                    <button
                      onClick={() => onRemoveItem(idx)}
                      className="text-white/40 hover:text-rose-400 cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="font-mono-hud text-xs text-white/60">TOTAL STASH VALUE</span>
            <span className="font-display text-3xl text-emerald-400">BP {totalBp}</span>
          </div>
          {stashItems.length > 0 && (
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={onClearStash}
                className="py-3 rounded-xl bg-white/10 hover:bg-white/15 font-mono-hud text-xs font-bold tracking-wider text-white/80 cursor-pointer"
              >
                CLEAR STASH
              </button>
              <button
                onClick={onClose}
                className="btn-sunset py-3 rounded-xl font-mono-hud text-xs font-bold tracking-widest text-white cursor-pointer"
              >
                READY TO DROP
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
