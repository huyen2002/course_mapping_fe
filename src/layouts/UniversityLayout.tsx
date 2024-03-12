import { Outlet } from 'react-router-dom'
import SidebarUniversity from '../components/university/SidebarUniversity'

const UniversityLayout = () => {
  return (
    <div className="flex w-full h-full">
      <SidebarUniversity />
      <div className="w-full mt-4 ml-10">
        <Outlet />
      </div>
    </div>
  )
}
export default UniversityLayout
