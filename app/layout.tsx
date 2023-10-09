import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import Navigation from "@/components/Navigation";

const exo_2 = Exo_2({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: "Marielt",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={exo_2.className}>
        <div className="wrapper">
          <div className="content">
            <Header />
            <Navigation />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
