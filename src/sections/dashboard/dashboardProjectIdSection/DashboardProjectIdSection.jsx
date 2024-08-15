'use client';
import DashboardProjectItem from '@/components/dashboard/DashboardProjectItem/DashboardProjectItem';
import DashboardProjectFormUpdate from '@/components/dashboard/DashboardProjectFormUpdate/DashboardProjectFormUpdate';
import Loader from '@/components/Loader/Loader';
import { GetDataWithPathname } from '@/fetch/clientFetch';
import styles from '../DashboardSections.module.scss';


const DashboardProjectIdSection = ({ isOwner }) => {
    const { data, isLoading, mutate } = GetDataWithPathname();


    return (
        <section className={styles.dashboardSection}>
            {isLoading
                ? <Loader />
                : <div className={`container ${styles.container} ${styles.editPage}`}>
                    <DashboardProjectItem data={data} isLoading={isLoading} isOwner={isOwner} />
                    <DashboardProjectFormUpdate data={data} mutate={mutate} isOwner={isOwner} />
                </div>
            }
        </section>
    )
}

export default DashboardProjectIdSection