import DashboardNavigation from '@/components/dashboard/DashboardNavigation/DashboardNavigation';
import { auth } from '@/auth/auth';
import { handleLogout } from '@/auth/actions';
import styles from './page.module.scss';


export default async function DashboardLayout({ children }) {
    const session = await auth();
    // console.log('session', session)

    return <div className={styles.layoutContainer}>
        <DashboardNavigation handleLogout={handleLogout} session={session} />
        {children}
    </div>
}