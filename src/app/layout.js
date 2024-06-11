import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import KyivTypeSerifBold from "next/font/local";
import "./globals.scss";
import FeedbackForm from "@/components/Forms/FeedbackForm/FeedbackForm";

const textFont = KyivTypeSerifBold({
  src: "./fonts/KyivTypeSerif-Bold.woff2",
  display: "swap",
  variable: "--font-700",
});
const titleFont = KyivTypeSerifBold({
  src: "./fonts/KyivTypeSerif-Medium.woff2",
  display: "swap",
  variable: "--font-500",
});
const linksFont = KyivTypeSerifBold({
  src: "./fonts/KyivTypeSerif-Regular.woff2",
  display: "swap",
  variable: "--font-400",
});

export const metadata = {
  title: "Charity fund",
  description: "Victory and recovery",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${textFont.variable} ${titleFont.variable}`}>
        {/* <body className={myFont.className}> */}
        <Header />
        <main>{children}
          <FeedbackForm />
        </main>
        <Footer />
      </body>
    </html>
  );
}
