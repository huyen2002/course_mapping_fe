/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import MajorDetail from '../components/MajorDetail'
import LoadingScreen from '../components/common/LoadingScreen'
import Pagination from '../components/common/Pagination'
import { useFetchPagination } from '../hooks/useFetchPagination'
import { SearchMajorParams } from '../models/SearchMajorParams'
import { MajorService } from '../service/MajorService'
const Home = () => {
  const [nameParam, setNameParam] = useState<string>('')
  const [codeParam, setCodeParam] = useState<string>('')
  const [searchParams, setSearchParams] = useState<SearchMajorParams>({})

  const { data, page, total, isFetching, fetchData, changePage } =
    useFetchPagination(MajorService.search, searchParams)
  const handleResetInput = (e: any) => {
    e.preventDefault()
    setNameParam('')
    setCodeParam('')
    fetchData()
  }

  useEffect(() => {
    setSearchParams({
      name: nameParam.trim() === '' ? null : nameParam.trim(),
      code: codeParam.trim() === '' ? null : codeParam.trim(),
    })
  }, [nameParam, codeParam])

  const handleSubmit = (e: any) => {
    e.preventDefault()
    fetchData()
  }
  return (
    <main className="flex flex-col lg:flex-row gap-10 h-full overflow-auto no-scrollbar lg:overflow-hidden">
      <div>
        <h1 className="font-semibold text-primary_color">Tìm kiếm</h1>
        <form className="flex flex-col gap-8 mt-4">
          <div>
            <label
              htmlFor="major_name"
              className="font-montserrat"
            >
              Tên ngành đào tạo
            </label>
            <br />
            <input
              id="major_name"
              value={nameParam as string}
              onChange={(e) => setNameParam(e.target.value)}
              className="outline-none border-[1px] border-gray-300 rounded-md px-2 py-1 w-80 focus:border-primary_color "
            />
          </div>
          <div>
            <label
              htmlFor="major_name"
              className="font-montserrat"
            >
              Mã ngành đào tạo
            </label>
            <br />
            <input
              id="major_name"
              value={codeParam as string}
              onChange={(e) => setCodeParam(e.target.value)}
              className="p-2 outline-none border-[1px] border-gray-300 rounded-md px-2 py-1 w-80 focus:border-primary_color "
            />
          </div>
          <div className="text-sm flex justify-between">
            <button
              onClick={handleResetInput}
              className=" text-primary_color border-button rounded-md px-2 py-1 hover:bg-white_hover"
            >
              Đặt lại
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-primary_color text-white rounded-md px-2 py-1 hover:bg-primary_color_hover"
            >
              Tìm kiếm
            </button>
          </div>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-2xl text-primary_color ml-4 font-bold">
          Ngành đào tạo
        </h1>
        <div className="h-full lg:h-[500px]">
          {!isFetching ? (
            <div className="relative flex flex-col gap-8 mt-4 pb-8 lg:overflow-y-scroll lg:h-[500px] no-scrollbar">
              <div>
                {data.map((major) => {
                  return (
                    <MajorDetail
                      major={major}
                      key={major.id}
                    />
                  )
                })}
              </div>
              <div>
                <Pagination
                  total={total}
                  currentPage={page}
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
export default Home
