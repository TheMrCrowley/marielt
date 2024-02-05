import React, { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';

import CurrencyProvider from '@/src/providers/CurrencyProvider';
import WindowResizeProvider from '@/src/providers/WindowResizeProvider';

import Footer from './Footer';
import Header from './Header';

import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <div className="wrapper dark">
        <div className="content">
          <main className="main">
            <CurrencyProvider>
              <WindowResizeProvider>{children}</WindowResizeProvider>
            </CurrencyProvider>
          </main>
        </div>

        {/* <Footer /> */}
      </div>
      <ToastContainer />
    </>
  );
};

export default Layout;
