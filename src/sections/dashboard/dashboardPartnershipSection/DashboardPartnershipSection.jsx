"use client"
import React from 'react'
import { GetDataWithPathname } from '@/fetch/clientFetch';
import DashboardPartnershipItem from '@/components/dashboard/DashboardPartnershipItem/DashboardPartnershipItem';
import DashboardPartnershipFormCreate from '@/components/dashboard/DashboardPartnershipFormCreate/DashboardPartnershipFormCreate';


const DashboardPartnershipSection = () => {
    const { data, isLoading } = GetDataWithPathname();
    console.log('data', data)


    return (
        <section>
            {isLoading
                ? <p>Loading...</p>
                : <>
                    <h1>DashboardPartnershipSection</h1>
                    {data.map(item => <DashboardPartnershipItem key={item.slug} />)}
                    <DashboardPartnershipFormCreate />
                </>
            }
        </section>
    )
}

export default DashboardPartnershipSection