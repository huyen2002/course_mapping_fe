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
          to={`/program_education/${programEducation.id}`}
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
        {/* <div>
          <button
            data-popover-target="popover-bottom"
            data-popover-placement="bottom"
            type="button"
          >
            <MdOutlineMoreHoriz size={25} />
          </button>
          <div
            data-popover
            id="popover-bottom"
            role="tooltip"
            className="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
          >
            <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Popover bottom
              </h3>
            </div>
            <div className="px-3 py-2">
              <p>And here's some amazing content. It's very engaging. Right?</p>
            </div>
            <div data-popper-arrow></div>
          </div>{' '}
        </div> */}
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
