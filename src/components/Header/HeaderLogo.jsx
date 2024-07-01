"use client";

import { useWindowResize } from "@/hooks/useWindowResize";
import React from "react";
import Logo from "../Logo/Logo";
import SmallLogo from "../Logo/SmallLogo";
import styles from "./Header.module.scss";

const HeaderLogo = () => {
  const { isLaptop, isDesktop } = useWindowResize();
  if (isLaptop || isDesktop) {
    return <Logo id={styles.logo} />;
  } else {
    return <SmallLogo id={styles.smallLogo} />;
  }
};

export default HeaderLogo;
