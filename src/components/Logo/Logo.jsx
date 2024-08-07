"use client";
import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteContext } from "@/context/siteContext";
import styles from "./Logo.module.scss";


const Logo = ({ className, id }) => {
  const { setBurgermenu } = useContext(SiteContext);


  return (
    <Link
      href="/"
      className={`${styles.logoWrapp} ${className}`}
      onClick={() => {
        setBurgermenu(false);
      }}
      id={id}
    >
      <Image
        src="/images/Logo.webp"
        fill
        alt="logo"
        sizes="(max-width: 768px) 50vw, 33vw"
      />
    </Link>
  );
};


export default Logo;