import { Menu, MenuItem } from '@mui/material'
import { Avatar } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { CiLogout } from 'react-icons/ci'
import { IoPersonOutline } from 'react-icons/io5'
import { RiAdminLine } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import Paths from '../../constants/paths'
import { User } from '../../models/User'
import { AuthService } from '../../service/AuthService'
import { UniversityService } from '../../service/UniversityService'
import { AuthUtils } from '../../utils/AuthUtils'

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const navigate = useNavigate()

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }
  const fetchData = async () => {
    if (!AuthUtils.isAuthorized()) return
    else {
      try {
        const response = await AuthService.me()
        setUser(response.data)
      } catch (e: any) {
        console.log(e)
      }
    }
  }
  const redirectToStaffPage = async () => {
    if (AuthUtils.isUniversity()) {
      const university = await UniversityService.getByUser()
      navigate(`/university/${university.data.id}/program_educations`)
    } else if (AuthUtils.isAdmin()) {
      navigate(Paths.ADMIN_HOME)
    }
  }
  const logout = () => {
    AuthUtils.logout()
    handleCloseMenu()
    setUser(null)
    window.location.reload()
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className="flex items-center border-b-[1px] border-gray-200 mb-10">
      <a
        href="/"
        className="flex-none"
      >
        <img
          src="/logo.png"
          alt="logo"
          width={120}
          height={100}
        />
      </a>
      <div className="flex gap-4 flex-1 text-lg ml-8">
        <Link
          to={Paths.HOME}
          className="font-semibold font-montserrat text-primary_color hover:text-primary_color_hover"
        >
          Ngành đào tạo
        </Link>
        <Link
          to={Paths.PROGRAM_EDUCATIONS}
          className="font-semibold font-montserrat  text-primary_color hover:text-primary_color_hover"
        >
          Chương trình đào tạo
        </Link>
        <Link
          to={Paths.UNIVERSITIES}
          className="font-semibold font-montserrat  text-primary_color hover:text-primary_color_hover"
        >
          Đơn vị đào tạo
        </Link>
      </div>
      {user ? (
        <div className="mr-10">
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
              {user.username}
            </h1>
            <MenuItem onClick={handleCloseMenu}>
              <IoPersonOutline size={20} />
              <span className="ml-2"> Thông tin tài khoản</span>
            </MenuItem>
            {(AuthUtils.isUniversity() || AuthUtils.isAdmin()) && (
              <MenuItem onClick={redirectToStaffPage}>
                <RiAdminLine size={20} />
                <span className="ml-2">Trang nhân viên</span>
              </MenuItem>
            )}

            <MenuItem onClick={logout}>
              <CiLogout size={20} />
              <span className="ml-2"> Đăng xuất</span>
            </MenuItem>
          </Menu>
        </div>
      ) : (
        <div className="flex-2 flex gap-4 mr-10">
          <Link to={Paths.CHOOSE_ROLE}>
            <button className=" hover:bg-white_hover text-primary_color rounded-3xl py-1 px-2  border-primary_color border-button">
              Đăng ký
            </button>
          </Link>
          <Link to={Paths.LOGIN}>
            <button className=" bg-primary_color text-white py-1 rounded-3xl px-2 hover:bg-primary_color_hover ">
              Đăng nhập
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}
export default Navbar
