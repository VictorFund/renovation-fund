"use client"
import React from 'react'
import { GetDataWithPathname } from '@/fetch/clientFetch';


const DashboardTeamSection = () => {
    const { data } = GetDataWithPathname();
    console.log('data', data)

    return (
        <section>DashboardTeamSection</section>
    )
}

export default DashboardTeamSection