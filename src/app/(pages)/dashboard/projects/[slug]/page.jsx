import DashboardProjectIdSection from '@/sections/dashboard/dashboardProjectIdSection/DashboardProjectIdSection'
import { checkIsOwner } from '@/utils/checkIsOwner';


const DashboardProjectIdPage = async () => {
    const isOwner = await checkIsOwner();


    return (
        <>
            <DashboardProjectIdSection isOwner={isOwner} />
        </>
    )
}


export default DashboardProjectIdPage