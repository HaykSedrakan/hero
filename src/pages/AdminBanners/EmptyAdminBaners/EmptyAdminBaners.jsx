import styles from './EmptyAdminBaners.module.css'

export default function EmptyAdminBaners() {
  return (
    <div className={styles.container}>
      <div className={styles.emptyBaner}>
        <h1>At this moment you do not have banners</h1>
      </div>
    </div>
  )
}
