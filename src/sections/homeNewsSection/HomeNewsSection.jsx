import TitleLink from "@/components/Buttons/TitleLink/TitleLink";
import HomeSwiper from "@/components/HomeSwiper/HomeSwiper";
import { getData } from "@/fetch/serverFetch";
import React from "react";
import styles from "./HomeNewsSection.module.scss";

const data = await getData("news");
// console.log("data", data);

const HomeNewsSection = () => {
  return (
    <section>
      <div className="container">
        <TitleLink href="/news" title="Новини" />

        <HomeSwiper items={data} dataName="news" btnClassName={true} />
      </div>
    </section>
  );
};

export default HomeNewsSection;
