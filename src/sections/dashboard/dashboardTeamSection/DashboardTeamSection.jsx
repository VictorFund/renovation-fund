'use client';
import DashboardCoworker from '@/components/dashboard/DashboardCoworker/DashboardCoworker';
import DashboardCoworkerFormCreate from '@/components/dashboard/DashboardCoworkerFormCreate/DashboardCoworkerFormCreate';
import Loader from '@/components/Loader/Loader';
import { GetDataWithPathname } from '@/fetch/clientFetch';
import { getDataByRules } from '@/utils/getDataByRules';
import styles from '../DashboardSections.module.scss';


const DashboardTeamSection = ({ isOwner }) => {
    const { data, isLoading, mutate } = GetDataWithPathname();

    const coworkersPriorities = data?.map((item) => item.priority).sort((a, b) => { return a - b }).join(", ");
    const neededData = getDataByRules(data, isLoading, isOwner);

    const sortedByUpdate = neededData?.sort((a, b) => { return a.updatedAt - b.updatedAt });

    // for yup-validation
    const slugsArr = data?.map((item) => item.slug).sort((a, b) => { return a - b });
    const prioritiesArr = data?.map((item) => item.priority).sort((a, b) => { return a - b });

    const contextsForSchema = {
        slugs: slugsArr,
        priorities: prioritiesArr,
    }


    return (
        <section className={styles.dashboardSection}>
            {isLoading
                ? <Loader />
                : <div className={`container ${styles.container}`}>
                    <div className={styles.cardsList}>{sortedByUpdate.map(item => <DashboardCoworker key={item.slug} data={item} mutate={mutate} isOwner={isOwner} />)}</div>
                    <DashboardCoworkerFormCreate mutate={mutate} isOwner={isOwner} contextsForSchema={contextsForSchema} />
                    <p><span className='accentText'>Існуючі пріоритети:</span> {coworkersPriorities}</p>
                </div>
            }
        </section>
    )
}

export default DashboardTeamSection