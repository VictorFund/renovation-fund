"use client"
import React from 'react'
import { GetDataWithPathname } from '@/fetch/clientFetch';


const ReportingSection = () => {
    const { data } = GetDataWithPathname();
    console.log('data', data)

    return (
        <section>ReportingSection</section>
    )
}

export default ReportingSection