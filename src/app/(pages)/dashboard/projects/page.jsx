import DashboardProjectsSection from '@/sections/dashboard/dashboardProjectsSection/DashboardProjectsSection'
import { checkIsOwner } from '@/utils/checkIsOwner';


const DashboardProjectsPage = async () => {
    const isOwner = await checkIsOwner();


    return (
        <>
            <DashboardProjectsSection isOwner={isOwner} />
        </>
    )
}


export default DashboardProjectsPage