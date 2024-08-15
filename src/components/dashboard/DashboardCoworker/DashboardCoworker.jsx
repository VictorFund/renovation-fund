'usr client';
import { usePathname } from 'next/navigation';
import { CldImage } from 'next-cloudinary';
import DashboardEditAndDelete from '../DashboardEditAndDelete/DashboardEditAndDelete';
import styles from '../DashboardComponents.module.scss';


const DashboardCoworker = ({ data, mutate, isOwner }) => {
    const pathname = usePathname();
    const isList = pathname.endsWith("team");

    return (
        <div className={styles.itemCard}>
            <p>Показувати на сайті?  <span className='accentText'>{data.isApproved ? "ТАК" : "НІ"}</span></p>
            {isOwner && <p><span className='accentText'>Редактор:</span> {data.editor}</p>}
            <p><span className='accentText'>Slug:</span> {data.slug}</p>
            <p><span className='accentText'>Пріоритет:</span> {data.priority}</p>
            <p><span className='accentText'>Ім’я:</span> {data.name}</p>
            <p><span className='accentText'>Ім’я англійською :</span> {data.nameEn}</p>
            <p><span className='accentText'>Опис:</span> {data.description}</p>
            <p><span className='accentText'>Опис англійською:</span> {data.descriptionEn}</p>
            <div className={styles.coworkerImgWrapper}>
                <CldImage
                    className={styles.coworkerImg}
                    fill
                    src={data.photo}
                    sizes='40vw'
                    alt={`Photo of ${data.nameEn}`}
                />
            </div>

            {isList && (<DashboardEditAndDelete data={data} pathname={pathname} mutate={mutate} isOwner={isOwner} />)}
        </div>
    )
}

export default DashboardCoworker