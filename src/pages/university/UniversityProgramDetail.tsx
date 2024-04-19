import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import ProgramEducationInfo from '../../components/ProgramEducationInfo'
import LoadingScreen from '../../components/common/LoadingScreen'
import { ProgramEducation } from '../../models/ProgramEducation'
import ProgramEducationService from '../../service/ProgramEducationService'

const UniversityProgramDetail = () => {
  const { id } = useParams()
  const [programEducation, setProgramEducation] =
    useState<ProgramEducation | null>(null)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const fetchData = async () => {
    const idValue: number = Number(id)
    try {
      setIsLoading(true)
      const response = await ProgramEducationService.getById(idValue)
      setProgramEducation(response.data)
    } catch (e: any) {
      console.log('Error: ', e)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [id])
  return (
    <div>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div>
          <ProgramEducationInfo
            programEducation={programEducation}
            isShowUniversityAction
          >
            <div>
              <div className="flex gap-4 justify-end">
                <button className="px-2 py-1 bg-primary_color hover:bg-primary_color_hover text-white rounded-md">
                  Chỉnh sửa
                </button>
                <button className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md">
                  Xóa
                </button>
              </div>
              <h2 className="text-lg font-semibold text-primary_color">
                1. Thông tin
              </h2>
            </div>
          </ProgramEducationInfo>
        </div>
      )}
    </div>
  )
}
export default UniversityProgramDetail
