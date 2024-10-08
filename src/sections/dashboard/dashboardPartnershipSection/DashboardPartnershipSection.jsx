'use client';
import DashboardPartnershipItem from '@/components/dashboard/DashboardPartnershipItem/DashboardPartnershipItem';
import DashboardPartnershipFormCreate from '@/components/dashboard/DashboardPartnershipFormCreate/DashboardPartnershipFormCreate';
import Loader from '@/components/Loader/Loader';
import { GetDataWithPathname } from '@/fetch/clientFetch';
import { getDataByRules } from '@/utils/getDataByRules';
import styles from '../DashboardSections.module.scss';


const DashboardPartnershipSection = ({ isOwner }) => {
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
                        {neededData.map(item => <DashboardPartnershipItem key={item.slug} data={item} mutate={mutate} isOwner={isOwner} />)}
                    </div>
                    <DashboardPartnershipFormCreate mutate={mutate} isOwner={isOwner} slugsArr={slugsArr} />
                </div>
            }
        </section>
    )
}

export default DashboardPartnershipSection