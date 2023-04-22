import styles from './FilterPanel.module.css'
import { FaSearch } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import debounce from 'lodash.debounce'
import { Link } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

const minDistance = 100

export default function FilterPanel() {
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(2000000)
  const [products, setProducts] = useState([])
  const [colors, setColors] = useState([])
  const [categories, setCategories] = useState([
    {
      category: 'All',
    },
  ])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [price, setPrice] = useState([min, max])
  const [color, setColor] = useState('')
  const [materials, setMaterials] = useState([
    {
      material: 'All',
    },
  ])
  const [material, setMaterial] = useState('All')

  const handleChangeColor = (color) => {
    setColor(color)
  }

  function handleInputChange(e) {
    setSearch(e.target.value)
  }

  function handleRangeChange(e, newValue, activeThumb) {
    if (!Array.isArray(newValue)) {
      return
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], price[1] - minDistance)
        setPrice([clamped, clamped + minDistance])
      } else {
        const clamped = Math.max(newValue[1], price[0] + minDistance)
        setPrice([clamped - minDistance, clamped])
      }
    } else {
      setPrice(newValue)
    }
  }

  function handleResetFilter() {
    setCategory('All')
    setSearch('')
    setPrice([min, max])
    window.location.reload()
  }

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const res = await axios.get(
          'https://test-heroku-elwood.herokuapp.com/colors'
        )
        setColors(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchColors()
  }, [])

  const fetchingPrices = debounce(async () => {
    try {
      const res = await axios.get(
        'https://test-heroku-elwood.herokuapp.com/products'
      )

      const filteredDatas =
        res.data &&
        res.data
          .filter(
            (product) => product.price >= price[0] && product.price <= price[1]
          )
          .map((item) => {
            const imgs = JSON.parse(item.imgs)
            const colors = JSON.parse(item.colors)

            return {
              ...item,
              imgs,
              colors: [...colors.map((color) => color.color)],
            }
          })
          .filter((item) => !item.disabled)
      setProducts(filteredDatas)
    } catch (error) {
      console.log(error)
    }
  }, 1000)

  useEffect(() => {
    fetchingPrices()
    return () => fetchingPrices.cancel()
  }, [price])

  useEffect(() => {
    const fetchProducts = async () => {
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
              colors: [...colors.map((color) => color.color)],
            }
          })
          .filter((item) => !item.disabled)
        const prices = productsWithParsedJSON.map((item) => item.price)
        const maxPrice = Math.max(...prices)
        const minPrice = Math.min(...prices)

        setProducts(productsWithParsedJSON)
        setMin(minPrice)
        setMax(maxPrice)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          'https://test-heroku-elwood.herokuapp.com/categories'
        )
        const filteredCategories =
          res.data && res.data.filter((item) => !item.disabled)
        setCategories(filteredCategories)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCategories()
  }, [])
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await axios.get(
          'https://test-heroku-elwood.herokuapp.com/materials'
        )
        const filteredMaterials =
          res.data && res.data.filter((item) => !item.disabled)
        setMaterials(filteredMaterials)
      } catch (error) {
        console.log(error)
      }
    }
    fetchMaterials()
  }, [])

  function handleChange(e) {
    setCategory(e.target.value)
  }

  function handleChangeMaterial(e) {
    setMaterial(e.target.value)
  }

  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.filterPanel}>
              <h2 className={styles.filterTitle}>Filter Panel</h2>
              <div className={styles.filterForm}>
                <label className={styles.filterLabel}>Search:</label>
                <div className={styles.searchBar}>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={handleInputChange}
                    className={styles.inpSearch}
                  />
                  <FaSearch className={styles.searchIcon} />
                </div>

                <label className={styles.filterLabel}>Price Range:</label>
                <div className={styles.rangeContainer}>
                  <div className={styles.filterPriceRange}>
                    <Box
                      sx={{
                        width: 300,
                        display: 'flex',
                        justifyContent: 'center',
                      }}>
                      <Slider
                        getAriaLabel={() => 'Price range'}
                        value={price}
                        onChange={handleRangeChange}
                        valueLabelDisplay="auto"
                        disableSwap
                        min={min && min}
                        max={max && max}
                      />
                    </Box>
                  </div>
                </div>
              </div>
              <div className={styles.filterGroup}>
                <div className={styles.filterGroupHeader}>Category:</div>
                <div className={styles.filterGroupContent}>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        onChange={handleChange}>
                        <MenuItem value="All">All</MenuItem>
                        {categories.map((category) => (
                          <MenuItem key={uuid()} value={category.category}>
                            {category.category}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </div>
              </div>

              <div className={styles.filterGroup}>
                <div className={styles.filterGroupHeader}>Material:</div>
                <div className={styles.filterGroupContent}>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={material}
                        onChange={handleChangeMaterial}>
                        <MenuItem value="All">All</MenuItem>
                        {materials.map((material) => (
                          <MenuItem key={uuid()} value={material.material}>
                            {material.material}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </div>
              </div>
              <div className={styles.filterGroup}>
                <div className={styles.filterGroupHeader}>Colors:</div>
                <div className={styles.filterGroupContent}>
                  <div className={styles.colorRowContainer}>
                    {colors.map((itemColor, index) => (
                      <div key={index} className={styles.colorContainer}>
                        <div
                          onClick={() => handleChangeColor(itemColor.color)}
                          style={{
                            backgroundColor: itemColor.color,
                            border:
                              itemColor.color === '#ffffff' && '1px solid #ccc',
                          }}
                          className={`${styles.color} ${
                            color === itemColor.color && styles.activeColor
                          }`}></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.filterButtonContainer}>
                <button
                  className={styles.resetButton}
                  onClick={handleResetFilter}>
                  Reset
                </button>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.productsContainer}>
              {products
                .filter((product) =>
                  search === ''
                    ? true
                    : product.name.toLowerCase().includes(search.toLowerCase())
                )
                .filter((product) =>
                  category === 'All' ? true : product.category === category
                )
                .filter((product) =>
                  material === 'All' ? true : product.material === material
                )
                .filter((product) =>
                  color === '' ? true : product.colors.includes(color)
                )
                .map((product) => (
                  <div key={product.id} className={styles.product}>
                    <Link to={`/allProducts/product/${product.id}`}>
                      <img
                        src={`/image/products/${product.imgs[0]}`}
                        alt="Product Image"
                        className={styles.productImg}
                      />
                    </Link>
                    <Link
                      to={`/allProducts/product/${product.id}`}
                      className={styles.productTitle}>
                      {product.name}
                    </Link>
                    <p className={styles.productType}>{product.category}</p>
                    <p className={styles.productPrice}>$ {product.price}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
