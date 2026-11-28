export const CATEGORIES = [
  { id: 'dress', label: '01 DRESS', short: 'DRESS', subtitle: 'Shirts, Trench & Ghillie' },
  { id: 'pants', label: '02 PANTS', short: 'PANTS', subtitle: 'Cargo & Tactical' },
  { id: 'helmet', label: '03 HELMET', short: 'HELMET', subtitle: 'Lv.2 & Lv.3 Headgear' },
  { id: 'gun', label: '04 GUN', short: 'GUN', subtitle: 'M416 & AWM Rifles' },
  { id: 'shoes', label: '05 SHOES', short: 'SHOES', subtitle: 'Combat Boots & Runners' },
];

export const ITEMS = {
  dress: [
    {
      id: 'dress-shirt',
      category: 'dress',
      modelType: 'shirt',
      imageUrl: '/assets/dress-shirt.jpg',
      name: 'PLAYERUNKNOWN SHIRT & HOLSTER',
      tier: 'MYTHIC',
      price: 260,
      statLabel: 'ICONIC SET · +35 ARMOR',
      description:
        'Crisp rolled-sleeve dress shirt, black tie, and weathered leather shoulder pistol holster — the signature Erangel survivor look.',
      swatches: [
        { name: 'CLASSIC IVORY', tint: '#ffffff', primary: '#e5e7eb', secondary: '#27272a', accent: '#d97706' },
        { name: 'SUNSET AMBER', tint: '#ffe0bd', primary: '#fde68a', secondary: '#451a03', accent: '#f59e0b' },
        { name: 'NIGHT SHADOW', tint: '#b6c2d9', primary: '#94a3b8', secondary: '#0f172a', accent: '#38bdf8' },
      ],
    },
    {
      id: 'dress-trench',
      category: 'dress',
      modelType: 'trench',
      imageUrl: '/assets/dress-shirt.jpg',
      name: 'ERANGEL TRENCH EDITION',
      tier: 'LEGENDARY',
      price: 290,
      statLabel: 'ARMOR +45',
      description:
        'Storm-flap tactical top layered with dual chest rigging and reinforced leather straps for Pochinki hot drops.',
      swatches: [
        { name: 'ASHES', tint: '#d4d4d8', primary: '#3f3f46', secondary: '#18181b', accent: '#ef4444' },
        { name: 'MIRAMAR DUST', tint: '#f3d5b5', primary: '#92400e', secondary: '#451a03', accent: '#fbbf24' },
      ],
    },
  ],
  pants: [
    {
      id: 'pants-cargo',
      category: 'pants',
      modelType: 'cargo',
      imageUrl: null,
      name: 'TACTICAL CARGO PANTS',
      tier: 'EPIC',
      price: 140,
      statLabel: 'CAPACITY +35',
      description:
        'Deep-pocket navy-charcoal ripstop combat trousers with double leather belt buckles and thigh holster strap.',
      swatches: [
        { name: 'NAVY CHARCOAL', primary: '#1e293b', secondary: '#3b2618', accent: '#d97706' },
        { name: 'ERANGEL OLIVE', primary: '#37422c', secondary: '#1f2419', accent: '#f59e0b' },
        { name: 'DESERT KHAKI', primary: '#877254', secondary: '#4a3c28', accent: '#fde68a' },
      ],
    },
    {
      id: 'pants-biker',
      category: 'pants',
      modelType: 'biker',
      imageUrl: null,
      name: 'ARMORED BIKER PANTS',
      tier: 'LEGENDARY',
      price: 175,
      statLabel: 'DURABILITY +45',
      description:
        'Reinforced knee-shell tactical trousers built for high-speed Miramar ridge slides.',
      swatches: [
        { name: 'OBSIDIAN', primary: '#18181b', secondary: '#27272a', accent: '#ef4444' },
        { name: 'STEEL SLATE', primary: '#334155', secondary: '#0f172a', accent: '#38bdf8' },
      ],
    },
  ],
  helmet: [
    {
      id: 'helmet-lv3',
      category: 'helmet',
      modelType: 'lv3',
      imageUrl: null,
      name: 'SPETSNAZ LV.3 HELMET',
      tier: 'AIRDROP',
      price: 310,
      statLabel: 'HEAD ARMOR 55%',
      description:
        'Matte steel dome with hinged bulletproof face shield and narrow tactical slit. Survives a Kar98k headshot.',
      swatches: [
        { name: 'MATTE STEEL', primary: '#3f473d', secondary: '#1c211c', accent: '#f59e0b' },
        { name: '24K GOLD', primary: '#ca8a04', secondary: '#422006', accent: '#fef08a' },
        { name: 'CRIMSON FLARE', primary: '#7f1d1d', secondary: '#1c1917', accent: '#fb7185' },
      ],
    },
    {
      id: 'helmet-lv2',
      category: 'helmet',
      modelType: 'lv2',
      imageUrl: null,
      name: 'SPEC-OPS LV.2 NVG',
      tier: 'EPIC',
      price: 185,
      statLabel: 'HEAD ARMOR 40%',
      description:
        'Composite ballistic shell with dual-tube night vision goggles and side rail mounts.',
      swatches: [
        { name: 'NIGHT OPS', primary: '#1e242e', secondary: '#0f131a', accent: '#22d3ee' },
        { name: 'DESERT TAN', primary: '#8c7451', secondary: '#3d301e', accent: '#fbbf24' },
      ],
    },
  ],
  gun: [
    {
      id: 'gun-m416',
      category: 'gun',
      modelType: 'm416',
      imageUrl: null,
      name: 'M416 // GLACIER',
      tier: 'MYTHIC',
      price: 360,
      statLabel: 'DMG 41 · 5.56MM',
      description:
        'Iconic 5.56mm assault rifle kitted with holographic optic, vertical grip, and tactical suppressor.',
      swatches: [
        { name: 'GLACIER ICE', primary: '#1e3a5f', secondary: '#0f172a', accent: '#38bdf8' },
        { name: 'SUNSET CARBON', primary: '#27272a', secondary: '#18181b', accent: '#f97316' },
        { name: 'GOLD RUSH', primary: '#a16207', secondary: '#1c1917', accent: '#fef08a' },
      ],
    },
    {
      id: 'gun-awm',
      category: 'gun',
      modelType: 'awm',
      imageUrl: null,
      name: 'AWM // AIRDROP SNIPER',
      tier: 'AIRDROP',
      price: 450,
      statLabel: 'DMG 105 · .300 MAG',
      description:
        'Long-range .300 Magnum bolt-action with 8x scope and suppressor. Drops Lv.3 helmets in one shot.',
      swatches: [
        { name: 'ERANGEL OLIVE', primary: '#3f4f2f', secondary: '#1c2415', accent: '#facc15' },
        { name: 'CRIMSON DRAGON', primary: '#581c87', secondary: '#18181b', accent: '#f43f5e' },
      ],
    },
  ],
  shoes: [
    {
      id: 'shoes-boots',
      category: 'shoes',
      modelType: 'boots',
      imageUrl: '/assets/shoes-boots.jpg',
      name: 'TACTICAL DROP BOOTS',
      tier: 'EPIC',
      price: 120,
      statLabel: 'GRIP +40',
      description:
        'Weathered dark brown leather lace-up combat boots with reinforced steel toe and heavy lugged soles.',
      swatches: [
        { name: 'WEATHERED BROWN', tint: '#ffffff', primary: '#452c1e', secondary: '#1c1410', accent: '#d97706' },
        { name: 'CHARCOAL', tint: '#a1a1aa', primary: '#27272a', secondary: '#09090b', accent: '#ef4444' },
      ],
    },
  ],
};

export const VEHICLES = [
  {
    id: 'car-coupe',
    modelType: 'coupe',
    imageUrl: '/assets/car-coupe.jpg',
    name: 'COUPE RB // SUNSET',
    classLabel: '2-SEAT SPORTS GETAWAY',
    topSpeed: '150 KM/H',
    armor: '1,200 HP',
    seats: '2 SEATS',
    price: 980,
    description:
      'Glossy Sunset Crimson 2-door sports coupe built to outrun the final blue zone across Sosnovka Bridge.',
    swatches: [
      { name: 'SUNSET CRIMSON', tint: '#ffffff', primary: '#b91c1c', accent: '#f59e0b' },
      { name: 'MIDNIGHT PURPLE', tint: '#c084fc', primary: '#581c87', accent: '#ec4899' },
      { name: 'GOLD EDITION', tint: '#fde047', primary: '#ca8a04', accent: '#fef08a' },
    ],
  },
  {
    id: 'car-uaz',
    modelType: 'uaz',
    imageUrl: null,
    name: 'UAZ // ARMORED 4X4',
    classLabel: '4-SEAT SQUAD OFF-ROADER',
    topSpeed: '115 KM/H',
    armor: '1,820 HP',
    seats: '4 SEATS',
    price: 850,
    description:
      'Heavy-armored Erangel 4x4 built for full-squad rotations through open fields and compound breaches.',
    swatches: [
      { name: 'ERANGEL OLIVE', primary: '#3d4a31', accent: '#f59e0b' },
      { name: 'MIRAMAR SAND', primary: '#967c52', accent: '#fde68a' },
      { name: 'NIGHT OPS', primary: '#1f2937', accent: '#38bdf8' },
    ],
  },
];

export const SQUAD_PRESETS = [
  {
    id: 'preset-og',
    code: '01',
    name: 'ERANGEL OG',
    tagline: 'Shirt + Tie + Lv.3 + M416',
    loadout: {
      dress: 'dress-shirt',
      pants: 'pants-cargo',
      helmet: 'helmet-lv3',
      gun: 'gun-m416',
      shoes: 'shoes-boots',
    },
  },
  {
    id: 'preset-sniper',
    code: '02',
    name: 'FINAL CIRCLE',
    tagline: 'Trench + AWM + Lv.3',
    loadout: {
      dress: 'dress-trench',
      pants: 'pants-biker',
      helmet: 'helmet-lv3',
      gun: 'gun-awm',
      shoes: 'shoes-boots',
    },
  },
  {
    id: 'preset-specops',
    code: '03',
    name: 'NIGHT OPS',
    tagline: 'NVG Lv.2 + M416 Glacier',
    loadout: {
      dress: 'dress-shirt',
      pants: 'pants-biker',
      helmet: 'helmet-lv2',
      gun: 'gun-m416',
      shoes: 'shoes-boots',
    },
  },
];

export const OPERATOR_HOTSPOTS = [
  { slot: 'helmet', num: '1', label: 'HELMET', top: '10%', left: '52%' },
  { slot: 'dress', num: '2', label: 'DRESS', top: '31%', left: '48%' },
  { slot: 'gun', num: '3', label: 'GUN', top: '42%', left: '66%' },
  { slot: 'pants', num: '4', label: 'PANTS', top: '59%', left: '46%' },
  { slot: 'shoes', num: '5', label: 'SHOES', top: '86%', left: '55%' },
];

export function findItemById(id) {
  for (const cat of Object.keys(ITEMS)) {
    const found = ITEMS[cat].find((item) => item.id === id);
    if (found) return found;
  }
  return null;
}
