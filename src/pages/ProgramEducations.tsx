import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProgramEducationItem from '../components/ProgramEducationItem'
import SearchProgramForm from '../components/SearchProgramForm'
import LoadingScreen from '../components/common/LoadingScreen'
import Pagination from '../components/common/Pagination'
import Paths from '../constants/paths'
import { useFetchPagination } from '../hooks/useFetchPagination'
import { SearchProgramParams } from '../models/SearchProgramParams'
import ProgramEducationService from '../service/ProgramEducationService'

const ProgramEducations = () => {
  const [searchParams, setSearchParams] = useState<SearchProgramParams>({})
  const navigate = useNavigate()
  const { data, page, total, isFetching, fetchData, changePage } =
    useFetchPagination(ProgramEducationService.search, searchParams)

  const onSubmit = () => {
    Object.keys(searchParams).forEach(
      (key) =>
        searchParams[key as keyof SearchProgramParams] == null &&
        delete searchParams[key as keyof SearchProgramParams]
    )
    const searchStr = new URLSearchParams(searchParams as any).toString()
    navigate(`/${Paths.SEARCH_PROGRAM_RESULT}?${searchStr}`)
    console.log(searchParams)
    fetchData()
  }

  return (
    <main className="flex gap-10 h-full lg:flex-row flex-col overflow-auto no-scrollbar lg:overflow-hidden">
      <SearchProgramForm
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        onSubmit={onSubmit}
      />
      <div className="flex-1">
        <h1 className="text-2xl ml-4 text-primary_color font-bold">
          Chương trình đào tạo
        </h1>
        <div className="h-full lg:h-[500px]">
          {!isFetching ? (
            <div className="relative flex flex-col h-full gap-8 mt-4 pb-8 overflow-auto lg:overflow-y-scroll lg:h-[500px] no-scrollbar">
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
