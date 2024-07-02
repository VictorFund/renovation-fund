"use client";
import { useWindowResize } from "@/hooks/useWindowResize";
import ButtonLink from "../Buttons/ButtonLink/ButtonLink";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./homeSwiper.css";
import { CldImage } from "next-cloudinary";


const HomeSwiper = ({ items, dataName, btnClassName }) => {
  const { isMobile } = useWindowResize();
  return (
    <Swiper
      spaceBetween={30}
      navigation={true}
      loop={true}
      keyboard={{
        enabled: true,
        onlyInViewport: true,
      }}
      speed={3000}
      autoplay={{
        delay: 2500,
        pauseOnMouseEnter: true,
      }}
      modules={[Navigation, Keyboard, Autoplay]}
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
                        title="Детальніше"
                        href={`${dataName}/${el.slug}`}
                        costumBtn={btnClassName === true ? `leftMarging` : ""}
                      />
                      {dataName === "projects" && (
                        <ButtonLink title="Підтримати" href="/donate" />
                      )}
                    </div>
                  </>
                )}
              </div>
              <div className="imgWrapp">
                <CldImage
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
