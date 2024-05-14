import { Menu, MenuItem } from '@mui/material'
import { Avatar } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { CiLogout } from 'react-icons/ci'
import { IoPersonOutline } from 'react-icons/io5'
import { RiAdminLine } from 'react-icons/ri'
import { Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import SidebarAdmin from '../components/admin/SidebarAdmin'
import SidebarUniversity from '../components/university/SidebarUniversity'
import Paths from '../constants/paths'
import { University } from '../models/University'
import { Role, User } from '../models/User'
import { AuthService } from '../service/AuthService'
import { UniversityService } from '../service/UniversityService'
import { AuthUtils } from '../utils/AuthUtils'
const ManagementLayout = () => {
  const [user, setUser] = useState<User>()
  const [university, setUniversity] = useState<University | null>()

  const fetchData = async () => {
    try {
      if (!AuthUtils.isAuthorized()) {
        toast.error('Bạn cần đăng nhập để truy cập trang này')
        navigate(Paths.LOGIN)
      }
      const response = await AuthService.me()
      setUser(response.data)
      console.log(response.data)
      if (response.data.role === Role.USER) {
        toast.error('Bạn không có quyền truy cập vào trang này')
      } else if (response.data.role === Role.UNIVERSITY) {
        const universityRes = await UniversityService.getByUser()
        setUniversity(universityRes.data)
      }
    } catch (e) {
      console.log('Error: ' + e)
    }
  }
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }
  const logout = () => {
    AuthUtils.logout()
    handleCloseMenu()
    navigate(Paths.HOME)
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className="flex w-full h-full overflow-hidden ">
      {!university ? (
        <SidebarAdmin />
      ) : (
        <SidebarUniversity university={university} />
      )}
      <div className="w-full mx-10 overflow-y-auto no-scrollbar">
        <div className="flex justify-end mb-4 border-b   py-4 ">
          <button
            type="button"
            onClick={handleClick}
          >
            <Avatar rounded />
          </button>
          <Menu
            id="basic-menu"
            open={open}
            onClose={handleCloseMenu}
            anchorEl={anchorEl}
          >
            <h1 className="text-primary_color font-semibold ml-4 mt-4 mb-3">
              {user?.username}
            </h1>
            <MenuItem onClick={handleCloseMenu}>
              <IoPersonOutline size={20} />
              <span className="ml-2"> Thông tin tài khoản</span>
            </MenuItem>

            <MenuItem onClick={() => navigate(Paths.HOME)}>
              <RiAdminLine size={20} />
              <span className="ml-2">Trang chính</span>
            </MenuItem>

            <MenuItem onClick={logout}>
              <CiLogout size={20} />
              <span className="ml-2"> Đăng xuất</span>
            </MenuItem>
          </Menu>
        </div>

        <Outlet />
      </div>
    </div>
  )
}
export default ManagementLayout
