import styles from './SaleItems.module.css'

export default function SaleItems() {
  return (
    <>
      <h1 className={styles.mainTitle}>Sale Items</h1>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.imgContainer}>
              <img
                src="/image/table3.jpeg"
                alt="table"
                className={styles.mainImg}
              />
            </div>
            <div className={styles.info}>
              <h1 className={styles.title}>Metawood Big Table</h1>
              <p className={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
                labore quidem molestiae numquam eveniet recusandae aperiam
                error.
              </p>
              <div className={styles.prices}>
                <p className={styles.newPrice}>$ 460</p>
                <p className={styles.oldPrice}>$ 520</p>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.miniProducts}>
              <div className={styles.discaundTag}>-70%</div>
              <img
                src="/image/chair1.jpeg"
                alt="Chair 1"
                className={styles.img}
              />
              <h2 className={styles.name}>Night</h2>
              <p className={styles.type}>Rocking Chair</p>
            </div>
            <div className={styles.miniProducts}>
              <div className={styles.discaundTag}>-70%</div>
              <img
                src="/image/chair1.jpeg"
                alt="Chair 1"
                className={styles.img}
              />
              <h2 className={styles.name}>Moon Light</h2>
              <p className={styles.type}>Table</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
