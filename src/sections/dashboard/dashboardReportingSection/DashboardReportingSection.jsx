"use client"
import React from 'react'
import { GetDataWithPathname } from '@/fetch/clientFetch';


const DashboardReportingSection = () => {
    const { data } = GetDataWithPathname();
    console.log('data', data)


    return (
        <section>DashboardReportingSection</section>
    )
}

export default DashboardReportingSection