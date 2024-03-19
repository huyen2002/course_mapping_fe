import { Link } from 'react-router-dom'
import Paths from '../../constants/paths'

const Navbar = () => {
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
        <button className="font-bold  text-primary_color hover:text-primary_color_hover">
          Môn học
        </button>
      </div>
      <div className="flex-2 flex gap-4">
        <button className=" hover:bg-white_hover text-primary_color rounded-3xl py-1 px-2  border-primary_color border-button">
          Đăng ký
        </button>
        <Link to={Paths.LOGIN}>
          <button className=" bg-primary_color text-white py-1 rounded-3xl px-2 hover:bg-primary_color_hover ">
            Đăng nhập
          </button>
        </Link>

        <button className="hover:bg-white_hover text-primary_color  border-button rounded-3xl py-1 px-2">
          Trang nhân viên
        </button>
      </div>
    </div>
  )
}
export default Navbar
