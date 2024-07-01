"use client"
import DashboardNewsItem from '@/components/dashboard/DashboardNewsItem/DashboardNewsItem';
import DashboardNewsFormCreate from '@/components/dashboard/DashboardNewsFormCreate/DashboardNewsFormCreate';
import Loader from '@/components/Loader/Loader';
import { GetDataWithPathname } from '@/fetch/clientFetch';
import { sortArrayByUpdate } from '@/utils/sortArrayByUpdate';
import styles from '../DashboardSections.module.scss'


const DashboardNewsSection = () => {
    const { data, isLoading, mutate } = GetDataWithPathname();

    let sortedByUpdateData = [];
    if (!isLoading) {
        sortedByUpdateData = sortArrayByUpdate(data)
    }


    return (
        <section>
            {isLoading
                ? <Loader />
                : <div className={styles.container}>
                    <div className={styles.cardsList}>
                        {sortedByUpdateData.map(item => <DashboardNewsItem key={item.slug} data={item} isLoading={isLoading} mutate={mutate} />)}</div>
                    <DashboardNewsFormCreate mutate={mutate} />
                </div>
            }
        </section>
    )
}

export default DashboardNewsSection