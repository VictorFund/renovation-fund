"use client";

import React from "react";
import { useWindowResize } from "@/hooks/useWindowResize";
import Link from "next/link";

const FooterNav = ({ className, tabletNavLink, navWrapp }) => {
  const { isMobile } = useWindowResize();
  return (
    <div className={className}>
      {!isMobile && <h3>Меню</h3>}

      <nav className={navWrapp}>
        {!isMobile && (
          <>
            <Link href={"/"} className={tabletNavLink}>
              Головна
            </Link>
            <Link href={"/projects"} className={tabletNavLink}>
              Проєкти
            </Link>
            <Link href={"/mission"} className={tabletNavLink}>
              Про Фонд
            </Link>{" "}
            <Link href={"/news"} className={tabletNavLink}>
              Новини
            </Link>{" "}
            <Link href={"/donate"} className={tabletNavLink}>
              Реквізити
            </Link>{" "}
            <Link href={"/partnership"} className={tabletNavLink}>
              Партнерство
            </Link>
            <Link
              href="https://drive.google.com/drive/folders/1nSssAqs06TKHyJj2PwsSnqj3smaMMeXu?usp=drive_link"
              className={tabletNavLink}
              target="_blank"
            >
              Звітність
            </Link>
          </>
        )}
        <Link href={"/"}>Конфіденційність</Link>
      </nav>
    </div>
  );
};

export default FooterNav;
