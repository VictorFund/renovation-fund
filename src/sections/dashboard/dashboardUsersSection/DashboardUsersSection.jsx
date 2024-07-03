"use client"
import DashboardUser from '@/components/dashboard/DashboardUser/DashboardUser';
import Loader from '@/components/Loader/Loader';
import { GetDataWithPathname } from '@/fetch/clientFetch';
import { sortArrayByUpdate } from '@/utils/sortArrayByUpdate';
import styles from '../DashboardSections.module.scss';


const DashboardUsersSection = ({ isOwner }) => {
    const { data, isLoading, mutate } = GetDataWithPathname();

    let sortedByUpdateData = [];
    if (!isLoading) {
        sortedByUpdateData = sortArrayByUpdate(data)
    }

    const dataWithoutOwner = sortedByUpdateData.filter(item => item.email !== process.env.NEXT_PUBLIC_OWNER)

    return (
        <section>
            {isLoading ? <Loader />
                :
                <div className={styles.userCardsList}>
                    {dataWithoutOwner.map(item => <DashboardUser key={item.email} data={item} mutate={mutate} isOwner={isOwner} />)}
                </div>

            }</section>
    )
}

export default DashboardUsersSection