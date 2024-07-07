import Link from 'next/link'
import { CldImage } from 'next-cloudinary'
import { useTranslation } from 'react-i18next';
import { currentLanguages } from '@/data';
import HorizontalLine from '../HorizontalLine/HorizontalLine'
import { formatDate } from '@/utils/formatDate';
import { changeStringTypeToArray } from '@/utils/changeStringTypeToArray';
import styles from './NewsItem.module.scss'


const NewsItem = ({ data, isLoading }) => {
    const { i18n, t } = useTranslation();

    const formattedDate = formatDate(data.createdAt);

    let changedData = {}
    if (!isLoading) {
        changedData = changeStringTypeToArray(data);
    }

    const descByLanguage =
        i18n.language === currentLanguages.EN
            ? changedData?.descriptionEn
            : changedData?.description;


    return (
        <div className={styles.item}>
            <h1 className={`sectionTitle ${styles.title}`}>{i18n.language === currentLanguages.EN ? changedData.titleEn : changedData.title}</h1>
            <p className={styles.date}>{formattedDate}</p>
            <HorizontalLine className={styles.line} />

            <div className={styles.imgWrapper}>
                <CldImage
                    className={styles.img}
                    fill
                    src={changedData.image}
                    sizes='100vw'
                    alt={i18n.language === currentLanguages.EN ? changedData.titleEn : changedData.title}
                />
            </div>

            <div className={styles.textWrapper}>
                {descByLanguage.map((item, index) => (<p key={index} className={`regularText ${styles.text}`}>{item}</p>))}
            </div>

            {changedData.link && <Link className={`regularText ${styles.link}`} href={changedData.link}>Детальніше...</Link>}
            <HorizontalLine className='' />
        </div>
    )
}


export default NewsItem