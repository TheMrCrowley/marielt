import { Exo_2 } from 'next/font/google';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import CurrencyProvider from '@/store/CurrencyProvider';

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
        <div className="wrapper dark">
          <div className="content">
            <Header />
            <Navigation />
            <CurrencyProvider>
              <main className="main">{children}</main>
            </CurrencyProvider>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
