"use client"
import React from 'react'
import { GetDataWithPathname } from '@/fetch/clientFetch';


const DashboardNewsIdSection = () => {
    const { data } = GetDataWithPathname();
    console.log('data', data)

    return (
        <section>DashboardNewsId Section</section>
    )
}


export default DashboardNewsIdSection