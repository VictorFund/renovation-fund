import ButtonLink from "@/components/Buttons/ButtonLink/ButtonLink";
import { bankAccDetails } from "@/data";
import styles from "./DonateSection.module.scss";

const DonateSection = () => {
  return (
    <section className={`pageSection ${styles.section}`}>
      <div className={`container ${styles.container}`}>
        <ul className={styles.linksList}>
          {bankAccDetails.map((el) => {
            return (
              <li key={el.title} className={styles.linkWrapp}>
                <h2 className={styles.title}>{el.title}</h2>
                <ButtonLink
                  href={el.href}
                  title="Підтримати"
                  id={styles.link}
                  target="_blank"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default DonateSection;
