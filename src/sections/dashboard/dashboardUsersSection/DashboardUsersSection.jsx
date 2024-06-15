"use client"
import React from 'react'
import { GetDataWithPathname } from '@/fetch/clientFetch';


const DashboardUsersSection = () => {
    const { data } = GetDataWithPathname();
    console.log('data', data)

    return (
        <section>DashboardUsers Section</section>
    )
}

export default DashboardUsersSection