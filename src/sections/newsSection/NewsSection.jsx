"use client"
import Link from 'next/link';
import Loader from '@/components/Loader/Loader';
import { GetDataWithPathname } from '@/fetch/clientFetch';
import { sortArrayByUpdate } from '@/utils/sortArrayByUpdate';
import styles from './NewsSection.module.scss'


const NewsSection = () => {
    const { data, isLoading } = GetDataWithPathname();

    let sortedByUpdateData = [];
    if (!isLoading) {
        sortedByUpdateData = sortArrayByUpdate(data)
    }


    return (
        <section className="pageSection">
            <div className="container">
                {isLoading
                    ? <Loader />
                    : <div>
                        {sortedByUpdateData.map((item, index) => <Link key={index} href={`/news/${item.slug}`} className={styles.item}>{item.title}</Link>)}
                    </div>}
            </div>
        </section>
    )
}

export default NewsSection