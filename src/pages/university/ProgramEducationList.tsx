import { useEffect, useState } from 'react'
import ProgramEducationItem from '../../components/ProgramEducationItem'
import LoadingScreen from '../../components/common/LoadingScreen'
import Pagination from '../../components/common/Pagination'
import { ProgramEducation } from '../../models/ProgramEducation'
import { defaultParams } from '../../models/QueryParams'
import ProgramEducationService from '../../service/ProgramEducationService'

const ProgramEducationList = () => {
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [data, setData] = useState<ProgramEducation[]>([])
  const [total, setTotal] = useState<number>(0)
  const [page, setPage] = useState<number>(0)

  const changePage = (page: number) => {
    setPage(page)
  }
  const fetchData = async () => {
    try {
      setIsFetching(false)
      const response = await ProgramEducationService.getAllByUser({
        page: page,
        size: defaultParams.size,
      })
      setData(response.data)
      setTotal(response.meta.total)
      setPage(response.meta.page)
    } catch (e) {
      console.log('Error: ', e)
    } finally {
      setIsFetching(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [page])

  return (
    <div className="overflow-y-auto">
      <h1 className="text-2xl font-bold">Chương trình đào tạo</h1>
      <div className="">
        {!isFetching ? (
          <div className="flex flex-col  gap-8 mt-4 pb-8">
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
