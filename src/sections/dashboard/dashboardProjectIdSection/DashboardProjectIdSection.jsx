'use client';
import DashboardProjectItem from '@/components/dashboard/DashboardProjectItem/DashboardProjectItem';
import DashboardProjectFormUpdate from '@/components/dashboard/DashboardProjectFormUpdate/DashboardProjectFormUpdate';
import Loader from '@/components/Loader/Loader';
import { GetDataForHomeByCollection, GetDataWithPathname } from '@/fetch/clientFetch';
import styles from '../DashboardSections.module.scss';


const DashboardProjectIdSection = ({ isOwner }) => {
    const { data, isLoading, mutate } = GetDataWithPathname();

    const info = GetDataForHomeByCollection("projects");
    const slugsArr = info.data?.map((item) => item.slug).sort((a, b) => { return a - b });
    const filteredSlugsArr = slugsArr?.filter(item => item !== data?.slug);


    return (
        <section className={styles.dashboardSection}>
            {isLoading
                ? <Loader />
                : <div className={`container ${styles.container} ${styles.editPage}`}>
                    <DashboardProjectItem data={data} isLoading={isLoading} isOwner={isOwner} />
                    <DashboardProjectFormUpdate data={data} mutate={mutate} isOwner={isOwner} slugsArr={filteredSlugsArr} />
                </div>
            }
        </section>
    )
}

export default DashboardProjectIdSection