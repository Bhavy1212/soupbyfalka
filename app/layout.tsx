import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { SmoothScrollProvider } from '@/lib/SmoothScrollProvider';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const avenirNext = localFont({
  src: [
    {
      path: '../public/fonts/AvenirNext-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/AvenirNext-Italic.woff',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/AvenirNext-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/AvenirNext-Demi.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/AvenirNext-DemiItalic.woff',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../public/fonts/AvenirNext-Bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/AvenirNext-BoldItalic.woff',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-avenir',
  display: 'swap',
});

const theSeasons = localFont({
  src: [
    {
      path: '../public/fonts/TheSeasons-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-seasons',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Soup — Visual Stories',
  description: 'Soup — cinematic visual stories for destinations, spaces and brands.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${avenirNext.variable} ${theSeasons.variable}`}>
      <body>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
