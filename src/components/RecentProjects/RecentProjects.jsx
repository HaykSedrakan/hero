import { useDispatch } from 'react-redux'
import styles from './RecentProjects.module.css'
import { useRef, useEffect } from 'react'
import { setProjects } from '../../store/sections/sectionsAction'
export default function RecentProjects() {
  const dispatch = useDispatch()
  const recentProjects = useRef(null)

  useEffect(() => {
    if (recentProjects.current) {
      dispatch(setProjects(recentProjects))
    }
  }, [dispatch])
  return (
    <>
      <h1 ref={recentProjects} className={styles.mainTitle}>
        Recent Projects
      </h1>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.imageContainer}>
              <img
                src="/image/new.jpeg"
                alt="Recent Image"
                className={styles.mainRecent}
              />
              <div className={styles.textContainer}>
                <h2 className={styles.leftImgTitle}>
                  Prychological Services Office
                </h2>
                <p className={styles.data}>21.01.2023</p>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.recentProject}>
              <div className={styles.imageWrapper}>
                <img
                  src="/image/miniRecent.jpeg"
                  alt="Mini Recent"
                  className={styles.recentImg}
                />
                <div className={styles.textContainer}>
                  <h2 className={styles.leftImgTitle}>
                    Prychological Services Office
                  </h2>
                  <p className={styles.data}>21.01.2023</p>
                </div>
              </div>
            </div>
            <div className={styles.recentProject}>
              <div className={styles.imageWrapper}>
                <img
                  src="/image/miniRecent.jpeg"
                  alt="Mini Recent"
                  className={styles.recentImg}
                />
                <div className={styles.textContainer}>
                  <h2 className={styles.leftImgTitle}>
                    Prychological Services Office
                  </h2>
                  <p className={styles.data}>21.01.2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
