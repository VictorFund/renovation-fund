import DashboardNavigation from '@/components/dashboard/DashboardNavigation/DashboardNavigation';
import { handleLogout } from '@/auth/actions';
import { getDashboardSession } from '@/utils/getDashboardSession';
import styles from './page.module.scss';


export default async function DashboardLayout({ children }) {
    const session = await getDashboardSession();
    // console.log('session', session)

    return <div className={styles.layoutContainer}>
        <div className="container">
            <DashboardNavigation handleLogout={handleLogout} session={session} />
            {children}
        </div>
    </div>
}