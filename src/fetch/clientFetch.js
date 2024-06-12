'use client';
import { usePathname } from 'next/navigation';
import useSWR from 'swr';


// universal for data and dataId with usePathname
export const GetDataWithPathname = () => {
    const pathname = usePathname();
    console.log('pathname', pathname)
    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    return useSWR(`/api${pathname}`, fetcher);
};