import styles from './Admin.module.css'
import { FaUser } from 'react-icons/fa'
import { HiLockClosed } from 'react-icons/hi'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Admin() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const [adminValue, setAdminValue] = useState(0)
  function handleInputChange(e) {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  useEffect(() => {
    const fetchIsAdmin = async () => {
      try {
        const res = await axios.get(
          'https://test-heroku-elwood.herokuapp.com/getIsAdmin'
        )
        setAdminValue(res.data[0].isAdmin)
      } catch (error) {
        console.log(error)
      }
    }
    fetchIsAdmin()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      await axios
        .post('https://test-heroku-elwood.herokuapp.com/admin', {
          ...values,
          isAdmin: adminValue,
        })
        .then((res) => {
          if (res.data.message === 'Success') {
            axios
              .put('https://test-heroku-elwood.herokuapp.com/isAdmin', {
                isAdmin: 1,
              })
              .then(() => {
                navigate('/admin/admindashboard')
                window.location.reload()
              })
            console.log('success')
          } else {
            console.log('failed')
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.img}>
          <img src="/image/secondSliderImg.jpeg" className={styles.mainImg} />
        </div>
        <div className={styles.loginContent}>
          <div className={styles.form}>
            <img src="/image/icons/admin.svg" alt="Image" />
            <h2 className={styles.title}>Login Admin</h2>
            <div className={`${styles.inputDiv} ${styles.one}`}>
              <div className={styles.i}>
                <FaUser className={styles.icon} />
              </div>
              <div className={styles.div}>
                <input
                  type="text"
                  name="email"
                  className={styles.input}
                  placeholder="Enter admin E-mail"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className={`${styles.inputDiv} ${styles.pass}`}>
              <div className={styles.i}>
                <HiLockClosed className={styles.icon} />
              </div>
              <div className={styles.div}>
                <input
                  type="password"
                  name="password"
                  className={styles.input}
                  placeholder="Enter admin password"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <input
              type="submit"
              className={styles.btn}
              value="Login"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </>
  )
}
