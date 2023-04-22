import { Routes, Route } from 'react-router-dom'
import Admin from './pages/Admin/Admin'
import MainWrapper from './pages/MainWrapper/MainWrapper'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import FailedAdmin from './pages/FailedAdmin/FailedAdmin'
import AlreadyLogined from './pages/AlreadyLogined/AlreadyLogined'
import AddProductPage from './pages/AddProductPage/AddProductPage'
import AdminProductsDataTables from './components/AdminProductsDataTables/AdminProductsDataTables'
import AdminColors from './components/AdminColors/AdminColors'
import AdminMaterials from './components/AdminMaterials/AdminMaterials'
import AdminBanners from './pages/AdminBanners/AdminBanners'
import AdminCategories from './components/AdminCategories/AdminCategories'
import AllProducts from './pages/AllProducts/AllProducts'
import NotFound from './pages/NotFound/NotFound'
import ProductCard from './pages/ProductPage/ProductPage'

export default function App() {
  const [isAdmin, setIsAdmin] = useState(null)

  useEffect(() => {
    const fetchIsAdmin = async () => {
      try {
        const res = await axios.get(
          'https://test-heroku-elwood.herokuapp.com/getIsAdmin'
        )
        setIsAdmin(res.data[0].isAdmin)
      } catch (error) {
        console.log(error)
      }
    }
    fetchIsAdmin()
  }, [])
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainWrapper />} />
        <Route path="/allProducts" element={<AllProducts />} />
        <Route path="/allProducts/product/:id" element={<ProductCard />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/admin"
          element={isAdmin && isAdmin ? <AlreadyLogined /> : <Admin />}
        />
        <Route
          path="/admin/admindashboard"
          element={isAdmin && isAdmin ? <AdminDashboard /> : <FailedAdmin />}>
          <Route
            path="/admin/admindashboard/addproduct"
            element={isAdmin && isAdmin ? <AddProductPage /> : <FailedAdmin />}
          />
          <Route
            path="/admin/admindashboard/products"
            element={
              isAdmin && isAdmin ? <AdminProductsDataTables /> : <FailedAdmin />
            }
          />
          <Route
            path="/admin/admindashboard/productsColor"
            element={isAdmin && isAdmin ? <AdminColors /> : <FailedAdmin />}
          />
          <Route
            path="/admin/admindashboard/productsMaterials"
            element={isAdmin && isAdmin ? <AdminMaterials /> : <FailedAdmin />}
          />
          <Route
            path="/admin/admindashboard/mainBaners"
            element={isAdmin && isAdmin ? <AdminBanners /> : <FailedAdmin />}
          />
          <Route
            path="/admin/admindashboard/categories"
            element={isAdmin && isAdmin ? <AdminCategories /> : <FailedAdmin />}
          />
          {/* <Route
            path="/admin/admindashboard/contacts"
            element={isAdmin && isAdmin ? <AdminCategories /> : <FailedAdmin />}
          /> */}
        </Route>
      </Routes>
    </div>
  )
}
