import styles from './Header.module.css'
import DropDownLanguage from '../DropDownLanguage/DropDownLanguage'
import { useSelector } from 'react-redux'

export default function Header() {
  const { aboutUs, products, projects, contactUs } = useSelector(
    (state) => state.sections
  )
  const offset = -50

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.imgContainer}>
          <img src="/image/site.jpeg" alt="LOGO" className={styles.img} />
        </div>
        <nav className={styles.navbar}>
          <ul className={styles.list}>
            <li
              className={styles.item}
              onClick={() =>
                aboutUs.current &&
                window.scrollTo({
                  top: aboutUs?.current.offsetTop + offset,
                  behavior: 'smooth',
                })
              }>
              About Us
            </li>
            <li
              className={styles.item}
              onClick={() =>
                products.current &&
                window.scrollTo({
                  top: products?.current?.offsetTop + offset,
                  behavior: 'smooth',
                })
              }>
              Products
            </li>
            <li
              className={styles.item}
              onClick={() =>
                projects.current &&
                window.scrollTo({
                  top: projects.current.offsetTop + offset,
                  behavior: 'smooth',
                })
              }>
              Projects
            </li>
            <li
              className={styles.item}
              onClick={() =>
                contactUs.current &&
                window.scrollTo({
                  top: contactUs.current.offsetTop + offset,
                  behavior: 'smooth',
                })
              }>
              Contact us
            </li>
          </ul>
        </nav>
        <div className={styles.langContainer}>
          <DropDownLanguage />
        </div>
      </header>
    </div>
  )
}
