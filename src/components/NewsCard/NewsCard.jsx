import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import { formatDate } from '@/utils/formatDate';
import styles from './NewsCard.module.scss';


const NewsCard = ({ data }) => {
    const formattedDate = formatDate(data.createdAt);

    return (
        <>
            <li className={`${styles.card} ${styles.forMobile}`}>
                <Link href={`/news/${data.slug}`} className={styles.link}>
                    <h4 className={`regularText ${styles.title}`}>{data.title}</h4>
                    <p className={styles.date}>{formattedDate}</p>
                    <div className={styles.imgWrapper}>
                        <CldImage
                            className={styles.img}
                            fill
                            src={data.image}
                            sizes="248px"
                            alt={data.title} />
                    </div>
                </Link>
            </li>

            <li className={`${styles.card} ${styles.fromTablet}`}>
                <div className={styles.imgWrapper}>
                    <CldImage
                        className={styles.img}
                        fill
                        src={data.image}
                        sizes="239px"
                        alt={data.title} />
                </div>
                <h4 className={`regularText ${styles.title}`}>{data.title}</h4>

                <Link href={`/news/${data.slug}`} className={styles.btn}>
                    Детальніше
                </Link>
            </li>
        </>
    );
};

export default NewsCard;