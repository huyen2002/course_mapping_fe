import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProgramEducationInfo from '../components/ProgramEducationInfo'
import SimilarPrograms from '../components/SimilarPrograms'
import LoadingScreen from '../components/common/LoadingScreen'
import { FilterType } from '../models/FilterParam'
import { ProgramEducation } from '../models/ProgramEducation'
import ProgramEducationService from '../service/ProgramEducationService'

const ProgramEducationDetail = () => {
  const { id } = useParams()
  const [programEducation, setProgramEducation] =
    useState<ProgramEducation | null>(null)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [similarPrograms, setSimilarPrograms] = useState<any[]>([])
  const [filterType, setFilterType] = useState<FilterType>(
    FilterType.SIMILARITY_DESC
  )

  const fetchData = async () => {
    const idValue: number = Number(id)
    try {
      setIsFetching(true)
      const response = await ProgramEducationService.getById(idValue)
      setProgramEducation(response.data)
      const similarProgramsResponse =
        await ProgramEducationService.getSimilarPrograms(idValue, {
          filterType: filterType,
        })
      setSimilarPrograms(similarProgramsResponse.data)
      // console.log('similarProgramsResponse: ', similarProgramsResponse)
    } catch (e: any) {
      console.log('Error: ', e)
    } finally {
      setIsFetching(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [id, filterType])

  return (
    <div>
      {isFetching ? (
        <LoadingScreen />
      ) : (
        <div className="lg:mx-10 flex gap-8 lg:flex-row flex-col">
          <div className="lg:w-3/4">
            <ProgramEducationInfo programEducation={programEducation} />
          </div>

          <SimilarPrograms
            programEducation={programEducation}
            similarPrograms={similarPrograms}
            setFilterType={setFilterType}
          />
        </div>
      )}
    </div>
  )
}
export default ProgramEducationDetail
