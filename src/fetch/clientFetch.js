"use client";
import { usePathname } from "next/navigation";
import useSWR from "swr";

// for data fetching on HomePage
export const GetDataForHomeByCollection = (collection) => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  return useSWR(`/api/${collection}`, fetcher);
};

// universal for data and dataId with usePathname
export const GetDataWithPathname = () => {
  const pathname = usePathname();
  let changedPathname = pathname;

  if (pathname.startsWith("/dashboard/")) {
    changedPathname = pathname.slice(10);
  }

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  return useSWR(`/api${changedPathname}`, fetcher);
};
