"use client";

import { usePathname } from "next/navigation";
import React from "react";
import ButtonLink from "../ButtonLink/ButtonLink";
import styles from "./SideBtn.module.scss";

const SideBtn = () => {
  const pathName = usePathname();
  if (pathName.startsWith("/dashboard")) {
    return;
  } else {
    return (
      <ButtonLink
        title="Зв’яжись з нами"
        id={styles.sideBtn}
        href="/contacts"
        target="_self"
      />
    );
  }
};

export default SideBtn;
