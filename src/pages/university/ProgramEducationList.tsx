import { useEffect, useState } from 'react'
import { IoIosAdd } from 'react-icons/io'
import { useNavigate, useParams } from 'react-router-dom'
import ProgramEducationItem from '../../components/ProgramEducationItem'
import LoadingScreen from '../../components/common/LoadingScreen'
import Pagination from '../../components/common/Pagination'
import SearchInput from '../../components/university/SearchInput'
import { useFetchPagination } from '../../hooks/useFetchPagination'
import { SearchProgramParams } from '../../models/SearchProgramParams'
import ProgramEducationService from '../../service/ProgramEducationService'
const ProgramEducationList = () => {
  const [searchParams, setSearchParams] = useState<SearchProgramParams>({})
  const [searchName, setSearchName] = useState<string | null>(null)
  const { data, page, total, isFetching, changePage, fetchData } =
    useFetchPagination(ProgramEducationService.search, searchParams)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    setSearchParams({
      ...searchParams,
      name: searchName,
      universityId: parseInt(id as string),
    })
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
          onClick={() => navigate(`/university/${id}/new_program_education`)}
          className=" flex  text-white  bg-primary_color hover:bg-primary_color_hover text-sm  focus:outline-none font-medium rounded-lg  px-2 py-2 "
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
