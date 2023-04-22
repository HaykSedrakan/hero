import styles from './Footer.module.css'
import { AiFillInstagram } from 'react-icons/ai'
import { FaFacebook } from 'react-icons/fa'
import { BiRightArrowAlt } from 'react-icons/bi'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <img src="/image/site.jpeg" alt="LOGO" className={styles.logo} />
        </div>
        <div className={styles.menuContainer}>
          <h3 className={styles.menuTitle}>Menu</h3>
          <span className={styles.menuItem}>About Us</span>
          <span className={styles.menuItem}>Products</span>
          <span className={styles.menuItem}>Projects</span>
          <span className={styles.menuItem}>Partners</span>
          <span className={styles.menuItem}>Contacts</span>
        </div>
        <div className={styles.address}>
          <span className={styles.addressItem}>Nikoghosyan Tigranyan 27</span>
          <span className={styles.addressItem}>Yerevan,Armenia</span>
          <span className={styles.addressItem}>00374 99 018 081</span>
        </div>
        <div className={styles.socialMedia}>
          <div className={styles.socialMediaItems}>
            <a href="#">
              <FaFacebook className={`${styles.iconFacebook} ${styles.icon}`} />
            </a>
            <a href="#">
              <AiFillInstagram
                className={`${styles.iconInstagram} ${styles.icon}`}
              />
            </a>
          </div>
          <div className={styles.sendContanier}>
            <input
              type="text"
              className={styles.sendEmailInp}
              placeholder="Enter your email"
            />
            <BiRightArrowAlt className={styles.sendIcon} />
          </div>
        </div>
      </div>
    </footer>
  )
}
