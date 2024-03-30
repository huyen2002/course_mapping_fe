import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ProgramEducationItem from '../../components/ProgramEducationItem'
import LoadingScreen from '../../components/common/LoadingScreen'
import Pagination from '../../components/common/Pagination'
import { useFetchPagination } from '../../hooks/useFetchPagination'
import { defaultParams } from '../../models/QueryParams'
import { SearchProgramParams } from '../../models/SearchProgramParams'
import ProgramEducationService from '../../service/ProgramEducationService'

const ProgramEducationList = () => {
  const { register, handleSubmit } = useForm<SearchProgramParams>()
  const [searchParams, setSearchParams] = useState<SearchProgramParams>({})
  const { data, page, total, isFetching, changePage, fetchData } =
    useFetchPagination(
      ProgramEducationService.getAllByUser,
      ProgramEducationService.search,
      searchParams
    )
  const onSubmit = (data: SearchProgramParams) => {
    console.log(data)
    setSearchParams(data)
  }
  useEffect(() => {
    changePage(1)
    fetchData()
  }, [searchParams])
  return (
    <div className="overflow-y-auto">
      <form
        className="max-w-md "
        onSubmit={handleSubmit(onSubmit)}
      >
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only "
        >
          Tìm kiếm
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border outline-none border-gray-300 rounded-lg bg-gray-50  focus:border-primary_color "
            placeholder="Tên chương trình đào tạo"
            required
            {...register('name')}
          />
          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="text-white absolute end-2.5 bottom-2.5 bg-primary_color hover:bg-primary_color_hover  focus:outline-none font-medium rounded-lg text-sm px-4 py-2 "
          >
            Tìm kiếm
          </button>
        </div>
      </form>
      <h1 className="text-2xl font-bold mt-8">Chương trình đào tạo</h1>

      <div className="">
        {!isFetching ? (
          <div className="flex flex-col  gap-8 mt-2 pb-8">
            <div>
              {data.map((programEducation) => {
                return (
                  <ProgramEducationItem
                    programEducation={programEducation}
                    key={programEducation.id}
                    hideUniversity
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
  )
}

export default ProgramEducationList
