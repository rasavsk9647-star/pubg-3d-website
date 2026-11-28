import React, { useState } from 'react';
import { Check, Plus, Shield, Sparkles } from 'lucide-react';
import { CATEGORIES, ITEMS } from '../data/pubgItems';
import { WebGLStudioStage } from './three/WebGLStoryStage';
import {
  SculptedHelmet,
  SculptedPants,
  SculptedRifle,
} from './three/SculptedPubg3D';

function renderSculptedNode(category, item, swatch) {
  if (category === 'helmet') {
    return <SculptedHelmet variant={item.modelType} swatch={swatch} />;
  }
  if (category === 'gun') {
    return <SculptedRifle variant={item.modelType} swatch={swatch} />;
  }
  if (category === 'pants') {
    return <SculptedPants swatch={swatch} />;
  }
  return null;
}

export default function ArmoryCrateSection({
  equipped,
  onEquipItem,
  onAddToStash,
}) {
  const [activeCategory, setActiveCategory] = useState('dress');
  const [selectedIndexByCat, setSelectedIndexByCat] = useState({
    dress: 0,
    pants: 0,
    helmet: 0,
    gun: 0,
    shoes: 0,
  });
  const [swatchIndexByItem, setSwatchIndexByItem] = useState({});
  const [stashedToast, setStashedToast] = useState(null);

  const itemsInCat = ITEMS[activeCategory];
  const selectedIdx = selectedIndexByCat[activeCategory] ?? 0;
  const activeItem = itemsInCat[selectedIdx];
  const swatchIdx = swatchIndexByItem[activeItem.id] ?? 0;
  const activeSwatch = activeItem.swatches[swatchIdx];

  const isEquipped =
    equipped[activeCategory]?.item.id === activeItem.id &&
    equipped[activeCategory]?.swatch.name === activeSwatch.name;

  const handleStash = () => {
    onAddToStash({
      id: `${activeItem.id}-${activeSwatch.name}`,
      name: activeItem.name,
      category: activeCategory.toUpperCase(),
      variant: activeSwatch.name,
      price: activeItem.price,
      color: activeSwatch.accent,
    });
    setStashedToast({ price: activeItem.price });
    setTimeout(() => setStashedToast(null), 1700);
  };

  return (
    <section
      id="crate"
      className="relative py-24 scroll-mt-16 bg-gradient-to-b from-[#0b0710] via-[#150c18] to-[#0b0710]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Story Chapter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 story-reveal">
          <div>
            <div className="font-mono-hud text-xs tracking-[0.25em] text-amber-300 uppercase mb-2">
              CHAPTER 02 // THE ARMORY STUDIO
            </div>
            <h2 className="font-display text-4xl sm:text-6xl uppercase tracking-tight">
              GEAR UP IN <span className="text-sunset-gradient">3D STUDIO</span>
            </h2>
            <p className="text-white/65 text-sm sm:text-base mt-2 max-w-xl">
              Select <strong className="text-white">Dress, Pants, Helmet, Gun, or Shoes</strong>.
              Move your cursor or drag to inspect every piece in the WebGL studio, then equip it to
              your operator.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const active = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full font-mono-hud text-xs font-bold tracking-wider transition-all cursor-pointer border ${active
                      ? 'btn-sunset text-white border-transparent shadow-lg shadow-rose-500/25'
                      : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* WebGL Studio Stage + Inspector */}
        <div className="grid lg:grid-cols-12 gap-6 items-stretch story-reveal">
          <div className="lg:col-span-7 relative min-h-[430px] sm:min-h-[510px] rounded-3xl border border-white/10 bg-[#0a080d] overflow-hidden">
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-mono-hud text-[11px] font-bold tracking-widest">
                {activeItem.tier}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 font-mono-hud text-[11px] tracking-widest">
                {activeItem.statLabel}
              </span>
            </div>

            <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono-hud text-[10px] tracking-widest text-white/70">
              {activeItem.imageUrl ? 'STUDIO RENDER · MOVE TO TILT' : 'WEBGL 3D · DRAG TO ORBIT'}
            </div>

            <WebGLStudioStage
              imageUrl={activeItem.imageUrl}
              tintColor={activeSwatch.tint || '#ffffff'}
              glowColor={activeSwatch.accent}
              sculptedNode={renderSculptedNode(activeCategory, activeItem, activeSwatch)}
              cameraPosition={activeCategory === 'gun' ? [0.2, 0.25, 3.2] : [0, 0.25, 3.8]}
            />

            {stashedToast && (
              <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px]">
                <div className="font-script text-5xl sm:text-6xl text-white drop-shadow-[0_4px_24px_rgba(245,158,11,0.8)]">
                  Stashed
                </div>
                <div className="font-display text-3xl text-emerald-400 mt-1">
                  +BP {stashedToast.price}
                </div>
                <div className="font-mono-hud text-[11px] tracking-[0.25em] text-amber-300 mt-2 uppercase">
                  ADDED TO AIRDROP INVENTORY
                </div>
              </div>
            )}
          </div>

          {/* Right Selection Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md">
            <div className="space-y-6">
              <div>
                <div className="font-mono-hud text-[11px] tracking-[0.2em] text-white/50 uppercase mb-3">
                  SELECT {activeCategory.toUpperCase()}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {itemsInCat.map((item, idx) => {
                    const isSel = idx === selectedIdx;
                    const isItemEquipped = equipped[activeCategory]?.item.id === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() =>
                          setSelectedIndexByCat((prev) => ({ ...prev, [activeCategory]: idx }))
                        }
                        className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer ${isSel
                            ? 'bg-gradient-to-br from-amber-500/20 to-rose-500/15 border-amber-400/60 shadow-md'
                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                          }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono-hud text-[10px] text-amber-300">
                            {item.tier}
                          </span>
                          {isItemEquipped && (
                            <span className="text-[10px] font-mono-hud text-emerald-400 flex items-center gap-0.5">
                              <Check className="w-3 h-3" /> ON
                            </span>
                          )}
                        </div>
                        <div className="font-semibold text-xs sm:text-sm text-white mt-1 truncate">
                          {item.name}
                        </div>
                        <div className="font-mono-hud text-xs text-white/60 mt-0.5">
                          BP {item.price}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-white/10 pt-5">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-display text-2xl sm:text-3xl tracking-wide uppercase">
                    {activeItem.name}
                  </h3>
                  <span className="font-mono-hud text-lg font-bold text-emerald-400 shrink-0">
                    BP {activeItem.price}
                  </span>
                </div>
                <p className="text-sm text-white/70 mt-2 leading-relaxed">
                  {activeItem.description}
                </p>

                <div className="mt-5">
                  <div className="font-mono-hud text-[11px] tracking-[0.2em] text-white/50 uppercase mb-2.5">
                    FINISH — <span className="text-white">{activeSwatch.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {activeItem.swatches.map((sw, idx) => {
                      const active = idx === swatchIdx;
                      return (
                        <button
                          key={sw.name}
                          onClick={() =>
                            setSwatchIndexByItem((prev) => ({ ...prev, [activeItem.id]: idx }))
                          }
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono-hud transition-all cursor-pointer ${active
                              ? 'border-white bg-white/15 text-white'
                              : 'border-white/15 bg-white/5 text-white/65 hover:text-white'
                            }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/30"
                            style={{
                              background: `linear-gradient(135deg, ${sw.primary} 45%, ${sw.accent} 100%)`,
                            }}
                          />
                          {sw.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 mt-6 border-t border-white/10">
              <button
                onClick={() => onEquipItem(activeCategory, activeItem, activeSwatch)}
                className={`flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-mono-hud text-xs font-bold tracking-wider border transition-all cursor-pointer ${isEquipped
                    ? 'bg-emerald-500/20 border-emerald-400/60 text-emerald-300'
                    : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
                  }`}
              >
                {isEquipped ? (
                  <>
                    <Check className="w-4 h-4" /> EQUIPPED ON OPERATOR
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 text-amber-300" /> EQUIP TO LOADOUT
                  </>
                )}
              </button>

              <button
                onClick={handleStash}
                className="btn-sunset flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-mono-hud text-xs font-bold tracking-wider text-white shadow-lg shadow-rose-500/25 transition-transform active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> ADD TO STASH
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
