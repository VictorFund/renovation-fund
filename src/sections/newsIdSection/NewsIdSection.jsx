"use client"
import NewsItem from '@/components/NewsItem/NewsItem'
import Loader from '@/components/Loader/Loader'
import { GetDataWithPathname } from '@/fetch/clientFetch'


const NewsIdSection = () => {
    const { data, isLoading } = GetDataWithPathname();


    return (
        <section className="pageSection">
            <div className="container">
                {isLoading
                    ? <Loader />
                    : <NewsItem data={data} isLoading={isLoading} />
                }
            </div>
        </section>
    )
}


export default NewsIdSection