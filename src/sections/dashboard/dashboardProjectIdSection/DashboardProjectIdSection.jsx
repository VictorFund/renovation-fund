"use client"
import DashboardProjectItem from '@/components/dashboard/DashboardProjectItem/DashboardProjectItem';
import DashboardProjectFormUpdate from '@/components/dashboard/DashboardProjectFormUpdate/DashboardProjectFormUpdate';
import Loader from '@/components/Loader/Loader';
import { GetDataWithPathname } from '@/fetch/clientFetch';
import styles from '../DashboardSections.module.scss'


const DashboardProjectIdSection = () => {
    const { data, isLoading, mutate } = GetDataWithPathname();
    console.log('data', data)

    return (
        <section>
            {isLoading
                ? <Loader />
                : <div className={styles.container}>
                    <DashboardProjectItem data={data} isLoading={isLoading} />
                    <DashboardProjectFormUpdate data={data} mutate={mutate} />
                </div>
            }
        </section>
    )
}

export default DashboardProjectIdSection