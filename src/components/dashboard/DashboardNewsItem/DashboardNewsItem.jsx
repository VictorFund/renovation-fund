"usr client"
import { CldImage } from 'next-cloudinary'
import styles from '../DashboardComponents.module.scss'


const DashboardNewsItem = ({ data, isLoading }) => {
    let changedData = { ...data };

    if (!isLoading) {
        if (
            typeof changedData.description === "string" &&
            typeof changedData.descriptionEn === "string"
        ) {
            if (changedData.description.includes(" | ") || changedData.descriptionEn.includes(" | ")) {
                changedData.description = changedData.description.split(" | ");
                changedData.descriptionEn = changedData.descriptionEn.split(" | ");
            }
            else {
                changedData.description = [changedData.description];
                changedData.descriptionEn = [changedData.descriptionEn];
            }
        }
    }

    return (
        <div className={styles.itemCard}>
            <p>Показувати на сайті?  {changedData.isApproved ? "Так" : "Ні"}</p>
            <p>{changedData.slug}</p>
            <p>{changedData.title}</p>
            <p>{changedData.titleEn}</p>
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
                {changedData.description.map((item, index) => <p key={index}>{item}</p>)}
            </div>
            <div className={styles.newsDescriptionWrapper}>
                {changedData.descriptionEn.map((item, index) => <p key={index}>{item}</p>)}
            </div>
            {changedData.link && <p>{changedData.link}</p>}
        </div>
    )
}

export default DashboardNewsItem