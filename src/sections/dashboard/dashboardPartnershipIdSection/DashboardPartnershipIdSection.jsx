"use client"
import DashboardPartnershipItem from '@/components/dashboard/DashboardPartnershipItem/DashboardPartnershipItem';
import DashboardPartnershipFormUpdate from '@/components/dashboard/DashboardPartnershipFormUpdate/DashboardPartnershipFormUpdate';
import Loader from '@/components/Loader/Loader';
import { GetDataWithPathname } from '@/fetch/clientFetch';
import styles from '../DashboardSections.module.scss'


const DashboardPartnershipIdSection = () => {
    const { data, isLoading, mutate } = GetDataWithPathname();
    console.log('data', data)

    return (
        <section>
            {isLoading
                ? <Loader />
                : <div className={styles.container}>
                    <DashboardPartnershipItem data={data} />
                    <DashboardPartnershipFormUpdate data={data} mutate={mutate} />
                </div>
            }
        </section>
    )
}

export default DashboardPartnershipIdSection