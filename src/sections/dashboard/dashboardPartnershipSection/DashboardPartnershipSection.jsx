"use client"
import DashboardPartnershipItem from '@/components/dashboard/DashboardPartnershipItem/DashboardPartnershipItem';
import DashboardPartnershipFormCreate from '@/components/dashboard/DashboardPartnershipFormCreate/DashboardPartnershipFormCreate';
import Loader from '@/components/Loader/Loader';
import { GetDataWithPathname } from '@/fetch/clientFetch';
import { sortArrayByUpdate } from '@/utils/sortArrayByUpdate';
import styles from '../DashboardSections.module.scss'


const DashboardPartnershipSection = () => {
    const { data, isLoading, mutate } = GetDataWithPathname();

    let sortedByUpdateData = [];
    if (!isLoading) {
        sortedByUpdateData = sortArrayByUpdate(data)
    }


    return (
        <section>
            {isLoading
                ? <Loader />
                : <div className={styles.container}>
                    <div className={styles.cardsList}>
                        {sortedByUpdateData.map(item => <DashboardPartnershipItem key={item.slug} data={item} mutate={mutate} />)}
                    </div>
                    <DashboardPartnershipFormCreate mutate={mutate} />
                </div>
            }
        </section>
    )
}

export default DashboardPartnershipSection