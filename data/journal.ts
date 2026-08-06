export interface JournalItem {
  slug: string;
  category: 'JOURNAL' | 'FEATURE';
  title?: string;
  excerpt?: string;
  image?: string;
}

export const JOURNAL_ITEMS: JournalItem[] = [
  {
    slug: 'rugged-beauty-quiet-luxury',
    category: 'FEATURE',
    title: 'Rugged Beauty, Quiet Luxury',
    excerpt: 'Few places linger long after you leave. Enter Rosewood Cape Kidnappers. From our arrival to the final frame, this shoot was a celebration of contrasts: rugged cliffs, working farmland and curated elegance. What unfolded was a story of place, purpose, and presence.',
    image: '/media/Cape_Kidnappers_4638-scaled-uai-1032x580.jpg.jpeg'
  },
  {
    slug: 'into-the-wild-shiro-tsujimura',
    category: 'FEATURE',
    title: 'Into the Wild with Shiro Tsujimura',
    excerpt: 'When the opportunity arose to film and interview international artist Shiro Tsujimura at his home in mountains of Nara Japan, the Soup team - with camera\'s poised - were treated to an unforgettable day.',
    image: '/media/DSC2197-HDR.jpg'
  },
  {
    slug: 'rabari-leopards-coexist',
    category: 'FEATURE',
    title: 'Where Rabari & Leopards Coexist',
    excerpt: 'Placing Jawai on the truly remarkable map, for centuries the local Rabari Tribal Communities have lived in complete harmony with the leopards of the area. We explore this connection that\'s as spiritual as it is familial.',
    image: '/media/DSC08130.jpg'
  },
  {
    slug: 'journey-of-discovery',
    category: 'FEATURE',
    title: 'A Journey of Discovery',
    excerpt: 'Stepping inside intimate spaces that redefine luxury hospitality through architectural mastery and timeless storytelling.',
    image: '/media/02-IHCL1867.jpg'
  }
];
