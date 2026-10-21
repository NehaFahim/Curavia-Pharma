// Shared content + image catalogue. Every photo below is a different Pexels image (free licence).
// Sources / credits: see ASSET_SOURCES.md
export const px = (id: number, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const IMG = {
  // hero slides
  heroLine: px(37650270, 1920),
  heroLab: px(9574341, 1920),
  heroPack: px(37466061, 1920),
  // sections
  about: px(8442369, 1200),
  facility: px(33514501, 1400),
  facilityMini: px(9574352, 800),
  mega: px(8442027, 800),
  research: px(11703173, 1920),
  // process
  discover: px(8533038, 1200),
  develop: px(8442110, 1200),
  validate: px(9574503, 1200),
  deliver: px(9694390, 1200),
} as const;

export type Product = { slug: string; name: string; blurb: string; category: string; image: string; tag: string; about: string; points: string[] };

export const productList: Product[] = [
  { slug: 'pharmaceutical-tablets', name: 'Pharmaceutical Tablets', blurb: 'Solid oral formulations', category: 'Tablets', image: px(9742768, 900), tag: 'Featured',
    about: 'Immediate- and modified-release tablet formats presented with a focus on uniformity, stability and clear documentation.',
    points: ['Film-coated & uncoated formats', 'Blister and bottle packaging', 'Batch-level traceability', 'Stability-study ready'] },
  { slug: 'hard-gel-capsules', name: 'Hard Gel Capsules', blurb: 'Capsule formulation category', category: 'Capsules', image: px(19497086, 900), tag: 'Featured',
    about: 'Hard gel capsule formulations for powders, granules and pellets, built around consistent fill weight and dependable release.',
    points: ['Powder, granule & pellet fills', 'Controlled fill-weight checks', 'Moisture-aware packaging', 'Clear label and leaflet support'] },
  { slug: 'oral-solutions', name: 'Oral Solutions', blurb: 'Liquid dosage formats', category: 'Oral solutions', image: px(6914585, 900), tag: 'Concept range',
    about: 'Liquid dosage formats designed for accurate dosing, palatability and shelf-life stability.',
    points: ['Syrups, drops & suspensions', 'Dosing devices included', 'Preservative & stability review', 'Amber glass / PET options'] },
  { slug: 'injectable-range', name: 'Injectable Range', blurb: 'Sterile formulation category', category: 'Injectables', image: px(39461627, 900), tag: 'Concept range',
    about: 'Sterile vial and ampoule formats prepared under aseptic-process thinking and rigorous inspection.',
    points: ['Vials & ampoules', 'Aseptic fill concepts', '100% visual inspection', 'Cold-chain aware logistics'] },
  { slug: 'nutraceuticals', name: 'Nutraceuticals', blurb: 'Nutrition-focused formulations', category: 'Nutraceuticals', image: px(15897781, 900), tag: 'New',
    about: 'Nutrition-focused formulations that combine science-led ingredient selection with clean, compliant labelling.',
    points: ['Vitamins & minerals', 'Botanical blends', 'Clean-label approach', 'Private-label friendly'] },
  { slug: 'healthcare-supplements', name: 'Healthcare Supplements', blurb: 'Everyday wellness category', category: 'Supplements', image: px(7230413, 900), tag: 'Concept range',
    about: 'Everyday wellness supplements built for consistency, clear dosing and straightforward quality documentation.',
    points: ['Daily-use formats', 'Multiple pack sizes', 'Consistent potency targets', 'Documentation-first process'] },
  { slug: 'specialty-formulations', name: 'Specialty Formulations', blurb: 'Specialized development formats', category: 'Specialty', image: px(8539078, 900), tag: 'New',
    about: 'Custom development pathways for specialised dosage forms, from first lab batch to scaled production.',
    points: ['Custom development', 'Pilot-batch support', 'Analytical method transfer', 'Scale-up planning'] },
  { slug: 'pediatric-solutions', name: 'Pediatric Solutions', blurb: 'Pediatric dosage category', category: 'Pediatric', image: px(8460035, 900), tag: 'Concept range',
    about: 'Child-friendly dosage forms with age-appropriate dosing, taste masking and safe, clear packaging.',
    points: ['Taste-masked formats', 'Weight-based dosing aids', 'Child-resistant packaging', 'Clear caregiver guidance'] },
];

// [thumb, label, full-size] — 12 unique photos for the gallery
const g = (id: number, label: string): [string, string, string] => [px(id, 800), label, px(id, 1800)];
export const gallery: [string, string, string][] = [
  g(9893834, 'Sterile vial handling'),
  g(28146795, 'Analytical instruments'),
  g(15831822, 'Precision experiments'),
  g(9259962, 'Sample preparation'),
  g(12672390, 'Blister packaging'),
  g(8539881, 'Formulation review'),
  g(33060866, 'Facility exterior'),
  g(8657301, 'Dispensing & stock'),
  g(3735708, 'Laboratory precision'),
  g(8442098, 'Clean-lab operations'),
  g(7230228, 'Stability studies'),
  g(4021813, 'Quality inspection'),
];
