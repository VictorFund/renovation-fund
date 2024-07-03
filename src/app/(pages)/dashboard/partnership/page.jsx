import DashboardPartnershipSection from '@/sections/dashboard/dashboardPartnershipSection/DashboardPartnershipSection'
import { checkIsOwner } from '@/utils/checkIsOwner';


const DashboardPartnershipPage = async () => {
    const isOwner = await checkIsOwner();


    return (
        <>
            <DashboardPartnershipSection isOwner={isOwner} />
        </>
    )
}


export default DashboardPartnershipPage