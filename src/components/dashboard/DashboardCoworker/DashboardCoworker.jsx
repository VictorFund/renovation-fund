"usr client"
import { CldImage } from 'next-cloudinary'
import styles from '../DashboardComponents.module.scss'


const DashboardCoworker = ({ data }) => {


    return (
        <div className={styles.itemCard}>
            <p>Показувати на сайті?  {data.isApproved ? "Так" : "Ні"}</p>
            <p>{data.slug}</p>
            <p>{data.name}</p>
            <p>{data.nameEn}</p>
            <p>{data.description}</p>
            <p>{data.descriptionEn}</p>
            <div className={styles.coworkerImgWrapper}>
                <CldImage
                    className={styles.coworkerImg}
                    fill
                    src={data.photo}
                    sizes='40vw'
                    alt={`Photo of ${data.nameEn}`}
                />
            </div>
        </div>
    )
}

export default DashboardCoworker