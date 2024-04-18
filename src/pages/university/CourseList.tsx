/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import { IoIosAdd } from 'react-icons/io'
import { useNavigate, useParams } from 'react-router-dom'
import SearchInput from '../../components/university/SearchInput'
import { useFetchPagination } from '../../hooks/useFetchPagination'
import { SearchCourseParams } from '../../models/SearchMajorParams'
import { CourseService } from '../../service/CourseService'

const CourseList = () => {
  const [searchParams, setSearchParams] = useState<SearchCourseParams>({})
  const [searchName, setSearchName] = useState<string | null>(null)
  const { id } = useParams()
  const navigate = useNavigate()

  const { data, changePage, fetchData } = useFetchPagination(
    CourseService.getAllByUniversity(parseInt(id as string)),
    CourseService.searchByUniversityAndName(parseInt(id as string)),
    searchParams
  )
  useEffect(() => {
    changePage(1)
    fetchData()
    console.log('fetch data', data)
  }, [searchParams])

  return (
    <div className="overflow-y-auto">
      <h1 className="text-2xl font-bold mb-8">Môn học</h1>

      <div className="flex justify-between items-center">
        <SearchInput
          setSearchName={setSearchName}
          placeholder="Tên môn học"
        />
        <button
          onClick={() => navigate(`/university/${id}/new_course`)}
          className=" flex  text-white  bg-primary_color hover:bg-primary_color_hover  focus:outline-none font-medium rounded-lg  px-2 py-2 "
        >
          <IoIosAdd size={20} />
          Thêm mới
        </button>
      </div>
    </div>
  )
}
export default CourseList
