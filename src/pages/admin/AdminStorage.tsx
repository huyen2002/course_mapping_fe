import { useState } from 'react'
import MajorStorage from '../../components/management/MajorStorage'
import ProgramStorage from '../../components/management/ProgramStorage'
import UniversityStorage from '../../components/management/UniveristyStorage'

const AdminStorage = () => {
  const [selectedMenu, setSelectedMenu] = useState<any>(menuOptions[0])
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-8">Kho lưu trữ</h1>
      <div className="flex gap-4 mb-8">
        {menuOptions.map((menu) => {
          return (
            <button
              key={menu.value}
              className={
                selectedMenu.value === menu.value
                  ? 'border-b-4 border-primary_color rounded-b-sm text-primary_color font-semibold pb-1 '
                  : 'pb-1'
              }
              onClick={() => setSelectedMenu(menu)}
            >
              {menu.name}
            </button>
          )
        })}
      </div>
      {selectedMenu.value === menuOptions[0].value && <MajorStorage />}
      {selectedMenu.value === menuOptions[1].value && <UniversityStorage />}
      {selectedMenu.value === menuOptions[2].value && <ProgramStorage />}
    </div>
  )
}
export default AdminStorage

const menuOptions = [
  {
    name: 'Ngành học',
    value: 'major',
  },
  {
    name: 'Trường đại học',
    value: 'university',
  },
  {
    name: 'Chương trình đào tạo',
    value: 'program',
  },
]
