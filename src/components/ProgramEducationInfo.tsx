import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import { Modal, Table, Tooltip } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { GoDownload } from 'react-icons/go'
import { IoAdd } from 'react-icons/io5'
import { MdOutlineDelete } from 'react-icons/md'
import { toast } from 'react-toastify'
import { useFetchPagination } from '../hooks/useFetchPagination'
import { Course } from '../models/Course'
import { LevelOfEducation, ProgramEducation } from '../models/ProgramEducation'
import { ProgramEducationCourse } from '../models/ProgramEducationCourse'
import { CourseService } from '../service/CourseService'
import { ProgramEducationCourseService } from '../service/ProgramEducationCourseService'
import Pagination from './common/Pagination'
import CourseToProgramForm from './university/CourseToProgramForm'

const ProgramEducationInfo = ({
  programEducation,
  isShowUniversityAction = false,
  children,
}: {
  programEducation: ProgramEducation
  isShowUniversityAction?: boolean
  children?: React.ReactNode
}) => {
  const { data, total, changePage, page } = useFetchPagination(
    ProgramEducationCourseService.search,
    { programEducationId: programEducation?.id },
    10
  )

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)
  const [courseList, setCourseList] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchCourseList = async () => {
    try {
      setIsLoading(true)
      if (!programEducation) return
      const response = await CourseService.getList(
        programEducation.university.id
      )
      setCourseList(response.data)
    } catch (e: any) {
      console.log('Error: ' + e)
    } finally {
      setIsLoading(false)
    }
  }
  const handleDownloadFile = async () => {
    const storage = getStorage()
    const storageRef = ref(storage, programEducation?.outline as string)
    const fileName = storageRef.name

    try {
      const url = await getDownloadURL(storageRef)
      const response = await fetch(url)
      const blob = await response.blob()
      const urlBlob = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = urlBlob
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error('Error downloading file:', error)
    }
  }
  const [selectedProgramCourse, setSelectedProgramCourse] =
    useState<ProgramEducationCourse | null>(null)
  const handleOpenEditModal = (programCourse: ProgramEducationCourse) => {
    setOpenEditModal(true)
    setSelectedProgramCourse(programCourse)
  }
  const handleOpenDeleteModal = (programCourse: ProgramEducationCourse) => {
    setSelectedProgramCourse(programCourse)
    setOpenDeleteModal(true)
  }
  const handleDeleteProgramCourse = async () => {
    console.log('id', selectedProgramCourse?.id)
    try {
      await ProgramEducationCourseService.delete(
        selectedProgramCourse?.id as number
      )
      toast.success('Xóa môn học thành công')
    } catch (e: any) {
      console.log(e)
      toast.error('Xóa môn học thất bại')
    } finally {
      setOpenDeleteModal(false)
    }
  }
  useEffect(() => {
    fetchCourseList()
  }, [])

  return (
    <div>
      {programEducation && (
        <div>
          <h1 className="text-2xl font-bold text-primary_color">
            {programEducation?.name} - ({programEducation?.university.name})
          </h1>
          {children}
          <div className="mt-4 flex flex-col gap-2">
            <div>
              <span className="font-semibold mr-2">Tên ngành đào tạo:</span>
              <span>{programEducation?.major.name}</span>
            </div>
            <div>
              <span className="font-semibold mr-2">Trường:</span>
              <span>{programEducation?.university.name}</span>
            </div>
            <div>
              <span className="font-semibold mr-2">Mã trường:</span>
              <span>{programEducation?.university.code}</span>
            </div>
            <div>
              <span className="font-semibold mr-2">Mã ngành đào tạo:</span>
              <span>{programEducation?.major.code}</span>
            </div>
            <div>
              <span className="font-semibold mr-2">Mã tuyển sinh:</span>
              <span>{programEducation?.code}</span>
            </div>

            <div>
              <span className="font-semibold mr-2">Danh hiệu tốt nghiệp:</span>
              <span>
                {LevelOfEducation[programEducation?.levelOfEducation as any]}
              </span>
            </div>
            <div>
              <span className="font-semibold mr-2">Thời gian đào tạo:</span>
              <span>{programEducation?.durationYear} năm</span>
            </div>
            <div>
              <span className="font-semibold mr-2">Số tín chỉ:</span>
              <span>{programEducation?.numCredits}</span>
            </div>
            <div>
              <span className="font-semibold mr-2">Thời gian hoạt động:</span>
              <span>
                {programEducation?.startYear && programEducation?.endYear
                  ? `${programEducation?.startYear} - ${programEducation?.endYear}`
                  : 'Chưa có thông tin'}
              </span>
            </div>
            <div>
              <span className="font-semibold mr-2">
                Giới thiệu chung về chương trình đào tạo:
              </span>
              <span>
                {programEducation?.introduction || 'Chưa có thông tin'}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="font-semibold mr-2">
                Nội dung chương trình đào tạo:
              </span>
              {!programEducation?.outline ? (
                <span>Chưa có thông tin</span>
              ) : (
                <span className="flex gap-4 items-center">
                  <a
                    href={programEducation?.outline}
                    target="_blank"
                    className="text-primary_color hover:underline font-montserrat "
                  >
                    Xem chi tiết
                  </a>
                  <Tooltip content="Tải xuống">
                    <button
                      onClick={handleDownloadFile}
                      className=" text-primary_color p-2 text-sm rounded-md hover:bg-slate-100"
                    >
                      <GoDownload size={25} />
                    </button>
                  </Tooltip>
                </span>
              )}
            </div>
            <div>
              <h1 className="font-semibold mr-2">Nguồn thông tin:</h1>
              <div className="flex flex-col gap-2 mt-2">
                {!programEducation?.sourceLinks ||
                programEducation?.sourceLinks.length === 0 ? (
                  <span>Chưa có thông tin</span>
                ) : (
                  programEducation?.sourceLinks?.map((item, index) => (
                    <div key={index}>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary_color hover:underline font-montserrat"
                      >
                        {item.name}
                      </a>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="my-4">
            <h2 className="text-lg font-semibold text-primary_color mb-4 ">
              2. Danh sách môn học
            </h2>
            {isShowUniversityAction && (
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => {
                    setOpenModal(true)
                    console.log('click')
                  }}
                  className="flex gap-2 bg-primary_color text-white p-2 rounded-md hover:bg-primary_color_hover"
                >
                  <IoAdd size={20} />
                  Thêm môn học
                </button>
              </div>
            )}
            <Modal
              show={openModal}
              onClose={() => setOpenModal(false)}
            >
              <Modal.Header>Thêm môn học vào khung chương trình</Modal.Header>
              <Modal.Body>
                <CourseToProgramForm
                  program={programEducation}
                  courseList={courseList}
                />
              </Modal.Body>
            </Modal>
            {data.length > 0 ? (
              <div>
                <Table className="font-montserrat">
                  <Table.Head className="text-primary_color font-extrabold text-sm">
                    <Table.HeadCell>STT</Table.HeadCell>
                    <Table.HeadCell>Mã môn học</Table.HeadCell>
                    <Table.HeadCell>Tên môn học</Table.HeadCell>
                    <Table.HeadCell>Số tín chỉ</Table.HeadCell>
                    <Table.HeadCell>Bắt buộc / Tự chọn</Table.HeadCell>
                    {isShowUniversityAction && (
                      <Table.HeadCell></Table.HeadCell>
                    )}
                  </Table.Head>
                  <Table.Body className="divide-y text-text_color">
                    {data.map((programCourse, index) => (
                      <Table.Row
                        key={programCourse.id}
                        className="bg-white"
                      >
                        <Table.Cell>{index + 1 + (page - 1) * 10}</Table.Cell>
                        <Table.Cell>{programCourse.course.code}</Table.Cell>
                        <Table.Cell>{programCourse.course.name}</Table.Cell>
                        <Table.Cell>{programCourse.numCredits}</Table.Cell>

                        <Table.Cell>
                          {programCourse.compulsory ? 'Bắt buộc' : 'Tự chọn'}
                        </Table.Cell>
                        {isShowUniversityAction && (
                          <Table.Cell>
                            <div className="flex gap-4">
                              <Tooltip
                                placement="top"
                                content="Chỉnh sửa"
                              >
                                <button
                                  onClick={() =>
                                    handleOpenEditModal(programCourse)
                                  }
                                >
                                  <CiEdit
                                    size={25}
                                    color="#3D8BCC"
                                  />
                                </button>
                              </Tooltip>
                              <Modal
                                show={
                                  selectedProgramCourse?.id ===
                                    programCourse.id && openEditModal
                                }
                                onClose={() => setOpenEditModal(false)}
                              >
                                <Modal.Header>
                                  Chỉnh sửa thông tin khung chương trình{' '}
                                  {programCourse.id}
                                </Modal.Header>
                                <Modal.Body>
                                  <CourseToProgramForm
                                    program={programEducation}
                                    programCourse={programCourse}
                                    courseList={courseList}
                                  />
                                </Modal.Body>
                              </Modal>
                              <Tooltip
                                placement="top"
                                content="Xóa"
                              >
                                <button>
                                  <MdOutlineDelete
                                    size={25}
                                    color="#F87171"
                                    onClick={() =>
                                      handleOpenDeleteModal(programCourse)
                                    }
                                  />
                                </button>
                              </Tooltip>
                              <Modal
                                show={
                                  openDeleteModal &&
                                  selectedProgramCourse?.id === programCourse.id
                                }
                                onClose={() => setOpenDeleteModal(false)}
                              >
                                <Modal.Header>Cảnh báo</Modal.Header>
                                <Modal.Body>
                                  <p>
                                    Bạn có chắc chắn muốn xóa môn học này ở
                                    chương trình đào tạo{' '}
                                    <span className="text-primary_color">
                                      {programEducation.name}
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
                                      onClick={handleDeleteProgramCourse}
                                      className="bg-red-500 hover:bg-red-600 py-1 px-3 rounded-md text-white"
                                    >
                                      Xóa
                                    </button>
                                  </div>
                                </Modal.Body>
                              </Modal>
                            </div>
                          </Table.Cell>
                        )}
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
                <div className="my-8">
                  <Pagination
                    currentPage={page}
                    total={total}
                    size={10}
                    changePage={changePage}
                  />
                </div>
              </div>
            ) : (
              <h1 className="text-center">Không có môn học nào.</h1>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
export default ProgramEducationInfo
