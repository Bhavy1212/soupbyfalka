export interface PhotographyProject {
  slug: string;
  title: string;
  intro: string;
  approach: string;
  services: string[];
  heroImage: string;
  prevNext?: string[];
}

export const PHOTOGRAPHY_PROJECTS: Record<string, PhotographyProject> = {
  'mayfair': {
    "slug": "mayfair",
    "title": "Mayfair Manor, Jungapana",
    "intro": "Set within the Jungpana Tea Estate in the Himalayan foothills, MAYFAIR Manor offers an intimate retreat shaped by colonial architecture, tea gardens and the slower rhythm of mountain life. Its identity lies as much in the journey through the landscape as in the property itself.",
    "approach": "Our photographic approach focused on observing this relationship between heritage and nature through composition, light and detail. From the character of the interiors to the surrounding tea gardens and landscape, the imagery was created to build a visual language that feels atmospheric, intimate and rooted in the distinct identity of Jungpana. Concept, Pre-production Planning, Moodboarding, Creative Direction, Art Direction, Production Management, Casting, Wardrobe & Styling, Prop Styling, Make-up & Grooming, Lighting, Architectural",
    "services": [
        "& Lifestyle Photography",
        "Post-production"
    ],
    "prevNext": [
        "Manuscript",
        "Parallel Udaipur"
    ],
    "heroImage": "/assets/images/mayfair/hero.jpg"
},
  'nemesia': {
    "slug": "nemesia",
    "title": "Nemesia Resort & Spa, Rishikesh",
    "intro": "Located within the natural landscape surrounding Rishikesh, Nemesia Resort & Spa is centred around wellness, restoration and a more mindful approach to hospitality. The property brings together contemporary spaces with experiences designed around rest and renewal.",
    "approach": "Our photographic approach focused on translating this sense of calm through light, composition and spatial detail. Rather than simply documenting the property, the imagery explored its atmosphere from interiors and architecture to the quieter details that shape the guest experience, creating a visual identity that feels refined, restorative and connected to its natural surroundings. Concept, Pre-production Planning, Creative Direction, Art Direction, Styling, Lighting, Interior & Exterior Photography, Architectural Detail",
    "services": [
        "Photography",
        "Post-production"
    ],
    "prevNext": [
        "IHCL",
        "Parallel Udaipur"
    ],
    "heroImage": "/assets/images/nemesia/asset_01_1728x972.png"
},
  'ihcl-seleqtions': {
    "slug": "ihcl-seleqtions",
    "title": "IHCL Himalayan Woodcroft, Sirmour",
    "intro": "Set within the Himalayan landscape of Sirmaur, Himalayan Woodcroft offers an escape shaped by mountain views, nature and the quiet rhythm of hill life. The property is defined by its relationship with the landscape as much as its architecture.",
    "approach": "Our photographic approach was built around restraint and observation. Through natural light, composition and carefully framed perspectives, we explored the scale of the surroundings alongside the intimacy of the spaces within. The imagery was designed to communicate the property's sense of quiet escape while allowing the architecture and landscape to exist in equal conversation. Concept, Pre-production Planning, Creative Direction, Art Direction, Styling, Lighting, Interior & Exterior Photography, Architectural Detail",
    "services": [
        "Photography",
        "Post-production"
    ],
    "prevNext": [
        "Mayfair Jungpana",
        "Nemesia Resort"
    ],
    "heroImage": "/assets/images/kokomo-a.webp"
},
  'manuscript': {
    "slug": "manuscript",
    "title": "Manuscript, Udaipur",
    "intro": "Manuscript brings a contemporary creative perspective to Udaipur's historic hospitality landscape. Built around design, culture and artistic expression, the property moves beyond the conventions of a traditional heritage hotel.",
    "approach": "Our photographic approach focused on the visual dialogue between old and new. Through composition, light, textures and architectural details, we explored the personality of each space while preserving its creative character. The imagery was developed to feel considered and expressive, creating a visual identity that reflects Manuscript's position at the intersection of history, design and contemporary culture. Concept, Pre-production Planning, Creative Direction, Art Direction, Styling, Lighting, Interior & Exterior Photography, Architectural Detail",
    "services": [
        "Photography",
        "Post-production"
    ],
    "prevNext": [
        "Devbagh",
        "Mayfair Jungpana"
    ],
    "heroImage": "/assets/images/luxury-a.webp"
},
  'parallel': {
    "slug": "parallel",
    "title": "Parallel Hotel, Udaipur",
    "intro": "Parallel Hotel represents a different side of Udaipur. Moving away from the city's familiar palace and heritage imagery, the property introduces a contemporary, design-led approach to urban hospitality.",
    "approach": "Our photographic direction was developed around this contrast. Through clean compositions, considered lighting and an emphasis on spatial design, we focused on the property's modern architecture and lifestyle-driven interiors. The imagery was designed to establish a visual identity that feels current, confident and distinct from the traditional hospitality language commonly associated with the city. Concept, Pre-production Planning, Creative Direction, Art Direction, Styling, Lighting, Interior & Exterior Photography, Architectural Detail",
    "services": [
        "Photography",
        "Post-production"
    ],
    "prevNext": [
        "Nemesia Resort",
        "Mayfair Gopalpur"
    ],
    "heroImage": "/assets/images/parallel/hero.jpg"
},
  'mayfair-gopalpur': {
    "slug": "mayfair-gopalpur",
    "title": "Mayfair Palm Beach Resort, Gopalpur",
    "intro": "Overlooking the Bay of Bengal, MAYFAIR Palm Beach Resort brings together colonial, inspired architecture, expansive gardens and the openness of India's eastern coastline. The property carries a distinct sense of leisure, shaped by its historic surroundings and direct relationship with the sea.",
    "approach": "Our photographic approach focused on translating this atmosphere through architecture, lifestyle and the natural character of the coast. Through carefully considered compositions, lighting and human presence, the imagery was designed to move between the scale of the resort and the smaller experiences within it, creating a visual identity rooted in leisure, hospitality and place. Concept, Pre-production Planning, Moodboarding, Creative Direction, Art Direction, Production Management, Casting, Wardrobe & Styling, Prop Styling, Make-up & Grooming, Lighting, Architectural",
    "services": [
        "& Lifestyle Photography",
        "Post-production"
    ],
    "prevNext": [
        "Parallel Udaipur",
        "Mohangarh"
    ],
    "heroImage": "/assets/images/mayfair-gopalpur/hero.jpg"
},
  'mohangarh': {
    "slug": "mohangarh",
    "title": "Mohangarh Fort, Jaisalmer",
    "intro": "Set against the distinctive landscape of Jaisalmer, Mohangarh draws from Rajasthan's architectural heritage and the enduring character of the desert. The property exists within a region where history, craftsmanship and landscape naturally shape the experience of place.",
    "approach": "Our photographic approach focused on interpreting these elements through composition, light and material detail. From architectural forms to the textures and tones of the surrounding environment, the imagery was created to establish a strong sense of place, allowing the property's identity to emerge through the relationship between architecture, atmosphere and landscape. Concept, Pre-production Planning, Creative Direction, Art Direction, Styling, Lighting, Interior & Exterior Photography, Architectural Detail",
    "services": [
        "Photography",
        "Post-production"
    ],
    "prevNext": [
        "Mayfair Gopalpur",
        "Leela Palace"
    ],
    "heroImage": "/assets/images/mohangarh/hero.jpg"
},
  'the-leela': {
    "slug": "the-leela",
    "title": "The Leela Palace, Udaipur",
    "intro": "Set along the banks of Lake Pichola, The Leela Palace Udaipur draws deeply from the architectural traditions, craftsmanship and cultural heritage of Mewar. The property is defined by a sense of grandeur, but its identity extends beyond architecture into the rituals and experiences that shape a stay.",
    "approach": "Our photographic approach focused on balancing the scale of the palace with the experiences that bring it to life. Through architecture, lifestyle and carefully directed moments, the imagery explored the property as an inhabited space rather than simply an architectural landmark, capturing the details, rituals and atmosphere that shape its identity. Concept, Pre-production Planning, Moodboarding, Creative Direction, Art Direction, Production Management, Casting, Wardrobe & Styling, Prop Styling, Make-up & Grooming, Lighting, Architectural",
    "services": [
        "& Lifestyle Photography",
        "Post-production"
    ],
    "prevNext": [
        "Mohangarh",
        "Radisson Nathdwara"
    ],
    "heroImage": "/assets/images/the-leela/hero.jpg"
},
  'radisson': {
    "slug": "radisson",
    "title": "Radisson Hotel, Nathdwara",
    "intro": "Located within one of Rajasthan's most significant cultural and spiritual destinations, Radisson Nathdwara brings contemporary hospitality into a landscape defined by faith, tradition and the Aravalli hills.",
    "approach": "Our photographic approach focused on presenting the property through its spaces, design and relationship with the destination around it. Through lighting, composition and architectural detail, the imagery was created to balance the hotel's contemporary identity with the atmosphere of Nathdwara, establishing a visual language that feels polished, welcoming and connected to its surroundings. Concept, Pre-production Planning, Creative Direction, Art Direction, Styling, Lighting, Interior & Exterior Photography, Architectural Detail",
    "services": [
        "Photography",
        "Post-production"
    ],
    "prevNext": [
        "Leela Palace",
        "Chunda Shikar Oudi"
    ],
    "heroImage": "/assets/images/radisson/hero.jpg"
},
  'chunda-shikar-oudi': {
    "slug": "chunda-shikar-oudi",
    "title": "Chunda Shikar Oudi, Udaipur",
    "intro": "Chunda Palace is deeply rooted in the visual traditions of Rajasthan, bringing together ornate architecture, detailed interiors and a hospitality experience shaped by the cultural character of Udaipur. Every space carries layers of craftsmanship, colour and historical reference.",
    "approach": "Our photographic approach focused on allowing the environment to lead. Through natural light, composition and carefully observed details, we documented the relationship between the property, its architecture and the wilderness surrounding it. The imagery was designed to feel immersive and grounded in the experience of being there. Concept, Pre-production Planning, Creative Direction, Art Direction, Styling, Lighting, Interior & Exterior Photography, Architectural Detail",
    "services": [
        "Photography",
        "Post-production"
    ],
    "prevNext": [
        "Radisson Nathdwara",
        "Devbagh"
    ],
    "heroImage": "/assets/images/chunda-shikar-oudi/chunda-featured.jpg"
},
  'dev-bagh': {
    "slug": "dev-bagh",
    "title": "Devbagh, Udaipur",
    "intro": "Set within the Aravalli landscape surrounding Udaipur, Devbagh is a private retreat shaped by seclusion, architecture and its relationship with the hills. The property offers a more intimate interpretation of luxury, centred around privacy and time away from the city.",
    "approach": "Our photographic approach focused on this sense of escape. Through light, composition and architectural perspectives, we explored the property alongside its natural surroundings, creating imagery that highlights both the individuality of its spaces and the larger landscape that gives the retreat its sense of privacy and place. Concept, Pre-production Planning, Creative Direction, Art Direction, Styling, Lighting, Interior & Exterior Photography, Architectural Detail",
    "services": [
        "Photography",
        "Post-production"
    ],
    "prevNext": [
        "Chunda Shikar Oudi",
        "Manuscript"
    ],
    "heroImage": "/assets/images/dev-bagh/hero.jpg"
},
};

export const ALL_PHOTOGRAPHY_PROJECTS = Object.values(PHOTOGRAPHY_PROJECTS);
