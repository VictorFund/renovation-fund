'use client';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import ButtonLink from '@/components/Buttons/ButtonLink/ButtonLink';
import styles from './MissionSection.module.scss';


const MissionSection = () => {

    const [isLoad, setIsLoad] = useState(true);

    const { t } = useTranslation();

    useEffect(() => {
        setIsLoad(false)
    }, [])

    return (
        <section className="pageSection">
            <div className="container">
                <h1 className={`sectionTitle ${styles.title}`}>{!isLoad && t('MissionPage.Title')}</h1>
                {!isLoad && <p className={`titleCardText ${styles.subtitle}`}>{t('MissionPage.SubTitle')} <span className="accentText">{t('MissionPage.SubTitle1')}</span>{t('MissionPage.SubTitle2')}</p>}
                <div className={styles.imgWrapper}>
                    <Image
                        className={styles.img}
                        fill
                        src='/images/mission-statute.webp'
                        sizes='100vw'
                        alt='Monument of Independence in Kyiv'
                    />
                </div>
                <div className={styles.textWrapper}>
                    {!isLoad && <><p className="regularText" >{t('MissionPage.Text1')} <span className="accentText">{t('MissionPage.Text2')}</span>{t('MissionPage.Text3')}</p>
                        <p className="regularText"><span className="accentText">{t('MissionPage.Text4')}</span>{t('MissionPage.Text5')}</p>
                        <p className="regularText"><span className="accentText">{t('MissionPage.Text6')}</span>{t('MissionPage.Text7')}</p>
                        <p className="regularText">{t('MissionPage.Text8')}<span className="accentText">{t('MissionPage.Text9')}</span>{t('MissionPage.Text10')}</p></>}</div>
                <ButtonLink href='/documentation/statute.pdf' target="_blank" rel="noopener noreferrer" title={!isLoad && t('Buttons.ToStatute')} customBtn={styles.statuteBtn}></ButtonLink>
            </div>
        </section>
    )
}


export default MissionSection