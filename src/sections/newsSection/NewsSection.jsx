"use client"
import { GetDataWithPathname } from '@/fetch/clientFetch';
import React from 'react'

const NewsSection = () => {
    const { data } = GetDataWithPathname();
    console.log('data', data)

    return (
        <section>News Section</section>
    )
}

export default NewsSection