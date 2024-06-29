"use client"
import DashboardUser from '@/components/dashboard/DashboardUser/DashboardUser';
import Loader from '@/components/Loader/Loader';
import { GetDataWithPathname } from '@/fetch/clientFetch';
import { sortArrayByUpdate } from '@/utils/sortArrayByUpdate';
import styles from '../DashboardSections.module.scss';


const DashboardUsersSection = () => {
    const { data, isLoading, mutate } = GetDataWithPathname();

    let sortedByUpdateData = [];
    if (!isLoading) {
        sortedByUpdateData = sortArrayByUpdate(data)
    }


    return (
        <section>
            {isLoading ? <Loader />
                :
                <div className={styles.userCardsList}>
                    {sortedByUpdateData.map(item => <DashboardUser key={item.email} data={item} mutate={mutate} />)}
                </div>

            }</section>
    )
}

export default DashboardUsersSection