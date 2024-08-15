import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

import "./globals.scss";
import { fonts } from "@/fonts/getFonts";
import { SiteProvider } from "@/context/siteContext";
import TranslatorProvider from "@/translator/i18Provider";

import SideBtn from "@/components/Buttons/SideBtn/SideBtn";
import ToTopBtn from "@/components/Buttons/ToTopBtn/ToTopBtn";
import AuthProvider from "@/components/dashboard/AuthProvider/AuthProvider";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


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
        <AuthProvider>
          <SiteProvider>
            <TranslatorProvider>
              <Header />
              <main>{children}</main>
              <Footer />
              <SideBtn />
              <ToTopBtn />
            </TranslatorProvider>
          </SiteProvider>
        </AuthProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          pauseOnHover
          theme="colored"
        />
      </body>
    </html>
  );
}
