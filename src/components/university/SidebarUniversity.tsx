import { CustomFlowbiteTheme, Sidebar } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { FaUniversity } from 'react-icons/fa'
import { FaBookOpen } from 'react-icons/fa6'
import { GoArchive } from 'react-icons/go'
import { HiArrowSmRight } from 'react-icons/hi'
import { PiGraduationCapFill } from 'react-icons/pi'
import Paths from '../../constants/paths'
import { University } from '../../models/University'
import { UniversityService } from '../../service/UniversityService'

const SidebarUniversity = () => {
  const [university, setUniversity] = useState<University | null>(null)
  useEffect(() => {
    UniversityService.getByUser().then((response) => {
      if (response.meta.status === 200) {
        setUniversity(response.data)
        // console.log('hello', response.data)
      }
    })
  }, [])
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
            icon={PiGraduationCapFill}
            href={`/university/${university?.id}/program_educations`}
          >
            Chương trình đào tạo
          </Sidebar.Item>
          <Sidebar.Item
            icon={FaBookOpen}
            href={`/university/${university?.id}/courses`}
          >
            Môn học
          </Sidebar.Item>
          <Sidebar.Item
            icon={AiOutlineHome}
            href={Paths.HOME}
          >
            Trang chính
          </Sidebar.Item>
          <Sidebar.Item
            href={`/university/${university?.id}/info`}
            icon={FaUniversity}
          >
            Thông tin cơ quan
          </Sidebar.Item>
          <Sidebar.Item
            href={`/university/${university?.id}/storage`}
            icon={GoArchive}
          >
            Kho lưu trữ
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
