"use client"
import DashboardPartnershipItem from '@/components/dashboard/DashboardPartnershipItem/DashboardPartnershipItem';
import DashboardPartnershipFormCreate from '@/components/dashboard/DashboardPartnershipFormCreate/DashboardPartnershipFormCreate';
import Loader from '@/components/Loader/Loader';
import { GetDataWithPathname } from '@/fetch/clientFetch';
import styles from '../DashboardSections.module.scss'


const DashboardPartnershipSection = () => {
    const { data, isLoading, mutate } = GetDataWithPathname();
    console.log('data', data)


    return (
        <section>
            {isLoading
                ? <Loader />
                : <div className={styles.container}>
                    <div className={styles.cardsList}>
                        {data.map(item => <DashboardPartnershipItem key={item.slug} data={item} />)}
                    </div>
                    <DashboardPartnershipFormCreate mutate={mutate} />
                </div>
            }
        </section>
    )
}

export default DashboardPartnershipSection