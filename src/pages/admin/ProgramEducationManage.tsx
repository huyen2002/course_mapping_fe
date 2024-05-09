import { Button, Modal, Spinner, Table, Tooltip } from 'flowbite-react'
import { useState } from 'react'
import { FaEye, FaPen, FaRegTrashAlt } from 'react-icons/fa'
import { IoMdAdd } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import LoadingScreen from '../../components/common/LoadingScreen'
import Pagination from '../../components/common/Pagination'
import Paths from '../../constants/paths'
import { useFetchPagination } from '../../hooks/useFetchPagination'
import { ProgramEducation } from '../../models/ProgramEducation'
import ProgramEducationService from '../../service/ProgramEducationService'
const ProgramEducationManage = () => {
  const { data, isFetching, page, changePage, total } = useFetchPagination(
    ProgramEducationService.search,
    {},
    10
  )
  const [openModal, setOpenModal] = useState<boolean>(false)
  const navigate = useNavigate()
  const [selectedProgram, setSelectedProgram] = useState<ProgramEducation>()
  const handleOpenModel = (program: ProgramEducation) => {
    setSelectedProgram(program)
    setOpenModal(true)
  }
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleDisableProgram = async () => {
    try {
      setIsLoading(true)
      await ProgramEducationService.updateEnabled(
        selectedProgram?.id as number,
        {
          enabled: false,
        }
      )
      toast.success('Ẩn thông tin chương trình đào tạo thành công')
    } catch (e) {
      console.log(e)
      toast.error('Ẩn thông tin chương trình đào tạo thất bại')
    } finally {
      setIsLoading(false)
      setOpenModal(false)
    }
  }

  return (
    <div>
      {isFetching ? (
        <LoadingScreen />
      ) : (
        <div>
          <h1 className="text-2xl font-semibold">Chương trình đào tạo</h1>
          <div className="flex justify-end">
            <Button
              className="bg-primary_color text-white hover:bg-primary_color_hover mb-4
            "
              onClick={() => navigate(Paths.ADMIN_NEW_PROGRAM_EDUCATION)}
            >
              <IoMdAdd size={18} />
              <span className="ml-2">Thêm mới</span>
            </Button>
          </div>

          <Table className="font-montserrat">
            <Table.Head className="text-primary_color font-extrabold text-sm">
              <Table.HeadCell>STT</Table.HeadCell>
              <Table.HeadCell>ID</Table.HeadCell>
              <Table.HeadCell>Chương trình đào tạo</Table.HeadCell>
              <Table.HeadCell>Trường đào tạo</Table.HeadCell>
              <Table.HeadCell></Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y text-text_color">
              {data.map((program: ProgramEducation, index) => {
                return (
                  <Table.Row key={program.id}>
                    <Table.Cell>{index + 1 + (page - 1) * 10}</Table.Cell>
                    <Table.Cell>{program.id}</Table.Cell>
                    <Table.Cell>{program.name}</Table.Cell>
                    <Table.Cell>{program.university.name}</Table.Cell>
                    <Table.Cell>
                      <div className="flex justify-center gap-6">
                        <Tooltip content="Xem chi tiết">
                          <button
                            className="text-primary_color"
                            onClick={() =>
                              navigate(`/program_education/${program.id}`)
                            }
                          >
                            <FaEye size="18" />
                          </button>
                        </Tooltip>
                        <Tooltip content="Chỉnh sửa">
                          <button
                            onClick={() =>
                              navigate(
                                `/university/program_education/${program.id}/edit`
                              )
                            }
                            className="text-gray-500"
                          >
                            <FaPen size="18" />
                          </button>
                        </Tooltip>
                        <Tooltip content="Ẩn thông tin">
                          <button
                            onClick={() => handleOpenModel(program)}
                            className="text-orange-500"
                          >
                            <FaRegTrashAlt size="18" />
                          </button>
                        </Tooltip>
                        <Modal
                          dismissible
                          show={openModal && selectedProgram?.id === program.id}
                          onClose={() => setOpenModal(false)}
                        >
                          <Modal.Header>Cảnh báo</Modal.Header>
                          <Modal.Body>
                            <div className="space-y-6">
                              <p className="text-base leading-relaxed text-gray-500">
                                Bạn chắc chắn muốn ẩn thông tin và chuyển chương
                                trình đào tạo này sang mục lưu trữ?
                              </p>

                              <div className="flex gap-6 justify-end mt-8">
                                <button
                                  onClick={() => {
                                    setOpenModal(false)
                                  }}
                                  className="bg-slate-50 hover:bg-slate-100 py-1 px-3 rounded-md border border-primary_color text-primary_color"
                                >
                                  Hủy
                                </button>
                                <button
                                  onClick={handleDisableProgram}
                                  className="bg-primary_color hover:bg-primary_color_hover py-1 px-3 rounded-md text-white flex gap-[6px] items-center"
                                >
                                  {isLoading && <Spinner size="sm" />}
                                  Đồng ý
                                </button>
                              </div>
                            </div>
                          </Modal.Body>
                        </Modal>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
          <div className="my-8">
            <Pagination
              currentPage={page}
              changePage={changePage}
              total={total}
              size={10}
            />
          </div>
        </div>
      )}
    </div>
  )
}
export default ProgramEducationManage
