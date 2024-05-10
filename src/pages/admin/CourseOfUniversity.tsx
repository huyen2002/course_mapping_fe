import { useParams } from 'react-router-dom'
import CourseListManagement from '../../components/management/CourseListManagement'

const CourseOfUniversity = () => {
  const { id } = useParams()
  const universityId = parseInt(id as string)
  return (
    <div>
      <CourseListManagement universityId={universityId} />
    </div>
  )
}

export default CourseOfUniversity
