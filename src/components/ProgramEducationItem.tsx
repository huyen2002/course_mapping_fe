import { Tooltip } from '@mui/material'
import { Link } from 'react-router-dom'
import { LevelOfEducation, ProgramEducation } from '../models/ProgramEducation'
const ProgramEducationItem = ({
  programEducation,
  hideInfo,
  hideUniversity,
  comparedProgramEducationId,
}: {
  programEducation: ProgramEducation
  hideInfo?: boolean
  hideUniversity?: boolean
  comparedProgramEducationId?: number
}) => {
  return (
    <div className="shadow-md rounded-md p-4 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <Link
          to={
            !hideUniversity
              ? `/program_education/${programEducation.id}`
              : `/university/program_education/${programEducation.id}`
          }
          className={
            hideInfo
              ? 'font-montserrat font-semibold text-text_color'
              : 'font-montserrat text-lg font-bold text-text_color'
          }
        >
          <span>{programEducation.name} </span>
          {!hideUniversity && (
            <span> {` (${programEducation.university.name})`}</span>
          )}
        </Link>
      </div>

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
              {programEducation.durationYear} năm
            </span>
          </Tooltip>
          <Tooltip
            title="Trạng thái"
            placement="top"
          >
            <span className="bg-red-100 text-red-600 rounded-2xl px-3 py-1 font-semibold text-sm">
              {!programEducation.endYear ||
              programEducation.endYear > new Date().getFullYear()
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
            to={`/compare_program_educations/${programEducation.id}/and/${comparedProgramEducationId}`}
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
