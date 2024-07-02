import { auth } from '@/auth/auth';
import styles from './page.module.scss';


const DashboardPage = async () => {
    const session = await auth();
    const useremail = session?.user.email;

    return (
        <>
            {session?.user.isAdmin || session?.user.email === process.env.NEXT_PUBLIC_OWNER ? <h2 className={styles.successWelcome}>{useremail}, Вітаю Вас в адмінці! Оберіть потрібний розділ.</h2>
                : <h2 className={styles.errorWelcome}>{useremail}, у Вас поки немає повноважень адміністратора!</h2>
            }
        </>
    )
}

export default DashboardPage