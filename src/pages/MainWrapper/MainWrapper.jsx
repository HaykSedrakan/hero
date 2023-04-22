import WeAre from '../../components/WeAre/WeAre'
import Main from '../../components/Main/Main'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Contacts from '../../components/Contacts/Contacts'
import Partners from '../../components/Partners/Partners'
import RecentProjects from '../../components/RecentProjects/RecentProjects'
import SaleItems from '../../components/SaleItems/SaleItems'
import Products from '../../components/Products/Products'
import MainAcordeon from '../../components/MainAcordeon/MainAcordeon'

export default function MainWrapper() {
  return (
    <>
      <Header />
      <Main />
      <MainAcordeon />
      <WeAre />
      <Products />
      <SaleItems />
      <RecentProjects />
      <Partners />
      <Contacts />
      <Footer />
    </>
  )
}
