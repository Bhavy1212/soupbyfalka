export interface ProjectItem {
  id: string;
  slug: string;
  client: string;
  title?: string;
  category?: string;
  description: string;
  media: {
    type: 'image' | 'video';
    src: string;
    alt: string;
    videoSrc?: string;
  };
  secondaryMedia?: {
    type: 'image' | 'video';
    src: string;
    alt: string;
    client: string;
    caption: string;
  };
  ratio: '4/5' | '16/9' | '21/9' | '3/4' | '1/1' | 'multi';
  colOrder?: 'normal' | 'reverse';
}

export const PROJECTS: ProjectItem[] = [
  {
    id: '01',
    slug: 'aman',
    client: 'AMAN',
    description: 'Soup provides a complete, end-to-end visual content solution. We have the resources, skills and industry-specific experience necessary to produce, create and deliver projects of any scale, in any part of the world.',
    media: {
      type: 'image',
      src: '/media/01-IHCL2670.jpg',
      alt: 'Aman Hillside Resort'
    },
    ratio: '16/9',
    colOrder: 'normal'
  },
  {
    id: '02',
    slug: 'nobu-park-hyatt',
    client: 'NOBU RESIDENCES ABU DHABI',
    description: 'Soup provides a complete, end-to-end visual content solution. We have the resources, skills and industry-specific experience necessary to produce, create and deliver projects of any scale, in any part of the world.',
    media: {
      type: 'image',
      src: '/media/Nobu_LillieThompson_01-BW-nobu.jpg.jpeg',
      alt: 'Nobu Residences Abu Dhabi'
    },
    secondaryMedia: {
      type: 'image',
      src: '/media/jagat-parkhyatt-general-02-uai-1032x825.jpg.jpeg',
      alt: 'Park Hyatt Maldives',
      client: 'PARK HYATT MALDIVES',
      caption: 'PARK HYATT MALDIVES'
    },
    ratio: 'multi',
    colOrder: 'normal'
  },
  {
    id: '03',
    slug: 'janu',
    client: 'JANU',
    description: 'Soup provides a complete, end-to-end visual content solution. We have the resources, skills and industry-specific experience necessary to produce, create and deliver projects of any scale, in any part of the world.',
    media: {
      type: 'image',
      src: '/media/AAA05868-Edit.jpg',
      alt: 'Janu Luxury Resort'
    },
    ratio: '16/9',
    colOrder: 'normal'
  },
  {
    id: '04',
    slug: 'luxury-lodges-australia',
    client: 'LUXURY LODGES OF AUSTRALIA',
    description: 'Soup provides a complete, end-to-end visual content solution. We have the resources, skills and industry-specific experience necessary to produce, create and deliver projects of any scale, in any part of the world.',
    media: {
      type: 'image',
      src: '/media/14.jpg',
      alt: 'Luxury Lodges of Australia Suite'
    },
    ratio: '16/9',
    colOrder: 'normal'
  },
  {
    id: '05',
    slug: 'sujan-rosewood',
    client: 'SUJÁN',
    description: 'Soup provides a complete, end-to-end visual content solution. We have the resources, skills and industry-specific experience necessary to produce, create and deliver projects of any scale, in any part of the world.',
    media: {
      type: 'image',
      src: '/media/jagat-sujan-header-01.jpg.jpeg',
      alt: 'Suján Candlelit Walkway'
    },
    secondaryMedia: {
      type: 'image',
      src: '/media/jagat-rosewood-RW_Doha_11634.jpg.jpeg',
      alt: 'Rosewood Reflection',
      client: 'ROSEWOOD',
      caption: 'ROSEWOOD'
    },
    ratio: 'multi',
    colOrder: 'normal'
  },
  {
    id: '06',
    slug: 'kokomo',
    client: 'KOKOMO',
    description: 'Soup provides a complete, end-to-end visual content solution. We have the resources, skills and industry-specific experience necessary to produce, create and deliver projects of any scale, in any part of the world.',
    media: {
      type: 'image',
      src: '/media/jagat-kokomo-240610_KOKOMO_PRIVATE_ISLAND_0509.jpg.jpeg',
      alt: 'Kokomo Private Island Resort'
    },
    ratio: '16/9',
    colOrder: 'normal'
  }
];
