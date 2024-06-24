"use client"
import React from 'react'
import { GetDataWithPathname } from '@/fetch/clientFetch';
import DashboardPartnershipItem from '@/components/dashboard/DashboardPartnershipItem/DashboardPartnershipItem';
import DashboardPartnershipFormUpdate from '@/components/dashboard/DashboardPartnershipFormUpdate/DashboardPartnershipFormUpdate';
import Loader from '@/components/Loader/Loader';


const DashboardPartnershipIdSection = () => {
    const { data, isLoading } = GetDataWithPathname();
    console.log('data', data)

    return (
        <section>
            {isLoading
                ? <Loader />
                : <>
                    <h1>DashboardPartnershipId Section</h1>
                    <DashboardPartnershipItem />
                    <DashboardPartnershipFormUpdate />
                </>
            }
        </section>
    )
}

export default DashboardPartnershipIdSection