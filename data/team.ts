export interface TeamMember {
  name: string;
  role: string;
  photo: string;
  isFounder: boolean;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Jackson England',
    role: 'SOUP CO-FOUNDER, DIRECTOR, CINEMATOGRAPHER',
    photo: '/media/AAA05009-Edit.jpg',
    isFounder: true
  },
  {
    name: 'Lauren James',
    role: 'SOUP CO-FOUNDER, HEAD OF PRODUCTION',
    photo: '/media/1.png',
    isFounder: true
  },
  {
    name: 'Marcus Vance',
    role: 'SENIOR CINEMATOGRAPHER & DRONE OPERATOR',
    photo: '/media/DSC08130.jpg',
    isFounder: false
  },
  {
    name: 'Elena Rostova',
    role: 'CREATIVE STYLIST & PRODUCTION DESIGNER',
    photo: '/media/2.png',
    isFounder: false
  },
  {
    name: 'David Thorne',
    role: 'POST-PRODUCTION SUPERVISOR & COLORIST',
    photo: '/media/DSC2197-HDR.jpg',
    isFounder: false
  },
  {
    name: 'Sophia Sterling',
    role: 'STILLS PHOTOGRAPHER & ARCHIVAL EDITOR',
    photo: '/media/4.jpg',
    isFounder: false
  }
];
