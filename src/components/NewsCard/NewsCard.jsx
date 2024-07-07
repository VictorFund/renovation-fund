import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { currentLanguages } from '@/data';
import { formatDate } from '@/utils/formatDate';
import styles from './NewsCard.module.scss';


const NewsCard = ({ data }) => {
    const { slug, title, titleEn, image, createdAt } = data;

    const { i18n, t } = useTranslation();

    const formattedDate = formatDate(createdAt);


    return (
        <>
            <li className={`${styles.card} ${styles.forMobile}`}>
                <Link href={`/news/${slug}`} className={styles.link}>
                    <h4 className={`regularText ${styles.title}`}>{i18n.language === currentLanguages.EN ? titleEn : title}</h4>
                    <p className={styles.date}>{formattedDate}</p>
                    <div className={styles.imgWrapper}>
                        <CldImage
                            className={styles.img}
                            fill
                            src={image}
                            sizes="248px"
                            alt={i18n.language === currentLanguages.EN ? titleEn : title} />
                    </div>
                </Link>
            </li>

            <li className={`${styles.card} ${styles.fromTablet}`}>
                <div className={styles.imgWrapper}>
                    <CldImage
                        className={styles.img}
                        fill
                        src={image}
                        sizes="239px"
                        alt={i18n.language === currentLanguages.EN ? titleEn : title} />
                </div>
                <h4 className={`regularText ${styles.title}`}>{i18n.language === currentLanguages.EN ? titleEn : title}</h4>

                <Link href={`/news/${slug}`} className={styles.btn}>
                    Детальніше
                </Link>
            </li>
        </>
    );
};

export default NewsCard;