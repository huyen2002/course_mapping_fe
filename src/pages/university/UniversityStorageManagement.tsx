import { useParams } from 'react-router-dom'
import ProgramStorage from '../../components/management/ProgramStorage'

const UniversityStorageManagement = () => {
  const { id } = useParams()
  const universityId = Number(id)
  return (
    <div>
      <h1 className="text-xl font-semibold mb-8">Kho lưu trữ</h1>

      <ProgramStorage universityId={universityId} />
    </div>
  )
}
export default UniversityStorageManagement
