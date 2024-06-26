"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "./HomeSwiper.css";
import Link from "next/link";
import { useWindowResize } from "@/hooks/useWindowResize";
import ButtonLink from "../Buttons/ButtonLink/ButtonLink";

const HomeSwiper = ({ items }) => {
  // console.log(items);
  const { isMobile } = useWindowResize();
  return (
    <Swiper
      spaceBetween={30}
      // navigation={true}
      loop={true}
      modules={[Navigation]}
      className="homeSwiper"
    >
      {items.map((el) => {
        return (
          <SwiperSlide key={el.slug}>
            <div className="wrapp">
              <div className="txtWrapp">
                <h4 className="title">{el.title}</h4>
                {isMobile && <p className="createdAt">{el.createdAt}</p>}
                {!isMobile && (
                  <>
                    <p className="descr">{el.shortDescription}</p>

                    <div className="btnsBlock">
                      <ButtonLink
                        id={el.slug}
                        title="Детальніше"
                        href={`projects/${el.slug}`}
                      />
                      <ButtonLink title="Задонатити" href="/donate" />
                    </div>
                  </>
                )}
              </div>
              <div className="imgWrapp">
                <Image
                  className="img"
                  src={el.image}
                  alt={el.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default HomeSwiper;
