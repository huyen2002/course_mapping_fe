/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table, Tooltip } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { IoIosAdd } from 'react-icons/io'
import { MdOutlineDelete } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingScreen from '../../components/common/LoadingScreen'
import Pagination from '../../components/common/Pagination'
import SearchInput from '../../components/university/SearchInput'
import { useFetchPagination } from '../../hooks/useFetchPagination'
import { CourseService } from '../../service/CourseService'

const CourseList = () => {
  const [searchName, setSearchName] = useState<string | null>(null)
  const { id } = useParams()
  const navigate = useNavigate()

  const { data, changePage, fetchData, isFetching, page, total } =
    useFetchPagination(
      null,
      CourseService.search,
      { universityId: parseInt(id as string), name: searchName },
      10
    )
  useEffect(() => {
    changePage(1)
    fetchData()
    console.log('fetch data', data)
  }, [searchName])
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
          className=" flex text-sm text-white  bg-primary_color hover:bg-primary_color_hover  focus:outline-none font-medium rounded-lg  px-2 py-2 "
        >
          <IoIosAdd size={20} />
          Thêm mới
        </button>
      </div>

      {isFetching ? (
        <LoadingScreen />
      ) : (
        <div className="mt-8">
          <Table className="font-montserrat">
            <Table.Head className="text-primary_color font-extrabold text-sm">
              <Table.HeadCell>STT</Table.HeadCell>
              <Table.HeadCell>Mã môn học</Table.HeadCell>
              <Table.HeadCell>Tên môn học</Table.HeadCell>
              <Table.HeadCell>Ngôn ngữ</Table.HeadCell>
              <Table.HeadCell>Nội dung</Table.HeadCell>
              <Table.HeadCell></Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {data.map((course, index) => (
                <Table.Row key={course.id}>
                  <Table.Cell>{index + 1 + (page - 1) * 10}</Table.Cell>
                  <Table.Cell>{course.code}</Table.Cell>
                  <Table.Cell>{course.name}</Table.Cell>
                  <Table.Cell>
                    {course.language === 'VI' ? 'Tiếng Việt' : 'Tiếng Anh'}
                  </Table.Cell>
                  <Table.Cell>
                    {course.outline || 'Chưa có thông tin'}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-4">
                      <Tooltip
                        placement="top"
                        content="Chỉnh sửa"
                      >
                        <button>
                          <CiEdit
                            size={25}
                            color="#3D8BCC"
                          />
                        </button>
                      </Tooltip>
                      <Tooltip
                        placement="top"
                        content="Xóa"
                      >
                        <button>
                          <MdOutlineDelete
                            size={25}
                            color="#F87171"
                          />
                        </button>
                      </Tooltip>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <div className="mt-8">
            <Pagination
              total={total}
              currentPage={page}
              size={10}
              changePage={changePage}
            />
          </div>
        </div>
      )}
    </div>
  )
}
export default CourseList
