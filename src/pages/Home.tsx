/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import MajorDetail from '../components/MajorDetail'
import LoadingScreen from '../components/common/LoadingScreen'
import Pagination from '../components/common/Pagination'
import { Major } from '../models/Major'
import { defaultParams } from '../models/QueryParams'
import { MajorService } from '../service/MajorService'

const Home = () => {
  // const { data, page, total, isFetching, changePage } = useFetchPagination(
  //   MajorService.getAll
  // )

  const [data, setData] = useState<Major[]>([])
  const [page, setPage] = useState<number>(defaultParams.page)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [nameParam, setNameParam] = useState<string | null>(null)
  const [codeParam, setCodeParam] = useState<string | null>(null)

  const handleResetInput = (e: any) => {
    e.preventDefault()
    setNameParam('')
    setCodeParam('')
    fetchData()
  }
  useEffect(() => {
    if (nameParam?.trim() === '') {
      setNameParam(null)
    }
    if (codeParam?.trim() === '') {
      setCodeParam(null)
    }
  }, [nameParam, codeParam])

  const fetchData = async () => {
    if (!nameParam && !codeParam) {
      try {
        setIsFetching(true)
        const response = await MajorService.getAll({
          page: page - 1,
          size: defaultParams.size,
        })
        setData([...response.data])
        setTotal(response.meta.total)
      } catch (e: any) {
        console.log('Error: ' + e)
      } finally {
        setIsFetching(false)
      }
    } else {
      try {
        setIsFetching(true)
        const response = await MajorService.search(
          { page: page - 1, size: defaultParams.size },
          { name: nameParam, code: codeParam }
        )
        setData([...response.data])
        setTotal(response.meta.total)
      } catch (e: any) {
        console.log('Error: ' + e)
      } finally {
        setIsFetching(false)
      }
    }
  }

  useEffect(() => {
    fetchData()
  }, [page])

  const changePage = (page: number) => {
    setPage(page)
  }
  const handleSubmit = (e: any) => {
    e.preventDefault()
    fetchData()
  }
  return (
    <main className="flex gap-10 h-full">
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
              type="text"
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
              type="text"
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
        <div className=" h-[500px]">
          {!isFetching ? (
            <div className="relative flex flex-col gap-8 mt-4 pb-8 overflow-y-scroll h-[500px] no-scrollbar">
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
export default Home
