"use client"
import DashboardNewsItem from '@/components/dashboard/DashboardNewsItem/DashboardNewsItem';
import DashboardNewsFormUpdate from '@/components/dashboard/DashboardNewsFormUpdate/DashboardNewsFormUpdate';
import Loader from '@/components/Loader/Loader';
import { GetDataWithPathname } from '@/fetch/clientFetch';
import styles from '../DashboardSections.module.scss'


const DashboardNewsIdSection = ({ isOwner }) => {
    const { data, isLoading, mutate } = GetDataWithPathname();


    return (
        <section>
            {isLoading
                ? <Loader />
                : <div className={styles.container}>
                    <DashboardNewsItem data={data} isLoading={isLoading} isOwner={isOwner} />
                    <DashboardNewsFormUpdate data={data} mutate={mutate} isOwner={isOwner} />
                </div>
            }
        </section>
    )
}


export default DashboardNewsIdSection