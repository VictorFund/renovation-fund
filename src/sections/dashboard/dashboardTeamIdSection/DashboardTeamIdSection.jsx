"use client"
import React from 'react'
import { GetDataWithPathname } from '@/fetch/clientFetch';
import DashboardCoworker from '@/components/dashboard/DashboardCoworker/DashboardCoworker';
import DashboardCoworkerFormUpdate from '@/components/dashboard/DashboardCoworkerFormUpdate/DashboardCoworkerFormUpdate';


const DashboardTeamIdSection = () => {
    const { data, isLoading } = GetDataWithPathname();
    console.log('data', data)

    return (
        <section>
            {isLoading
                ? <p>Loading...</p>
                : <>
                    <h1>DashboardTeamId Section</h1>
                    <DashboardCoworker />
                    <DashboardCoworkerFormUpdate />
                </>
            }
        </section>
    )
}

export default DashboardTeamIdSection