"use client";

import { useWindowResize } from "@/hooks/useWindowResize";
import ButtonLink from "../Buttons/ButtonLink/ButtonLink";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./homeSwiper.css";
import { CldImage } from "next-cloudinary";
import Loader from "../Loader/Loader";
import { formatDate } from "@/utils/formatDate";
import { useTranslation } from "react-i18next";
import { currentLanguages } from "@/data";
import { useEffect, useState } from "react";
import Link from "next/link";

const HomeSwiper = ({ items, dataName, btnClassName, isLoading }) => {
  const [isLoad, setIsLoad] = useState(true);

  const { isMobile } = useWindowResize();
  const { i18n, t } = useTranslation();
  const isLangEn = !isLoading && i18n.language === currentLanguages.EN;

  useEffect(() => {
    setIsLoad(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader id="loader" />
      ) : (
        <Swiper
          spaceBetween={30}
          navigation={true}
          loop={true}
          keyboard={{
            enabled: true,
            onlyInViewport: true,
          }}
          // speed={3000}
          // autoplay={{
          //   delay: 2500,
          //   pauseOnMouseEnter: true,
          // }}
          modules={[Navigation, Keyboard, Autoplay]}
          className="homeSwiper"
        >
          {items?.map((el) => {
            if (!el) {
              return;
            }
            const formattedDate = formatDate(el.createdAt);

            return (
              <SwiperSlide key={el.slug}>
                <Link href={`/${dataName}/${el.slug}`} className="wrapp">
                  <div className="txtWrapp">
                    <h4 className="title">
                      {isLangEn ? el.titleEn : el.title}
                    </h4>
                    {isMobile && <p className="createdAt">{formattedDate}</p>}
                    {!isMobile && (
                      <>
                        <p className="descr">
                          {isLangEn
                            ? el.shortDescriptionEn
                            : el.shortDescription}
                        </p>

                        <div className="btnsBlock">
                          <ButtonLink
                            title={!isLoad && t("Buttons.Details")}
                            href={`${dataName}/${el.slug}`}
                            customBtn={
                              btnClassName === true ? `leftMarging` : ""
                            }
                          />
                          {dataName === "projects" && (
                            <ButtonLink
                              title={!isLoad && t("Buttons.Donate")}
                              href="/donate"
                            />
                          )}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="imgWrapp">
                    <CldImage
                      className="img"
                      src={el.image}
                      alt={isLangEn ? el.titleEn : el.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </>
  );
};

export default HomeSwiper;
