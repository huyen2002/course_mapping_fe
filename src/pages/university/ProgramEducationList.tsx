import { useEffect, useState } from 'react'
import { IoIosAdd } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import ProgramEducationItem from '../../components/ProgramEducationItem'
import LoadingScreen from '../../components/common/LoadingScreen'
import Pagination from '../../components/common/Pagination'
import SearchInput from '../../components/university/SearchInput'
import Paths from '../../constants/paths'
import { useFetchPagination } from '../../hooks/useFetchPagination'
import { defaultParams } from '../../models/QueryParams'
import { SearchProgramParams } from '../../models/SearchProgramParams'
import ProgramEducationService from '../../service/ProgramEducationService'
const ProgramEducationList = () => {
  const [searchParams, setSearchParams] = useState<SearchProgramParams>({})
  const [searchName, setSearchName] = useState<string | null>(null)
  const { data, page, total, isFetching, changePage, fetchData } =
    useFetchPagination(
      ProgramEducationService.getAllByUser,
      ProgramEducationService.search,
      searchParams
    )
  const navigate = useNavigate()
  useEffect(() => {
    setSearchParams({ ...searchParams, name: searchName })
  }, [searchName])

  useEffect(() => {
    changePage(1)
    fetchData()
  }, [searchParams])
  return (
    <div className="overflow-y-auto">
      <h1 className="text-2xl font-bold mb-8">Chương trình đào tạo</h1>

      <div className="flex justify-between items-center">
        <SearchInput
          setSearchName={setSearchName}
          placeholder="Tên chương trình đào tạo"
        />
        <button
          onClick={() => navigate(Paths.NEW_PROGRAM_EDUCATION)}
          className=" flex  text-white  bg-primary_color hover:bg-primary_color_hover  focus:outline-none font-medium rounded-lg  px-2 py-2 "
        >
          <IoIosAdd size={20} />
          Thêm mới
        </button>
      </div>

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
