import { Metadata } from 'next';
import { Exo_2 } from 'next/font/google';
import Script from 'next/script';

import Layout from '@/src/layout';

import './globals.css';

const exo_2 = Exo_2({ subsets: ['cyrillic'], weight: ['300', '400', '500'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.CANONICAL_URL as string),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-T2WB7LRT');
        `}
        </Script>
      </head>
      <body className={exo_2.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
