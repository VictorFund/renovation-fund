'use client';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import ButtonLink from '@/components/Buttons/ButtonLink/ButtonLink';
import styles from './CoalitionSection.module.scss';


const MissionSection = () => {

    const [isLoad, setIsLoad] = useState(true);

    const { t } = useTranslation();

    useEffect(() => {
        setIsLoad(false)
    }, [])

    return (
        <section className="pageSection">
            <div className="container">
                <h1 className={`sectionTitle ${styles.title}`}>{!isLoad && t('CoalitionPage.Title')}</h1>
                {!isLoad && <p className={`titleCardText ${styles.subtitle}`}>{t('CoalitionPage.SubTitle')} <span className="accentText">{t('CoalitionPage.SubTitle1')}</span></p>}
                <div className={styles.textWrapper}>
                    {!isLoad && <>
                        <p className="regularText">
                            {t('CoalitionPage.Text1')}
                            <span className="accentText">{t('CoalitionPage.Text2')}</span>
                            {t('CoalitionPage.Text3')}
                            <span className="accentText">{t('CoalitionPage.Text4')}</span>
                            {t('CoalitionPage.Text5')}
                            <span className="accentText">{t('CoalitionPage.Text6')}</span>
                            {t('CoalitionPage.Text7')}
                            <span className="accentText">{t('CoalitionPage.Text8')}</span>
                            {t('CoalitionPage.Text9')}
                        </p>
                    </>}
                </div>
                <div className={styles.textWrapper}>
                    {!isLoad && <>
                        <p className="regularText">
                            {t('CoalitionPage.Text10')}
                            <span className="accentText">{t('CoalitionPage.Text11')}</span>
                            {t('CoalitionPage.Text12')}
                            <span className="accentText">{t('CoalitionPage.Text13')}</span>
                            {t('CoalitionPage.Text14')}
                        </p>
                    </>}
                </div>
                <div className={styles.imgWrapper}>
                    <Image
                        className={styles.img}
                        fill
                        src='/images/coalition.png'
                        sizes='100vw'
                        alt='Monument of Independence in Kyiv'
                    />
                </div>
                {!isLoad && <p className={`titleCardText ${styles.subtitle}`}>{t('CoalitionPage.SubTitle2')} <span className="accentText">{t('CoalitionPage.SubTitle3')}</span></p>}
                <ul className={styles.table}>
                    {!isLoad && <>
                        <li className="regularText">{t('CoalitionPage.Table')}</li>
                        <li className="regularText">{t('CoalitionPage.Table1')}</li>
                        <li className="regularText">{t('CoalitionPage.Table2')}</li>
                        <li className="regularText">{t('CoalitionPage.Table3')}</li>
                    </>}
                </ul>
                <ButtonLink href='https://docs.google.com/forms/d/e/1FAIpQLSevGOM-oaIJxwOp0GeEc6AMbXSA5Hv3xu6RJqA0110cP10CoQ/viewform' target="_blank" rel="noopener noreferrer" title={!isLoad && t('Buttons.ToCoalition')} customBtn={styles.statuteBtn}></ButtonLink>
                <div className={styles.textWrapper}>
                    {!isLoad && <>
                        <p className="regularText">
                            {t('CoalitionPage.Text15')}
                            <span className="accentText">{t('CoalitionPage.Text16')}</span>
                            {t('CoalitionPage.Text17')}
                            <span className="accentText">{t('CoalitionPage.Text18')}</span>
                        </p>
                    </>}
                </div>
            </div>
        </section >
    )
}


export default MissionSection