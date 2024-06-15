// import DashboardNavigation from "@/components/DashboardNavigation/DashboardNavigation";
// import { handleLogout } from '@/auth/actions';
import styles from './page.module.scss';
import { auth } from '@/auth/auth';



export default async function DashboardLayout({ children }) {
    const session = await auth();
    console.log('session', session)

    return <div className={styles.layoutContainer}>
        {/* <DashboardNavigation handleLogout={handleLogout} session={session} /> */}
        {children}
    </div>
}