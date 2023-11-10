import { Exo_2 } from 'next/font/google';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import CurrencyProvider from '@/providers/CurrencyProvider';
import WindowResizeProvider from '@/providers/WindowResizeProvider';

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
            <main className="main">
              <CurrencyProvider>
                <WindowResizeProvider>{children}</WindowResizeProvider>
              </CurrencyProvider>
            </main>
          </div>

          <Footer />
        </div>
      </body>
    </html>
  );
}
