"use client";
import { useFormState } from "react-dom";
import Link from 'next/link';
import { login } from "@/auth/actions";
import styles from '../DashboardComponents.module.scss';


const DashboardLoginForm = () => {
    const [state, formAction] = useFormState(login, undefined);


    return (
        <form action={formAction} className={`${styles.dataForm} ${styles.authForm}`}>
            <input type="email" placeholder="email" name="email" className={styles.formInput} />
            <input type="password" placeholder="password" name="password" className={styles.formInput} />
            <button className={`${styles.submitBtn} ${styles.authSubmitBtn}`}>Залогінитися</button>
            {state?.error && <p className={styles.errMessage} >{state.error}</p>}
            <p>У Вас ще немає акаунта? <Link className={styles.link} href='/dashboard/register'>Register</Link> </p>
        </form>
    )
}


export default DashboardLoginForm