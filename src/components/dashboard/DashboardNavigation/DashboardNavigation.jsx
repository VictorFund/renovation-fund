"use client";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import SmallLogo from '@/components/Logo/SmallLogo';
import LogoutBtn from '../LogoutBtn/LogoutBtn';
import { dashboardPages } from '@/data/dashboardPages';
import styles from './DashboardNavigation.module.scss';


const DashboardNavigation = ({ handleLogout, session }) => {
    const pathName = usePathname();
    const pages = [...dashboardPages];
    const adminPages = pages.filter(item => item.access === "admin")
    const ownerPages = dashboardPages;


    return (
        <div className={styles.navigationContainer}>
            {session?.user && <SmallLogo />}

            {session?.user.email === process.env.NEXT_PUBLIC_OWNER && ((ownerPages.map((item) => {
                return (<Link key={item.title} className={pathName === item.path ? `${styles.pageLink} ${styles.active}` : `${styles.pageLink}`} href={item.path}>{item.title}</Link>)
            })))}

            {session?.user.isAdmin && session?.user.email !== process.env.NEXT_PUBLIC_OWNER && (adminPages.map((item) => {
                return (<Link key={item.title} className={pathName === item.path ? `${styles.pageLink} ${styles.active}` : `${styles.pageLink}`} href={item.path}>{item.title}</Link>)
            }))}

            {session?.user && <LogoutBtn handleLogout={handleLogout} />}
        </div >
    )
}


export default DashboardNavigation