"use client"
import React from 'react'
import { GetDataWithPathname } from '@/fetch/clientFetch';


const DashboardProjectIdSection = () => {
    const { data } = GetDataWithPathname();
    console.log('data', data)

    return (
        <section>DashboardProjectId Section</section>
    )
}

export default DashboardProjectIdSection