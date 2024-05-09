import { Button, Modal, Table, Tooltip } from 'flowbite-react'
import { useState } from 'react'
import { FaEye, FaPen, FaRegTrashAlt } from 'react-icons/fa'
import { IoMdAdd } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
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
              <Table.HeadCell>ID</Table.HeadCell>
              <Table.HeadCell>Chương trình đào tạo</Table.HeadCell>
              <Table.HeadCell>Trường đào tạo</Table.HeadCell>
              <Table.HeadCell></Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y text-text_color">
              {data.map((program: ProgramEducation) => {
                return (
                  <Table.Row key={program.id}>
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
                          <button className="text-orange-500">
                            <FaPen size="18" />
                          </button>
                        </Tooltip>
                        <Tooltip content="Xóa">
                          <button
                            className="text-gray-700"
                            onClick={() => setOpenModal(true)}
                          >
                            <FaRegTrashAlt size="18" />
                          </button>
                        </Tooltip>
                        <Modal
                          dismissible
                          show={openModal}
                          onClose={() => setOpenModal(false)}
                        >
                          <Modal.Header>Cảnh báo</Modal.Header>
                          <Modal.Body>
                            <div className="space-y-6">
                              <p className="text-base leading-relaxed text-gray-500">
                                Bạn chắc chắn muốn xóa chương trình đào tạo này?
                              </p>
                            </div>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              className="bg-primary_color text-white hover:bg-primary_color_hover"
                              onClick={() => setOpenModal(false)}
                            >
                              Đồng ý
                            </Button>
                            <Button
                              color="gray"
                              onClick={() => setOpenModal(false)}
                            >
                              Trở lại
                            </Button>
                          </Modal.Footer>
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
