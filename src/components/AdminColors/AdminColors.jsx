import DataTable from 'react-data-table-component'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import { IconButton } from '@mui/material'
import { styled } from '@mui/system'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import styles from './AdminColors.module.css'
import SendIcon from '@mui/icons-material/Send'
import { SwatchesPicker } from 'react-color'
import LoadingButton from '@mui/lab/LoadingButton'
import axios from 'axios'
import DeleteIcon from '@mui/icons-material/Delete'
import convert from 'color-convert'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: -10,
  p: 4,
}

export default function AdminColors() {
  const [itemId, setItemId] = useState(null)
  const [colors, setColors] = useState([])
  const [color, setColor] = useState({
    color: '',
    hex: '',
    disabled: 0,
  })
  const [sendColorLoading, setSendColorLoading] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [open, setOpen] = useState(false)

  const StyledIconButton = styled(IconButton)({
    '&:hover': {
      color: 'red',
    },
  })

  async function handleDeleteCategory(id, e) {
    e.preventDefault()

    try {
      await axios.delete(
        `https://test-heroku-elwood.herokuapp.com/deletecolor/${id}`
      )
      const updatedColors = await axios.get(
        'https://test-heroku-elwood.herokuapp.com/colors'
      )
      setColors(updatedColors.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSwitchChange = (id) => (e) => {
    const value = e.target.checked ? 1 : 0
    setIsChecked(value)
    setItemId(id)
    try {
      axios.put('https://test-heroku-elwood.herokuapp.com/editcolor', {
        isChecked: value,
        id: id,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (newColor) => {
    const rgbColors = []
    for (let color in newColor.rgb) {
      rgbColors.push(newColor.rgb[color])
    }
    rgbColors.splice(-1)
    const colorName = convert.rgb.keyword(rgbColors)
    setColor((prev) => ({ ...prev, color: colorName, hex: newColor.hex }))
  }

  console.log(color.color)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const label = { inputProps: { 'aria-label': 'Switch demo' } }
  const columns = [
    {
      name: 'Id',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: 'Color',
      selector: (row) => (
        <div className={styles.colorRowContainer}>
          <div
            style={{
              backgroundColor: row.color,
              border: row.color === '#ffffff' && '1px solid #ccc',
            }}
            className={styles.color}></div>
          <p>{row.color}</p>
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

  async function handleClick(e) {
    e.preventDefault()
    setSendColorLoading(true)
    try {
      await axios.post('https://test-heroku-elwood.herokuapp.com/addcolor', {
        color: color.color,
        disabled: color.disabled,
      })
      const updatedColors = await axios.get(
        'https://test-heroku-elwood.herokuapp.com/colors'
      )
      setColors(updatedColors.data)
      setSendColorLoading(false)
      setOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <DataTable
      title="Colors List"
      columns={columns}
      data={colors}
      fixedHeader
      fixedHeaderScrollHeight="450px"
      pagination
      selectableRows
      selectableRowsHighlight
      highlightOnHover
      actions={
        <div>
          <Stack spacing={2} direction="row">
            <Button variant="outlined" onClick={handleOpen}>
              + Add Category
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description">
              <Box sx={style}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  className={styles.titleModal}>
                  Create New Color
                </Typography>
                <div className={styles.colorSwatches}>
                  <SwatchesPicker color={color.hex} onChange={handleChange} />
                </div>
                <Box className={styles.sendButtonContainer}>
                  <Box sx={{ '& > button': { m: 1 } }}>
                    <LoadingButton
                      onClick={handleClick}
                      endIcon={<SendIcon />}
                      loading={sendColorLoading}
                      loadingPosition="end"
                      variant="contained">
                      <span>Send</span>
                    </LoadingButton>
                  </Box>
                </Box>
              </Box>
            </Modal>
          </Stack>
        </div>
      }
      subHeader
      subHeaderAlign="center"
    />
  )
}
