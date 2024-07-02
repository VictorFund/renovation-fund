import DashboardNewsSection from '@/sections/dashboard/dashboardNewsSection/DashboardNewsSection'
import { checkIsOwner } from '@/utils/checkIsOwner'


const DashboardNewsPage = async () => {
    const isOwner = await checkIsOwner();


    return (
        <>
            <DashboardNewsSection isOwner={isOwner} />
        </>
    )
}


export default DashboardNewsPage