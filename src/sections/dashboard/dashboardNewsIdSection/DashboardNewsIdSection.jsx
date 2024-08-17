'use client';
import DashboardNewsItem from '@/components/dashboard/DashboardNewsItem/DashboardNewsItem';
import DashboardNewsFormUpdate from '@/components/dashboard/DashboardNewsFormUpdate/DashboardNewsFormUpdate';
import Loader from '@/components/Loader/Loader';
import { GetDataForHomeByCollection, GetDataWithPathname } from '@/fetch/clientFetch';
import styles from '../DashboardSections.module.scss';


const DashboardNewsIdSection = ({ isOwner }) => {
    const { data, isLoading, mutate } = GetDataWithPathname();

    const info = GetDataForHomeByCollection("news");
    const slugsArr = info.data?.map((item) => item.slug).sort((a, b) => { return a - b });
    const filteredSlugsArr = slugsArr?.filter(item => item !== data?.slug);


    return (
        <section className={styles.dashboardSection}>
            {isLoading
                ? <Loader />
                : <div className={`container ${styles.container} ${styles.editPage}`}>
                    <DashboardNewsItem data={data} isLoading={isLoading} isOwner={isOwner} />
                    <DashboardNewsFormUpdate data={data} mutate={mutate} isOwner={isOwner} slugsArr={filteredSlugsArr} />
                </div>
            }
        </section>
    )
}


export default DashboardNewsIdSection