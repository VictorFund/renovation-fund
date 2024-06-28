import HeroSection from "@/sections/heroSection/HeroSection";
import HomeAboutFundSection from "@/sections/homeAboutFundSection/HomeAboutFundSection";
import HomeNewsSection from "@/sections/homeNewsSection/HomeNewsSection";
import HomePartnersSection from "@/sections/homePartnersSection/HomePartnersSection";
import HomeProjectsSection from "@/sections/homeProjectsSection/HomeProjectsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HomeAboutFundSection />
      <HomeProjectsSection />
      {/* <HomePartnersSection /> */}
      <HomeNewsSection />
    </>
  );
}
