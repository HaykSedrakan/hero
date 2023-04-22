import styles from './NotFound.module.css'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.not404}>404</h1>
        <h3 className={styles.notFound}>Page Not Found</h3>
        <div className={styles.gifContainer}>
          <div className={styles.gif}></div>
        </div>
        <div className={styles.goHomeContainer}>
          <h3 className={styles.lookLike}>Looks Like You're Lost</h3>
          <h4 className={styles.available}>
            {' '}
            The page you are looking for not available
          </h4>
          <Link to="/" className={styles.goHome}>
            Go Home
          </Link>
        </div>
      </div>
    </section>
  )
}
