export interface VideographyProject {
  slug: string;
  title: string;
  intro: string;
  approach: string;
  services: string[];
  heroImage: string;
  prevNext?: string[];
}

export const VIDEOGRAPHY_PROJECTS: Record<string, VideographyProject> = {
  'mayfair-manor': {
    "slug": "mayfair-manor",
    "title": "Mayfair Manor, Jungpana",
    "intro": "Set within the Jungpana Tea Estate in the Himalayan foothills, MAYFAIR Manor offers an intimate retreat shaped by colonial architecture, tea gardens and the slower rhythm of mountain life. Its identity lies as much in the journey through the landscape as in the property itself.",
    "approach": "Our approach focused on translating this sense of place into film— exploring the changing atmosphere, heritage character and experiences that define a stay here. Through carefully directed moments and an immersive visual language, the films were created to reflect the property's relationship with nature, history and quiet escape. Concept, Moodboarding, Production Management, Creative Direction, Client Direction, Casting, Wardrobe & Styling, Prop Styling,",
    "services": [
        "Make-up & Grooming",
        "Post-production",
        "Voice-over Script & Talent"
    ],
    "prevNext": [
        "Mohangarh",
        "Chunda Shikar Oudi"
    ],
    "heroImage": "/assets/images/mayfair/hero.jpg"
},
  'mayfair-gopalpur': {
    "slug": "mayfair-gopalpur",
    "title": "Mayfair Palm Beach Resort, Gopalpur",
    "intro": "Overlooking the Bay of Bengal, MAYFAIR Palm Beach Resort brings together colonial, inspired architecture, expansive gardens and the openness of India's eastern coastline. The property carries a distinct sense of leisure, shaped by its historic surroundings and direct relationship with the sea.",
    "approach": "For the films, our focus moved beyond documenting the resort's spaces. We explored its rhythm through movement, atmosphere and human experiences, bringing together architecture, hospitality and the coastline into a visual interpretation of the destination. The result was designed to communicate not just what the property looks like, but what it feels like to spend time there. Concept, Moodboarding, Production Management, Creative Direction, Client Direction, Casting, Wardrobe & Styling, Prop Styling,",
    "services": [
        "Make-up & Grooming",
        "Post-production",
        "Voice-over Script & Talent"
    ],
    "prevNext": [
        "Mayfair puri",
        "Parallel Udaipur"
    ],
    "heroImage": "/assets/images/mayfair-gopalpur/hero.jpg"
},
  'mayfair-puri': {
    "slug": "mayfair-puri",
    "title": "Mayfair Heritage & Waves Resort, Puri",
    "intro": "MAYFAIR Puri brings together two distinct hospitality experiences along Odisha's coastline, MAYFAIR Heritage and MAYFAIR Waves. While each property carries its own character, both are connected by their relationship with the sea and the experience of Puri as a destination.",
    "approach": "Our approach to film focused on identifying the individuality of both properties rather than treating them as one. Through atmosphere, movement and carefully directed experiences, we created films that explored their distinct personalities while building a cohesive visual language around the destination, hospitality and the moments that shape a stay by the coast. Concept, Moodboarding, Production Management, Creative Direction, Client Direction, Casting, Wardrobe & Styling, Prop Styling,",
    "services": [
        "Make-up & Grooming",
        "Post-production",
        "Voice-over Script & Talent"
    ],
    "prevNext": [
        "Mayfair Paradeep",
        "Mayfair Gopalpur"
    ],
    "heroImage": "/assets/images/mayfair-puri/asset_02_1710x784.png"
},
  'mayfair-paradeep': {
    "slug": "mayfair-paradeep",
    "title": "Mayfair Bay Resort, Paradeep",
    "intro": "Located along Odisha's eastern coast, MAYFAIR Bay Resort presents a contemporary interpretation of hospitality within the port city of Paradeep. Designed for leisure, celebrations and business travellers alike, the property balances modern spaces with a relaxed connection to its coastal surroundings. Our creative approach focused on giving the property a visual identity that felt refined, contemporary and experience-led. Through film, we explored the movement between spaces, guest interactions and the atmosphere that changes throughout the day—creating a body of work designed to position MAYFAIR Bay Resort beyond a conventional coastal stay. Concept, Moodboarding, Production Management, Creative Direction, Client Direction, Casting, Wardrobe & Styling, Prop Styling,",
    "approach": "",
    "services": [
        "Make-up & Grooming",
        "Post-production",
        "Voice-over Script & Talent"
    ],
    "prevNext": [
        "Manuscript",
        "Mayfair Puri"
    ],
    "heroImage": "/assets/images/mayfair-paradeep/asset_02_1666x769.png"
},
  'mohangarh': {
    "slug": "mohangarh",
    "title": "Mohangarh Fort, Jaisalmer",
    "intro": "Set against the distinctive landscape of Jaisalmer, Mohangarh draws from Rajasthan's architectural heritage and the enduring character of the desert. The property exists within a region where history, craftsmanship and landscape naturally shape the experience of place.",
    "approach": "Our approach focused on interpreting this environment through a contemporary visual language while remaining connected to its cultural context. The films explored architecture, texture, scale and the atmosphere of the desert, using movement and carefully considered compositions to create an experience that felt rooted in the destination rather than simply documenting the property. Concept, Moodboarding, Production Management, Creative Direction, Client Direction, Casting, Wardrobe & Styling, Prop Styling,",
    "services": [
        "Make-up & Grooming",
        "Post-production"
    ],
    "prevNext": [
        "Parallel Udaipur",
        "Mayfair Jungpana"
    ],
    "heroImage": "/assets/images/mohangarh/hero.jpg"
},
  'parallel': {
    "slug": "parallel",
    "title": "Parallel Hotel, Udaipur",
    "intro": "Parallel Hotel represents a different side of Udaipur. Moving away from the city's familiar palace and heritage imagery, the property introduces a contemporary, design-led approach to urban hospitality. Our films were developed around this contrast. Rather than relying on conventional visual codes associated with Udaipur, we focused on the property's modern architecture, lifestyle-driven spaces and evolving energy throughout the day. Through movement, styling and human interaction, the work was designed to position Parallel as a contemporary hospitality experience for a new generation of travellers. Concept, Moodboarding, Production Management, Creative Direction, Client Direction, Casting, Wardrobe & Styling, Prop Styling,",
    "approach": "",
    "services": [
        "Make-up & Grooming",
        "Post-production"
    ],
    "prevNext": [
        "Mayfair gopalpur",
        "Mohangarh"
    ],
    "heroImage": "/assets/images/parallel/hero.jpg"
},
  'the-leela': {
    "slug": "the-leela",
    "title": "The Leela Palace, Udaipur",
    "intro": "Set along the banks of Lake Pichola, The Leela Palace Udaipur draws deeply from the architectural traditions, craftsmanship and cultural heritage of Mewar. The property is defined by a sense of grandeur, but its identity extends beyond architecture into the rituals and experiences that shape a stay.",
    "approach": "Our approach focused on bringing this living heritage into motion. Rather than simply presenting the palace as a monument, the films explored its atmosphere, hospitality and relationship with the lake, creating a visual interpretation of luxury that feels experienced, inhabited and constantly unfolding. Concept, Moodboarding, Production Management, Creative",
    "services": [
        "Direction",
        "Client Direction",
        "Prop Styling",
        "Post-production"
    ],
    "prevNext": [
        "Mayfair puri",
        "Manuscript"
    ],
    "heroImage": "/assets/images/the-leela/hero.jpg"
},
  'chunda-palace': {
    "slug": "chunda-palace",
    "title": "Chunda Palace, Udaipur",
    "intro": "Chunda Palace is deeply rooted in the visual traditions of Rajasthan, bringing together ornate architecture, detailed interiors and a hospitality experience shaped by the cultural character of Udaipur. Every space carries layers of craftsmanship, colour and historical reference.",
    "approach": "For the films, our focus was on finding movement within this richness. Through light, composition and carefully considered moments, we explored the palace beyond its decorative details—bringing together its architecture, atmosphere and hospitality into a visual experience that reflects the property's distinctly Rajasthani identity. Concept, Moodboarding, Production Management, Creative",
    "services": [
        "Direction",
        "Client Direction",
        "Prop Styling",
        "Post-production"
    ],
    "prevNext": [
        "Chunda Shikar Oudi",
        "Radisson"
    ],
    "heroImage": "/assets/images/chunda-palace/asset_02_1920x1080.png"
},
  'chunda-shikar-oudi': {
    "slug": "chunda-shikar-oudi",
    "title": "Chunda Shikar Oudi, Udaipur",
    "intro": "Chunda Palace is deeply rooted in the visual traditions of Rajasthan, bringing together ornate architecture, detailed interiors and a hospitality experience shaped by the cultural character of Udaipur. Every space carries layers of craftsmanship, colour and historical reference.",
    "approach": "For the films, our focus was on finding movement within this richness. Through light, composition and carefully considered moments, we explored the palace beyond its decorative details—bringing together its architecture, atmosphere and hospitality into a visual experience that reflects the property's distinctly Rajasthani identity. Concept, Moodboarding, Production Management, Creative",
    "services": [
        "Direction",
        "Client Direction",
        "Prop Styling",
        "Post-production"
    ],
    "prevNext": [
        "Mayfair Jungpana",
        "Chunda Palace"
    ],
    "heroImage": "/assets/images/chunda-shikar-oudi/chunda-featured.jpg"
},
  'radisson': {
    "slug": "radisson",
    "title": "Radisson Hotel, Nathdwara",
    "intro": "Located within one of Rajasthan's most significant cultural and spiritual destinations, Radisson Nathdwara brings contemporary hospitality into a landscape defined by faith, tradition and the Aravalli hills. Our creative approach focused on balancing these two worlds. Through film, we explored the hotel's modern spaces alongside the atmosphere of its surrounding destination—creating visuals that moved between comfort, celebration, landscape and cultural context. The work was designed to position the property as more than a place to stay, but as part of the larger experience of Nathdwara. Concept, Moodboarding, Production Management, Creative",
    "approach": "",
    "services": [
        "Direction",
        "Client Direction",
        "Prop Styling",
        "Post-production"
    ],
    "prevNext": [
        "Chunda Palace",
        "Mahua Bagh"
    ],
    "heroImage": "/assets/images/radisson/hero.jpg"
},
  'mahua-bagh': {
    "slug": "mahua-bagh",
    "title": "Mahua Bagh, Kumbhalgarh",
    "intro": "Surrounded by the Aravalli ranges, Mahua Bagh is shaped by open landscapes, mountain views and the slower pace of Kumbhalgarh. The property creates an experience where architecture and hospitality remain closely connected to the natural environment. Our films focused on this relationship between the built and the natural. Through changing light, movement and the experiences that unfold across the property, we created a visual interpretation centred on escape, openness and stillness. The aim was to let the landscape lead the narrative while positioning Mahua Bagh as a retreat shaped by its surroundings. Concept, Moodboarding, Production Management, Creative",
    "approach": "",
    "services": [
        "Direction",
        "Client Direction",
        "Prop Styling",
        "Post-production"
    ],
    "prevNext": [
        "Radisson",
        "Premkunj Udaipur"
    ],
    "heroImage": "/assets/images/mahua-bagh/asset_02_1709x786.png"
},
  'manuscript': {
    "slug": "manuscript",
    "title": "Manuscript, Udaipur",
    "intro": "Manuscript brings a contemporary creative perspective to Udaipur's historic hospitality landscape. Built around design, culture and artistic expression, the property moves beyond the conventions of a traditional heritage hotel.",
    "approach": "Our approach reflected this distinctive personality. Through film, we explored the dialogue between history and contemporary culture, using movement, detail and atmosphere to reveal the character of the spaces. The resulting visual language was designed to feel expressive and considered—much like the property itself, while allowing its architecture, creativity and identity to unfold naturally on screen. Concept, Moodboarding, Production Management, Creative",
    "services": [
        "Direction",
        "Client Direction",
        "Prop Styling",
        "Post-production"
    ],
    "prevNext": [
        "Leela Palace",
        "Mayfair Paradeep"
    ],
    "heroImage": "/assets/images/luxury-a.webp"
},
  'prem-kunj': {
    "slug": "prem-kunj",
    "title": "Prem Kunj, Udaipur",
    "intro": "Located amidst the hills surrounding Udaipur, Premkunj is an intimate retreat defined by privacy, nature and a slower, more personal approach to hospitality. Its smaller scale allows the experience to feel removed from the pace and spectacle of larger resorts.",
    "approach": "Our approach to film focused on preserving this sense of intimacy. Through quiet moments, natural surroundings and carefully observed experiences, we explored the relationship between the property and its environment. The visual language was designed to feel unhurried and immersive— reflecting a stay shaped less by activity and more by the freedom to simply slow down. Concept, Moodboarding, Production Management, Creative",
    "services": [
        "Direction",
        "Client Direction",
        "Prop Styling",
        "Post-production"
    ],
    "prevNext": [
        "Mahua Bagh",
        "Premkunj Udaipur"
    ],
    "heroImage": "/assets/images/prem-kunj/asset_02_1710x955.png"
},
};

export const ALL_VIDEOGRAPHY_PROJECTS = Object.values(VIDEOGRAPHY_PROJECTS);
