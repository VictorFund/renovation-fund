// "use client"
// import React from 'react'
// import { CldImage } from 'next-cloudinary'
// import HorizontalLine from '@/components/HorizontalLine/HorizontalLine'
// import styles from './NewsIdSection.module.scss'


// const NewsIdSection = () => {
//     return (
//         <section className="pageSection">
//             <div className="container">
//                 <h1 className={`sectionTitle ${styles.title}`}>Як стати волонтером разом з нами?</h1>
//                 <p className={styles.date}>1 травня 2024</p>
//                 <HorizontalLine className={styles.line} />
//                 <div className={styles.imgWrapper}>
//                     <CldImage
//                         className={styles.img}
//                         fill
//                         src='newsId_iw50ca'
//                         sizes='100vw'
//                         alt='Monument of Independence in Kyiv'
//                     />
//                 </div>
//                 <p className={`regularText ${styles.text}`}>Вона поділилася з Фундацією Темертеїв та її засновниками першочерговими викликами для Фундації Олени Зеленської та її підопічних. Зокрема, Фундація продовжує опікуватися внутрішньо переміщеними українцями, яким треба допомогти розпочати нове життя у тимчасовому житлі.Одним із пріоритетних напрямків допомоги Фундації залишається підтримка великих прийомних родин.
//                     Це звичайні родини, де батьки виховують від 5 до 10 дітей сиріт, або дітей позбавлених батьківського піклування. У 2023 році Фундація розпочала проєкт &quot;Адреса дитинства&quot; для таких сімей, які втратили житло через війну.Фундація продовжує забезпечення учнів та вчителів гаджетами для дистанційного навчання. Загалом гаджети потрібні понад 516 тисячам українських учнів та понад 80 тисячам вчителів.
//                     Також вона проводить облаштування укриттів у навчальних закладах, які їх потребують.Комплексне відновлення Ізюмської лікарні на Харківщині залишається одним із важливих проєктів Фундації. Сьогодні лікарня, яку зруйнували ракети окупантів, працює на 10% від своєї потужності.
//                 </p>
//                 <HorizontalLine className='' />
//             </div>
//         </section>
//     )
// }

// export default NewsIdSection




"use client"
import Link from 'next/link'
import { CldImage } from 'next-cloudinary'
import Loader from '@/components/Loader/Loader'
import HorizontalLine from '@/components/HorizontalLine/HorizontalLine'
import { GetDataWithPathname } from '@/fetch/clientFetch'
import { formatDate } from '@/utils/formatDate'
import { changeStringTypeToArray } from '@/utils/changeStringTypeToArray'
import styles from './NewsIdSection.module.scss'


const NewsIdSection = () => {
    const { data, isLoading } = GetDataWithPathname();

    const formattedDate = formatDate(data?.createdAt);

    let changedData = {}
    if (!isLoading) {
        changedData = changeStringTypeToArray(data);
    }


    return (
        <section className="pageSection">
            <div className="container">
                {isLoading
                    ? <Loader />
                    : <>
                        <h1 className={`sectionTitle ${styles.title}`}>{changedData.title}</h1>
                        <p className={styles.date}>{formattedDate}</p>
                        <HorizontalLine className={styles.line} />

                        <div className={styles.imgWrapper}>
                            <CldImage
                                className={styles.img}
                                fill
                                src={changedData.image}
                                sizes='100vw'
                                alt='Monument of Independence in Kyiv'
                            />
                        </div>

                        <div className={styles.textWrapper}>
                            {changedData.description.map((item, index) => (<p key={index} className={`regularText ${styles.text}`}>{item}</p>))}
                        </div>

                        {changedData.link && <Link className={`regularText ${styles.link}`} href={changedData.link}>Детальніше...</Link>}
                        <HorizontalLine className='' />
                    </>}
            </div>
        </section>
    )
}

export default NewsIdSection