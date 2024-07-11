"use client";

import { SiteContext } from "@/context/siteContext";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import ButtonLink from "../ButtonLink/ButtonLink";
import styles from "./SideBtn.module.scss";

const SideBtn = () => {
  const { t } = useTranslation();

  const { isLoad } = useContext(SiteContext);
  const pathName = usePathname();
  if (pathName.startsWith("/dashboard")) {
    return;
  } else {
    return (
      <ButtonLink
        // title="Зв’яжись з нами"
        title={!isLoad && t("Buttons.ContactUs")}
        id={styles.sideBtn}
        href="/contacts"
        target="_self"
      />
    );
  }
};

export default SideBtn;
