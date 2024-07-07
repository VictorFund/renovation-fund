import { getDashboardSession } from '@/utils/getDashboardSession';
import styles from './page.module.scss';


const DashboardPage = async () => {
    const session = await getDashboardSession();
    const userEmail = session?.user.email;

    return (
        <div className={styles.wrapper}>
            {session?.user.isAdmin || session?.user.email === process.env.NEXT_PUBLIC_OWNER ? <h2 className={styles.successWelcome}>{userEmail}, Вітаю Вас в адмінці! Оберіть потрібний розділ.</h2>
                : <h2 className={styles.errorWelcome}>{userEmail}, у Вас поки немає повноважень адміністратора!</h2>
            }
        </div>
    )
}

export default DashboardPage