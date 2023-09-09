import styles from '@/auth/_styles/signin.module.scss';
import { SignIn } from '@/_components/Sign';

export default function AuthSignIn() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.message}>
            <h1>ログイン</h1>
            <span>お持ちのアカウントでログインできます</span>
          </div>
          <SignIn provider="github">
            <span className={styles.signin_text}>Googleでログイン</span>
          </SignIn>
        </div>
      </main>
      <aside className={styles.side}>
        <div>暁月</div>
      </aside>
    </div>
  );
}
