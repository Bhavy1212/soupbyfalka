export interface JournalArticle {
  slug: string;
  tag: string;
  title: string;
  pullQuote: string;
  heroImage: string;
  images: string[];
  paragraphs: string[];
  highlights: {
    text: string;
    emphasis?: boolean;
  }[];
  property: string;
  location: string;
}

export const JOURNAL_ARTICLES: Record<string, JournalArticle> = {
  'mohangarh': {
    slug: 'mohangarh',
    tag: 'FEATURE',
    title: 'Mohangarh Fort: The Last Standing Fort of India',
    pullQuote: 'The future of heritage hospitality may depend less on restoration and more on retaining emotional truth.',
    heroImage: '/assets/images/mohangarh/mohangarh-hero.jpg',
    images: [
      '/assets/images/mohangarh/mohangarh-courtyard-arches.jpg',
      '/assets/images/mohangarh/mohangarh-bedroom.jpg',
      '/assets/images/mohangarh/mohangarh-pool-day.jpg',
      '/assets/images/mohangarh/mohangarh-twilight.jpg',
    ],
    property: 'Mohangarh Fort',
    location: 'Jaisalmer, Rajasthan',
    paragraphs: [
      'Long before we arrived at Mohangarh Fort, conversations around the property repeatedly returned to the idea of continuity, the way the fort has continued carrying the rhythm, atmosphere, and lived presence of the people who shaped it over generations.',
      'Set deep within Rajasthan’s desert landscape, Mohangarh feels deeply connected to time. The fort continues to hold the silence, texture, and personality that emerge naturally when a place evolves gradually through life itself.',
      'And perhaps that is what makes the experience feel increasingly rare today.',
      'Across hospitality globally, there is a growing appreciation for spaces with emotional and cultural depth. Properties like Aman Venice, Borgo Santo Pietro and Rosewood Castiglion del Bosco reflect a similar sensitivity toward atmosphere and sense of place, where heritage is experienced through lived character rather than visual restoration alone.',
      'During our time understanding Mohangarh, what stood out most was how naturally hospitality and history coexist within the property. The weathered lime walls continue to age honestly. Light moves softly through corridors shaped around climate and movement. Courtyards remain open to both silence and gathering.',
      'Even the pace of the experience begins to feel different.',
      'The property allows history to remain human.',
      'And perhaps that is where the future of heritage hospitality is heading, toward experiences that preserve the emotional truth already present within a place.',
      'Because some spaces carry meaning most powerfully when they are allowed to continue breathing through time.'
    ],
    highlights: [
      { text: 'The property allows history to remain human.', emphasis: true },
      { text: 'Because some spaces carry meaning most powerfully when they are allowed to continue breathing through time.', emphasis: true }
    ]
  },
  'mayfair': {
    slug: 'mayfair',
    tag: 'FEATURE',
    title: 'Mayfair & The Invisible Architecture of Atmosphere',
    pullQuote: 'Atmosphere may be the most invisible form of hospitality design.',
    heroImage: '/assets/images/mayfair/mayfair-hero.jpg',
    images: [
      '/assets/images/mayfair/mayfair-patio.jpg',
      '/assets/images/mayfair/mayfair-featured.jpg',
      '/assets/images/mayfair/mayfair-suite-wide.jpg',
      '/assets/images/mayfair/mayfair-twilight.jpg',
    ],
    property: 'MAYFAIR Hotels & Resorts',
    location: 'Jungpana & Eastern Coast',
    paragraphs: [
      'Some hospitality experiences stay with us through memory, the architecture, the scale, the service.',
      'Others stay through the feeling.',
      'While understanding and researching MAYFAIR Hotels & Resorts, one observation quietly continued returning throughout our time across the property: the environment itself felt intentionally shaped.',
      'As the day shifted across the landscape, subtle environmental changes became increasingly noticeable. Dense plantation softened surrounding heat and sound. Water bodies cooled nearby spaces. Light filtered through layers of vegetation and architecture in ways that naturally slowed movement and softened the pace of the property.',
      'Properties like The Brando, Soneva Fushi, and Six Senses Zighy Bay similarly approach hospitality through ecological sensitivity, climate responsiveness, and sensory experience where the surrounding environment becomes part of how the property is emotionally remembered.',
      'And interestingly, this was not accidental.',
      'The experience almost felt environmental before architectural.',
      'Across several Mayfair properties, large-scale tree plantation and landscape planning have been developed strategically over time to help create their own microclimatic conditions often keeping parts of the property noticeably cooler than surrounding urban environments.',
      'What makes these decisions especially powerful is that guests may never consciously notice them.',
      'Yet they deeply influence how a place stays with us.',
      'At Mayfair, the atmosphere itself feels designed with intention.',
      'And perhaps that is what meaningful hospitality increasingly looks like today, spaces designed not only to be seen, but physically and emotionally experienced.'
    ],
    highlights: [
      { text: 'The experience almost felt environmental before architectural.', emphasis: true },
      { text: 'At Mayfair, the atmosphere itself feels designed with intention.', emphasis: true }
    ]
  },
  'chunda-shikar-oudi': {
    slug: 'chunda-shikar-oudi',
    tag: 'FEATURE',
    title: 'Chunda Shikar Oudi - Where Wilderness Remains The Main Presence',
    pullQuote: 'Hospitality becomes more meaningful when the environment is treated as a presence rather than backdrop.',
    heroImage: '/assets/images/chunda-shikar-oudi/chunda-hero.jpg',
    images: [
      '/assets/images/chunda-shikar-oudi/chunda-living-room.jpg',
      '/assets/images/chunda-shikar-oudi/chunda-bedroom.jpg',
      '/assets/images/chunda-shikar-oudi/chunda-outdoor-dining.jpg',
      '/assets/images/chunda-shikar-oudi/chunda-twilight-courtyard.jpg',
    ],
    property: 'Chunda Shikar Oudi',
    location: 'Udaipur, Rajasthan',
    paragraphs: [
      'Before understanding Chunda Shikar Oudi as a jungle lodge, we first understood it as part of a landscape.',
      'During our early exploration and conversations around the property, what became immediately noticeable was the restraint in the way the lodge interacted with its surroundings. The wilderness here continues to remain the central presence.',
      'Set within a private forest reserve near Udaipur, Chunda Shikar Oudi has evolved from a former royal hunting outpost into a carefully restored jungle retreat shaped around landscape sensitivity and slow immersion within nature.',
      'Across the reserve, dense vegetation, natural terrain, forest trails, and the private lake gradually shape the experience of the lodge itself. Architecture stays grounded within the environment. Pathways move quietly through the land, while open views continually reconnect guests back to the surrounding forest and hills.',
      'Even silence begins to feel like part of the landscape.',
      'Properties such as Aman-i-Khás and Singita Lebombo Lodge reflect a similar shift within wilderness hospitality, where luxury is increasingly shaped through ecological sensitivity, restraint, and a deeper relationship with the environment itself.',
      'At Chunda Shikar Oudi, that philosophy feels deeply embedded into the rhythm of the property.',
      'What ultimately stays with you is the growing awareness of the environment around it the stillness, the terrain, the changing light, and the feeling of moving more gently through the landscape.'
    ],
    highlights: [
      { text: 'Even silence begins to feel like part of the landscape.', emphasis: true },
      { text: 'What ultimately stays with you is the growing awareness of the environment around it.', emphasis: true }
    ]
  }
};
