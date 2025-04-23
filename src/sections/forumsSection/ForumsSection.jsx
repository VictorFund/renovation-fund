'use client';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import ButtonLink from '@/components/Buttons/ButtonLink/ButtonLink';
import styles from './ForumsSection.module.scss';


const ForumsSection = () => {

    const [isLoad, setIsLoad] = useState(true);

    const { t } = useTranslation();

    useEffect(() => {
        setIsLoad(false)
    }, [])

    return (
        <section className="pageSection">
            <div className="container">
                <h1 className={`sectionTitle ${styles.title}`}>{!isLoad && t('ForumsPage.Title')}</h1>
                {!isLoad && <p className={`titleCardText ${styles.subtitle}`}>{t('ForumsPage.SubTitle')}</p>}
                <div className={styles.about}>
                    <div className={styles.textWrapper}>
                        {!isLoad && <>
                            <p className="regularText">
                                {t('ForumsPage.Text1')}
                                <span className="accentText">{t('ForumsPage.Text2')}</span>
                                {t('ForumsPage.Text3')}
                                <span className="accentText">{t('ForumsPage.Text4')}</span>
                                {t('ForumsPage.Text5')}
                            </p>
                        </>}
                    </div>
                    <div className={styles.aboutImgWrapper}>
                        <Image
                            fill
                            src='/images/forumsPage/main.png'
                            sizes='100vw'
                            alt='forum'
                        />
                    </div>
                </div>
                {!isLoad && <p className={`titleCardText ${styles.subtitleWhat}`}>{t('ForumsPage.SubTitle1')}<span className="accentText">{t('ForumsPage.SubTitle2')}</span></p>}
                <ul className={styles.table}>
                    <li>
                        <div className={styles.tableImgWrapper}>
                            <Image
                                fill
                                src='/images/forumsPage/forum1.png'
                                sizes='100vw'
                                alt='img'
                            />
                        </div>
                        {!isLoad && <>
                            <p className="regularTable">
                                {t('ForumsPage.Table')}
                            </p>
                        </>}
                    </li>
                    <li>
                        <div className={styles.tableImgWrapper}>
                            <Image
                                fill
                                src='/images/forumsPage/forum2.png'
                                sizes='100vw'
                                alt='img'
                            />
                        </div>
                        {!isLoad && <>
                            <p className="regularTable">
                                {t('ForumsPage.Table1')}
                            </p>
                        </>}
                    </li>
                    <li>
                        <div className={styles.tableImgWrapper}>
                            <Image
                                fill
                                src='/images/forumsPage/forum3.png'
                                sizes='100vw'
                                alt='img'
                            />
                        </div>
                        {!isLoad && <>
                            <p className="regularTable">
                                {t('ForumsPage.Table2')}
                            </p>
                        </>}
                    </li>
                    <li>
                        <div className={styles.tableImgWrapper}>
                            <Image
                                fill
                                src='/images/forumsPage/forum4.png'
                                sizes='100vw'
                                alt='img'
                            />
                        </div>
                        {!isLoad && <>
                            <p className="regularTable">
                                {t('ForumsPage.Table3')}
                            </p>
                        </>}
                    </li>
                    <li>
                        <div className={styles.tableImgWrapper}>
                            <Image
                                fill
                                src='/images/forumsPage/forum5.png'
                                sizes='100vw'
                                alt='img'
                            />
                        </div>
                        {!isLoad && <>
                            <p className="regularTable">
                                {t('ForumsPage.Table4')}
                            </p>
                        </>}
                    </li>
                </ul>
                <div className={styles.textWrapper}>
                    {!isLoad && <>
                        <p className="regularTable">
                            {t('ForumsPage.Text6')}
                            <span className="accentText">{t('ForumsPage.Text7')}</span>
                        </p>
                    </>}
                </div>
                <ButtonLink href='https://docs.google.com/forms/d/e/1FAIpQLSevGOM-oaIJxwOp0GeEc6AMbXSA5Hv3xu6RJqA0110cP10CoQ/viewform' target="_blank" rel="noopener noreferrer" title={!isLoad && t('Buttons.ToCoalition')} customBtn={styles.statuteBtn}></ButtonLink>
                <div className={styles.already}>
                    <div className={`${styles["already-text"]}`}>
                        {!isLoad && <p className={`titleCardText ${styles.subtitle}`}>{t('ForumsPage.SubTitle3')} <span className="accentText">{t('ForumsPage.SubTitle4')}</span></p>}
                        <div >
                            {!isLoad && <div className={`${styles["already-cities"]}`}>
                                <p className="regularText">
                                    {t('ForumsPage.Text8')}
                                </p>
                                <p className="regularText">{t('ForumsPage.Text9')} <span className="accentText">{t('ForumsPage.Text10')}</span></p>
                            </div>
                            }
                            {!isLoad && <>
                                <p className={`${styles["already-actual"]} regularText`} >
                                    <div className={`${styles["already-actual-wrapperImg"]}`}>
                                        <Image
                                            fill
                                            src='/images/forumsPage/cross.png'
                                            sizes='100vw'
                                            alt='map Ukraine'
                                        />
                                    </div>
                                    {t('ForumsPage.Text11')}
                                </p>
                            </>}
                        </div>
                        <div className={styles.textWrapper}>
                            {!isLoad && <div className={`${styles["already-connect"]}`}>
                                <p className="regularText">
                                    {t('ForumsPage.Text12')}
                                    <span className="accentText">{t('ForumsPage.Text13')}</span>
                                </p>
                                <p className="regularText">
                                    {t('ForumsPage.Text14')}
                                </p>
                            </div>}
                        </div>
                    </div>
                    <div className={`${styles["already-wrapperImg"]}`}>
                        <Image
                            fill
                            src='/images/forumsPage/map.png'
                            sizes='100vw'
                            alt='map Ukraine'
                        />
                    </div>
                </div>
            </div>
        </section >
    )
}


export default ForumsSection