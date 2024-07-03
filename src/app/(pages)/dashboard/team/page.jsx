import DashboardTeamSection from '@/sections/dashboard/dashboardTeamSection/DashboardTeamSection'
import { checkIsOwner } from '@/utils/checkIsOwner';


const DashboardTeamPage = async () => {
    const isOwner = await checkIsOwner();


    return (
        <>
            <DashboardTeamSection isOwner={isOwner} />
        </>
    )
}


export default DashboardTeamPage