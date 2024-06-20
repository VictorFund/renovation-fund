"use client";
import { useFormState } from "react-dom";
import Link from 'next/link';
import { login } from "@/auth/actions";
import styles from '../DashboardComponents.module.scss';


const DashboardLoginForm = () => {
    const [state, formAction] = useFormState(login, undefined);


    return (
        <form action={formAction} className={styles.authForm}>
            <input type="email" placeholder="email" name="email" />
            <input type="password" placeholder="password" name="password" />
            <button>Login</button>
            {state?.error && <p className={styles.errMessage} >{state.error}</p>}
            <p className={styles.text}>You still do not have an account? <Link className={styles.link} href='/dashboard/register'>Register</Link> </p>
        </form>
    )
}


export default DashboardLoginForm