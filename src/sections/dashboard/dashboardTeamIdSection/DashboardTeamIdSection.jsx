'use client';
import DashboardCoworker from '@/components/dashboard/DashboardCoworker/DashboardCoworker';
import DashboardCoworkerFormUpdate from '@/components/dashboard/DashboardCoworkerFormUpdate/DashboardCoworkerFormUpdate';
import Loader from '@/components/Loader/Loader';
import { GetDataForHomeByCollection, GetDataWithPathname } from '@/fetch/clientFetch';
import styles from '../DashboardSections.module.scss';


const DashboardTeamIdSection = ({ isOwner }) => {
    const { data, isLoading, mutate } = GetDataWithPathname();

    // for yup-validation
    const info = GetDataForHomeByCollection("team");
    const slugsArr = info.data?.map((item) => item.slug).sort((a, b) => { return a - b });
    const filteredSlugsArr = slugsArr?.filter(item => item !== data?.slug);

    const prioritiesArr = info.data?.map((item) => item.priority).sort((a, b) => { return a - b });

    const filteredPrioritiesArr = prioritiesArr?.filter(item => item !== data?.priority);

    const contextsForSchema = {
        slugs: filteredSlugsArr,
        priorities: filteredPrioritiesArr,
    }

    // for list
    const coworkersPriorities = prioritiesArr?.join(", ");


    return (
        <section className={styles.dashboardSection}>
            {isLoading
                ? <Loader />
                : <div className={`container ${styles.container} ${styles.editPage}`}>
                    <DashboardCoworker data={data} isOwner={isOwner} />
                    <p><span className='accentText'>Існуючі пріоритети:</span> {coworkersPriorities}</p>
                    <DashboardCoworkerFormUpdate data={data} mutate={mutate} isOwner={isOwner} contextsForSchema={contextsForSchema} />
                </div>
            }
        </section>
    )
}

export default DashboardTeamIdSection