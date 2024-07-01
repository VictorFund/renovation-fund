"usr client"
import { usePathname } from 'next/navigation'
import { CldImage } from 'next-cloudinary'
import DashboardEditAndDelete from '../DashboardEditAndDelete/DashboardEditAndDelete'
import { changeStringTypeToArray } from '@/utils/changeStringTypeToArray';
import styles from '../DashboardComponents.module.scss'


const DashboardProjectItem = ({ data, isLoading, mutate }) => {
    const pathname = usePathname();
    const isList = pathname.endsWith("projects");

    let changedData = {};

    if (!isLoading) {
        changedData = changeStringTypeToArray(data);
    }


    return (
        <div className={styles.itemCard}>
            <p>Показувати на сайті? <span className='accentText'>{changedData.isApproved ? "Так" : "Ні"}</span></p>
            <p><span className='accentText'>Slug:</span> {changedData.slug}</p>
            <p><span className='accentText'>Заголовок:</span> {changedData.title}</p>
            <p><span className='accentText'>Заголовок англійською:</span> {changedData.titleEn}</p>
            <div className={styles.projectImgWrapper}>
                <CldImage
                    className={styles.projectImg}
                    fill
                    src={changedData.image}
                    sizes='40vw'
                    alt={`Photo of ${changedData.titleEn}`}
                />
            </div>
            <p><span className='accentText'>Короткий опис:</span> {changedData.shortDescription}</p>
            <p><span className='accentText'>Короткий опис англійською:</span> {changedData.shortDescriptionEn}</p>
            <p><span className='accentText'>Стан:</span> {changedData.state}</p>
            {changedData.startDate && <p><span className='accentText'>Дата початку:</span> {changedData.startDate}</p>}
            {changedData.sum && <p><span className='accentText'>Сума:</span> {changedData.sum}</p>}
            <p><span className='accentText'>Місія:</span> {changedData.mission}</p>
            <p><span className='accentText'>Місія англійською:</span> {changedData.missionEn}</p>
            <p><span className='accentText'>Мета:</span> {changedData.goal}</p>
            <p><span className='accentText'>Мета англійською:</span> {changedData.goalEn}</p>
            <p><span className='accentText'>Аудиторія:</span> {changedData.audience}</p>
            <p><span className='accentText'>Аудиторія англійською:</span> {changedData.audienceEn}</p>
            <p><span className='accentText'>Концепт:</span> {changedData.concept}</p>
            <p><span className='accentText'>Концепт англійською:</span> {changedData.conceptEn}</p>
            <div className={styles.projectDescriptionWrapper}>
                <span className='accentText'>Опис:</span>
                {changedData.description.map((item, index) => <p key={index}>{item}</p>)}
            </div>
            <div className={styles.projectDescriptionWrapper}>
                <span className='accentText'>Опис англійською:</span>
                {changedData.descriptionEn.map((item, index) => <p key={index}>{item}</p>)}
            </div>
            {changedData.link && <p className={styles.link}><span className='accentText'>Посилання на ресурс:</span> {changedData.link}</p>}

            {isList && (<DashboardEditAndDelete data={data} pathname={pathname} mutate={mutate} />)}
        </div>
    )
}

export default DashboardProjectItem