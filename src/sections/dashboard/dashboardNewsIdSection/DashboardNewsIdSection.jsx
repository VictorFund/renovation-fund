"use client"
import DashboardNewsItem from '@/components/dashboard/DashboardNewsItem/DashboardNewsItem';
import DashboardNewsFormUpdate from '@/components/dashboard/DashboardNewsFormUpdate/DashboardNewsFormUpdate';
import Loader from '@/components/Loader/Loader';
import { GetDataWithPathname } from '@/fetch/clientFetch';
import styles from '../DashboardSections.module.scss'


const DashboardNewsIdSection = () => {
    const { data, isLoading, mutate } = GetDataWithPathname();
    console.log('data', data)


    return (
        <section>
            {isLoading
                ? <Loader />
                : <div className={styles.container}>
                    <DashboardNewsItem data={data} isLoading={isLoading} />
                    <DashboardNewsFormUpdate data={data} mutate={mutate} />
                </div>
            }
        </section>
    )
}


export default DashboardNewsIdSection