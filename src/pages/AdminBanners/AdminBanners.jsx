import styles from './AdminBanners.module.css'
import {
  AiFillPlusCircle,
  AiOutlineCloudUpload,
  AiOutlineClose,
} from 'react-icons/ai'
import Modal from './AddBanner/Modal/Modal'
import { useEffect, useState } from 'react'
import axios from 'axios'
import EmptyAdminBaners from './EmptyAdminBaners/EmptyAdminBaners'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'

export default function AdminBanners() {
  const [baners, setBaners] = useState([])
  const [showModalAdd, setShowModalAdd] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [files, setFiles] = useState(null)

  const onInputChange = (e) => {
    setFiles(e.target.files)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData()
    let newFileName = ''

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const newName = uuidv4() + '.' + file.name.split('.').pop()
      newFileName += newName
      data.append('file', new File([file], newName))

      try {
        await axios.post(
          'https://test-heroku-elwood.herokuapp.com/upload',
          data
        )
        toast.success('Upload Success')
      } catch (error) {
        toast.error('Upload Error')
        console.log(error)
        return
      }
    }

    try {
      await axios.post('https://test-heroku-elwood.herokuapp.com/addbaner', {
        img: newFileName,
      })
      setSelectedImage(null)
      setShowModalAdd(false)
      // window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  const handleShowModalAdd = () => {
    setShowModalAdd(true)
  }

  const handleCloseModal = () => {
    setShowModalAdd(false)
  }

  async function handleDeleteBaner(id) {
    try {
      await axios.delete(
        `https://test-heroku-elwood.herokuapp.com/deletebaner/${id}`
      )
      // window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  const filteredIdBaners = baners && Array.from(new Set(baners))

  useEffect(() => {
    const fetchGetBaners = async () => {
      try {
        const res = await axios.get(
          'https://test-heroku-elwood.herokuapp.com/baners'
        )
        setBaners(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchGetBaners()
  }, [])

  console.log(baners)

  return (
    <>
      <div>
        <main>
          <div className={styles.mainContainer}>
            <div className={styles.box}>
              <div className={styles.mainTitle}>
                <div className={styles.mainGreeting}>
                  <h1>Main Baner</h1>
                </div>
              </div>
              <div className={styles.mainAdd}>
                <div className={styles.mainAddbox}>
                  <AiFillPlusCircle className={styles.addIcon} />
                  <h1 onClick={handleShowModalAdd} className={styles.add}>
                    Add
                  </h1>
                </div>
              </div>
            </div>
            <div
              className={`${styles.charts} ${
                !filteredIdBaners.length && styles.empty
              }`}>
              {filteredIdBaners.length ? (
                filteredIdBaners.map((baner, idx) => (
                  <div className={styles.chartsLeft} key={new Date()}>
                    <div className={styles.chartsLeftTitle}>
                      <img
                        src={`/image/baners/${baner.img}`}
                        alt="BANER"
                        className={styles.img}
                      />
                    </div>
                    <div className={styles.btnContainer}>
                      <div className={styles.btns}>
                        <button
                          onClick={() => handleDeleteBaner(baner.id)}
                          className={styles.delete}>
                          Delete
                        </button>
                      </div>
                    </div>
                    <div id="apex1"></div>
                  </div>
                ))
              ) : (
                <div className={styles.emptyBanersContainer}>
                  <EmptyAdminBaners />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      <div>
        <Modal show={showModalAdd} type="add" handleClose={handleCloseModal}>
          <div className={styles.container}>
            <input
              type="file"
              id="file"
              accept="image/*"
              hidden
              onChange={onInputChange}
            />
            <div
              className={`${styles.imgArea} ${
                selectedImage ? styles.active : ''
              }`}
              data-img="">
              {selectedImage ? (
                <div>
                  <img src={selectedImage} alt="Selected" />
                  <AiOutlineClose className={styles.deleteImg} />
                </div>
              ) : (
                <>
                  <AiOutlineCloudUpload />
                  <h3>Upload Image</h3>
                  <p>
                    Image size must be less than <span>2MB</span>
                  </p>
                </>
              )}
            </div>
            <button
              className={styles.selectImage}
              onClick={() => document.querySelector('#file').click()}>
              Select Image
            </button>
            <div className={styles.btnContainer}>
              <button onClick={onSubmit} className={styles.addBtn}>
                Add
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}
