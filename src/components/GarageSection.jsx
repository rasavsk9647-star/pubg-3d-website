import React, { useState } from 'react';
import { Car, Gauge, Plus, Shield, Users } from 'lucide-react';
import { VEHICLES } from '../data/pubgItems';
import { WebGLStudioStage } from './three/WebGLStoryStage';
import { SculptedVehicle } from './three/SculptedPubg3D';

export default function GarageSection({ onAddToStash }) {
  const [selectedCarIdx, setSelectedCarIdx] = useState(0);
  const [swatchByCar, setSwatchByCar] = useState({});
  const [stashedCar, setStashedCar] = useState(null);

  const car = VEHICLES[selectedCarIdx];
  const swatchIdx = swatchByCar[car.id] ?? 0;
  const activeSwatch = car.swatches[swatchIdx];

  const handleStashCar = () => {
    onAddToStash({
      id: `${car.id}-${activeSwatch.name}`,
      name: car.name,
      category: 'VEHICLE',
      variant: activeSwatch.name,
      price: car.price,
      color: activeSwatch.accent,
    });
    setStashedCar(car.price);
    setTimeout(() => setStashedCar(null), 1700);
  };

  return (
    <section
      id="garage"
      className="relative py-24 scroll-mt-16 bg-gradient-to-b from-[#0b0710] via-[#15121d] to-[#0b0710]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 story-reveal">
          <div>
            <div className="font-mono-hud text-xs tracking-[0.25em] text-cyan-300 uppercase mb-2">
              CHAPTER 04 // FINAL CAR ESCAPE
            </div>
            <h2 className="font-display text-4xl sm:text-6xl uppercase tracking-tight">
              GETAWAY <span className="text-sunset-gradient">GARAGE</span>
            </h2>
            <p className="text-white/65 text-sm sm:text-base mt-2 max-w-xl">
              Last step before the final zone closes. Choose your{' '}
              <strong className="text-white">Coupe RB</strong> or{' '}
              <strong className="text-white">UAZ Armored 4x4</strong>, pick a wrap, and extract.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {VEHICLES.map((v, idx) => {
              const active = idx === selectedCarIdx;
              return (
                <button
                  key={v.id}
                  onClick={() => setSelectedCarIdx(idx)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-mono-hud text-xs font-bold tracking-wider border transition-all cursor-pointer ${active
                      ? 'bg-cyan-500/25 border-cyan-300/70 text-cyan-200 shadow-lg shadow-cyan-500/20'
                      : 'bg-white/5 border-white/10 text-white/70 hover:text-white'
                    }`}
                >
                  <Car className="w-3.5 h-3.5" />
                  {v.name.split(' // ')[0]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-stretch story-reveal">
          <div className="lg:col-span-8 relative min-h-[420px] sm:min-h-[500px] rounded-3xl border border-white/10 bg-[#0a080d] overflow-hidden">
            <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 font-mono-hud text-[11px] tracking-widest">
              {car.classLabel}
            </div>

            <WebGLStudioStage
              imageUrl={car.imageUrl}
              tintColor={activeSwatch.tint || '#ffffff'}
              glowColor={activeSwatch.accent}
              sculptedNode={<SculptedVehicle swatch={activeSwatch} />}
              cameraPosition={[3.4, 1.3, 4.0]}
            />

            {stashedCar !== null && (
              <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px]">
                <div className="font-script text-5xl sm:text-6xl text-white drop-shadow-[0_4px_24px_rgba(56,189,248,0.85)]">
                  Keys Secured
                </div>
                <div className="font-display text-3xl text-emerald-400 mt-1">
                  +BP {stashedCar}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md">
            <div className="space-y-6">
              <div>
                <div className="font-mono-hud text-xs text-cyan-300 tracking-widest">
                  EXTRACTION VEHICLE
                </div>
                <h3 className="font-display text-3xl sm:text-4xl uppercase mt-1">
                  {car.name}
                </h3>
                <p className="text-sm text-white/70 mt-2 leading-relaxed">
                  {car.description}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                  <Gauge className="w-4 h-4 text-amber-300 mb-1" />
                  <div className="font-mono-hud text-[10px] text-white/50">SPEED</div>
                  <div className="font-mono-hud text-xs font-bold text-white mt-0.5">
                    {car.topSpeed}
                  </div>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                  <Shield className="w-4 h-4 text-rose-400 mb-1" />
                  <div className="font-mono-hud text-[10px] text-white/50">ARMOR</div>
                  <div className="font-mono-hud text-xs font-bold text-white mt-0.5">
                    {car.armor}
                  </div>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                  <Users className="w-4 h-4 text-cyan-300 mb-1" />
                  <div className="font-mono-hud text-[10px] text-white/50">CREW</div>
                  <div className="font-mono-hud text-xs font-bold text-white mt-0.5">
                    {car.seats}
                  </div>
                </div>
              </div>

              <div>
                <div className="font-mono-hud text-[11px] tracking-[0.2em] text-white/50 uppercase mb-2.5">
                  PAINT WRAP — <span className="text-white">{activeSwatch.name}</span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {car.swatches.map((sw, idx) => {
                    const active = idx === swatchIdx;
                    return (
                      <button
                        key={sw.name}
                        onClick={() =>
                          setSwatchByCar((prev) => ({ ...prev, [car.id]: idx }))
                        }
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border text-xs font-mono-hud transition-all cursor-pointer ${active
                            ? 'border-cyan-300 bg-cyan-500/15 text-white'
                            : 'border-white/10 bg-white/5 text-white/70 hover:text-white'
                          }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/30 shrink-0"
                          style={{
                            background: `linear-gradient(135deg, ${sw.primary}, ${sw.accent})`,
                          }}
                        />
                        <span>{sw.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10">
              <div className="flex items-baseline justify-between mb-3">
                <span className="font-mono-hud text-xs text-white/55">VEHICLE COST</span>
                <span className="font-display text-3xl text-emerald-400">BP {car.price}</span>
              </div>
              <button
                onClick={handleStashCar}
                className="btn-sunset w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-mono-hud text-xs font-bold tracking-widest text-white shadow-lg shadow-rose-500/25 transition-transform active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> STASH GETAWAY RIDE
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
