"use client";
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { CldImage } from 'next-cloudinary';
import DashboardEditAndDelete from '../DashboardEditAndDelete/DashboardEditAndDelete';
import styles from '../DashboardComponents.module.scss';


const DashboardPartnershipItem = ({ data, mutate, isOwner }) => {
    const pathname = usePathname();
    const isList = pathname.endsWith("partnership");


    return (
        <div className={styles.itemCard}>
            <p>Показувати на сайті? <span className='accentText'>{data.isApproved ? "Так" : "Ні"}</span></p>
            {isOwner && <p><span className='accentText'>Редактор:</span> {data.editor}</p>}
            <p><span className='accentText'>Slug:</span> {data.slug}</p>
            <p><span className='accentText'>Заголовок:</span> {data.title}</p>
            <p><span className='accentText'>Заголовок англійською:</span> {data.titleEn}</p>
            <p><span className='accentText'>Головний партнер:</span> {data.isMainPartner ? "Так" : "Ні"}</p>
            <div className={styles.partnershipImgWrapper}>
                {data.logo
                    ? < CldImage
                        className={styles.partnershipImg}
                        fill
                        src={data.logo}
                        sizes='40vw'
                        alt={`Logo of ${data.titleEn}`}
                    />
                    : <Image
                        className={styles.partnershipImg}
                        fill
                        src={'/images/no-image.webp'}
                        sizes='40vw'
                        alt={`Logo of ${data.titleEn}`}
                    />
                }
            </div>
            {data.siteLink && <p className={styles.link}><span className='accentText'>Посилання на ресурс:</span> {data.siteLink}</p>}

            {isList && (<DashboardEditAndDelete data={data} pathname={pathname} mutate={mutate} isOwner={isOwner} />)}
        </div>
    )
}

export default DashboardPartnershipItem