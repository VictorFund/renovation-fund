"use client"
import DashboardNewsItem from '@/components/dashboard/DashboardNewsItem/DashboardNewsItem';
import DashboardNewsFormCreate from '@/components/dashboard/DashboardNewsFormCreate/DashboardNewsFormCreate';
import Loader from '@/components/Loader/Loader';
import { GetDataWithPathname } from '@/fetch/clientFetch';
import { getDataByRules } from '@/utils/getDataByRules';
import styles from '../DashboardSections.module.scss'


const DashboardNewsSection = ({ isOwner }) => {
    const { data, isLoading, mutate } = GetDataWithPathname();
    const neededData = getDataByRules(data, isLoading, isOwner);


    return (
        <section className={styles.dashboardSection}>
            {isLoading
                ? <Loader />
                : <div className={`container ${styles.container}`}>
                    <div className={styles.cardsList}>
                        {neededData.map(item => <DashboardNewsItem key={item.slug} data={item} isLoading={isLoading} mutate={mutate} isOwner={isOwner} />)}
                    </div>
                    <DashboardNewsFormCreate mutate={mutate} isOwner={isOwner} />
                </div>
            }
        </section>
    )
}

export default DashboardNewsSection