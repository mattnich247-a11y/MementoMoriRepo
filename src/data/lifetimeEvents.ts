import { LifetimeEvent } from '../types';

export const HISTORICAL_AND_PROJECTED_EVENTS: LifetimeEvent[] = [
  // Historical past events
  {
    id: 'evt-1969',
    year: 1969,
    title: 'Apollo 11 Moon Landing',
    description: 'Neil Armstrong and Buzz Aldrin become the first humans to walk on the lunar surface.',
    category: 'Space & Cosmos',
    isProjected: false
  },
  {
    id: 'evt-1977',
    year: 1977,
    title: 'Voyager Interstellar Mission Launch',
    description: 'Voyager 1 and 2 depart Earth carrying the Golden Record toward deep interstellar space.',
    category: 'Space & Cosmos',
    isProjected: false
  },
  {
    id: 'evt-1989',
    year: 1989,
    title: 'Fall of the Berlin Wall',
    description: 'The historic barrier dividing East and West falls, reshaping the geopolitical map of Europe.',
    category: 'World & Humanity',
    isProjected: false
  },
  {
    id: 'evt-1990',
    year: 1990,
    title: 'Hubble Space Telescope Deployed & Web Proposed',
    description: 'Hubble begins imaging deep space and Tim Berners-Lee publishes the first World Wide Web proposal.',
    category: 'Science & Tech',
    isProjected: false
  },
  {
    id: 'evt-1997',
    year: 1997,
    title: 'Deep Blue Defeats Garry Kasparov',
    description: 'IBM Deep Blue becomes the first machine to defeat a reigning world chess champion under tournament conditions.',
    category: 'Science & Tech',
    isProjected: false
  },
  {
    id: 'evt-1998',
    year: 1998,
    title: 'First International Space Station Module Launched',
    description: 'Zarya module is launched into low Earth orbit, beginning the longest continuous human outpost in space.',
    category: 'Space & Cosmos',
    isProjected: false
  },
  {
    id: 'evt-2000',
    year: 2000,
    title: 'Y2K Millennium & ISS Permanently Inhabited',
    description: 'The world steps across the millennium threshold and humanity establishes uninterrupted permanent presence in orbit.',
    category: 'World & Humanity',
    isProjected: false
  },
  {
    id: 'evt-2001',
    year: 2001,
    title: 'Launch of Wikipedia & Human Genome Draft',
    description: 'Free collaborative human knowledge launches globally, and the draft human genetic sequence is published.',
    category: 'Science & Tech',
    isProjected: false
  },
  {
    id: 'evt-2004',
    year: 2004,
    title: 'Spirit & Opportunity Rovers Touch Down on Mars',
    description: 'Twin robotic geologists land on opposite sides of Mars, finding definitive proof of past liquid water.',
    category: 'Space & Cosmos',
    isProjected: false
  },
  {
    id: 'evt-2007',
    year: 2007,
    title: 'Introduction of the Modern Smartphone Era',
    description: 'The capacitive multi-touch smartphone is unveiled, permanently shifting human communication and connectivity.',
    category: 'Science & Tech',
    isProjected: false
  },
  {
    id: 'evt-2012',
    year: 2012,
    title: 'Discovery of the Higgs Boson at CERN',
    description: 'Physicists at the Large Hadron Collider confirm the fundamental particle giving mass to matter.',
    category: 'Science & Tech',
    isProjected: false
  },
  {
    id: 'evt-2015',
    year: 2015,
    title: 'First Detection of Gravitational Waves',
    description: 'LIGO observatories detect gravitational ripples in spacetime caused by colliding black holes 1.3 billion light-years away.',
    category: 'Space & Cosmos',
    isProjected: false
  },
  {
    id: 'evt-2019',
    year: 2019,
    title: 'First Direct Image of a Supermassive Black Hole',
    description: 'The Event Horizon Telescope captures the silhouette of the supermassive black hole at the core of galaxy M87.',
    category: 'Space & Cosmos',
    isProjected: false
  },
  {
    id: 'evt-2020',
    year: 2020,
    title: 'Global Pandemic & First mRNA Vaccine Deployment',
    description: 'Humanity mobilizes rapid synthetic biology to develop and distribute billions of mRNA vaccine doses.',
    category: 'Science & Tech',
    isProjected: false
  },
  {
    id: 'evt-2021',
    year: 2021,
    title: 'James Webb Space Telescope Launches',
    description: 'The infrared flagship telescope deploys its 6.5-meter golden mirror to observe the first stars born after the Big Bang.',
    category: 'Space & Cosmos',
    isProjected: false
  },
  {
    id: 'evt-2022',
    year: 2022,
    title: 'Emergence of Frontier Generative AI',
    description: 'Foundation neural models reach mass consumer adoption, sparking the global artificial intelligence inflection.',
    category: 'Science & Tech',
    isProjected: false
  },
  {
    id: 'evt-2024',
    year: 2024,
    title: 'Great North American Eclipse & Reusable Starship',
    description: 'Millions witness the total solar eclipse while full-scale orbital starship booster catch towers prove reusable rocketry.',
    category: 'Space & Cosmos',
    isProjected: false
  },

  // Projected future events
  {
    id: 'evt-2028',
    year: 2028,
    title: 'Artemis Crewed Lunar South Pole Landing',
    description: 'Astronauts return to walk on the lunar south pole to explore water ice in permanently shadowed craters.',
    category: 'Space & Cosmos',
    isProjected: true
  },
  {
    id: 'evt-2029',
    year: 2029,
    title: 'Asteroid Apophis Historic Close Flyby',
    description: '340-meter asteroid 99942 Apophis will safely pass within 32,000 km of Earth—visible to the naked eye.',
    category: 'Space & Cosmos',
    isProjected: true
  },
  {
    id: 'evt-2030',
    year: 2030,
    title: 'Nancy Grace Roman Space Telescope Dark Energy Survey',
    description: 'NASA flagship survey images 100 times the field of view of Hubble to unravel cosmic expansion.',
    category: 'Space & Cosmos',
    isProjected: true
  },
  {
    id: 'evt-2033',
    year: 2033,
    title: 'First Crewed Orbital Mission to Mars',
    description: 'Projected departure of the first human exploratory spacecraft for a flyby trajectory to the Red Planet.',
    category: 'Space & Cosmos',
    isProjected: true
  },
  {
    id: 'evt-2035',
    year: 2035,
    title: 'First Commercial Net-Positive Fusion Power',
    description: 'Pilots utilizing high-temperature superconducting magnets target supply to municipal power grids.',
    category: 'Science & Tech',
    isProjected: true
  },
  {
    id: 'evt-2037',
    year: 2037,
    title: 'Solar Eclipse Across the Southern Hemisphere',
    description: 'Total solar eclipse path traces across Australia and New Zealand.',
    category: 'Space & Cosmos',
    isProjected: true
  },
  {
    id: 'evt-2040',
    year: 2040,
    title: 'Fault-Tolerant Quantum Simulation of Molecular Biology',
    description: 'Quantum computers calculate exact enzyme and protein binding dynamics from first principles.',
    category: 'Science & Tech',
    isProjected: true
  },
  {
    id: 'evt-2045',
    year: 2045,
    title: 'Ray Kurzweil Technological Singularity Horizon',
    description: 'The projected horizon where artificial intelligence accelerates beyond total human cognitive output.',
    category: 'Science & Tech',
    isProjected: true
  },
  {
    id: 'evt-2050',
    year: 2050,
    title: 'Global Population Peak & Clean Grid Equilibrium',
    description: 'Demographers project world population stabilizes near 9.7 billion with majority closed-loop energy systems.',
    category: 'World & Humanity',
    isProjected: true
  },
  {
    id: 'evt-2061',
    year: 2061,
    title: "Return of Halley's Comet (1P/Halley)",
    description: "The most famous periodic comet in recorded human history completes its 75-year orbit and lights up Earth's night skies.",
    category: 'Space & Cosmos',
    isProjected: true
  },
  {
    id: 'evt-2068',
    year: 2068,
    title: 'Voyager 1 Crosses 200 Astronomical Units from Earth',
    description: 'Humanity’s farthest manufactured probe reaches ~30 billion kilometers from our home star.',
    category: 'Space & Cosmos',
    isProjected: true
  },
  {
    id: 'evt-2075',
    year: 2075,
    title: 'Permanent Self-Sustaining Lunar Biosphere',
    description: 'International scientific consortium marks decades of continuous biological life cultivated off-world.',
    category: 'Space & Cosmos',
    isProjected: true
  },
  {
    id: 'evt-2090',
    year: 2090,
    title: 'Total Solar Eclipse Over Western Europe',
    description: 'The Moon’s umbral shadow crosses the United Kingdom, France, and Western Europe on September 23, 2090.',
    category: 'Space & Cosmos',
    isProjected: true
  },
  {
    id: 'evt-2100',
    year: 2100,
    title: 'Dawn of the 22nd Century',
    description: 'Human civilization turns the page on the 21st century and enters the 2200s.',
    category: 'World & Humanity',
    isProjected: true
  }
];

export function getEventsForUserLifetime(birthYear: number, endYear: number): {
  pastEvents: (LifetimeEvent & { timeSinceYears: number; ageAtEvent: number })[];
  projectedEvents: (LifetimeEvent & { timeUntilYears: number; ageAtEvent: number })[];
} {
  const currentYear = 2026;

  const pastEvents = HISTORICAL_AND_PROJECTED_EVENTS
    .filter((e) => !e.isProjected && e.year >= birthYear && e.year <= currentYear)
    .map((e) => ({
      ...e,
      timeSinceYears: currentYear - e.year,
      ageAtEvent: e.year - birthYear
    }))
    .sort((a, b) => b.year - a.year); // most recent first

  const projectedEvents = HISTORICAL_AND_PROJECTED_EVENTS
    .filter((e) => e.isProjected && e.year > currentYear && e.year <= endYear)
    .map((e) => ({
      ...e,
      timeUntilYears: e.year - currentYear,
      ageAtEvent: e.year - birthYear
    }))
    .sort((a, b) => a.year - b.year); // chronologically upcoming

  return { pastEvents, projectedEvents };
}
