"use client";
import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteContext } from "@/context/siteContext";
import styles from "./Logo.module.scss";


const SmallLogo = ({ className, id }) => {
  const { setBurgermenu } = useContext(SiteContext);


  return (
    <Link
      href="/"
      className={`${styles.mobileLlogoWrapp} ${className}`}
      onClick={() => {
        setBurgermenu(false);
      }}
      id={id}
    >
      <Image
        src="/images/logoIkon.webp"
        fill
        alt="logo"
        sizes="(max-width: 768px) 10vw, 20vw"
      />
    </Link>
  );
};


export default SmallLogo;