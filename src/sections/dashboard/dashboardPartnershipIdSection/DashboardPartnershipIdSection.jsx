"use client"
import DashboardPartnershipItem from '@/components/dashboard/DashboardPartnershipItem/DashboardPartnershipItem';
import DashboardPartnershipFormUpdate from '@/components/dashboard/DashboardPartnershipFormUpdate/DashboardPartnershipFormUpdate';
import Loader from '@/components/Loader/Loader';
import { GetDataWithPathname } from '@/fetch/clientFetch';
import styles from '../DashboardSections.module.scss'


const DashboardPartnershipIdSection = ({ isOwner }) => {
    const { data, isLoading, mutate } = GetDataWithPathname();


    return (
        <section className={styles.dashboardSection}>
            {isLoading
                ? <Loader />
                : <div className={`container ${styles.container} ${styles.editPage}`}>
                    <DashboardPartnershipItem data={data} isOwner={isOwner} />
                    <DashboardPartnershipFormUpdate data={data} mutate={mutate} isOwner={isOwner} />
                </div>
            }
        </section>
    )
}

export default DashboardPartnershipIdSection