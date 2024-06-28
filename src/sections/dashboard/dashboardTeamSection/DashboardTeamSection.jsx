"use client"
import DashboardCoworker from '@/components/dashboard/DashboardCoworker/DashboardCoworker';
import DashboardCoworkerFormCreate from '@/components/dashboard/DashboardCoworkerFormCreate/DashboardCoworkerFormCreate';
import Loader from '@/components/Loader/Loader';
import { GetDataWithPathname } from '@/fetch/clientFetch';
import styles from '../DashboardSections.module.scss'


const DashboardTeamSection = () => {
    const { data, isLoading, mutate } = GetDataWithPathname();
    console.log('data', data)

    return (
        <section>
            {isLoading
                ? <Loader />
                : <div className={styles.container}>
                    <div className={styles.cardsList}>{data.map(item => <DashboardCoworker key={item.slug} data={item} />)}</div>
                    <DashboardCoworkerFormCreate mutate={mutate} />
                </div>
            }
        </section>
    )
}

export default DashboardTeamSection