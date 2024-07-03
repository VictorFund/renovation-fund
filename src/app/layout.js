import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

import "./globals.scss";
import { fonts } from "@/fonts/getFonts";
import { SiteProvider } from "@/context/siteContext";

import SideBtn from "@/components/Buttons/SideBtn/SideBtn";
import ToTopBtn from "@/components/Buttons/ToTopBtn/ToTopBtn";

export const metadata = {
  title: "Charity fund",
  description: "Victory and recovery",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={fonts}
        style={{ overflowX: "hidden", overflowY: "auto" }}
      >
        <SiteProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <SideBtn
            title="Зв’яжись з нами"
            id="sideBtn"
            href="https://t.me/pvfond_contact"
            target="_blank"
          />
          <ToTopBtn />
        </SiteProvider>
      </body>
    </html>
  );
}
