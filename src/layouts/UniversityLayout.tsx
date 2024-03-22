import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import SidebarUniversity from '../components/university/SidebarUniversity'
import { User } from '../models/User'
import { AuthService } from '../service/AuthService'

const UniversityLayout = () => {
  const [user, setUser] = useState<User>()
  const fetchData = async () => {
    try {
      const response = await AuthService.me()
      setUser(response.data)
    } catch (e) {
      console.log('Error: ' + e)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className="flex w-full h-full overflow-y-auto">
      <SidebarUniversity />
      <div className="w-full mx-10">
        <div className="flex justify-end mb-4 border-b  py-4">
          <h1 className="font-bold text-primary_color text-lg ">
            {user?.name}
          </h1>
        </div>

        <Outlet />
      </div>
    </div>
  )
}
export default UniversityLayout
