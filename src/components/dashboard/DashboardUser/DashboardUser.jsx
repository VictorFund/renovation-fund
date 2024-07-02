"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import DashboardEditAndDelete from "../DashboardEditAndDelete/DashboardEditAndDelete";
import styles from "../DashboardComponents.module.scss"


const DashboardUser = ({ data, mutate, isOwner }) => {
    const pathname = usePathname();
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
        <div className={`${styles.itemCard} ${styles.userItemCard}`}>
            <p><span className="accentText">User:</span> {data.email}</p>
            <p><span className="accentText">Адміністратор:</span> {data.isAdmin ? "ТАК" : "НІ"}</p>
            <form className={`${styles.dataForm} ${styles.userDataForm}`} onSubmit={onSubmit} >
                <div className={styles.checkboxInputGroup} >
                    <label className={styles.userCheckboxLabel}>
                        Адмін:
                        <input className={styles.userCheckbox}
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
                </div>
                <button type="submit" className={styles.submitBtn}>Зберегти зміни</button>
            </form >

            <DashboardEditAndDelete data={data} pathname={pathname} mutate={mutate} isOwner={isOwner} />
        </div>
    )
}

export default DashboardUser