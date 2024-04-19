import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import { Table, Tooltip } from 'flowbite-react'
import { CiEdit } from 'react-icons/ci'
import { IoAdd } from 'react-icons/io5'
import { MdOutlineDelete } from 'react-icons/md'
import { useFetchPagination } from '../hooks/useFetchPagination'
import { LevelOfEducation, ProgramEducation } from '../models/ProgramEducation'
import { ProgramEducationCourseService } from '../service/ProgramEducationCourseService'
import Pagination from './common/Pagination'

const ProgramEducationInfo = ({
  programEducation,
  isShowUniversityAction = false,
  children,
}: {
  programEducation: ProgramEducation | null
  isShowUniversityAction?: boolean
  children?: React.ReactNode
}) => {
  const { data, total, changePage, page } = useFetchPagination(
    null,
    ProgramEducationCourseService.search,
    { programEducationId: programEducation?.id },
    10
  )
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
            <div>
              <span className="font-semibold mr-2">
                Nội dung chương trình đào tạo:
              </span>
              {!programEducation?.outline ? (
                <span>Chưa có thông tin</span>
              ) : (
                <button
                  onClick={handleDownloadFile}
                  className="text-primary_color hover:underline font-montserrat"
                >
                  {`${programEducation?.language}_${programEducation?.university.code}_${programEducation?.code}`}
                </button>
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
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-primary_color mb-4">
              2. Danh sách môn học
            </h2>
            {isShowUniversityAction && (
              <button className=" flex items-center mb-4 px-2 py-1 bg-primary_color hover:bg-primary_color_hover text-white rounded-md float-right">
                <IoAdd size={20} />
                Thêm môn học
              </button>
            )}
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
