import ButtonLink from '@/components/Buttons/ButtonLink/ButtonLink';
import styles from './HomeAboutFundSection.module.scss';

const HomeAboutFundSection = () => {
  return (
    <section>
      <div className="container">
        <h2 className="homeSectionTitle">Про Фонд*</h2>
        <div className={styles.aboutContainer}>
          <ul className={styles.contentList}>
            <li className={styles.text}>
              Благодійний Фонд{' '}
              <span className={styles.textAccent}>
                «Перемоги та Відновлення»
              </span>{' '}
              – це неприбуткова організація, мета та ціль котрої полягає у
              відновленні України та міці її державності. У сприянні перемозі
              українського народу та ефективному, якісному й надважливому
              забезпеченні комфортних умов для всіх та кожного зокрема.
            </li>
            <li className={styles.text}>
              <span className={styles.textAccent}>Основний напрямок</span>{' '}
              діяльності благодійної організації - це, перш за все,
              психосоціальна підтримка та культурно-просвітницька діяльність для
              всіх, хто відчуває в цьому потребу й зацікавленість.
            </li>
          </ul>
          <div className={styles.btnContainer}>
            <ButtonLink
              href="/partnership"
              title="Стати партнером"
              customBtn={styles.btn}
            />
            <ButtonLink
              href="/contacts"
              title="Стати волонтером"
              customBtn={styles.btn}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAboutFundSection;
