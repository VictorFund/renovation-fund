"use client";

import TitleLink from "@/components/Buttons/TitleLink/TitleLink";
import HomeSwiper from "@/components/HomeSwiper/HomeSwiper";
import { GetDataForHomeByCollection } from "@/fetch/clientFetch";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const HomeNewsSection = () => {
  const { data, isLoading } = GetDataForHomeByCollection("news");
  const { t } = useTranslation();
  const [isLoad, setIsLoad] = useState(true);
  useEffect(() => {
    setIsLoad(false);
  }, []);

  const aprovedData = data?.filter((el) => el.isApproved);

  return (
    <section>
      <div className="container">
        <TitleLink
          href="/news"
          title={!isLoad && t("MainPage.NewsSectionTitle")}
        />
        <HomeSwiper
          items={aprovedData}
          dataName="news"
          btnClassName={true}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
};

export default HomeNewsSection;
