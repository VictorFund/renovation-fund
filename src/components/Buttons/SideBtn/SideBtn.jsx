"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ButtonLink from "../ButtonLink/ButtonLink";
import styles from "./SideBtn.module.scss";

const SideBtn = () => {
  const [isLoad, setIsLoad] = useState(true);
  const { t } = useTranslation();

  const pathName = usePathname();

  useEffect(() => {
    setIsLoad(false);
  }, []);

  if (pathName.startsWith("/dashboard")) {
    return;
  } else {
    return (
      <ButtonLink
        title={!isLoad && t("Buttons.ContactUs")}
        id={styles.sideBtn}
        href="/contacts"
        target="_self"
      />
    );
  }
};

export default SideBtn;
