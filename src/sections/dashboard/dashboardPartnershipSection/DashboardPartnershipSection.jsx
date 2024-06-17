"use client"
import React from 'react'
import { GetDataWithPathname } from '@/fetch/clientFetch';


const DashboardPartnershipSection = () => {
    const { data } = GetDataWithPathname();
    console.log('data', data)


    return (
        <section>DashboardPartnershipSection</section>
    )
}

export default DashboardPartnershipSection