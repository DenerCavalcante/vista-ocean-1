import CategoryButtons from "./CategoryButtons"
import Footer from "./Footer"
import Navbar from "./Navbar"


const Layout = ({ children, categories }) => {
  return (
    <div className="w-full">
       
      <div className="flex flex-col min-h-screen w-full">
      <Navbar />
        {/* <CategoryButtons categories={categories} /> */}
        <div className="flex-grow">{children}</div>
        <Footer />
      </div>
      <div
        hidden
        id="snipcart"
        data-api-key="ODhhNWUxOGEtNTk0OC00OTQwLWJkOWMtM2M1ZmNjODU1ZDJhNjM3MzMyNzM0NjM1OTMyNjcz"
        data-currency="brl"
      />
    </div>
  )
}

export default Layout
