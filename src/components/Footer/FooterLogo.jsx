"use client";

import { useWindowResize } from "@/hooks/useWindowResize";
import React from "react";
import Logo from "../Logo/Logo";
import SmallLogo from "../Logo/SmallLogo";
import styles from "./Footer.module.scss";

const FooterLogo = () => {
  const { isTablet, isLaptop } = useWindowResize();
  if (isTablet || isLaptop) {
    return <SmallLogo id={styles.smallLogo} />;
  } else {
    return <Logo id={styles.logo} />;
  }
};

export default FooterLogo;
