import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

import "./globals.scss";
import { fonts } from "@/fonts/getFonts";
import FormSection from "@/sections/modalSection/ModalSection";
import { SiteProvider } from "@/context/siteContext";

export const metadata = {
  title: "Charity fund",
  description: "Victory and recovery",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={fonts}>
        <SiteProvider>
          <Header />
          <main>
            {children}
            <FormSection />
          </main>
          <Footer />
        </SiteProvider>
      </body>
    </html>
  );
}
