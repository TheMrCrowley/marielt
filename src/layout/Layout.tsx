import React, { PropsWithChildren } from 'react';

import CurrencyProvider from '@/src/providers/CurrencyProvider';
import WindowResizeProvider from '@/src/providers/WindowResizeProvider';

import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="wrapper dark">
      <div className="content">
        <Header />
        <main className="main sm:mt-0 mt-16">
          <CurrencyProvider>
            <WindowResizeProvider>{children}</WindowResizeProvider>
          </CurrencyProvider>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
