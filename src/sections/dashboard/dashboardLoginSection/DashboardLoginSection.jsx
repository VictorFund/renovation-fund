import DashboardLoginForm from '@/components/dashboard/DashboardLoginForm/DashboardLoginForm';
import styles from '../DashboardSections.module.scss'


const DashboardLoginSection = () => {
    return (
        <section className={styles.authSection}>
            <DashboardLoginForm />

        </section>
    )
}

export default DashboardLoginSection