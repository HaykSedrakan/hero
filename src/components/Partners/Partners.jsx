import styles from './Partners.module.css'
import { FiFigma } from 'react-icons/fi'

export default function Partners() {
  return (
    <>
      <h1 className={styles.mainTitle}>Partners</h1>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.partners}>
            <div className={styles.partner}>
              <FiFigma className={styles.logo} />
              <h2 className={styles.title}>Elips GA</h2>
              <p className={styles.desc}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates error reprehenderit itaque autem voluptatibus
                inventore quam? Cupiditate dolorum iusto, vero exercitationem
                aliquid fugit
              </p>
            </div>
            <div className={styles.partner}>
              <FiFigma className={styles.logo} />
              <h2 className={styles.title}>Kaghin</h2>
              <p className={styles.desc}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates error reprehenderit itaque autem voluptatibus
                inventore quam? Cupiditate dolorum iusto, vero exercitationem
                aliquid fugit
              </p>
            </div>
            <div className={styles.partner}>
              <FiFigma className={styles.logo} />
              <h2 className={styles.title}>Titegh</h2>
              <p className={styles.desc}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates error reprehenderit itaque autem voluptatibus
                inventore quam? Cupiditate dolorum iusto, vero exercitationem
                aliquid fugit
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
