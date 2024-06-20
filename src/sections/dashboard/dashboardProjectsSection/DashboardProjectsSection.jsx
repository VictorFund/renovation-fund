"use client"
import React from 'react'
import { GetDataWithPathname } from '@/fetch/clientFetch';
import DashboardProjectItem from '@/components/dashboard/DashboardProjectItem/DashboardProjectItem';
import DashboardProjectFormCreate from '@/components/dashboard/DashboardProjectFormCreate/DashboardProjectFormCreate';


const DashboardProjectsSection = () => {
    const { data, isLoading } = GetDataWithPathname();
    console.log('data', data)


    return (
        <section>
            {isLoading
                ? <p>Loading...</p>
                : <>
                    <h1>DashboardProjectsSection</h1>
                    {data.map(item => <DashboardProjectItem key={item.slug} />)}
                    <DashboardProjectFormCreate />
                </>
            }
        </section>
    )
}

export default DashboardProjectsSection