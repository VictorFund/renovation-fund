"use client"
import React from 'react'
import { GetDataWithPathname } from '@/fetch/clientFetch';


const DashboardTeamIdSection = () => {
    const { data } = GetDataWithPathname();
    console.log('data', data)

    return (
        <section>DashboardTeamId Section</section>
    )
}

export default DashboardTeamIdSection