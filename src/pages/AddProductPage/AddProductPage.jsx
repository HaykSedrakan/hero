import styles from './AddProductPage.module.css'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { Link as RouterLink } from 'react-router-dom'
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi'
import { MdAddCircle, MdColorLens, MdOutlineHeight } from 'react-icons/md'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { TbFlag3Filled } from 'react-icons/tb'
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech'
import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import StarIcon from '@mui/icons-material/Star'
import { IoIosPricetag } from 'react-icons/io'
import Autocomplete from '@mui/material/Autocomplete'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Stack from '@mui/material/Stack'
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton'
import Typography from '@mui/material/Typography'
import SendIcon from '@mui/icons-material/Send'
import Modal from '@mui/material/Modal'
import Select from 'react-select'
import { RxWidth } from 'react-icons/rx'
import { Editor } from '@tinymce/tinymce-react'
import DescriptionIcon from '@mui/icons-material/Description'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { v4 as uuidv4 } from 'uuid'
import { AiFillPicture } from 'react-icons/ai'
import Switch from '@mui/material/Switch'
import { GiSightDisabled } from 'react-icons/gi'
import RefreshIcon from '@mui/icons-material/Refresh'
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

export default function AddProductPage() {
  const [files, setFiles] = useState(null)
  const [content, setContent] = useState('')
  const [open, setOpen] = useState('')
  const [sendCategoryLoading, setSendCategoryLoading] = useState(false)
  const [sendMaterialLoading, setSendMaterialLoading] = useState(false)
  const [options, setOptions] = useState([])
  const [materials, setMaterials] = useState([])
  const [colors, setColors] = useState([])
  const [addCategory, setAddCategory] = useState({
    category: '',
    disabled: 0,
  })
  const [addMaterial, setAddMaterial] = useState({
    material: '',
    disabled: 0,
  })
  const [sendingValues, setSendingValues] = useState({
    name: '',
    status: 0,
    price: 0,
    category: null,
    material: null,
    colors: [],
    imgs: [],
    description: '',
    height: 0,
    width: 0,
    disabled: 0,
  })

  const label = { inputProps: { 'aria-label': 'Switch demo' } }

  const handleDeleteImage = (img) => {
    setSendingValues((prev) => ({
      ...prev,
      imgs: [
        ...sendingValues.imgs.filter((filteredImg) => filteredImg !== img),
      ],
    }))
  }

  const handleEditorChange = (content, editor) => {
    setContent(content)
  }

  const handleSendValues = async (e) => {
    e.preventDefault()

    try {
      await axios.post(
        'https://test-heroku-elwood.herokuapp.com/addProductFurniture',
        {
          ...sendingValues,
          material: sendingValues.material.material,
          category: sendingValues.category.category,
          imgs: JSON.stringify(sendingValues.imgs),
          colors: JSON.stringify(sendingValues.colors),
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const container = document.createElement('p')

    container.innerHTML = content

    const descriptionElement = container.querySelector('p')
    const description = descriptionElement && descriptionElement.outerHTML

    setSendingValues((prev) => ({ ...prev, description: description }))
  }, [content])

  const onInputChange = (e) => {
    setFiles(e.target.files)
  }

  async function uploadImgProduct() {
    let newFileName = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const newName = uuidv4() + '.' + file.name.split('.').pop()
      newFileName.push(newName)
      const formData = new FormData()
      formData.append('file[]', new File([file], newName))
      try {
        await fetch('https://test-heroku-elwood.herokuapp.com/uploadproducts', {
          method: 'POST',
          body: formData,
        })
      } catch (error) {
        console.log(error)
      }
    }
    setSendingValues((prev) => ({
      ...prev,
      imgs: newFileName,
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    uploadImgProduct()
  }

  const handleInputChange = (e) => {
    setAddCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          'https://test-heroku-elwood.herokuapp.com/categories'
        )
        const filteredDatas =
          res.data.length && res.data.filter((item) => !item.disabled)
        setOptions(filteredDatas)
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
        const filteredDatas =
          res.data.length && res.data.filter((item) => !item.disabled)
        setMaterials(filteredDatas)
      } catch (error) {
        console.log(error)
      }
    }
    fetchMaterials()
  }, [])

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const res = await axios.get(
          'https://test-heroku-elwood.herokuapp.com/colors'
        )
        const filteredDatas =
          res.data.length && res.data.filter((item) => !item.disabled)
        setSendingValues((prev) => ({ ...prev, colors: filteredDatas }))
        filteredDatas.map((item) =>
          setColors((prev) => [
            ...prev,
            {
              label: item.color,
              value: item.color.toLowerCase(),
              color: item.color,
            },
          ])
        )
      } catch (error) {
        console.log(error)
      }
    }
    fetchColors()
  }, [])

  const defaultProps = {
    options: options,
    getOptionLabel: (option) => option.category,
    key: uuidv4(),
  }
  const defaultPropsMaterials = {
    options: materials,
    getOptionLabel: (option) => option.material,
  }

  const handleOpenCategory = () => setOpen('addCategory')
  const handleCloseCategory = () => {
    setOpen('')
    setAddCategory({ category: '', disabled: 0 })
  }
  const handleOpenMaterial = () => setOpen('addMaterial')
  const handleCloseMaterial = () => {
    setOpen('')
    setAddMaterial({ material: '', disabled: 0 })
  }

  async function handleSend(e) {
    e.preventDefault()
    setSendCategoryLoading(true)

    try {
      await axios
        .post(
          'https://test-heroku-elwood.herokuapp.com/addcategory',
          addCategory
        )
        .then(() => {
          setOpen('')
          setSendCategoryLoading(false)
          setAddCategory({ category: '', disabled: 0 })
        })
      const updatedCategories = await axios.get(
        'https://test-heroku-elwood.herokuapp.com/categories'
      )
      const filteredDatas =
        updatedCategories.data.length &&
        updatedCategories.data.filter((item) => !item.disabled)
      setOptions(filteredDatas)
    } catch (error) {
      console.log(error)
    }
  }
  const handleSwitchChange = (e) => {
    setSendingValues((prev) => ({
      ...prev,
      disabled: prev.disabled ? 0 : 1,
    }))
  }

  async function handleSendMaterial(e) {
    e.preventDefault()
    setSendMaterialLoading(true)
    try {
      await axios
        .post(
          'https://test-heroku-elwood.herokuapp.com/addmaterial',
          addMaterial
        )
        .then(() => {
          setOpen('')
          setSendMaterialLoading(false)
          setAddMaterial({ material: '', disabled: 0 })
        })
      const updatedMaterials = await axios.get(
        'https://test-heroku-elwood.herokuapp.com/materials'
      )
      const filteredDatas =
        updatedMaterials.data.length &&
        updatedMaterials.data.filter((item) => !item.disabled)
      setMaterials(filteredDatas)
    } catch (error) {
      console.log(error)
    }
  }

  function handleMaterialChange(e) {
    setAddMaterial((prev) => ({ ...prev, material: e.target.value }))
  }

  const handleFilePicker = (callback, value, meta) => {
    if (meta.filetype === 'image') {
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'image/jpeg')
      input.onchange = function () {
        const file = this.files[0]
        callback(`/image/main/${file.name}`)
      }
      input.click()
    }
  }

  console.log(sendingValues)

  return (
    <section className={styles.section}>
      <div className={styles.containerHeader}>
        <header className={styles.header}>
          <div className={styles.leftHeader}>
            <h1>Creating Product</h1>
          </div>
          <div className={styles.rightHeader}>
            <div className={styles.backContainer}>
              <Breadcrumbs aria-label="breadcrumb">
                <RouterLink to="/admin/admindashboard/products">
                  <div className={styles.backContainer}>
                    <HiOutlineArrowNarrowLeft className={styles.backIcon} />
                    Go Back
                  </div>
                </RouterLink>
                <button onClick={handleSendValues} className={styles.btn}>
                  <MdAddCircle
                    onClick={handleSendValues}
                    className={styles.iconBtn}
                  />
                  Create
                </button>
              </Breadcrumbs>
            </div>
          </div>
        </header>
      </div>
      <div className={styles.container}>
        <div className={styles.disabledContainer}>
          <label className={styles.disabledLabel}>
            <GiSightDisabled className={styles.disabledIcon} />
            Disabled:
          </label>
          <Switch
            {...label}
            checked={sendingValues.disabled === 1}
            onChange={handleSwitchChange}
          />
        </div>
        <div className={styles.formNameContainer}>
          <label className={styles.labelName}>
            <TbFlag3Filled className={styles.productNameIcon} />
            Product Name:
          </label>
          <Box
            sx={{
              width: 500,
              maxWidth: '100%',
            }}>
            <TextField
              label="Name"
              value={sendingValues.name}
              onChange={(e) =>
                setSendingValues((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              id="outlined-size-small"
              size="small"
              fullWidth
            />
          </Box>
        </div>
        <div className={styles.statusContainer}>
          <label className={styles.labelStatus}>
            <MilitaryTechIcon />
            Status:
          </label>
          <div className={styles.status_es}>
            <Box sx={{ width: 100 }}>
              <Grid
                container
                justifyContent="center"
                className={styles.statusIconContainer}>
                <Tooltip title="Hite" placement="top">
                  <WhatshotIcon
                    onClick={() =>
                      setSendingValues((prev) => ({ ...prev, status: 1 }))
                    }
                    className={styles.statusIcon}
                  />
                </Tooltip>
                <span
                  onClick={() =>
                    setSendingValues((prev) => ({ ...prev, status: 1 }))
                  }>
                  Hite
                </span>
              </Grid>
            </Box>
          </div>
          <div className={styles.status_es}>
            <Box sx={{ width: 100 }}>
              <Grid
                container
                justifyContent="center"
                className={styles.statusIconContainer}>
                <Tooltip title="News" placement="top">
                  <NewspaperIcon
                    onClick={() =>
                      setSendingValues((prev) => ({ ...prev, status: 2 }))
                    }
                    className={styles.statusIcon}
                  />
                </Tooltip>
                <span
                  onClick={() =>
                    setSendingValues((prev) => ({ ...prev, status: 2 }))
                  }>
                  News
                </span>
              </Grid>
            </Box>
          </div>
          <div className={styles.status_es}>
            <Box sx={{ width: 100 }}>
              <Grid
                container
                justifyContent="center"
                className={styles.statusIconContainer}>
                <Tooltip title="Soon" placement="top">
                  <StarIcon
                    onClick={() =>
                      setSendingValues((prev) => ({ ...prev, status: 3 }))
                    }
                    className={styles.statusIcon}
                  />
                </Tooltip>
                <span
                  onClick={() =>
                    setSendingValues((prev) => ({ ...prev, status: 3 }))
                  }>
                  Soon
                </span>
              </Grid>
            </Box>
          </div>
          <div className={`${styles.status_es} ${styles.statusRef}`}>
            <Box sx={{ width: 100 }}>
              <Grid
                container
                justifyContent="center"
                className={`${styles.statusIconContainer} ${styles.refreshContainer}`}>
                <Tooltip title="Reset" placement="top">
                  <RefreshIcon
                    onClick={() =>
                      setSendingValues((prev) => ({ ...prev, status: 0 }))
                    }
                    className={`${styles.statusIcon} ${styles.restart}`}
                  />
                </Tooltip>
                <span
                  onClick={() =>
                    setSendingValues((prev) => ({ ...prev, status: 0 }))
                  }>
                  Reset
                </span>
              </Grid>
            </Box>
          </div>
        </div>

        <div className={styles.priceContainer}>
          <label className={styles.labelPrice}>
            <IoIosPricetag className={styles.priceIcon} />
            Price:
          </label>
          <TextField
            id="standard-textarea"
            label="Price"
            value={sendingValues.price}
            onChange={(e) =>
              setSendingValues((prev) => ({ ...prev, price: e.target.value }))
            }
            placeholder="Enter product price"
            multiline
            variant="standard"
          />
        </div>
        <div className={styles.categoriesContainer}>
          <label className={styles.categoryLabel}>Category:</label>
          <Stack spacing={1} sx={{ width: 300 }}>
            <Autocomplete
              {...defaultProps}
              id="controlled-demo"
              value={sendingValues.category}
              onChange={(event, newValue) => {
                setSendingValues((prev) => ({ ...prev, category: newValue }))
              }}
              renderInput={(params) => (
                <TextField {...params} label="Categories" variant="standard" />
              )}
            />
          </Stack>
          <div className={styles.addNewCategory}>
            <button
              onClick={handleOpenCategory}
              className={`${styles.btn} ${styles.addCategoryButton}`}>
              <MdAddCircle className={styles.iconBtn} />
              Create Category
            </button>
          </div>
        </div>
        <div className={styles.colorsContainer}>
          <label className={styles.colorsLable}>
            <MdColorLens className={styles.colorsIcon} />
            Colors:
          </label>
          <Select
            value={sendingValues.colors}
            isMulti
            options={colors}
            onChange={(selectedColors) =>
              setSendingValues((prev) => ({
                ...prev,
                colors: selectedColors,
              }))
            }
            styles={{
              multiValue: (styles, { data }) => ({
                ...styles,
                backgroundColor: data.color,
              }),
              multiValueLabel: (styles, { data }) => ({
                ...styles,
                color: 'white',
              }),
              multiValueRemove: (styles, { data }) => ({
                ...styles,
                color: 'white',
                ':hover': {
                  backgroundColor: data.color,
                  color: 'white',
                },
              }),
              option: (styles, { data, isSelected }) => ({
                ...styles,
                backgroundColor: isSelected ? data.color : 'white',
                color: isSelected ? 'white' : 'black',
              }),
            }}
          />
        </div>
        <div className={styles.productSizeContainer}>
          <label className={styles.defaultSizeLabel}>Default Size:</label>
          <div className={styles.sizeHeight}>
            <label className={styles.sizeLabel}>
              <MdOutlineHeight className={styles.heightIcon} />
              Height:
            </label>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off">
              <TextField
                id="standard-textarea"
                label="Height"
                value={sendingValues.height}
                onChange={(e) =>
                  setSendingValues((prev) => ({
                    ...prev,
                    height: e.target.value,
                  }))
                }
                placeholder="Enter default height"
                multiline
                variant="standard"
              />
            </Box>
          </div>
          <div className={styles.sizeHeight}>
            <label className={styles.sizeLabel}>
              <RxWidth className={styles.heightIcon} />
              Width:
            </label>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off">
              <TextField
                value={sendingValues.width}
                onChange={(e) =>
                  setSendingValues((prev) => ({
                    ...prev,
                    width: e.target.value,
                  }))
                }
                id="standard-textarea"
                label="Width"
                placeholder="Enter default width"
                multiline
                variant="standard"
              />
            </Box>
          </div>
        </div>
        <div className={styles.categoriesContainer}>
          <label className={styles.categoryLabel}>Material:</label>
          <Stack spacing={1} sx={{ width: 300 }}>
            <Autocomplete
              {...defaultPropsMaterials}
              id="controlled-demo"
              value={sendingValues.material}
              onChange={(event, newValue) => {
                setSendingValues((prev) => ({ ...prev, material: newValue }))
              }}
              renderInput={(params) => (
                <TextField {...params} label="Materials" variant="standard" />
              )}
            />
          </Stack>
          <div className={styles.addNewCategory}>
            <button
              className={`${styles.btn} ${styles.addCategoryButton}`}
              onClick={handleOpenMaterial}>
              <MdAddCircle className={styles.iconBtn} />
              Create Material
            </button>
          </div>
        </div>

        <div className={styles.editorContainer}>
          <label className={styles.descriptionLabel}>
            <DescriptionIcon />
            Description:
          </label>
          <Editor
            className={styles.editor}
            apiKey="your_api_key"
            initialValue="<p>Enter your product description...</p>"
            init={{
              height: 500,
              plugins: 'link image code',
              toolbar:
                'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image | code',
              automatic_uploads: true,
              file_picker_types: 'image',
              file_picker_callback: handleFilePicker,
            }}
            onEditorChange={handleEditorChange}
          />
        </div>
        <form>
          <div className={styles.imgUploaderContainer}>
            <div className={styles.lableImgContainer}>
              <label className={styles.imgLabel}>
                <AiFillPicture className={styles.imgIcon} />
                Images:
              </label>
            </div>
            <div className={styles.imgWrapper}>
              <input
                onChange={onInputChange}
                type="file"
                id="file"
                accept="image/*"
                hidden
                multiple
              />
              <div className={styles.imgArea} data-img="">
                <CloudUploadIcon className={styles.uploadImgIcon} />
                <h3>Upload Image</h3>
                <button type="button" onClick={handleSubmit}>
                  Send
                </button>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#file').click()
                }}
                className={styles.selectImage}>
                Select Image
              </button>
            </div>
          </div>
        </form>
        {sendingValues.imgs.length ? (
          <div className={styles.imgContainer}>
            {sendingValues.imgs.map((img) => (
              <div key={uuidv4()} className={styles.imgWrapper}>
                <img
                  className={styles.img}
                  src={`/image/products/${img}`}
                  alt="Image"
                />
                <div
                  className={styles.deleteBtn}
                  onClick={() => handleDeleteImage(img)}></div>
              </div>
            ))}
          </div>
        ) : null}

        <Stack spacing={2} direction="row">
          <Modal
            open={open === 'addCategory'}
            onClose={handleCloseCategory}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                className={styles.titleModal}>
                Create New Category
              </Typography>
              <Box
                className={styles.addInpCateogoryContainer}
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off">
                <TextField
                  id="standard-basic"
                  label="Add Category"
                  value={addCategory.category}
                  variant="standard"
                  color="primary"
                  name="category"
                  onChange={handleInputChange}
                />
              </Box>
              <Box className={styles.sendButtonContainer}>
                <Box sx={{ '& > button': { m: 1 } }}>
                  <LoadingButton
                    onClick={handleSend}
                    endIcon={<SendIcon />}
                    loading={sendCategoryLoading}
                    loadingPosition="end"
                    variant="contained">
                    <span>Send</span>
                  </LoadingButton>
                </Box>
              </Box>
            </Box>
          </Modal>
        </Stack>
        <Stack spacing={2} direction="row">
          <Modal
            open={open === 'addMaterial'}
            onClose={handleCloseMaterial}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                className={styles.titleModal}>
                Create New Material
              </Typography>
              <Box
                className={styles.addInpCateogoryContainer}
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off">
                <TextField
                  id="standard-basic"
                  label="Add Material"
                  value={addMaterial.material}
                  variant="standard"
                  color="primary"
                  name="category"
                  onChange={handleMaterialChange}
                />
              </Box>
              <Box className={styles.sendButtonContainer}>
                <Box sx={{ '& > button': { m: 1 } }}>
                  <LoadingButton
                    onClick={handleSendMaterial}
                    endIcon={<SendIcon />}
                    loading={sendCategoryLoading}
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
    </section>
  )
}
