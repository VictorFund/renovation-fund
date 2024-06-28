"use client"
import { CldImage } from 'next-cloudinary'
import styles from '../DashboardComponents.module.scss'


const DashboardPartnershipItem = ({ data }) => {
    return (
        <div className={styles.itemCard}>
            <p>Показувати на сайті?  {data.isApproved ? "Так" : "Ні"}</p>
            <p>{data.slug}</p>
            <p>{data.title}</p>
            <p>{data.titleEn}</p>
            <p>Головний партнер:  {data.isMainPartner ? "Так" : "Ні"}</p>
            <div className={styles.partnershipImgWrapper}>
                <CldImage
                    className={styles.partnershipImg}
                    fill
                    src={data.logo}
                    sizes='40vw'
                    alt={`Logo of ${data.titleEn}`}
                />
            </div>
            {data.siteLink && <p>{data.siteLink}</p>}
        </div>
    )
}

export default DashboardPartnershipItem