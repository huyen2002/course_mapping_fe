/* eslint-disable @typescript-eslint/no-unused-vars */
import { useParams } from 'react-router-dom'
import CourseListManagement from '../../components/management/CourseListManagement'

const CourseList = () => {
  const { id } = useParams()
  const universityId = parseInt(id as string)
  return (
    <div>
      <CourseListManagement universityId={universityId} />
    </div>
  )
}
export default CourseList
