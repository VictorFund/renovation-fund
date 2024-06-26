"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "./HomeSwiper.css";
import Link from "next/link";

const HomeSwiper = ({ items }) => {
  // console.log(items);

  return (
    <Swiper
      spaceBetween={30}
      navigation={true}
      modules={[Navigation]}
      className="homeSwiper"
    >
      {items.map((el) => {
        return (
          <SwiperSlide key={el.slug}>
            <div className="wrapp" href={el.link}>
              <div className="txtWrapp">
                <h3>{el.title}</h3>
                <p>{el.createdAt}</p>
                <p>{el.shortDescription}</p>
                <div className="btnsBlock">
                  <button>1</button>
                  <button>2</button>
                </div>
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
