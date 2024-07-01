"use client";
import { useState } from "react";
import styles from "../DashboardComponents.module.scss"


const DashboardUser = ({ data, mutate }) => {
    const [isAdminRules, setIsAdminRules] = useState(data.isAdmin)

    const onSubmit = async () => {
        const updatedData = {
            isAdmin: isAdminRules,
        };
        try {
            await fetch(`/api/users/${data.email}`, {
                method: "PATCH",
                body: JSON.stringify(updatedData),
            });

            console.log("Information updated to DB");

            // оновлення існуючої сторінки
            mutate();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={styles.itemCard}>
            <p>{data.name}</p>
            <p className={`${styles.slug} ${styles.ukrainian}`}>{data.email}</p>
            <form className={styles.accessForm} onSubmit={onSubmit}>
                <label>Is Admin:
                    <input className={styles.accessInput}
                        type="checkbox"
                        checked={isAdminRules}
                        onChange={() => {
                            if (isAdminRules === true) {
                                setIsAdminRules(false);
                            } else {
                                setIsAdminRules(true);
                            }
                        }} />
                </label>
                <button type="submit" className={styles.saveBtn}>Save to DB</button>
            </form>
            <p>Admin: {isAdminRules ? "true" : "false"}</p>
        </div>
    )
}

export default DashboardUser