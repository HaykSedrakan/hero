import styles from './AdminDashboard.module.css'
import { BsFillVolumeUpFill } from 'react-icons/bs'
import { IoMdLogOut } from 'react-icons/io'
import { AiFillInfoCircle } from 'react-icons/ai'
import { MdProductionQuantityLimits, MdContactPhone } from 'react-icons/md'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { BiSlideshow } from 'react-icons/bi'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import { Outlet } from 'react-router-dom'

function AdminDashboard() {
  const [active, setActive] = useState('dashboard')
  async function handleLogout(e) {
    try {
      await axios.put('https://test-heroku-elwood.herokuapp.com/isAdmin', {
        isAdmin: 0,
      })
    } catch (error) {
      console.log(error)
    }
  }

  function handleChangeActive(name) {
    setActive(name)
  }

  return (
    <>
      <div className={styles.container}>
        <nav className={styles.navbar}>
          <h1 className={styles.adminNavTitle}>Admin Dashboard</h1>
        </nav>
        <main>
          <Outlet />
        </main>
        <div className={styles.sidebar}>
          <div className={styles.sidebarTitle}>
            <div className={styles.sidebarImg}>
              <img src="/image/logo.png" alt="logo" className={styles.img} />
              <h1>Elwood.am</h1>
            </div>
            <BsFillVolumeUpFill className={styles.icon} />
          </div>

          <div className={styles.sidebarMenu}>
            <div
              className={`${styles.sidebarLink} ${
                active === 'dashboard' ? styles.activeMenuLink : ''
              }`}>
              <BsFillVolumeUpFill
                onClick={() => handleChangeActive('dashboard')}
                className={styles.icon}
              />
              <span onClick={() => handleChangeActive('dashboard')}>
                Dashboard
              </span>
            </div>
            <h2>Pages</h2>
            <div
              className={`${styles.sidebarLink} ${
                active === 'aboutUs' ? styles.activeMenuLink : ''
              }`}>
              <AiFillInfoCircle
                onClick={() => handleChangeActive('aboutUs')}
                className={styles.icon}
              />
              <span onClick={() => handleChangeActive('aboutUs')}>
                About Us
              </span>
            </div>
            <div
              className={`${styles.sidebarLink} ${
                active === 'products' && styles.activeMenuLink
              }`}>
              <MdProductionQuantityLimits
                onClick={() => handleChangeActive('products')}
                className={styles.icon}
              />
              <Link
                to="/admin/admindashboard/products"
                onClick={() => handleChangeActive('products')}>
                Products
              </Link>
            </div>
            <div
              className={`${styles.sidebarLink} ${
                active === 'contacts' && styles.activeMenuLink
              }`}>
              <MdContactPhone
                onClick={() => handleChangeActive('contacts')}
                className={styles.icon}
              />
              <Link
                to="/admin/admindashboard/contacts"
                onClick={() => handleChangeActive('contacts')}>
                Contacts
              </Link>
            </div>
            <h2>Baners</h2>

            <div
              className={`${styles.sidebarLink} ${
                active === 'mainBaner' && styles.activeMenuLink
              }`}>
              <BiSlideshow
                onClick={() => handleChangeActive('mainBaner')}
                className={styles.icon}
              />
              <Link
                to="/admin/admindashboard/mainBaners"
                onClick={() => handleChangeActive('mainBaner')}>
                Main Baner
              </Link>
            </div>

            <h2>Products</h2>
            <div
              className={`${styles.sidebarLink} ${
                active === 'categories' && styles.activeMenuLink
              }`}>
              <BiSlideshow
                onClick={() => handleChangeActive('categories')}
                className={styles.icon}
              />
              <Link
                to="/admin/admindashboard/categories"
                onClick={() => handleChangeActive('categories')}>
                Categories
              </Link>
            </div>
            <div
              className={`${styles.sidebarLink} ${
                active === 'colors' && styles.activeMenuLink
              }`}>
              <ColorLensIcon
                onClick={() => handleChangeActive('colors')}
                className={styles.icon}
              />
              <Link
                to="/admin/admindashboard/productsColor"
                onClick={() => handleChangeActive('colors')}>
                Products Colors
              </Link>
            </div>
            <div
              className={`${styles.sidebarLink} ${
                active === 'materials' && styles.activeMenuLink
              }`}>
              <PrecisionManufacturingIcon
                onClick={() => handleChangeActive('materials')}
                className={styles.icon}
              />
              <Link
                to="/admin/admindashboard/productsMaterials"
                onClick={() => handleChangeActive('materials')}>
                Product Materials
              </Link>
            </div>

            <div className={styles.sidebarLogout}>
              <IoMdLogOut className={styles.logoutIcon} />
              <Link to="/" onClick={handleLogout}>
                Log out
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard
