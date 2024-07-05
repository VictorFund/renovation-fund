import Image from 'next/image'
import ButtonLink from '@/components/Buttons/ButtonLink/ButtonLink'
import styles from './MissionSection.module.scss'


const MissionSection = () => {
    return (
        <section className="pageSection">
            <div className="container">
                <h1 className={`sectionTitle ${styles.title}`}>Місія та статут</h1>
                <p className={`titleCardText ${styles.subtitle}`}>Фонд <span className="accentText">«Перемоги та Відновлення»</span> – це про майбутнє. Щасливе, комфортне та справедливе.</p>
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
                    <p className="regularText" >Благодійний Фонд <span className="accentText">«Перемоги та Відновлення»</span> — це динамічна неприбуткова організація, яка прагне відновити Україну та зміцнити її державність. </p>
                    <p className="regularText"><span className="accentText">Ми допомагаємо українському народу</span> досягти перемоги та створюємо комфортні умови для всіх. Наша головна діяльність зосереджена на психосоціальній підтримці та культурно-просвітницькій роботі, відкритій для всіх, хто відчуває в цьому потребу.</p>
                    <p className="regularText"><span className="accentText">Ми працюємо з людьми</span>, постраждалими від воєнних дій, та тими, хто потребує соціальної адаптації, приділяючи особливу увагу студентам і молоді, адже вважаємо психологічну підтримку надважливою для майбутнього країни.</p>
                    <p className="regularText">Наші проєкти <span className="accentText">охоплюють наукові та освітні заходи</span>, популяризацію здоров’я, саморозвитку та самореалізації через соціальні мережі та публічні виступи. Фонд створює платформи для нетворкінгу, активно інвестує у перемогу країни, організовуючи збори, пожертви та волонтерство, щоб допомогти державі у всіх необхідних напрямках.</p></div>
                <ButtonLink href='/documentation/statute.docx' target="_blank" rel="noopener noreferrer" title='Ознайомитись зі Статутом' customBtn={styles.statuteBtn}></ButtonLink>
            </div>
        </section>
    )
}


export default MissionSection