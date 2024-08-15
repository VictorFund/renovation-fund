'usr client';
import { usePathname } from 'next/navigation';
import { CldImage } from 'next-cloudinary';
import DashboardEditAndDelete from '../DashboardEditAndDelete/DashboardEditAndDelete';
import { changeStringTypeToArray } from '@/utils/changeStringTypeToArray';
import styles from '../DashboardComponents.module.scss';


const DashboardNewsItem = ({ data, isLoading, mutate, isOwner }) => {
    const pathname = usePathname();
    const isList = pathname.endsWith("news");

    let changedData = {};

    if (!isLoading) {
        changedData = changeStringTypeToArray(data);
    }


    return (
        <div className={styles.itemCard}>
            <p>Показувати на сайті? <span className='accentText'>{changedData.isApproved ? "Так" : "Ні"}</span></p>
            {isOwner && <p><span className='accentText'>Редактор:</span> {changedData.editor}</p>}
            <p><span className='accentText'>Slug:</span> {changedData.slug}</p>
            <p><span className='accentText'>Заголовок:</span> {changedData.title}</p>
            <p><span className='accentText'>Заголовок англійською:</span> {changedData.titleEn}</p>
            <div className={styles.newsImgWrapper}>
                <CldImage
                    className={styles.newsImg}
                    fill
                    src={changedData.image}
                    sizes='40vw'
                    alt={`Photo of ${changedData.titleEn}`}
                />
            </div>
            <div className={styles.newsDescriptionWrapper}>
                <span className='accentText'>Опис:</span>
                {changedData.description.map((item, index) => <p key={index}>{item}</p>)}
            </div>
            <div className={styles.newsDescriptionWrapper}>
                <span className='accentText'>Опис англійською:</span>
                {changedData.descriptionEn.map((item, index) => <p key={index}>{item}</p>)}
            </div>
            {changedData.link && <p className={styles.link}><span className='accentText'>Посилання на ресурс:</span> {changedData.link}</p>}
            {isList && (<DashboardEditAndDelete data={data} pathname={pathname} mutate={mutate} isOwner={isOwner} />)}
        </div>
    )
}

export default DashboardNewsItem