"use client"
import DashboardCoworker from '@/components/dashboard/DashboardCoworker/DashboardCoworker';
import DashboardCoworkerFormUpdate from '@/components/dashboard/DashboardCoworkerFormUpdate/DashboardCoworkerFormUpdate';
import Loader from '@/components/Loader/Loader';
import { GetDataWithPathname } from '@/fetch/clientFetch';
import styles from '../DashboardSections.module.scss'


const DashboardTeamIdSection = () => {
    const { data, isLoading, mutate } = GetDataWithPathname();
    console.log('data', data)

    return (
        <section>
            {isLoading
                ? <Loader />
                : <div className={styles.container}>
                    <DashboardCoworker data={data} />
                    <DashboardCoworkerFormUpdate data={data} mutate={mutate} />
                </div>
            }
        </section>
    )
}

export default DashboardTeamIdSection