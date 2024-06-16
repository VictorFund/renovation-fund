"use client"
import React from 'react'
import { GetDataWithPathname } from '@/fetch/clientFetch';


const DashboardProjectsSection = () => {
    const { data } = GetDataWithPathname();
    console.log('data', data)


    return (
        <section>DashboardProjectsSection</section>
    )
}

export default DashboardProjectsSection