import Link from "next/link";
import styles from "./book.module.css";

export default function BookNotFound() {
  return (
    <main className={styles.main}>
      <p className={styles.eyebrow}>Fickle Dragon Publishing</p>
      <div className={styles.copy}>
        <h1>That book isn&apos;t on this shelf.</h1>
        <p className={styles.tagline}>
          The address may have changed, or this title may not be public yet.
        </p>
        <div className={styles.actions}>
          <Link className={styles.primaryAction} href="/">
            Return home
          </Link>
        </div>
      </div>
    </main>
  );
}
