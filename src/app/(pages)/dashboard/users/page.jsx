import DashboardUsersSection from '@/sections/dashboard/dashboardUsersSection/DashboardUsersSection'
import { checkIsOwner } from '@/utils/checkIsOwner';


const UsersPage = async () => {
    const isOwner = await checkIsOwner();


    return (
        <>
            <DashboardUsersSection isOwner={isOwner} />
        </>
    )
}


export default UsersPage