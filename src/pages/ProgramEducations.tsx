import { useEffect, useState } from 'react'
import ProgramEducationItem from '../components/ProgramEducationItem'
import LoadingScreen from '../components/common/LoadingScreen'
import Pagination from '../components/common/Pagination'
import { LevelOfEducation, ProgramEducation } from '../models/ProgramEducation'
import { defaultParams } from '../models/QueryParams'
import {
  LevelOfEducationParams,
  ProgramStatus,
  SearchProgramParams,
} from '../models/SearchProgramParams'
import ProgramEducationService from '../service/ProgramEducationService'

const ProgramEducations = () => {
  const [data, setData] = useState<ProgramEducation[]>([])
  const [page, setPage] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [nameParam, setNameParam] = useState<string>('')
  const [majorCodeParam, setMajorCodeParam] = useState<string>('')
  const [levelOfEducationParam, setLevelOfEducationParam] =
    useState<LevelOfEducationParams>(LevelOfEducationParams.ALL)
  const [statusParam, setStatusParam] = useState<ProgramStatus>(
    ProgramStatus.ALL
  )
  const changePage = (page: number) => {
    setPage(page)
  }
  const resetAllFields = (e: any) => {
    e.preventDefault()
    setNameParam('')
    setMajorCodeParam('')
    setLevelOfEducationParam(LevelOfEducationParams.ALL)
    setStatusParam(ProgramStatus.ALL)
  }

  const onSubmit = (e: any) => {
    e.preventDefault()
    fetchData()
  }

  const fetchData = async () => {
    const searchParams: SearchProgramParams = {
      name: nameParam.trim() === '' ? null : nameParam.trim(),
      majorCode: majorCodeParam.trim() === '' ? null : majorCodeParam.trim(),
      levelOfEducation:
        levelOfEducationParam === LevelOfEducationParams.ALL
          ? null
          : levelOfEducationParam,
      status: statusParam === ProgramStatus.ALL ? null : statusParam,
    } as SearchProgramParams
    console.log(searchParams)
    if (Object.values(searchParams).some((value) => value !== null)) {
      try {
        setIsFetching(true)
        const response = await ProgramEducationService.search(
          { page: page - 1, size: defaultParams.size },
          searchParams as SearchProgramParams
        )
        setTotal(response.meta.total)
        setData(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsFetching(false)
      }
    } else {
      try {
        setIsFetching(true)
        const response = await ProgramEducationService.getAll({
          page: page - 1,
          size: defaultParams.size,
        })
        setTotal(response.meta.total)
        setData(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsFetching(false)
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [page])
  return (
    <main className="flex gap-10 h-full">
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
              type="text"
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
              type="text"
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
                setLevelOfEducationParam(
                  e.target.value as LevelOfEducationParams
                )
              }
              className="p-2 font-montserrat outline-none border-[1px] border-gray-300 rounded-md w-80 focus:border-primary_color "
            >
              <option value={LevelOfEducationParams.ALL}>Tất cả</option>
              <option
                value={LevelOfEducationParams.BACHELOR}
                className=""
              >
                {LevelOfEducation.BACHELOR}
              </option>
              <option
                value={LevelOfEducationParams.MASTER}
                className=""
              >
                {LevelOfEducation.MASTER}
              </option>
              <option
                value={LevelOfEducationParams.DOCTOR}
                className=""
              >
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
              <option
                value={ProgramStatus.ACTIVE}
                className=""
              >
                Hoạt động
              </option>
              <option
                value={ProgramStatus.CLOSED}
                className=""
              >
                Đã đóng
              </option>
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
      <div className="flex-1">
        <h1 className="text-2xl ml-4 text-primary_color font-bold">
          Chương trình đào tạo
        </h1>
        <div className=" h-[500px]">
          {!isFetching ? (
            <div className="relative flex flex-col gap-8 mt-4 pb-8 overflow-y-scroll h-[500px] no-scrollbar">
              <div>
                {data.map((programEducation) => {
                  return (
                    <ProgramEducationItem
                      programEducation={programEducation}
                      key={programEducation.id}
                    />
                  )
                })}
              </div>
              <div>
                <Pagination
                  total={total}
                  currentPage={page}
                  size={defaultParams.size}
                  changePage={changePage}
                />
              </div>
            </div>
          ) : (
            <LoadingScreen />
          )}
        </div>
      </div>
    </main>
  )
}
export default ProgramEducations
