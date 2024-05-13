import { useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import SidebarUniversity from '../components/university/SidebarUniversity'
import Paths from '../constants/paths'
import { University } from '../models/University'
import { Role } from '../models/User'
import { AuthService } from '../service/AuthService'
import { UniversityService } from '../service/UniversityService'
import { AuthUtils } from '../utils/AuthUtils'

const UniversityLayout = () => {
  const [university, setUniversity] = useState<University>()
  const { id } = useParams()
  const navigate = useNavigate()
  const fetchData = async () => {
    try {
      if (!AuthUtils.isAuthorized()) {
        toast.error('Bạn cần đăng nhập để truy cập trang này')
        navigate(Paths.LOGIN)
      } else {
        const user = (await AuthService.me()).data
        const university = (await UniversityService.getById(Number(id))).data

        if (user.role === Role.ADMIN || user.id === university?.user?.id) {
          setUniversity(university)
        } else {
          toast.error('Bạn không có quyền truy cập vào trang này')
        }
      }
    } catch (e) {
      console.log('Error: ' + e)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className="flex w-full h-full overflow-y-none">
      {university && (
        <div className="flex w-full h-full gap-4 ">
          <SidebarUniversity university={university} />

          <div className="flex-1 py-4 px-4 mt-4  overflow-y-auto">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  )
}
export default UniversityLayout
