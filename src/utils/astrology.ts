/**
 * Celestial & Astrological Wisdom for Memento Mori
 * Computes exact Zodiac Sun Sign, Element, Ruling Planet, and
 * philosophical mortality alignment from user's birthdate.
 */

export interface ZodiacProfile {
  name: string;
  symbol: string;
  dateRange: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  rulingPlanet: string;
  modality: 'Cardinal' | 'Fixed' | 'Mutable';
  motto: string;
  essence: string;
  mementoMoriWisdom: string;
  celestialVirtue: string;
}

export function getZodiacSign(birthDateStr: string): ZodiacProfile {
  const parts = birthDateStr.split('-');
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return {
      name: 'Aries',
      symbol: '♈',
      dateRange: 'Mar 21 – Apr 19',
      element: 'Fire',
      rulingPlanet: 'Mars',
      modality: 'Cardinal',
      motto: 'I ignite and pioneer.',
      essence: 'The primordial spark of spring; untamed initiative and courageous forward motion.',
      mementoMoriWisdom: 'Finitude is your fuel. You are not made to hesitate or delay courage. Every sunrise demands you take the bold leap today.',
      celestialVirtue: 'Audacity & Fierce Vitality'
    };
  }

  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return {
      name: 'Taurus',
      symbol: '♉',
      dateRange: 'Apr 20 – May 20',
      element: 'Earth',
      rulingPlanet: 'Venus',
      modality: 'Fixed',
      motto: 'I build and savor.',
      essence: 'The enduring soil of mid-spring; tactile presence, sensual gratitude, and unwavering roots.',
      mementoMoriWisdom: 'True wealth is not accumulating possessions, but deeply savoring the breath in your lungs and the earth beneath your feet before it passes.',
      celestialVirtue: 'Grounded Serenity & Timeless Craft'
    };
  }

  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return {
      name: 'Gemini',
      symbol: '♊',
      dateRange: 'May 21 – Jun 20',
      element: 'Air',
      rulingPlanet: 'Mercury',
      modality: 'Mutable',
      motto: 'I question and connect.',
      essence: 'The dance of thoughts before the summer solstice; relentless curiosity, dialogue, and agile perception.',
      mementoMoriWisdom: 'A human life is a fleeting conversation between consciousness and cosmos. Speak truth, listen closely, and never stop learning.',
      celestialVirtue: 'Luminous Wonder & Quickening Wit'
    };
  }

  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return {
      name: 'Cancer',
      symbol: '♋',
      dateRange: 'Jun 21 – Jul 22',
      element: 'Water',
      rulingPlanet: 'The Moon',
      modality: 'Cardinal',
      motto: 'I feel and protect.',
      essence: 'The tides of summer solstice; deep emotional memory, sheltering warmth, and devotion to kin.',
      mementoMoriWisdom: 'The people you love will not be here forever, and neither will you. Let pride dissolve; offer your heart completely today.',
      celestialVirtue: 'Radical Tenderness & Loyal Depth'
    };
  }

  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return {
      name: 'Leo',
      symbol: '♌',
      dateRange: 'Jul 23 – Aug 22',
      element: 'Fire',
      rulingPlanet: 'The Sun',
      modality: 'Fixed',
      motto: 'I radiate and create.',
      essence: 'Midsummer solar radiance; sovereign generosity, magnificent heart, and creative exuberance.',
      mementoMoriWisdom: 'Your life is a temporary star in the velvet dark. Do not hide your warmth. Burn brightly, generously, and leave an illuminated memory.',
      celestialVirtue: 'Magnanimous Sovereignty & Living Flame'
    };
  }

  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return {
      name: 'Virgo',
      symbol: '♍',
      dateRange: 'Aug 23 – Sep 22',
      element: 'Earth',
      rulingPlanet: 'Mercury',
      modality: 'Mutable',
      motto: 'I refine and serve.',
      essence: 'The harvest before autumn equinox; meticulous discernment, holy stewardship of the ordinary, and quiet devotion.',
      mementoMoriWisdom: 'Perfection is an illusion of the mind; mortal craft is the reality. Do each small act with exquisite care, knowing your time is finite.',
      celestialVirtue: 'Sacred Discernment & Selfless Devotion'
    };
  }

  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return {
      name: 'Libra',
      symbol: '♎',
      dateRange: 'Sep 23 – Oct 22',
      element: 'Air',
      rulingPlanet: 'Venus',
      modality: 'Cardinal',
      motto: 'I balance and harmonize.',
      essence: 'The equilibrium of the Autumnal Equinox; justice, aesthetic symmetry, and the sacred beauty of union.',
      mementoMoriWisdom: 'Death is the ultimate equalizer of kings and commoners. Live with grace, treat every soul with absolute equality, and bring balance to discord.',
      celestialVirtue: 'Poetic Equilibrium & Truth in Grace'
    };
  }

  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return {
      name: 'Scorpio',
      symbol: '♏',
      dateRange: 'Oct 23 – Nov 21',
      element: 'Water',
      rulingPlanet: 'Pluto & Mars',
      modality: 'Fixed',
      motto: 'I transform and penetrate.',
      essence: 'The veil thinning in autumn; unsparing depth, alchemical rebirth, and intimacy with mortality.',
      mementoMoriWisdom: 'You were born with an innate closeness to the mystery of mortality. Shed what is trivial; rise like the phoenix into total presence.',
      celestialVirtue: 'Fearless Metamorphosis & Absolute Depth'
    };
  }

  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return {
      name: 'Sagittarius',
      symbol: '♐',
      dateRange: 'Nov 22 – Dec 21',
      element: 'Fire',
      rulingPlanet: 'Jupiter',
      modality: 'Mutable',
      motto: 'I explore and illuminate.',
      essence: 'The final spark before winter solstice; philosophical quests, arrow aimed at the stars, and boundless horizons.',
      mementoMoriWisdom: 'We are pilgrims traversing an ancient cosmos. Do not let your horizon shrink. Seek wisdom, forgive quickly, and walk wide open spaces.',
      celestialVirtue: 'Cosmic Perspective & Undaunted Hope'
    };
  }

  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return {
      name: 'Capricorn',
      symbol: '♑',
      dateRange: 'Dec 22 – Jan 19',
      element: 'Earth',
      rulingPlanet: 'Saturn (Father Time / Chronos)',
      modality: 'Cardinal',
      motto: 'I endure and ascend.',
      essence: 'The bedrock of the Winter Solstice; mastery of time, granite discipline, and mountain-peak perseverance.',
      mementoMoriWisdom: 'Saturn is your ruler—Chronos, the master of finite hours. You understand that greatness takes patient years. Build monuments of character, not ego.',
      celestialVirtue: 'Mastery of Time & Stoic Fortitude'
    };
  }

  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return {
      name: 'Aquarius',
      symbol: '♒',
      dateRange: 'Jan 20 – Feb 18',
      element: 'Air',
      rulingPlanet: 'Uranus & Saturn',
      modality: 'Fixed',
      motto: 'I envision and emancipate.',
      essence: 'The clear cold sky of deep winter; visionary detachment, humanitarian solidarity, and the water bearer’s pour.',
      mementoMoriWisdom: 'You belong to future generations as much as the present. Use your brief lifespan to shatter dogma and pour wisdom into the collective well.',
      celestialVirtue: 'Visionary Freedom & Global Consciousness'
    };
  }

  // Pisces: Feb 19 - Mar 20
  return {
    name: 'Pisces',
    symbol: '♓',
    dateRange: 'Feb 19 – Mar 20',
    element: 'Water',
    rulingPlanet: 'Neptune & Jupiter',
    modality: 'Mutable',
    motto: 'I surrender and transcend.',
    essence: 'The cosmic ocean concluding the zodiac wheel; boundless compassion, dream states, and communion with all that is.',
    mementoMoriWisdom: 'All rivers return to the sea. Death is not an enemy, but a gentle reunion with the timeless ocean. Love without borders while you have form.',
    celestialVirtue: 'Oceanic Compassion & Mystical Serenity'
  };
}
