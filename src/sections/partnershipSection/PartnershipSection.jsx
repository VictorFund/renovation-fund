"use client";

import Image from "next/image";
import { CldImage } from "next-cloudinary";
import { GetDataWithPathname } from "@/fetch/clientFetch";
import { useWindowResize } from "@/hooks/useWindowResize";
import PartnerForm from "@/components/Forms/PartnerForm";

import styles from "./PartnershipSection.module.scss";
import { useTranslation } from "react-i18next";
import { currentLanguages } from "@/data";
import Loader from "@/components/Loader/Loader";
import { useEffect, useRef } from "react";

const PartnershipSection = () => {
  const { data, isLoading } = GetDataWithPathname("partnership");

  const { isMobile } = useWindowResize();

  const { i18n, t } = useTranslation();

  const titleRefs = useRef([]);

  useEffect(() => {
    if (data && titleRefs.current) {
      titleRefs.current.forEach((title) => {
        let fontSize = 32;
        let maxHeight = parseFloat(getComputedStyle(title).lineHeight) * 3;

        while (title.scrollHeight > maxHeight && fontSize > 18) {
          fontSize -= 1;
          title.style.fontSize = `${fontSize}px`;
        }
      });
    }
  }, [data]);

  return (
    <section className="topSection">
      <div className={`container`}>
        <h1 className={`sectionTitle ${styles.title}`}>
          {!isLoading && t("PartnersPage.Title")}
        </h1>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <ul className={styles.partnershipList}>
              {data?.map(
                (
                  {
                    slug,
                    title,
                    titleEn,
                    siteLink,
                    logo,
                    isApproved,
                    isMainPartner,
                  },
                  index
                ) => {
                  if (isApproved) {
                    if (isMainPartner) {
                      return (
                        <li key={slug}>
                          <a
                            href={siteLink}
                            target="_blank"
                            aria-label={title}
                            className={styles.partnershipItem}
                          >
                            <figure className={styles.imgContainer}>
                              {logo ? (
                                <CldImage
                                  src={logo}
                                  alt={title}
                                  fill={true}
                                  sizes="(max-width: 768px) 128px, (max-width: 1440px) 100px"
                                />
                              ) : (
                                <Image
                                  src={"/images/logoIkon.webp"}
                                  alt={title}
                                  fill={true}
                                  className="defaultImg"
                                  sizes="(max-width: 768px) 128px, (max-width: 1440px) 100px"
                                />
                              )}
                            </figure>
                            <h3
                              className={styles.partnershipTitle}
                              ref={(el) => (titleRefs.current[index] = el)}
                            >
                              {i18n.language === currentLanguages.EN
                                ? titleEn
                                : title}
                            </h3>
                            <p className={styles.btn}>
                              <span>{t("PartnersPage.Details")}</span>
                              <svg className={styles.arrow}>
                                <use href="/sprite.svg#icon-arrow" />
                              </svg>
                            </p>
                          </a>
                        </li>
                      );
                    }
                  }
                }
              )}
            </ul>
            <ul className={styles.partnershipSmallList}>
              {data?.map(
                (
                  {
                    slug,
                    title,
                    titleEn,
                    siteLink,
                    logo,
                    isApproved,
                    isMainPartner,
                  },
                  index
                ) => {
                  if (isApproved) {
                    if (!isMainPartner) {
                      return (
                        <li key={slug}>
                          <a
                            href={siteLink}
                            target="_blank"
                            aria-label={title}
                            className={styles.partnershipSmallItem}
                          >
                            <figure className={styles.imgSmallContainer}>
                              {logo ? (
                                <CldImage
                                  src={logo}
                                  alt={title}
                                  fill={true}
                                  sizes="(max-width: 768px) 75px"
                                />
                              ) : (
                                <Image
                                  src={"/images/logoIkon.webp"}
                                  alt={title}
                                  fill={true}
                                  className="defaultImg"
                                  sizes="(max-width: 768px) 75px"
                                />
                              )}
                            </figure>
                            <h3
                              className={styles.partnershipSmallTitle}
                              ref={(el) => (titleRefs.current[index] = el)}
                            >
                              {i18n.language === currentLanguages.EN
                                ? titleEn
                                : title}
                            </h3>
                          </a>
                        </li>
                      );
                    }
                  }
                }
              )}
            </ul>
          </>
        )}

        <h2 className={`sectionTitle ${styles.titleForm}`}>
          {!isLoading && t("PartnersPage.SubTitle")}
        </h2>
        <div className={styles.formBox}>
          {!isLoading && <PartnerForm />}
          {!isMobile && (
            <div className={styles.imgWrapper}>
              <Image
                width={497}
                height={473}
                src="/images/FormImage.webp"
                alt="Two happy people at work"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PartnershipSection;
