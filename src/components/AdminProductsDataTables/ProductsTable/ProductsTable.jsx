import DataTable from 'react-data-table-component'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import Home from '@mui/icons-material/Home'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import StarIcon from '@mui/icons-material/Star'
import styles from './ProductsTable.module.css'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import axios from 'axios'
import Switch from '@mui/material/Switch'
import { styled } from '@mui/system'
import DeleteIcon from '@mui/icons-material/Delete'

export default function ProductsTable() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [search, setSearch] = useState('')
  const [isChecked, setIsChecked] = useState(false)
  const StyledIconButton = styled(IconButton)({
    '&:hover': {
      color: 'red',
    },
  })

  const handleSwitchChange = (id) => (e) => {
    const value = e.target.checked ? 1 : 0
    setIsChecked(value)
    try {
      axios.put(
        'https://test-heroku-elwood.herokuapp.com/editproductdisabled',
        {
          isChecked: value,
          id: id,
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  async function handleDeleteCategory(id, e) {
    e.preventDefault()

    try {
      await axios.delete(
        `https://test-heroku-elwood.herokuapp.com/deleteproduct/${id}`
      )
      const res = await axios.get(
        'https://test-heroku-elwood.herokuapp.com/products'
      )
      const productsWithParsedJSON = res.data.map((item) => {
        const imgs = JSON.parse(item.imgs)
        const colors = JSON.parse(item.colors)
        return {
          ...item,
          imgs,
          colors,
        }
      })
      setProducts(productsWithParsedJSON)
    } catch (error) {
      console.log(error)
    }
  }

  const label = { inputProps: { 'aria-label': 'Switch demo' } }

  const columns = [
    {
      name: 'id',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Product',
      selector: (row) => (
        <div className={styles.tableProductColumn}>
          <img
            style={{ height: '40px', margin: '10px', borderRadius: '10px' }}
            src={`/image/products/${row.imgs[0]}`}
            alt="Image"
          />
          <Link to="?">{row.name}</Link>
        </div>
      ),
    },
    {
      name: 'Colors',
      selector: (row) => (
        <div className={styles.colorRowContainer}>
          {row.colors.map((itemColor, index) => (
            <div key={index} className={styles.colorContainer}>
              <div
                style={{
                  backgroundColor: itemColor.color,
                  border: itemColor.color === '#ffffff' && '1px solid #ccc',
                }}
                className={styles.color}></div>
              <div className={styles.colorsNameContainer}>
                <p className={styles.colorname}>{itemColor.name}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      name: 'Price',
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: 'Category',
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: 'Material',
      selector: (row) => row.material,
      sortable: true,
    },
    {
      name: 'Height',
      selector: (row) => row.height,
      sortable: true,
    },
    {
      name: 'Width',
      selector: (row) => row.width,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => (
        <div className={styles.statusCont}>
          <StyledIconButton aria-label="delete">
            <Home color={row.status === 1 ? 'primary' : 'default'} />
          </StyledIconButton>
          <StyledIconButton aria-label="delete">
            <NewspaperIcon color={row.status === 2 ? 'primary' : 'default'} />
          </StyledIconButton>
          <StyledIconButton aria-label="delete">
            <StarIcon color={row.status === 3 ? 'primary' : 'default'} />
          </StyledIconButton>
        </div>
      ),
    },
    {
      name: 'Disabled',
      selector: (row) => (
        <div>
          {row.disabled ? (
            <Switch
              {...label}
              defaultChecked
              onChange={handleSwitchChange(row.id)}
            />
          ) : (
            <Switch {...label} onChange={handleSwitchChange(row.id)} />
          )}
        </div>
      ),
    },
    {
      name: 'Actions',
      selector: (row) => (
        <Stack direction="row" spacing={1}>
          <StyledIconButton aria-label="delete">
            <DeleteIcon
              color="error"
              onClick={(e) => {
                handleDeleteCategory(row.id, e)
              }}
            />
          </StyledIconButton>
        </Stack>
      ),
    },
  ]

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          'https://test-heroku-elwood.herokuapp.com/products'
        )
        const productsWithParsedJSON = res.data.map((item) => {
          const imgs = JSON.parse(item.imgs)
          const colors = JSON.parse(item.colors)

          return {
            ...item,
            imgs,
            colors,
          }
        })
        setProducts(productsWithParsedJSON)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProducts()
  }, [])

  console.log(products)

  useEffect(() => {
    const filtered = products.filter((product) =>
      product?.product?.title.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredProducts(filtered)
  }, [search, products])
  return (
    <div style={{ overflow: 'auto' }}>
      <DataTable
        title="Products List"
        columns={columns}
        data={products}
        fixedHeader
        fixedHeaderScrollHeight="450px"
        pagination
        selectableRowsHighlight
        highlightOnHover
        style={{ width: '1800px' }}
        selectableRowsNoSelectAll
        subHeaderWrap
        customStyles={{
          tableWrapper: {
            overflowX: 'auto',
          },
        }}
        actions={
          <div>
            <Stack spacing={2} direction="row">
              <Button variant="outlined">
                <Link to="/admin/admindashboard/addproduct">
                  Create Product
                </Link>
              </Button>
            </Stack>
          </div>
        }
        subHeader
        subHeaderComponent={
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off">
            <TextField
              id="standard-basic"
              label="Search Datas"
              value={search}
              variant="standard"
              color="success"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
        }
        subHeaderAlign="center"
      />
    </div>
  )
}
