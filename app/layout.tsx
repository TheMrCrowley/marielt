import { Exo_2 } from 'next/font/google';

import Layout from '@/src/layout';

import './globals.css';

import type { Metadata } from 'next';

const exo_2 = Exo_2({ subsets: ['cyrillic'], weight: ['300', '400', '500'] });

export const metadata: Metadata = {
  title: 'MaRielt',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={exo_2.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
