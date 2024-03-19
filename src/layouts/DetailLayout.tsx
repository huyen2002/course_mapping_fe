import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar'

const DetailLayout = () => {
  return (
    <div className=" px-4 py-2 w-full h-full">
      <Navbar />
      <div className="w-full h-[calc(100vh-150px)] pb-8 overflow-y-scroll no-scrollbar">
        <Outlet />
      </div>
    </div>
  )
}
export default DetailLayout
