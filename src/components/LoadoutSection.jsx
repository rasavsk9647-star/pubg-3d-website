import React, { useState } from 'react';
import { Check, Layers, Plus, Sparkles } from 'lucide-react';
import {
  CATEGORIES,
  ITEMS,
  OPERATOR_HOTSPOTS,
  SQUAD_PRESETS,
  findItemById,
} from '../data/pubgItems';
import { WebGLStudioStage } from './three/WebGLStoryStage';

export default function LoadoutSection({
  equipped,
  onEquipItem,
  onApplyPreset,
  onAddToStash,
}) {
  const [focusedSlot, setFocusedSlot] = useState('dress');
  const [lookOverlay, setLookOverlay] = useState(null);

  const slots = CATEGORIES.map((c) => c.id);
  const totalLoadoutPrice = slots.reduce(
    (sum, slot) => sum + (equipped[slot]?.item.price ?? 0),
    0
  );

  const handleEquipFullLoadout = () => {
    slots.forEach((slot) => {
      const entry = equipped[slot];
      if (entry) {
        onAddToStash({
          id: `${entry.item.id}-${entry.swatch.name}`,
          name: entry.item.name,
          category: slot.toUpperCase(),
          variant: entry.swatch.name,
          price: entry.item.price,
          color: entry.swatch.accent,
        });
      }
    });
    setLookOverlay(totalLoadoutPrice);
    setTimeout(() => setLookOverlay(null), 2000);
  };

  const focusedCategoryItems = ITEMS[focusedSlot];
  const focusedEquipped = equipped[focusedSlot];

  return (
    <section
      id="loadout"
      className="relative py-24 scroll-mt-16 bg-gradient-to-b from-[#0b0710] via-[#190d1e] to-[#0b0710]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 story-reveal">
          <div>
            <div className="font-mono-hud text-xs tracking-[0.25em] text-rose-400 uppercase mb-2">
              CHAPTER 03 // FULL OPERATOR LINEUP
            </div>
            <h2 className="font-display text-4xl sm:text-6xl uppercase tracking-tight">
              TRY THE <span className="text-sunset-gradient">FULL SET.</span>
            </h2>
            <p className="text-white/65 text-sm sm:text-base mt-2 max-w-xl">
              Tap any numbered <strong className="text-white">Hotspot Pin (1–5)</strong> on the
              studio operator or pick a Squad Preset to inspect and swap{' '}
              <strong className="text-white">Helmet, Dress, Gun, Pants &amp; Shoes</strong>.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {SQUAD_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  const resolved = {};
                  Object.entries(preset.loadout).forEach(([slot, itemId]) => {
                    const item = findItemById(itemId);
                    if (item) {
                      resolved[slot] = { item, swatch: item.swatches[0] };
                    }
                  });
                  onApplyPreset(resolved);
                }}
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-400/50 text-left transition-all cursor-pointer"
              >
                <div className="font-mono-hud text-[10px] text-amber-300">
                  PRESET {preset.code}
                </div>
                <div className="font-mono-hud text-xs font-bold text-white">{preset.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Loadout Grid */}
        <div className="grid lg:grid-cols-12 gap-6 items-stretch story-reveal">
          {/* Left: WebGL Studio Operator + Interactive Hotspot Pins */}
          <div className="lg:col-span-7 relative min-h-[520px] sm:min-h-[600px] rounded-3xl border border-white/10 bg-[#0a080d] overflow-hidden">
            <WebGLStudioStage
              imageUrl="/assets/operator-outfit.jpg"
              tintColor={equipped.dress.swatch.tint || '#ffffff'}
              glowColor={equipped[focusedSlot]?.swatch.accent || '#f59e0b'}
              cameraPosition={[0, 0, 4.35]}
            />

            {/* Interactive Hotspot Pins */}
            {OPERATOR_HOTSPOTS.map((pin) => {
              const active = focusedSlot === pin.slot;
              const eq = equipped[pin.slot];
              return (
                <div
                  key={pin.slot}
                  style={{ top: pin.top, left: pin.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    onClick={() => setFocusedSlot(pin.slot)}
                    className={`w-8 h-8 rounded-full font-mono-hud text-xs font-bold flex items-center justify-center border-2 transition-all cursor-pointer shadow-lg ${active
                        ? 'bg-rose-500 text-white border-white scale-115 shadow-rose-500/60'
                        : 'bg-black/80 text-amber-300 border-amber-400/70 hover:scale-110'
                      }`}
                    title={`${pin.label}: ${eq?.item.name}`}
                  >
                    {pin.num}
                  </button>

                  {active && (
                    <div className="hidden sm:block absolute left-10 top-1/2 -translate-y-1/2 w-56 rounded-xl bg-black/90 border border-white/20 p-3 backdrop-blur-md shadow-2xl">
                      <div className="font-mono-hud text-[10px] text-amber-300 tracking-widest">
                        SLOT {pin.num} · {pin.label}
                      </div>
                      <div className="font-semibold text-xs text-white mt-0.5 truncate">
                        {eq?.item.name}
                      </div>
                      <div className="font-mono-hud text-[11px] text-emerald-400 mt-1">
                        BP {eq?.item.price} · {eq?.swatch.name}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {lookOverlay !== null && (
              <div className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/65 backdrop-blur-[2px]">
                <div className="font-script text-5xl sm:text-6xl text-white drop-shadow-[0_4px_24px_rgba(245,158,11,0.9)]">
                  Loadout Secured
                </div>
                <div className="font-display text-3xl text-emerald-400 mt-1">
                  +BP {lookOverlay}
                </div>
                <div className="font-mono-hud text-[11px] tracking-[0.25em] text-amber-300 mt-2 uppercase">
                  ALL 5 SLOTS STASHED · READY FOR ESCAPE
                </div>
              </div>
            )}
          </div>

          {/* Right: IN THIS LOADOUT Sidebar */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono-hud text-xs tracking-[0.2em] text-amber-300 uppercase flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" /> IN THIS LOADOUT
                </span>
                <span className="font-mono-hud text-xs text-white/50">5 / 5 SLOTS</span>
              </div>

              <div className="space-y-2.5">
                {CATEGORIES.map((cat) => {
                  const entry = equipped[cat.id];
                  const isFocused = focusedSlot === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setFocusedSlot(cat.id)}
                      className={`w-full flex items-center justify-between gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${isFocused
                          ? 'bg-rose-500/15 border-rose-400/60'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                        }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className="w-9 h-9 rounded-lg border border-white/20 shrink-0"
                          style={{
                            background: `linear-gradient(135deg, ${entry.swatch.primary}, ${entry.swatch.accent})`,
                          }}
                        />
                        <div className="min-w-0">
                          <div className="font-mono-hud text-[10px] tracking-widest text-amber-300">
                            {cat.short} · {entry.swatch.name}
                          </div>
                          <div className="font-semibold text-sm text-white truncate">
                            {entry.item.name}
                          </div>
                        </div>
                      </div>
                      <div className="font-mono-hud text-xs font-bold text-emerald-400 shrink-0">
                        BP {entry.item.price}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 pt-4 border-t border-white/10">
                <div className="font-mono-hud text-[11px] tracking-[0.2em] text-white/55 uppercase mb-2.5">
                  SWAP {focusedSlot.toUpperCase()}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {focusedCategoryItems.map((item) => {
                    const active = focusedEquipped.item.id === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => onEquipItem(focusedSlot, item, item.swatches[0])}
                        className={`px-3 py-2 rounded-lg text-xs font-medium border text-left transition-all cursor-pointer flex items-center justify-between gap-1 ${active
                            ? 'bg-white/15 border-white/50 text-white'
                            : 'bg-white/5 border-white/10 text-white/70 hover:text-white'
                          }`}
                      >
                        <span className="truncate">{item.name}</span>
                        {active && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/10">
              <div className="flex items-baseline justify-between mb-3">
                <span className="font-mono-hud text-xs tracking-widest text-white/60">
                  COMPLETE LOADOUT
                </span>
                <span className="font-display text-3xl text-white">
                  BP {totalLoadoutPrice}
                </span>
              </div>
              <button
                onClick={handleEquipFullLoadout}
                className="btn-sunset w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-mono-hud text-xs font-bold tracking-widest text-white shadow-lg shadow-rose-500/30 transition-transform active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> ADD FULL LOADOUT TO STASH
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
