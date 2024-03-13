import { Tooltip } from '@mui/material'
import { Link } from 'react-router-dom'
import { LevelOfEducation, ProgramEducation } from '../models/ProgramEducation'

const ProgramEducationItem = ({
  programEducation,
  hideInfo,
}: {
  programEducation: ProgramEducation
  hideInfo?: boolean
}) => {
  return (
    <div className="w-full shadow-md rounded-md p-4 flex flex-col gap-2">
      <Link
        to={`/program_education/${programEducation.id}`}
        className={
          hideInfo
            ? 'font-montserrat  font-semibold text-text_color'
            : 'font-montserrat text-lg font-bold text-text_color'
        }
      >
        {` ${programEducation.name}  (${programEducation.university.user.name})`}
      </Link>
      <div>
        <span>Mã ngành: </span>
        <span>{programEducation.major.code}</span>
      </div>
      {!hideInfo ? (
        <div className="flex gap-5">
          <Tooltip
            title="Trình độ"
            placement="top"
          >
            <span className="bg-blue-100 text-blue-600 rounded-2xl px-3 py-1 font-semibold text-sm">
              {LevelOfEducation[programEducation.levelOfEducation as any]}
            </span>
          </Tooltip>
          <Tooltip
            title="Thời gian đào tạo"
            placement="top"
          >
            <span className="bg-green-100 text-green-600 rounded-2xl px-3 py-1 font-semibold text-sm">
              {programEducation.duration_year} năm
            </span>
          </Tooltip>
          <Tooltip
            title="Trạng thái"
            placement="top"
          >
            <span className="bg-red-100 text-red-600 rounded-2xl px-3 py-1 font-semibold text-sm">
              {programEducation.endYear > new Date().getFullYear()
                ? 'Hoạt động'
                : 'Đã đóng'}
            </span>
          </Tooltip>
        </div>
      ) : (
        <div className="flex gap-8">
          <Link
            to={`/program_education/${programEducation.id}`}
            className="text-primary_color hover:text-primary_color_hover hover:underline font-montserrat"
          >
            Chi tiết
          </Link>
          <Link
            to={'/'}
            className="text-primary_color hover:text-primary_color_hover hover:underline font-montserrat"
          >
            So sánh
          </Link>
        </div>
      )}
    </div>
  )
}
export default ProgramEducationItem
