import { useEffect, useState } from 'react'
import { LevelOfEducation } from '../models/ProgramEducation'
import {
  LevelOfEducationParams,
  ProgramStatus,
  SearchProgramParams,
} from '../models/SearchProgramParams'

const SearchProgramForm = ({
  searchParams,
  setSearchParams,
  onSubmit,
}: {
  searchParams?: SearchProgramParams
  setSearchParams: (params: SearchProgramParams) => void
  onSubmit: (e: any) => void
}) => {
  const [nameParam, setNameParam] = useState<string>(searchParams?.name || '')
  const [majorCodeParam, setMajorCodeParam] = useState<string>(
    searchParams?.majorCode || ''
  )
  const [levelOfEducationParam, setLevelOfEducationParam] =
    useState<LevelOfEducationParams>(
      searchParams?.levelOfEducation || LevelOfEducationParams.ALL
    )
  const [statusParam, setStatusParam] = useState<ProgramStatus>(
    searchParams?.status || ProgramStatus.ALL
  )
  const resetAllFields = (e: any) => {
    e.preventDefault()
    setNameParam('')
    setMajorCodeParam('')
    setLevelOfEducationParam(LevelOfEducationParams.ALL)
    setStatusParam(ProgramStatus.ALL)
  }
  useEffect(() => {
    setSearchParams({
      name: nameParam.trim() === '' ? null : nameParam.trim(),
      majorCode: majorCodeParam.trim() === '' ? null : majorCodeParam.trim(),
      levelOfEducation:
        levelOfEducationParam === LevelOfEducationParams.ALL
          ? null
          : levelOfEducationParam,
      status: statusParam === ProgramStatus.ALL ? null : statusParam,
    } as SearchProgramParams)
  }, [nameParam, majorCodeParam, levelOfEducationParam, statusParam])

  return (
    <div>
      <h1 className="font-semibold text-primary_color">Tìm kiếm</h1>
      <form className="flex flex-col gap-8 mt-4">
        <div>
          <label
            htmlFor="name"
            className="font-montserrat"
          >
            Tên chương trình đào tạo
          </label>
          <br />
          <input
            id="name"
            value={nameParam}
            onChange={(e) => setNameParam(e.target.value)}
            className="p-2 outline-none border-[1px] border-gray-300 rounded-md px-2 py-1 w-80 focus:border-primary_color "
          />
        </div>
        <div>
          <label
            htmlFor="majorCode"
            className="font-montserrat"
          >
            Mã ngành đào tạo
          </label>
          <br />
          <input
            id="majorCode"
            value={majorCodeParam}
            onChange={(e) => setMajorCodeParam(e.target.value)}
            className="p-2 outline-none border-[1px] border-gray-300 rounded-md px-2 py-1 w-80 focus:border-primary_color "
          />
        </div>
        <div>
          <label
            htmlFor="levelOfEducation"
            className="font-montserrat"
          >
            Trình độ đào tạo
          </label>
          <br />
          <select
            id="levelOfEducation"
            value={levelOfEducationParam}
            onChange={(e) =>
              setLevelOfEducationParam(e.target.value as LevelOfEducationParams)
            }
            className="p-2 font-montserrat outline-none border-[1px] border-gray-300 rounded-md w-80 focus:border-primary_color "
          >
            <option value={LevelOfEducationParams.ALL}>Tất cả</option>
            <option value={LevelOfEducationParams.BACHELOR}>
              {LevelOfEducation.BACHELOR}
            </option>
            <option value={LevelOfEducationParams.ENGINEER}>
              {LevelOfEducation.ENGINEER}
            </option>
            <option value={LevelOfEducationParams.MASTER}>
              {LevelOfEducation.MASTER}
            </option>
            <option value={LevelOfEducationParams.DOCTOR}>
              {LevelOfEducation.DOCTOR}
            </option>
          </select>
        </div>
        <div>
          <label
            htmlFor="status"
            className="font-montserrat"
          >
            Trạng thái
          </label>
          <br />
          <select
            id="status"
            value={statusParam}
            onChange={(e) => setStatusParam(e.target.value as ProgramStatus)}
            className="p-2 font-montserrat outline-none border-[1px] border-gray-300 rounded-md w-80 focus:border-primary_color "
          >
            <option value={ProgramStatus.ALL}>Tất cả</option>
            <option value={ProgramStatus.ACTIVE}>Hoạt động</option>
            <option value={ProgramStatus.CLOSED}>Đã đóng</option>
          </select>
        </div>
        <div className="text-sm flex justify-between">
          <button
            onClick={resetAllFields}
            className=" text-primary_color border-button rounded-md px-2 py-1 hover:bg-white_hover"
          >
            Đặt lại
          </button>
          <button
            type="submit"
            onClick={onSubmit}
            className="bg-primary_color text-white rounded-md px-2 py-1 hover:bg-primary_color_hover"
          >
            Tìm kiếm
          </button>
        </div>
      </form>
    </div>
  )
}
export default SearchProgramForm
