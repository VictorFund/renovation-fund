"use client"
import React from 'react'
import { GetDataWithPathname } from '@/fetch/clientFetch';
import DashboardNewsItem from '@/components/dashboard/DashboardNewsItem/DashboardNewsItem';
import DashboardNewsFormUpdate from '@/components/dashboard/DashboardNewsFormUpdate/DashboardNewsFormUpdate';


const DashboardNewsIdSection = () => {
    const { data, isLoading } = GetDataWithPathname();
    console.log('data', data)

    return (
        <section>
            {isLoading
                ? <p>Loading...</p>
                : <>
                    <h1>DashboardNewsId Section</h1>
                    <DashboardNewsItem />
                    <DashboardNewsFormUpdate />
                </>
            }
        </section>
    )
}


export default DashboardNewsIdSection