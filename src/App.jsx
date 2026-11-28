import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ITEMS } from './data/pubgItems';
import NavbarHUD from './components/NavbarHUD';
import HeroSection from './components/HeroSection';
import ArmoryCrateSection from './components/ArmoryCrateSection';
import LoadoutSection from './components/LoadoutSection';
import GarageSection from './components/GarageSection';
import { BriefAndFooter, StashDrawer } from './components/BriefAndStash';
import { StoryWebGLBackdrop } from './components/three/WebGLStoryStage';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [equipped, setEquipped] = useState({
    dress: { item: ITEMS.dress[0], swatch: ITEMS.dress[0].swatches[0] },
    pants: { item: ITEMS.pants[0], swatch: ITEMS.pants[0].swatches[0] },
    helmet: { item: ITEMS.helmet[0], swatch: ITEMS.helmet[0].swatches[0] },
    gun: { item: ITEMS.gun[0], swatch: ITEMS.gun[0].swatches[0] },
    shoes: { item: ITEMS.shoes[0], swatch: ITEMS.shoes[0].swatches[0] },
  });

  const [stashItems, setStashItems] = useState([]);
  const [stashOpen, setStashOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
    });

    lenis.on('scroll', ({ progress }) => {
      setScrollProgress(progress || 0);
      ScrollTrigger.update();
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.story-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 84%',
              once: true,
            },
          }
        );
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  const handleEquipItem = (category, item, swatch) => {
    setEquipped((prev) => ({
      ...prev,
      [category]: { item, swatch },
    }));
  };

  const handleApplyPreset = (presetLoadout) => {
    setEquipped((prev) => ({
      ...prev,
      ...presetLoadout,
    }));
  };

  const handleAddToStash = (entry) => {
    setStashItems((prev) => [...prev, entry]);
  };

  const handleRemoveStashItem = (idx) => {
    setStashItems((prev) => prev.filter((_, i) => i !== idx));
  };

  const bpTotal = stashItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="relative min-h-screen bg-[#0b0710] text-white">
      <StoryWebGLBackdrop scrollProgress={scrollProgress} />

      <div className="relative z-10">
        <NavbarHUD
          bpTotal={bpTotal}
          stashCount={stashItems.length}
          onOpenStash={() => setStashOpen(true)}
        />

        <main>
          <HeroSection />

          <ArmoryCrateSection
            equipped={equipped}
            onEquipItem={handleEquipItem}
            onAddToStash={handleAddToStash}
          />

          <LoadoutSection
            equipped={equipped}
            onEquipItem={handleEquipItem}
            onApplyPreset={handleApplyPreset}
            onAddToStash={handleAddToStash}
          />

          <GarageSection onAddToStash={handleAddToStash} />
        </main>

        <BriefAndFooter />
      </div>

      <StashDrawer
        open={stashOpen}
        onClose={() => setStashOpen(false)}
        stashItems={stashItems}
        onRemoveItem={handleRemoveStashItem}
        onClearStash={() => setStashItems([])}
      />
    </div>
  );
}
