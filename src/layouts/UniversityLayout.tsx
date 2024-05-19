import { Menu, MenuItem } from '@mui/material'
import { Avatar } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { CiLogout } from 'react-icons/ci'
import { IoPersonOutline } from 'react-icons/io5'
import { RiAdminLine, RiLockPasswordLine } from 'react-icons/ri'
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
        navigate(Paths.LOGIN)
        toast.error('Bạn cần đăng nhập để truy cập trang này')
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
  return (
    <div className="flex w-full h-full overflow-y-none">
      {university && (
        <div className="flex w-full h-full gap-4 ">
          <SidebarUniversity university={university} />

          <div className="w-full mx-10 overflow-y-auto no-scrollbar">
            <div className="flex justify-end mb-4 border-b   py-4 ">
              <button
                type="button"
                onClick={handleClick}
              >
                <Avatar
                  rounded
                  img={AuthUtils.isUniversity() ? university?.feature : ''}
                  className="object-cover"
                />
              </button>
              <Menu
                id="basic-menu"
                open={open}
                onClose={handleCloseMenu}
                anchorEl={anchorEl}
              >
                <h1 className="text-primary_color font-semibold ml-4 mt-4 mb-3">
                  {university.name}
                </h1>
                <MenuItem onClick={() => navigate(Paths.ACCOUNT_INFO)}>
                  <IoPersonOutline size={20} />
                  <span className="ml-2"> Thông tin tài khoản</span>
                </MenuItem>
                <MenuItem onClick={() => navigate(Paths.CHANGE_PASSWORD)}>
                  <RiLockPasswordLine size={20} />
                  <span className="ml-2"> Đổi mật khẩu</span>
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
      )}
    </div>
  )
}
export default UniversityLayout
