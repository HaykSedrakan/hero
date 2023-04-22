import styles from './MainAcordeon.module.css'
import Acordeon from '../Acordeon/Acordeon'

export default function MainAcordeon() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.left}>
          <img src="/image/test2.jpeg" alt="Image" />
        </div>
        <div className={styles.right}>
          <Acordeon />
        </div>
      </div>
    </section>
  )
}
