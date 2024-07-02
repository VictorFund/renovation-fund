import DashboardNewsIdSection from '@/sections/dashboard/dashboardNewsIdSection/DashboardNewsIdSection'
import { checkIsOwner } from '@/utils/checkIsOwner';


const DashboardNewsIdPage = async () => {
    const isOwner = await checkIsOwner();

    return (
        <>
            <DashboardNewsIdSection isOwner={isOwner} />
        </>
    )
}


export default DashboardNewsIdPage