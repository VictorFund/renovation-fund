"use client"
import { useEffect } from "react";
import { useFormState } from "react-dom";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { register } from "@/auth/actions";
import styles from '../DashboardComponents.module.scss'


const DashboardRegisterForm = () => {
    // for visualization of errors
    const [state, formAction] = useFormState(register, undefined);

    const router = useRouter();

    useEffect(() => {
        state?.success && router.push("/dashboard/login");
    }, [state?.success, router]);


    return (
        <form action={formAction} className={`${styles.dataForm} ${styles.authForm}`}>
            <input type="text" placeholder="name" name="name" className={styles.formInput} />
            <input type="email" placeholder="email" name="email" className={styles.formInput} />
            <input type="password" placeholder="password" name="password" className={styles.formInput} />
            <button className={`${styles.submitBtn} ${styles.authSubmitBtn}`} >Зареєструватися</button>
            {state?.error && <p className={styles.errMessage} >{state.error}</p>}
            <p>У Вас вже є акаунт? <Link className={styles.link} href='/dashboard/login'>Log in</Link> </p>
        </form>
    )
}


export default DashboardRegisterForm