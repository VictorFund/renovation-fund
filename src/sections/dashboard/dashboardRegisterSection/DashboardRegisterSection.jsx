import React from 'react'
import DashboardRegisterForm from '@/components/dashboard/DashboardRegisterForm/DashboardRegisterForm'
import styles from './DashboardRegisterSection.module.scss'


const DashboardRegisterSection = () => {
    return (
        <section>
            <div className={styles.container} >
                <div className={styles.wrapper}>
                    <DashboardRegisterForm />
                </div>
            </div>
        </section>
    )
}

export default DashboardRegisterSection