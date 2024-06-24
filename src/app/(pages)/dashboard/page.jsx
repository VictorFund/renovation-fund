import { auth } from '@/auth/auth';
import styles from './page.module.scss';


const DashboardPage = async () => {
    const session = await auth();
    const useremail = session?.user.email;

    return (
        <>
            {session?.user.isAdmin || session?.user.email === process.env.NEXT_PUBLIC_OWNER ? <h2 className={styles.successWelcome}>{useremail}, Welcome to the Dashboard !</h2>
                : <h2 className={styles.errorWelcome}>{useremail}, you do not have enough access rights !</h2>
            }
        </>
    )
}

export default DashboardPage