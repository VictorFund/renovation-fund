import DashboardTeamIdSection from '@/sections/dashboard/dashboardTeamIdSection/DashboardTeamIdSection'
import { checkIsOwner } from '@/utils/checkIsOwner';


const DashboardTeamIdPage = async () => {
    const isOwner = await checkIsOwner();


    return (
        <div>
            <DashboardTeamIdSection isOwner={isOwner} />
        </div>
    )
}


export default DashboardTeamIdPage