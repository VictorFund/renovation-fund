"use client"
import React from 'react'
import { GetDataWithPathname } from '@/fetch/clientFetch';
import DashboardUser from '@/components/dashboard/DashboardUser/DashboardUser';


const DashboardUsersSection = () => {
    const { data, isLoading } = GetDataWithPathname();
    console.log('data', data)

    return (
        <section>
            {isLoading
                ? <p>Loading...</p>
                : <>
                    <h1>DashboardUsers Section</h1>
                    {data.map(item => <DashboardUser key={item.email} />)}
                </>
            }</section>
    )
}

export default DashboardUsersSection