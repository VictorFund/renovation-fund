"use client"
import DashboardCoworker from '@/components/dashboard/DashboardCoworker/DashboardCoworker';
import DashboardCoworkerFormUpdate from '@/components/dashboard/DashboardCoworkerFormUpdate/DashboardCoworkerFormUpdate';
import Loader from '@/components/Loader/Loader';
import { GetDataForHomeByCollection, GetDataWithPathname } from '@/fetch/clientFetch';
import styles from '../DashboardSections.module.scss'


const DashboardTeamIdSection = ({ isOwner }) => {
    const { data, isLoading, mutate } = GetDataWithPathname();
    const info = GetDataForHomeByCollection("team");
    const prioritiesArr = info.data?.map((item) => Number(item.priority)).sort((a, b) => { return a - b });
    const coworkersPriorities = prioritiesArr?.join(", ");

    return (
        <section className={styles.dashboardSection}>
            {isLoading
                ? <Loader />
                : <div className={`container ${styles.container} ${styles.editPage}`}>
                    <DashboardCoworker data={data} isOwner={isOwner} />
                    <p><span className='accentText'>Існуючі пріоритети:</span> {coworkersPriorities}</p>
                    <DashboardCoworkerFormUpdate data={data} mutate={mutate} isOwner={isOwner} prioritiesArr={prioritiesArr} />
                </div>
            }
        </section>
    )
}

export default DashboardTeamIdSection