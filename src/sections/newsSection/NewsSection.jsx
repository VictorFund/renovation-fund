"use client"
import React from 'react'
import { GetDataWithPathname } from '@/fetch/clientFetch';

const NewsSection = () => {
    const { data } = GetDataWithPathname();
    console.log('data', data)

    return (
        <section>News Section</section>
    )
}

export default NewsSection