"use client"
import DashboardProjectItem from '@/components/dashboard/DashboardProjectItem/DashboardProjectItem';
import DashboardProjectFormCreate from '@/components/dashboard/DashboardProjectFormCreate/DashboardProjectFormCreate';
import Loader from '@/components/Loader/Loader';
import { GetDataWithPathname } from '@/fetch/clientFetch';
import styles from '../DashboardSections.module.scss'


const DashboardProjectsSection = () => {
    const { data, isLoading, mutate } = GetDataWithPathname();
    console.log('data', data)


    return (
        <section>
            {isLoading
                ? <Loader />
                : <div className={styles.container}>
                    <div className={styles.cardsList}>
                        {data.map(item => <DashboardProjectItem key={item.slug} data={item} isLoading={isLoading} />)}
                    </div>
                    <DashboardProjectFormCreate mutate={mutate} />
                </div>
            }
        </section>
    )
}

export default DashboardProjectsSection