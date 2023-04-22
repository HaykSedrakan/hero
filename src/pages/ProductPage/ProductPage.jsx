import { useEffect, useState } from 'react'
import styles from './ProductPage.module.css'
import { useLocation } from 'react-router-dom'
import Header from '../../components/Header/Header'
import axios from 'axios'
import SwiperSlider from '../../components/SwiperSlider/SwiperSlider'
import Description from './Description/Description'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'
import FormControl from '@mui/material/FormControl'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Footer from '../../components/Footer/Footer'

export default function ProductPage() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const [product, setProduct] = useState([])
  const [color, setColor] = useState('')
  const [category, setCategory] = useState('')
  const [products, setProducts] = useState([])
  const productId = pathname.split('/')[3]

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'rgb(219, 128, 48)',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'rgb(219, 128, 48)',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgb(55,55,55)',
      },

      '&.Mui-focused fieldset': {
        borderColor: 'rgb(219, 128, 48)',
      },
    },
  })

  const handleChangeColor = (color) => {
    setColor(color)
  }
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://test-heroku-elwood.herokuapp.com/products/${productId}`
        )
        const productsWithParsedJSON = res.data.map((item) => {
          const imgs = JSON.parse(item.imgs)
          const colors = JSON.parse(item.colors)

          return {
            ...item,
            imgs,
            colors: [...colors.map((color) => color.color)],
          }
        })
        setProduct(productsWithParsedJSON)
        setCategory(productsWithParsedJSON[0].category)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProduct()
  }, [])

  useEffect(() => {
    const fetchSimilarProducts = async () => {
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
          .filter(
            (item) => category && item.category === category && !item.disabled
          )
        setProducts(productsWithParsedJSON.slice(0, 4))
      } catch (error) {
        console.log(error)
      }
    }
    fetchSimilarProducts()
  }, [category])

  return (
    <>
      <Header />
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.left}>
            <SwiperSlider images={product[0]?.imgs} />
          </div>
          <div className={styles.right}>
            <div className={styles.titleContainer}>
              <h1 className={styles.productTitle}>Elwood</h1>
            </div>
            <div className={styles.mainInformation}>
              <h2 className={styles.productName}>{product[0]?.name}</h2>

              <div className={styles.description}>
                <Description desc={product[0]?.description} />
              </div>

              <ul className={styles.list}>
                <li className={styles.item}>
                  {' '}
                  <div className={styles.colors}>
                    <h2 className={styles.availableColors}>
                      Available Colors -
                      <div className={styles.colorsCmpContainer}>
                        {product[0]?.colors.map((itemColor, index) => (
                          <div key={index} className={styles.colorContainer}>
                            <div
                              style={{
                                backgroundColor: itemColor,
                                border:
                                  itemColor === '#ffffff' && '1px solid #ccc',
                              }}
                              className={`${styles.color} ${
                                color === itemColor && styles.activeColor
                              }`}></div>
                          </div>
                        ))}
                      </div>
                    </h2>
                  </div>
                </li>
                <li className={styles.item}>
                  {' '}
                  <div className={styles.materialContainer}>
                    <h2 className={styles.materialCpm}>
                      Material -{' '}
                      <span className={styles.material}>
                        {product[0]?.material}
                      </span>
                    </h2>
                  </div>
                </li>
                <li className={styles.item}>
                  {' '}
                  <div className={styles.materialContainer}>
                    <h2 className={styles.materialCpm}>
                      Category -{' '}
                      <span className={styles.material}>
                        {product[0]?.category}
                      </span>
                    </h2>
                  </div>
                </li>
              </ul>
              <div className={styles.sizeContainer}>
                <span className={styles.sizeTitle}>Size</span>
                <div className={styles.sizes}>
                  <div className={styles.heightContainer}>
                    <Box
                      component="form"
                      sx={{
                        '& .MuiTextField-root': {
                          m: 1,
                          width: '25ch',
                        },
                      }}
                      noValidate
                      autoComplete="off">
                      <FormControl variant="standard">
                        <CssTextField
                          id="outlined-textarea"
                          label="Enter product height"
                          placeholder={`Default height ${product[0]?.height}`}
                          multiline
                        />
                      </FormControl>
                    </Box>
                  </div>
                  <div className={styles.widthContainer}>
                    <Box
                      component="form"
                      sx={{
                        '& .MuiTextField-root': {
                          m: 1,
                          width: '25ch',
                        },
                      }}
                      noValidate
                      autoComplete="off">
                      <FormControl variant="standard">
                        <CssTextField
                          id="outlined-textarea"
                          label="Enter product width"
                          placeholder={`Default width ${product[0]?.width}`}
                          multiline
                        />
                      </FormControl>
                    </Box>
                  </div>
                </div>
              </div>
              <div className={styles.actions}>
                <div className={styles.priceContainer}>
                  <div className={styles.wrapperPrice}>
                    <span className={styles.priceTitle}>Price</span>
                    <div className={styles.price}>
                      <span className={styles.pr}>{product[0]?.price}</span>
                      <span className={styles.amd}>AMD</span>
                    </div>
                  </div>
                </div>
                <div className={styles.order}>
                  <Stack spacing={2} direction="row">
                    <Button
                      onClick={handleClickOpen}
                      variant="contained"
                      sx={{
                        color: '#fff',
                        backgroundColor: 'rgb(219, 128, 48)',
                        '&:hover': {
                          backgroundColor: 'rgb(200, 100, 0)',
                        },
                      }}>
                      ORDER
                    </Button>
                  </Stack>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.secondSection}>
        <div className={styles.containerHeader}>
          <header className={styles.header}>
            <div className={styles.left}>Similar items</div>
          </header>
        </div>
        <div className={styles.similarCards}>
          <div className={styles.cardContainer}>
            <div className={styles.productsContainer}>
              {products.length &&
                products.map((product) => (
                  <div key={product.id} className={styles.product}>
                    <img
                      src={`/image/products/${product.imgs[0]}`}
                      alt="Product Image"
                      className={styles.productImg}
                    />
                    <h2 className={styles.productname}>{product.name}</h2>
                    <p className={styles.productType}>{product.category}</p>
                    <p className={styles.productPrice}>$ {product.price}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Forming an order</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Full Name"
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email"
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Phone Number"
              type="email"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Complete the order</Button>
          </DialogActions>
        </Dialog>
      </div>
      <Footer />
    </>
  )
}
