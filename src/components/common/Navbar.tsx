import { Menu, MenuItem } from '@mui/material'
import { Avatar } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { CiLogout } from 'react-icons/ci'
import { IoPersonOutline } from 'react-icons/io5'
import { LuMenu } from 'react-icons/lu'
import { RiAdminLine, RiLockPasswordLine } from 'react-icons/ri'
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
  const [signInAnchorEl, setSignInAnchorEl] = useState<null | HTMLElement>(null)
  const signInOpen = Boolean(signInAnchorEl)

  const handleSignInClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSignInAnchorEl(event.currentTarget)
  }
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const navigate = useNavigate()

  const handleCloseSignIn = () => {
    setSignInAnchorEl(null)
  }
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
    navigate(Paths.HOME)
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="flex items-center border-b-[1px] border-gray-200 mb-10">
      <div className="flex-1 flex items-center gap-4">
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

        <div className="lg:text-lg flex gap-4">
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
            className="font-semibold font-montserrat text-primary_color hover:text-primary_color_hover"
          >
            Đơn vị đào tạo
          </Link>
        </div>
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
            <MenuItem onClick={() => navigate(Paths.ACCOUNT_INFO)}>
              <IoPersonOutline size={20} />
              <span className="ml-2"> Thông tin tài khoản</span>
            </MenuItem>

            {(AuthUtils.isUniversity() || AuthUtils.isAdmin()) && (
              <MenuItem onClick={redirectToStaffPage}>
                <RiAdminLine size={20} />
                <span className="ml-2">Trang nhân viên</span>
              </MenuItem>
            )}
            <MenuItem onClick={() => navigate(Paths.CHANGE_PASSWORD)}>
              <RiLockPasswordLine size={20} />
              <span className="ml-2"> Đổi mật khẩu</span>
            </MenuItem>

            <MenuItem onClick={logout}>
              <CiLogout size={20} />
              <span className="ml-2"> Đăng xuất</span>
            </MenuItem>
          </Menu>
        </div>
      ) : (
        <div>
          <div className="flex-2 gap-4 mr-10 hidden lg:flex">
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
          <div className="block lg:hidden mr-4">
            <button
              onClick={handleSignInClick}
              className="bg-primary_color text-white rounded-3xl px-2 py-1 hover:bg-primary_color_hover"
            >
              <LuMenu size={20} />
            </button>
            <Menu
              id="basic-menu"
              open={signInOpen}
              onClose={handleCloseSignIn}
              anchorEl={signInAnchorEl}
            >
              <MenuItem>
                <Link to={Paths.LOGIN}>Đăng nhập</Link>
              </MenuItem>
              <MenuItem>
                <Link to={Paths.CHOOSE_ROLE}>Đăng ký</Link>
              </MenuItem>
            </Menu>
          </div>
        </div>
      )}
    </div>
  )
}
export default Navbar
