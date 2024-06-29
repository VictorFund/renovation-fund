"usr client"
import { CldImage } from 'next-cloudinary'
import styles from '../DashboardComponents.module.scss'


const DashboardProjectItem = ({ data, isLoading }) => {
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
    console.log('data', data)
    console.log('changedData', changedData)
    return (
        <div className={styles.itemCard}>
            <p>Показувати на сайті?  {changedData.isApproved ? "Так" : "Ні"}</p>
            <p>{changedData.slug}</p>
            <p>{changedData.title}</p>
            <p>{changedData.titleEn}</p>
            <div className={styles.projectImgWrapper}>
                <CldImage
                    className={styles.projectImg}
                    fill
                    src={changedData.image}
                    sizes='40vw'
                    alt={`Photo of ${changedData.titleEn}`}
                />
            </div>
            <p>{changedData.shortDescription}</p>
            <p>{changedData.shortDescriptionEn}</p>
            <p>{changedData.state}</p>
            {changedData.startDate && <p>{changedData.startDate}</p>}
            {changedData.sum && <p>{changedData.sum}</p>}
            <p>{changedData.mission}</p>
            <p>{changedData.missionEn}</p>
            <p>{changedData.goal}</p>
            <p>{changedData.goalEn}</p>
            <p>{changedData.audience}</p>
            <p>{changedData.audienceEn}</p>
            <p>{changedData.concept}</p>
            <p>{changedData.conceptEn}</p>
            <div className={styles.projectDescriptionWrapper}>
                {changedData.description.map((item, index) => <p key={index}>{item}</p>)}
            </div>
            <div className={styles.projectDescriptionWrapper}>
                {changedData.descriptionEn.map((item, index) => <p key={index}>{item}</p>)}
            </div>
            {changedData.link && <p className={styles.link}>{changedData.link}</p>}
        </div>
    )
}

export default DashboardProjectItem