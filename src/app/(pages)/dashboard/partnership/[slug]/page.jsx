import DashboardPartnershipIdSection from '@/sections/dashboard/dashboardPartnershipIdSection/DashboardPartnershipIdSection'
import { checkIsOwner } from '@/utils/checkIsOwner';


const DashboardPartnershipIdPage = async () => {
    const isOwner = await checkIsOwner();


    return (
        <div>
            <DashboardPartnershipIdSection isOwner={isOwner} />
        </div>
    )
}


export default DashboardPartnershipIdPage