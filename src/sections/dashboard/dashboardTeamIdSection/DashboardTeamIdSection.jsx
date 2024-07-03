"use client"
import DashboardCoworker from '@/components/dashboard/DashboardCoworker/DashboardCoworker';
import DashboardCoworkerFormUpdate from '@/components/dashboard/DashboardCoworkerFormUpdate/DashboardCoworkerFormUpdate';
import Loader from '@/components/Loader/Loader';
import { GetDataWithPathname } from '@/fetch/clientFetch';
import styles from '../DashboardSections.module.scss'


const DashboardTeamIdSection = ({ isOwner }) => {
    const { data, isLoading, mutate } = GetDataWithPathname();


    return (
        <section>
            {isLoading
                ? <Loader />
                : <div className={styles.container}>
                    <DashboardCoworker data={data} isOwner={isOwner} />
                    <DashboardCoworkerFormUpdate data={data} mutate={mutate} isOwner={isOwner} />
                </div>
            }
        </section>
    )
}

export default DashboardTeamIdSection