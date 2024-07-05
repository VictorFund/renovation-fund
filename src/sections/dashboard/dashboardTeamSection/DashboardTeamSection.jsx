"use client"
import DashboardCoworker from '@/components/dashboard/DashboardCoworker/DashboardCoworker';
import DashboardCoworkerFormCreate from '@/components/dashboard/DashboardCoworkerFormCreate/DashboardCoworkerFormCreate';
import Loader from '@/components/Loader/Loader';
import { GetDataWithPathname } from '@/fetch/clientFetch';
import { getDataByRules } from '@/utils/getDataByRules';
import styles from '../DashboardSections.module.scss'


const DashboardTeamSection = ({ isOwner }) => {
    const { data, isLoading, mutate } = GetDataWithPathname();
    const neededData = getDataByRules(data, isLoading, isOwner);


    return (
        <section>
            {isLoading
                ? <Loader />
                : <div className={`container ${styles.container}`}>
                    <div className={styles.cardsList}>{neededData.map(item => <DashboardCoworker key={item.slug} data={item} mutate={mutate} isOwner={isOwner} />)}</div>
                    <DashboardCoworkerFormCreate mutate={mutate} isOwner={isOwner} />
                </div>
            }
        </section>
    )
}

export default DashboardTeamSection