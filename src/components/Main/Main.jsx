import styles from './Main.module.css'
import MainSlider from '../Slider/Slider'

export default function Main() {
  return (
    <section className={styles.section1}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.title}>
            <span className={styles.firstTitle}>The Reality</span>
            <span className={styles.secondTitle}>Of Your Fantasy</span>
          </div>
          <p className={styles.desc}>
            We create whatever blows your mind. Draw your fantasy or send us the
            photo of whatever you like adn we will make it real.
          </p>
          <div className={styles.btnsContainer}>
            <button className={styles.shopNow}>Shop Now</button>
            <button className={styles.order}>Order</button>
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.infoItem}>
              <h2 className={styles.infoTitle}>5+</h2>
              <span className={styles.infoDesc}>Years Experience</span>
            </div>
            <div className={styles.infoItem}>
              <h2 className={styles.infoTitle}>200+</h2>
              <span className={styles.infoDesc}>Completed Projects</span>
            </div>
            <div className={styles.infoItem}>
              <h2 className={styles.infoTitle}>130+</h2>
              <span className={styles.infoDesc}>Clients</span>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.rightContainer}>
            <MainSlider />
          </div>
        </div>
      </div>
    </section>
  )
}
