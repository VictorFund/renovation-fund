"use client"
import React from 'react'
import { GetDataWithPathname } from '@/fetch/clientFetch';
import DashboardProjectItem from '@/components/dashboard/DashboardProjectItem/DashboardProjectItem';
import DashboardProjectFormUpdate from '@/components/dashboard/DashboardProjectFormUpdate/DashboardProjectFormUpdate';


const DashboardProjectIdSection = () => {
    const { data, isLoading } = GetDataWithPathname();
    console.log('data', data)

    return (
        <section>
            {isLoading
                ? <p>Loading...</p>
                : <>
                    <h1>DashboardProjectId Section</h1>
                    <DashboardProjectItem />
                    <DashboardProjectFormUpdate />
                </>
            }
        </section>
    )
}

export default DashboardProjectIdSection