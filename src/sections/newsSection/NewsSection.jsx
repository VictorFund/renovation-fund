"use client"
import Loader from '@/components/Loader/Loader';
import { GetDataWithPathname } from '@/fetch/clientFetch';
import { sortArrayByUpdate } from '@/utils/sortArrayByUpdate';
import styles from './NewsSection.module.scss'
import NewsCard from '@/components/NewsCard/NewsCard';
import { useTranslation } from 'react-i18next';

const NewsSection = () => {
    const { data, isLoading } = GetDataWithPathname();

    const {t}=useTranslation();

    let filteredByIsApproved = []
    let sortedByUpdateData = [];
    if (!isLoading) {
        sortedByUpdateData = sortArrayByUpdate(data)
        filteredByIsApproved = sortedByUpdateData.filter(item => item.isApproved)
    }


    return (
        <section className="pageSection">
            <div className="container">
                {isLoading
                    ? <Loader />
                    : <>
                        <h1 className={`sectionTitle ${styles.title}`}>{t('NewsPage.Title')}</h1>
                        <ul className={styles.list}>
                            {filteredByIsApproved.map((item, index) => <NewsCard key={index} data={item} />)}
                        </ul>
                    </>}
            </div>
        </section>
    )
}

export default NewsSection