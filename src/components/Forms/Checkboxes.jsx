"use client";

import styles from "./FormStyles.module.scss";

const Checkboxes = ({ field, options, value, setValue }) => {
    return (
        <div className={styles.checkboxWrap}>
            {options.map((option, index) => (
                <span key={option.title} className={styles.span}>
                    <label
                        htmlFor={option.title}
                        className={styles.checkboxLabel}
                    >
                        <svg className={styles.socSvg}>
                            <use
                                href={`/sprite.svg#${option.src}`}
                                className={styles.socIcon}
                            ></use>
                        </svg>

                        <input
                            onChange={(e) => {
                                const valueCopy = [...value];

                                // update checkbox value
                                valueCopy[index] = e.target.checked
                                    ? e.target.value
                                    : null;

                                // send data to react hook form
                                field.onChange(valueCopy);

                                // update local state
                                setValue(valueCopy);
                            }}
                            type='checkbox'
                            checked={value.includes(option.title)}
                            value={option.title}
                            id={option.title}
                            className={
                                value.includes(option.title)
                                    ? styles.boxChecked
                                    : styles.boxNoChecked
                            }
                        />
                    </label>
                </span>
            ))}
        </div>
    );
};

export default Checkboxes;
