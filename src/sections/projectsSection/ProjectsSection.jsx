"use client"
import React from 'react'
import { GetDataWithPathname } from '@/fetch/clientFetch';


export const ProjectsSection = () => {
    const { data } = GetDataWithPathname();
    console.log('data', data)

    return (
        <section>ProjectsSection</section>
    )
}
