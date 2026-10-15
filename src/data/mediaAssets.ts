// Curated high-resolution cinematic automotive and luxury photography for WOLF MOTORS
export const HERO_MEDIA = {
  mainHero: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop", // Dramatic dark hypercar in moody cinematic lighting
  brandHeritage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop", // Dark Porsche 911 rear silhouette
  singaporeMarina: "/images/singapore-marina.jpg", // Singapore skyline at twilight (local verified)
  cockpitLuxury: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2070&auto=format&fit=crop", // Ultra-luxurious leather dashboard
  supercarNight: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop", // Ferrari / high-end sports front
  trackDominance: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=2070&auto=format&fit=crop", // Aggressive front headlight angle
  vipConcierge: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2070&auto=format&fit=crop", // Luxury private mobility
};

export const CATEGORY_MEDIA: Record<string, { image: string; tag: string; description: string }> = {
  sedan: {
    image: "/vehicles/category-sedan.jpg",
    tag: "Executive Saloons",
    description: "Architectural poise and executive refinement engineered for Singapore's premier districts.",
  },
  suv: {
    image: "/vehicles/category-suv.jpg",
    tag: "High-Calibre All-Terrain",
    description: "Commanding elevated perspective with untamed powertrain prowess and lavish comfort.",
  },
  hatchback: {
    image: "/vehicles/category-hatchback.jpg",
    tag: "Urban Predators",
    description: "Agile, razor-sharp dynamics crafted for swift navigation through vibrant cityscapes.",
  },
  coupe: {
    image: "/vehicles/category-coupe.jpg",
    tag: "Pure Sculpted Grand Tourers",
    description: "Aerodynamic fastback silhouettes engineered for visceral speed and uncompromising beauty.",
  },
  convertible: {
    image: "/vehicles/category-convertible.jpg",
    tag: "Open-Air Symphony",
    description: "Unfiltered sensory adrenaline under tropical evening skies along Marina Coastal Expressway.",
  },
  supercar: {
    image: "/vehicles/category-supercar.jpg",
    tag: "Hyper-Performance Beasts",
    description: "V8 & V12 mid-engine dominance producing spine-tingling torque and racetrack pedigree.",
  },
  electric: {
    image: "/vehicles/category-electric.jpg",
    tag: "Instant Torque Electrification",
    description: "Whisper-quiet futuristic acceleration backed by next-generation battery architecture.",
  },
  luxury_mpv: {
    image: "/vehicles/category-luxury_mpv.jpg",
    tag: "First-Class Multi-Passenger",
    description: "Presidential legroom, ambient executive lounges, and bespoke chauffeured utility.",
  },
};

// Exact verified photographic mappings for every vehicle in the fleet
export const VEHICLE_MEDIA: Record<string, { main: string; gallery: string[] }> = {
  // SEDANS
  "WOLF-001": {
    main: "/vehicles/WOLF-001.jpg", // Mercedes-Benz E-Class
    gallery: [
      "/vehicles/WOLF-001.jpg",
      HERO_MEDIA.cockpitLuxury,
      HERO_MEDIA.vipConcierge,
    ],
  },
  "WOLF-002": {
    main: "/vehicles/WOLF-002.jpg", // BMW 5 Series
    gallery: [
      "/vehicles/WOLF-002.jpg",
      HERO_MEDIA.cockpitLuxury,
      HERO_MEDIA.vipConcierge,
    ],
  },
  "WOLF-003": {
    main: "/vehicles/WOLF-003.jpg", // Audi A6
    gallery: [
      "/vehicles/WOLF-003.jpg",
      HERO_MEDIA.cockpitLuxury,
      HERO_MEDIA.trackDominance,
    ],
  },
  "WOLF-004": {
    main: "/vehicles/WOLF-004.jpg", // Mercedes-Benz S-Class
    gallery: [
      "/vehicles/WOLF-004.jpg",
      HERO_MEDIA.cockpitLuxury,
      HERO_MEDIA.vipConcierge,
    ],
  },

  // SUVS
  "WOLF-005": {
    main: "/vehicles/WOLF-005.jpg", // BMW X5
    gallery: [
      "/vehicles/WOLF-005.jpg",
      HERO_MEDIA.cockpitLuxury,
      HERO_MEDIA.vipConcierge,
    ],
  },
  "WOLF-006": {
    main: "/vehicles/WOLF-006.jpg", // Porsche Cayenne
    gallery: [
      "/vehicles/WOLF-006.jpg",
      HERO_MEDIA.cockpitLuxury,
      HERO_MEDIA.trackDominance,
    ],
  },
  "WOLF-007": {
    main: "/vehicles/WOLF-007.jpg", // Range Rover Sport
    gallery: [
      "/vehicles/WOLF-007.jpg",
      HERO_MEDIA.cockpitLuxury,
      HERO_MEDIA.vipConcierge,
    ],
  },
  "WOLF-008": {
    main: "/vehicles/WOLF-008.jpg", // Volvo XC90
    gallery: [
      "/vehicles/WOLF-008.jpg",
      HERO_MEDIA.cockpitLuxury,
      HERO_MEDIA.vipConcierge,
    ],
  },

  // HATCHBACKS
  "WOLF-009": {
    main: "/vehicles/WOLF-009.jpg", // Volkswagen Golf
    gallery: [
      "/vehicles/WOLF-009.jpg",
      HERO_MEDIA.cockpitLuxury,
      HERO_MEDIA.trackDominance,
    ],
  },
  "WOLF-010": {
    main: "/vehicles/WOLF-010.jpg", // Mini Cooper S
    gallery: [
      "/vehicles/WOLF-010.jpg",
      HERO_MEDIA.cockpitLuxury,
      HERO_MEDIA.trackDominance,
    ],
  },
  "WOLF-011": {
    main: "/vehicles/WOLF-011.jpg", // Audi RS 3
    gallery: [
      "/vehicles/WOLF-011.jpg",
      HERO_MEDIA.cockpitLuxury,
      HERO_MEDIA.trackDominance,
    ],
  },

  // COUPES
  "WOLF-012": {
    main: "/vehicles/WOLF-012.jpg", // BMW M2
    gallery: [
      "/vehicles/WOLF-012.jpg",
      HERO_MEDIA.cockpitLuxury,
      HERO_MEDIA.trackDominance,
    ],
  },
  "WOLF-013": {
    main: "/vehicles/WOLF-013.jpg", // Porsche 911 Carrera
    gallery: [
      "/vehicles/WOLF-013.jpg",
      HERO_MEDIA.brandHeritage,
      HERO_MEDIA.cockpitLuxury,
    ],
  },
  "WOLF-014": {
    main: "/vehicles/WOLF-014.jpg", // Mercedes-Benz CLE Coupe
    gallery: [
      "/vehicles/WOLF-014.jpg",
      HERO_MEDIA.cockpitLuxury,
      HERO_MEDIA.trackDominance,
    ],
  },

  // CONVERTIBLES
  "WOLF-015": {
    main: "/vehicles/WOLF-015.jpg", // BMW 4 Series Convertible
    gallery: [
      "/vehicles/WOLF-015.jpg",
      HERO_MEDIA.cockpitLuxury,
      HERO_MEDIA.singaporeMarina,
    ],
  },
  "WOLF-016": {
    main: "/vehicles/WOLF-016.jpg", // Porsche 911 Carrera Cabriolet
    gallery: [
      "/vehicles/WOLF-016.jpg",
      HERO_MEDIA.brandHeritage,
      HERO_MEDIA.cockpitLuxury,
    ],
  },
  "WOLF-017": {
    main: "/vehicles/WOLF-017.jpg", // Ferrari Roma Spider
    gallery: [
      "/vehicles/WOLF-017.jpg",
      HERO_MEDIA.supercarNight,
      HERO_MEDIA.cockpitLuxury,
    ],
  },

  // SUPERCAR
  "WOLF-018": {
    main: "/vehicles/WOLF-018.jpg", // Lamborghini Huracán EVO
    gallery: [
      "/vehicles/WOLF-018.jpg",
      HERO_MEDIA.supercarNight,
      HERO_MEDIA.cockpitLuxury,
    ],
  },
  "WOLF-019": {
    main: "/vehicles/WOLF-019.jpg", // Ferrari 296 GTB
    gallery: [
      "/vehicles/WOLF-019.jpg",
      HERO_MEDIA.supercarNight,
      HERO_MEDIA.trackDominance,
    ],
  },
  "WOLF-020": {
    main: "/vehicles/WOLF-020.jpg", // McLaren Artura
    gallery: [
      "/vehicles/WOLF-020.jpg",
      HERO_MEDIA.supercarNight,
      HERO_MEDIA.cockpitLuxury,
    ],
  },

  // ELECTRIC
  "WOLF-021": {
    main: "/vehicles/WOLF-021.jpg", // Porsche Taycan 4S
    gallery: [
      "/vehicles/WOLF-021.jpg",
      HERO_MEDIA.cockpitLuxury,
      HERO_MEDIA.trackDominance,
    ],
  },
  "WOLF-022": {
    main: "/vehicles/WOLF-022.jpg", // Tesla Model S
    gallery: [
      "/vehicles/WOLF-022.jpg",
      HERO_MEDIA.cockpitLuxury,
      HERO_MEDIA.singaporeMarina,
    ],
  },
  "WOLF-023": {
    main: "/vehicles/WOLF-023.jpg", // Mercedes-Benz EQE SUV
    gallery: [
      "/vehicles/WOLF-023.jpg",
      HERO_MEDIA.cockpitLuxury,
      HERO_MEDIA.vipConcierge,
    ],
  },

  // LUXURY MPV
  "WOLF-024": {
    main: "/vehicles/WOLF-024.jpg", // Mercedes-Benz V-Class
    gallery: [
      "/vehicles/WOLF-024.jpg",
      HERO_MEDIA.cockpitLuxury,
      HERO_MEDIA.vipConcierge,
    ],
  },
};

export const PRODUCT_MEDIA: Record<string, string> = {
  "PRD-0001": "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop", // Cap
  "PRD-0002": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop", // Leather gloves / sport
  "PRD-0003": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop", // Leather key sleeve
  "PRD-0004": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop", // Travel weekender duffel
  "PRD-0005": "https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=800&auto=format&fit=crop", // Phone mount
  "PRD-0006": "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop", // Leather card holder
  "PRD-0007": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop", // Tee
  "PRD-0008": "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=800&auto=format&fit=crop", // Fragrance
  "PRD-0009": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop", // Cloth set
  "PRD-0010": "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=800&auto=format&fit=crop", // Detail spray
  "PRD-0011": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop", // Driving journal
  "PRD-0012": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop", // Metal emblem
  "PRD-0013": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=800&auto=format&fit=crop", // Bottle
  "PRD-0014": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop", // Tag
  "PRD-0015": "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop", // Umbrella
  "PRD-0016": "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=800&auto=format&fit=crop", // Model display
  "PRD-0017": "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=800&auto=format&fit=crop", // Charger
  "PRD-0018": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop", // Organizer
  "PRD-0019": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop", // Care kit
  "PRD-0020": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop", // Sunglasses
  "PRD-0021": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop", // Hoodie
  "PRD-0022": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop", // Pressure gauge
  "PRD-0023": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop", // Emergency kit
  "PRD-0024": "https://images.unsplash.com/photo-1589758438368-0ad531db3366?q=80&w=800&auto=format&fit=crop", // Brush
  "PRD-0025": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop", // Strap
  "PRD-0026": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop", // Gift box
};

export function getVehicleImage(vehicleId: string): string {
  if (VEHICLE_MEDIA[vehicleId]?.main) {
    return VEHICLE_MEDIA[vehicleId].main;
  }
  return `/vehicles/${vehicleId}.jpg`;
}

export function getVehicleGallery(vehicleId: string): string[] {
  if (VEHICLE_MEDIA[vehicleId]?.gallery?.length) {
    return VEHICLE_MEDIA[vehicleId].gallery;
  }
  return [getVehicleImage(vehicleId)];
}

export function getProductImage(productId: string): string {
  if (PRODUCT_MEDIA[productId]) {
    return PRODUCT_MEDIA[productId];
  }
  return "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop";
}
