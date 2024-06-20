"use client"
import React from 'react'
import { GetDataWithPathname } from '@/fetch/clientFetch';
import DashboardNewsItem from '@/components/dashboard/DashboardNewsItem/DashboardNewsItem';
import DashboardNewsFormCreate from '@/components/dashboard/DashboardNewsFormCreate/DashboardNewsFormCreate';


const DashboardNewsSection = () => {
    const { data, isLoading } = GetDataWithPathname();
    console.log('data', data)

    return (
        <section>
            {isLoading
                ? <p>Loading...</p>
                : <>
                    <h1>DashboardNewsSection</h1>
                    {data.map(item => <DashboardNewsItem key={item.slug} />)}
                    <DashboardNewsFormCreate />
                </>
            }
        </section>
    )
}

export default DashboardNewsSection