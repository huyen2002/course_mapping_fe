import { Tooltip } from '@mui/material'
import { LevelOfEducation, ProgramEducation } from '../models/ProgramEducation'

const ProgramEducationItem = ({
  programEducation,
}: {
  programEducation: ProgramEducation
}) => {
  return (
    <div className="w-full shadow-md rounded-md p-4 flex flex-col gap-2">
      <h1 className="text-lg font-montserrat font-semibold">
        {` ${programEducation.name}  (${programEducation.university.user.name})`}
      </h1>
      <div>
        <span>Mã ngành: </span>
        <span>{programEducation.major.code}</span>
      </div>
      <div className="flex gap-5">
        <Tooltip
          title="Cấp bậc"
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
    </div>
  )
}
export default ProgramEducationItem
