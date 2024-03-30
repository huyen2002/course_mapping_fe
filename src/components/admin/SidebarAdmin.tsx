'use client'

import { CustomFlowbiteTheme, Sidebar } from 'flowbite-react'
import { AiOutlineHome } from 'react-icons/ai'
import { FaUsers } from 'react-icons/fa'
import { FaAlignLeft, FaBookOpen, FaSchool } from 'react-icons/fa6'
import { HiArrowSmRight } from 'react-icons/hi'
import { IoReturnUpBackOutline } from 'react-icons/io5'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'
import { PiGraduationCapFill } from 'react-icons/pi'
import Paths from '../../constants/paths'
const SidebarUniversity = () => {
  const theme: CustomFlowbiteTheme['sidebar'] = {
    root: {
      base: 'h-full',
      collapsed: {
        on: 'w-16',
        off: 'w-74',
      },
      inner:
        'h-full overflow-y-auto overflow-x-hidden rounded bg-white py-4 px-3 shadow-lg no-scrollbar',
    },
  }
  return (
    <Sidebar theme={theme}>
      <img
        src="/logo.png"
        alt="logo"
      />
      <Sidebar.Items className="mt-4">
        <Sidebar.ItemGroup>
          <Sidebar.Item
            icon={AiOutlineHome}
            href={Paths.ADMIN_HOME}
          >
            Trang chủ
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={FaUsers}
          >
            Người dùng
          </Sidebar.Item>
          <Sidebar.Item
            href={Paths.ADMIN_PROGRAM_EDUCATION_MANAGE}
            icon={FaAlignLeft}
          >
            Ngành học
          </Sidebar.Item>
          <Sidebar.Item
            href={Paths.NEW_PROGRAM_EDUCATION}
            icon={FaSchool}
          >
            Trường đại học
          </Sidebar.Item>

          <Sidebar.Item
            href={Paths.ADMIN_PROGRAM_EDUCATION_MANAGE}
            icon={PiGraduationCapFill}
          >
            Chương trình đào tạo
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={FaBookOpen}
          >
            Môn học
          </Sidebar.Item>
          <Sidebar.Item
            icon={IoReturnUpBackOutline}
            href={Paths.HOME}
          >
            Trang chính
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={MdOutlineAdminPanelSettings}
          >
            Thông tin tài khoản
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={HiArrowSmRight}
          >
            Đăng xuất
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
export default SidebarUniversity
