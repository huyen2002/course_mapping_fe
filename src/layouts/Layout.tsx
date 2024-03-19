import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar'

const Layout = () => {
  return (
    <div className=" lg:px-4 py-2 w-full h-full">
      <Navbar />

      <Outlet />
    </div>
  )
}
export default Layout
