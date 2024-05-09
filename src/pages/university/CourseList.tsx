/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Modal,
  ModalBody,
  ModalHeader,
  Spinner,
  Table,
  Tooltip,
} from 'flowbite-react'
import { useEffect, useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { IoIosAdd } from 'react-icons/io'
import { MdOutlineDelete } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import CourseForm from '../../components/CourseForm'
import LoadingScreen from '../../components/common/LoadingScreen'
import Pagination from '../../components/common/Pagination'
import SearchInput from '../../components/university/SearchInput'
import { useFetchPagination } from '../../hooks/useFetchPagination'
import { Course } from '../../models/Course'
import { CourseService } from '../../service/CourseService'

const CourseList = () => {
  const [searchName, setSearchName] = useState<string | null>(null)
  const { id } = useParams()
  const navigate = useNavigate()

  const { data, changePage, fetchData, isFetching, page, total } =
    useFetchPagination(
      CourseService.search,
      { universityId: parseInt(id as string), name: searchName },
      10
    )

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)
  const [selectedCourse, setSelectedCourse] = useState<Course>()

  const handleOpenDeleteModal = (course: Course) => {
    setSelectedCourse(course)
    setOpenDeleteModal(true)
  }
  const handleOpenEditModal = (course: Course) => {
    setSelectedCourse(course)
    setOpenEditModal(true)
  }
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const handleDeleteCourse = async () => {
    console.log('selected course', selectedCourse)
    try {
      setIsLoading(true)
      await CourseService.delete(selectedCourse?.id as number)
      toast.success('Xóa môn học thành công')
    } catch (e: any) {
      console.log('Error: ', e)
      toast.error('Xóa môn học thất bại')
    } finally {
      setIsLoading(false)
      setOpenDeleteModal(false)
    }
  }

  useEffect(() => {
    changePage(1)
    fetchData()
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
                    {course.outline ? (
                      <a
                        href={course.outline}
                        target="_blank"
                        className="text-primary_color hover:text-primary_color_hover underline font-montserrat "
                      >
                        Xem chi tiết
                      </a>
                    ) : (
                      'Chưa có thông tin'
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-4">
                      <Tooltip
                        placement="top"
                        content="Chỉnh sửa"
                      >
                        <button onClick={() => handleOpenEditModal(course)}>
                          <CiEdit
                            size={25}
                            color="#3D8BCC"
                          />
                        </button>
                      </Tooltip>

                      <Modal
                        show={openEditModal && selectedCourse?.id === course.id}
                        onClose={() => setOpenEditModal(false)}
                      >
                        <ModalHeader>
                          Chỉnh sửa thông tin môn học # {course.id}
                        </ModalHeader>
                        <ModalBody>
                          <CourseForm course={course} />
                        </ModalBody>
                      </Modal>
                      <Tooltip
                        placement="top"
                        content="Xóa"
                      >
                        <button onClick={() => handleOpenDeleteModal(course)}>
                          <MdOutlineDelete
                            size={25}
                            color="#F87171"
                          />
                        </button>
                      </Tooltip>
                      <Modal
                        show={
                          openDeleteModal && selectedCourse?.id === course.id
                        }
                        onClose={() => setOpenDeleteModal(false)}
                      >
                        <Modal.Header>Cảnh báo</Modal.Header>
                        <Modal.Body>
                          <p>
                            Bạn có chắc chắn muốn xóa môn học{' '}
                            <span className="text-primary_color">
                              {course.name}
                            </span>{' '}
                            không?
                          </p>
                          <div className="flex gap-6 justify-end mt-8">
                            <button
                              onClick={() => {
                                setOpenDeleteModal(false)
                              }}
                              className="bg-slate-50 hover:bg-slate-100 py-1 px-3 rounded-md border border-primary_color text-primary_color"
                            >
                              Trở lại
                            </button>
                            <button
                              onClick={handleDeleteCourse}
                              className="bg-red-500 hover:bg-red-600 py-1 px-3 rounded-md text-white flex gap-[6px] items-center"
                            >
                              {isLoading && (
                                <Spinner
                                  color="failure"
                                  size="sm"
                                />
                              )}
                              Xóa
                            </button>
                          </div>
                        </Modal.Body>
                      </Modal>
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
