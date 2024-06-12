import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

import "./globals.scss";
import ModalSection from "@/sections/modalSection/ModalSection";
import { fonts } from "@/fonts/getFonts";

export const metadata = {
  title: "Charity fund",
  description: "Victory and recovery",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={fonts}>
        <Header />
        <main>
          {children}
          <ModalSection />
        </main>
        <Footer />
      </body>
    </html>
  );
}
