"use client";
import { useWindowResize } from "@/hooks/useWindowResize";
import { footerNav, currentLanguages } from "@/data";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const FooterNavBlock = ({ className, tabletNavLink, navWrapp, titleClassName }) => {
  const { isMobile } = useWindowResize();
  const {t,i18n}=useTranslation();
  return (
    <div className={className}>
      {!isMobile && <h3 className={titleClassName}>{t('Footer.MenuNav')}</h3>}
<nav className={navWrapp}>
        {!isMobile && footerNav.map(({title,titleEn,href,target,rel,id})=>{
            return (<Link key={id} href={href} rel={rel} target={target} className={tabletNavLink}>{i18n.language===currentLanguages.EN? titleEn : title}</Link>)
        })
        }
      </nav>
    </div>
  );
};

export default FooterNavBlock;
