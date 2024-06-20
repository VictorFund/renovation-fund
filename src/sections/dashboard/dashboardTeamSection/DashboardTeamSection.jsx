"use client"
import React from 'react'
import { GetDataWithPathname } from '@/fetch/clientFetch';
import DashboardCoworker from '@/components/dashboard/DashboardCoworker/DashboardCoworker';
import DashboardCoworkerFormCreate from '@/components/dashboard/DashboardCoworkerFormCreate/DashboardCoworkerFormCreate';


const DashboardTeamSection = () => {
    const { data, isLoading } = GetDataWithPathname();
    console.log('data', data)

    return (
        <section>
            {isLoading
                ? <p>Loading...</p>
                : <>
                    <h1>DashboardTeamSection</h1>
                    {data.map(item => <DashboardCoworker key={item.slug} />)}
                    <DashboardCoworkerFormCreate />
                </>
            }
        </section>
    )
}

export default DashboardTeamSection