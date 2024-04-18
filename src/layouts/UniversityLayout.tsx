import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import SidebarUniversity from '../components/university/SidebarUniversity'
import { University } from '../models/University'
import { UniversityService } from '../service/UniversityService'

const UniversityLayout = () => {
  const [university, setUniversity] = useState<University>()
  const fetchData = async () => {
    try {
      const response = await UniversityService.getByUser()
      setUniversity(response.data)
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
            {university?.name}
          </h1>
        </div>

        <Outlet />
      </div>
    </div>
  )
}
export default UniversityLayout
