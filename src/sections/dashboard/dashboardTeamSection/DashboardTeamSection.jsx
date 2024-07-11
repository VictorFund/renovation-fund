"use client"
import DashboardCoworker from '@/components/dashboard/DashboardCoworker/DashboardCoworker';
import DashboardCoworkerFormCreate from '@/components/dashboard/DashboardCoworkerFormCreate/DashboardCoworkerFormCreate';
import Loader from '@/components/Loader/Loader';
import { GetDataWithPathname } from '@/fetch/clientFetch';
import { getDataByRules } from '@/utils/getDataByRules';
import styles from '../DashboardSections.module.scss'


const DashboardTeamSection = ({ isOwner }) => {
    const { data, isLoading, mutate } = GetDataWithPathname();

    const prioritiesArr = data?.map((item) => Number(item.priority)).sort((a, b) => { return a - b });
    const coworkersPriorities = data?.map((item) => item.priority).sort((a, b) => { return a - b }).join(", ");
    const neededData = getDataByRules(data, isLoading, isOwner);

    const sortedByPriority = neededData?.sort((a, b) => { return a.priority - b.priority });


    return (
        <section className={styles.dashboardSection}>
            {isLoading
                ? <Loader />
                : <div className={`container ${styles.container}`}>
                    <div className={styles.cardsList}>{sortedByPriority.map(item => <DashboardCoworker key={item.slug} data={item} mutate={mutate} isOwner={isOwner} />)}</div>
                    <DashboardCoworkerFormCreate mutate={mutate} isOwner={isOwner} prioritiesArr={prioritiesArr} />
                    <p><span className='accentText'>Існуючі пріоритети:</span> {coworkersPriorities}</p>
                </div>
            }
        </section>
    )
}

export default DashboardTeamSection