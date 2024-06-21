"use client"
import React from 'react'
import { GetDataWithPathname } from '@/fetch/clientFetch';
import DashboardUser from '@/components/dashboard/DashboardUser/DashboardUser';
import Loading from '@/components/Loading/Loading';


const DashboardUsersSection = () => {
    const { data, isLoading } = GetDataWithPathname();
    console.log('data', data)

    return (
        <section>
            {isLoading ? <Loading />
                : <>
                    <h1>DashboardUsers Section</h1>
                    {data.map(item => <DashboardUser key={item.email} />)}
                </>
            }</section>
    )
}

export default DashboardUsersSection