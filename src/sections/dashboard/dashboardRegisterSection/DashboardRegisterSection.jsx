import DashboardRegisterForm from '@/components/dashboard/DashboardRegisterForm/DashboardRegisterForm'
import styles from '../DashboardSections.module.scss'


const DashboardRegisterSection = () => {
    return (
        <section className={styles.authSection}>
            <DashboardRegisterForm />
        </section>
    )
}


export default DashboardRegisterSection