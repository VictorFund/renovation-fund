import { getDashboardSession } from '@/utils/getDashboardSession';
import styles from './page.module.scss';


const DashboardPage = async () => {
    const session = await getDashboardSession();
    const useremail = session?.user.email;

    return (
        <div className={styles.wrapper}>
            {session?.user.isAdmin || session?.user.email === process.env.NEXT_PUBLIC_OWNER ? <h2 className={styles.successWelcome}>{useremail}, Вітаю Вас в адмінці! Оберіть потрібний розділ.</h2>
                : <h2 className={styles.errorWelcome}>{useremail}, у Вас поки немає повноважень адміністратора!</h2>
            }
        </div>
    )
}

export default DashboardPage