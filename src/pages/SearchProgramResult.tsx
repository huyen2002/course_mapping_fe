import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ProgramEducationItem from '../components/ProgramEducationItem'
import SearchProgramForm from '../components/SearchProgramForm'
import LoadingScreen from '../components/common/LoadingScreen'
import Pagination from '../components/common/Pagination'
import Paths from '../constants/paths'
import { useFetchPagination } from '../hooks/useFetchPagination'
import { Major } from '../models/Major'
import { SearchProgramParams } from '../models/SearchProgramParams'
import { University } from '../models/University'
import { MajorService } from '../service/MajorService'
import ProgramEducationService from '../service/ProgramEducationService'
import { UniversityService } from '../service/UniversityService'

const SearchProgramResult = () => {
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const [majorCode, setMajorCode] = useState<string | null>(
    params.get('majorCode')
  )
  const [universityId, setUniversityId] = useState<number | null>(
    params.get('universityId')
      ? parseInt(params.get('universityId') as string)
      : null
  )
  const defaultSearchParams = {
    majorCode: majorCode,
    universityId: universityId,
    name: params.get('name'),
    levelOfEducation: params.get('levelOfEducation'),
    status: params.get('status'),
  } as SearchProgramParams

  const [searchParams, setSearchParams] =
    useState<SearchProgramParams>(defaultSearchParams)

  const navigate = useNavigate()

  const { data, isFetching, page, changePage, total, fetchData } =
    useFetchPagination(ProgramEducationService.search, searchParams)

  const [major, setMajor] = useState<Major | null | undefined>(null)
  const [university, setUniversity] = useState<University | null | undefined>(
    null
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const fetchInfo = async () => {
    try {
      setIsLoading(true)
      if (majorCode) {
        const majorResponse = await MajorService.search(
          {},
          {
            code: majorCode,
          }
        )
        setMajor(majorResponse.data[0])
      }
      if (universityId) {
        const universityResponse = await UniversityService.getById(universityId)
        setUniversity(universityResponse.data)
      }
    } catch (e) {
      console.log('Error', e)
    } finally {
      setIsLoading(false)
    }
  }
  const onSubmit = () => {
    setMajorCode(searchParams.majorCode || null)
    setUniversityId(searchParams.universityId || null)
    Object.keys(searchParams).forEach(
      (key) =>
        searchParams[key as keyof SearchProgramParams] == null &&
        delete searchParams[key as keyof SearchProgramParams]
    )
    const searchStr = new URLSearchParams(searchParams as any).toString()
    navigate(`/${Paths.SEARCH_PROGRAM_RESULT}?${searchStr}`)
    fetchData()
  }
  useEffect(() => {
    fetchInfo()
  }, [majorCode, universityId])

  return (
    <div>
      {isFetching || isLoading ? (
        <LoadingScreen />
      ) : (
        <main className="flex gap-10 h-full lg:flex-row flex-col overflow-auto no-scrollbar lg:overflow-hidden">
          <SearchProgramForm
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            onSubmit={onSubmit}
          />
          <div className="flex-1">
            <span className="text-xl text-primary_color font-bold">
              Chương trình đào tạo
            </span>
            {majorCode && major !== undefined && (
              <span className="text-xl text-primary_color font-bold">{` - Ngành ${major?.name}`}</span>
            )}

            {university && university !== undefined && (
              <span className="text-xl text-primary_color font-bold">{`- Trường ${university.name}`}</span>
            )}

            <div className="h-full lg:h-[500px]">
              {!isFetching ? (
                <div className="relative flex flex-col h-full gap-8 mt-4 pb-8 overflow-auto lg:overflow-y-scroll lg:h-[500px] no-scrollbar">
                  {data.length > 0 ? (
                    <div>
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
                      <div className="mt-4">
                        <Pagination
                          total={total}
                          currentPage={page}
                          changePage={changePage}
                        />
                      </div>
                    </div>
                  ) : (
                    <p>Không có dữ liệu</p>
                  )}
                </div>
              ) : (
                <LoadingScreen />
              )}
            </div>
          </div>
        </main>
      )}
    </div>
  )
}
export default SearchProgramResult
