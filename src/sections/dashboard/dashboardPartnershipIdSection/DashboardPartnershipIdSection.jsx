'use client';
import DashboardPartnershipItem from '@/components/dashboard/DashboardPartnershipItem/DashboardPartnershipItem';
import DashboardPartnershipFormUpdate from '@/components/dashboard/DashboardPartnershipFormUpdate/DashboardPartnershipFormUpdate';
import Loader from '@/components/Loader/Loader';
import { GetDataForHomeByCollection, GetDataWithPathname } from '@/fetch/clientFetch';
import styles from '../DashboardSections.module.scss';


const DashboardPartnershipIdSection = ({ isOwner }) => {
    const { data, isLoading, mutate } = GetDataWithPathname();

    const info = GetDataForHomeByCollection("partnership");
    const slugsArr = info.data?.map((item) => item.slug).sort((a, b) => { return a - b });
    const filteredSlugsArr = slugsArr?.filter(item => item !== data?.slug);


    return (
        <section className={styles.dashboardSection}>
            {isLoading
                ? <Loader />
                : <div className={`container ${styles.container} ${styles.editPage}`}>
                    <DashboardPartnershipItem data={data} isOwner={isOwner} />
                    <DashboardPartnershipFormUpdate data={data} mutate={mutate} isOwner={isOwner} slugsArr={filteredSlugsArr} />
                </div>
            }
        </section>
    )
}

export default DashboardPartnershipIdSection