import styles from './WeAre.module.css'
import { useDispatch } from 'react-redux'
import { useEffect, useRef } from 'react'
import { setAboutUs } from '../../store/sections/sectionsAction'

export default function WeAre() {
  const selectRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (selectRef.current) {
      dispatch(setAboutUs(selectRef))
    }
  }, [dispatch])

  return (
    <section ref={selectRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>We Are</h1>
            <h3 className={styles.desc}>
              A friendly team of motivated{' '}
              <span className={styles.unique}>creators</span> who design unique
              pieces of <span className={styles.unique}>art</span> furniture.We{' '}
              <span className={styles.unique}>love</span> what we do!
            </h3>
          </div>
          <div className={styles.btnContainer}>
            <button className={styles.btn}>Join Us</button>
          </div>
        </div>
        <div className={styles.right}>
          <img src="/image/team.jpeg" alt="" className={styles.img} />
        </div>
      </div>
    </section>
  )
}
