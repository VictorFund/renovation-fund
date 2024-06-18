import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./Logo.module.scss";

const Logo = () => {
  return (
    <Link href="/" className={styles.logoWrapp}>
      <Image src="/images/Logo.webp" fill alt="logo" />
    </Link>
  );
};

export default Logo;
