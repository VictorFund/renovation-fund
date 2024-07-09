import DashboardRegisterForm from '@/components/dashboard/DashboardRegisterForm/DashboardRegisterForm'
import styles from '../DashboardSections.module.scss'


const DashboardRegisterSection = () => {
    return (
        <section className={styles.dashboardSection}>
            <DashboardRegisterForm />
        </section>
    )
}


export default DashboardRegisterSection