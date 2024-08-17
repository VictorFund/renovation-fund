'use client';
import DashboardProjectItem from '@/components/dashboard/DashboardProjectItem/DashboardProjectItem';
import DashboardProjectFormCreate from '@/components/dashboard/DashboardProjectFormCreate/DashboardProjectFormCreate';
import Loader from '@/components/Loader/Loader';
import { GetDataWithPathname } from '@/fetch/clientFetch';
import { getDataByRules } from '@/utils/getDataByRules';
import styles from '../DashboardSections.module.scss';


const DashboardProjectsSection = ({ isOwner }) => {
    const { data, isLoading, mutate } = GetDataWithPathname();
    const neededData = getDataByRules(data, isLoading, isOwner);

    // for yup-validation
    const slugsArr = data?.map((item) => item.slug).sort((a, b) => { return a - b });


    return (
        <section className={styles.dashboardSection}>
            {isLoading
                ? <Loader />
                : <div className={`container ${styles.container}`}>
                    <div className={styles.cardsList}>
                        {neededData.map(item => <DashboardProjectItem key={item.slug} data={item} isLoading={isLoading} mutate={mutate} isOwner={isOwner} />)}
                    </div>
                    <DashboardProjectFormCreate mutate={mutate} isOwner={isOwner} slugsArr={slugsArr} />
                </div>
            }
        </section>
    )
}

export default DashboardProjectsSection