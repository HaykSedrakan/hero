import { useRef, useState, useEffect } from 'react'
import styles from './Products.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setProducts } from '../../store/sections/sectionsAction'

export default function Products() {
  const dispatch = useDispatch()
  const [hiteProducts, setHiteProducts] = useState([])
  const productsRef = useRef(null)

  useEffect(() => {
    if (productsRef.current) {
      dispatch(setProducts(productsRef))
    }
  }, [dispatch])

  useEffect(() => {
    const fetchHiteProducts = async () => {
      try {
        const res = await axios.get(
          'https://test-heroku-elwood.herokuapp.com/products'
        )
        const productsWithParsedJSON = res.data
          .map((item) => {
            const imgs = JSON.parse(item.imgs)
            const colors = JSON.parse(item.colors)

            return {
              ...item,
              imgs,
              colors,
            }
          })
          .filter((product) => product.status === 1)
        setHiteProducts(productsWithParsedJSON)
      } catch (error) {
        console.log(error)
      }
    }
    fetchHiteProducts()
  }, [])
  return (
    <>
      <h1 ref={productsRef} className={styles.titleProducts}>
        Products
      </h1>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.productsContainer}>
            {hiteProducts.map((product) => (
              <div key={product.id} className={styles.product}>
                <img
                  src={`/image/products/${product.imgs[0]}`}
                  alt="Product Image"
                  className={styles.productImg}
                />
                <h2 className={styles.productTitle}>{product.name}</h2>
                <p className={styles.productType}>{product.category}</p>
                <p className={styles.productPrice}>$ {product.price}</p>
              </div>
            ))}
          </div>
          <div className={styles.btnContainer}>
            <Link to="/allProducts" className={styles.seeAllBtn}>
              See All
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
