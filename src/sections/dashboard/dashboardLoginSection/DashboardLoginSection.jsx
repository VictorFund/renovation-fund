import React from 'react'
import DashboardLoginForm from '@/components/dashboard/DashboardLoginForm/DashboardLoginForm'
import styles from './DashboardLoginSection.module.scss'


const DashboardLoginSection = () => {
    return (
        <section className={styles.container}>
            <div className={styles.wrapper}>
                <DashboardLoginForm />
            </div>

        </section>
    )
}

export default DashboardLoginSection