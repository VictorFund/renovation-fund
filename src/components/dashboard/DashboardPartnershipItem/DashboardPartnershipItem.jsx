"use client"
import { usePathname } from 'next/navigation'
import { CldImage } from 'next-cloudinary'
import DashboardEditAndDelete from '../DashboardEditAndDelete/DashboardEditAndDelete'
import styles from '../DashboardComponents.module.scss'


const DashboardPartnershipItem = ({ data, mutate }) => {
    const pathname = usePathname();
    const isList = pathname.endsWith("partnership");


    return (
        <div className={styles.itemCard}>
            <p>Показувати на сайті? <span className='accentText'>{data.isApproved ? "Так" : "Ні"}</span></p>
            <p><span className='accentText'>Slug:</span> {data.slug}</p>
            <p><span className='accentText'>Заголовок:</span> {data.title}</p>
            <p><span className='accentText'>Заголовок англійською:</span> {data.titleEn}</p>
            <p><span className='accentText'>Головний партнер:</span> {data.isMainPartner ? "Так" : "Ні"}</p>
            <div className={styles.partnershipImgWrapper}>
                <CldImage
                    className={styles.partnershipImg}
                    fill
                    src={data.logo}
                    sizes='40vw'
                    alt={`Logo of ${data.titleEn}`}
                />
            </div>
            {data.siteLink && <p><span className='accentText'>Посилання на ресурс:</span> {data.siteLink}</p>}

            {isList && (<DashboardEditAndDelete data={data} pathname={pathname} mutate={mutate} />)}
        </div>
    )
}

export default DashboardPartnershipItem