import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProgramEducationForm from '../../components/ProgramEducationForm'
import LoadingScreen from '../../components/common/LoadingScreen'
import { ProgramEducation } from '../../models/ProgramEducation'
import ProgramEducationService from '../../service/ProgramEducationService'

const EditProgramEducation = () => {
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
  }, [])

  return (
    <div>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div>
          <ProgramEducationForm
            programEducation={programEducation as ProgramEducation}
          />
        </div>
      )}
    </div>
  )
}
export default EditProgramEducation
