'use client'

import { CustomFlowbiteTheme, Sidebar } from 'flowbite-react'
import { AiOutlineHome } from 'react-icons/ai'
import { BsDatabaseAdd } from 'react-icons/bs'
import { FaUniversity } from 'react-icons/fa'
import { FaAlignLeft, FaBookOpen } from 'react-icons/fa6'
import { HiArrowSmRight } from 'react-icons/hi'
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
        'h-full overflow-y-auto overflow-x-hidden rounded bg-white py-4 px-3 shadow-lg',
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
          <Sidebar.Collapse
            icon={PiGraduationCapFill}
            label="Chương trình đào tạo"
          >
            <Sidebar.Item
              href="#"
              icon={FaAlignLeft}
            >
              Danh sách
            </Sidebar.Item>
            <Sidebar.Item
              href={Paths.NEW_PROGRAM_EDUCATION}
              icon={BsDatabaseAdd}
            >
              Thêm mới
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse
            icon={FaBookOpen}
            label="Môn học"
          >
            <Sidebar.Item
              href="#"
              icon={FaAlignLeft}
            >
              Danh sách
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={BsDatabaseAdd}
            >
              Thêm mới
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item
            icon={AiOutlineHome}
            href={Paths.HOME}
          >
            Trang chính
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={FaUniversity}
          >
            Thông tin cơ quan
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
