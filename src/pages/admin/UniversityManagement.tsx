import {
  Modal,
  ModalBody,
  ModalHeader,
  Spinner,
  Table,
  Tooltip,
} from 'flowbite-react'
import { useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { IoIosAdd } from 'react-icons/io'
import { MdOutlineDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import UniversityForm from '../../components/UniversityForm'
import LoadingScreen from '../../components/common/LoadingScreen'
import Pagination from '../../components/common/Pagination'
import { useFetchPagination } from '../../hooks/useFetchPagination'
import { University } from '../../models/University'
import { UniversityService } from '../../service/UniversityService'

const UniversityManagement = () => {
  const { data, isFetching, page, changePage, fetchData, total } =
    useFetchPagination(UniversityService.search, {}, 10)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)
  const [selectedUniversity, setSelectedUniversity] = useState<University>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [openAddModal, setOpenAddModal] = useState<boolean>(false)

  const navigate = useNavigate()

  const handleOpenDeleteModal = (university: University) => {
    setSelectedUniversity(university)
    setOpenDeleteModal(true)
  }
  const handleOpenEditModal = (university: University) => {
    setSelectedUniversity(university)
    setOpenEditModal(true)
  }
  const handleDeleteUniversity = async () => {
    console.log('selected university', selectedUniversity)
    try {
      setIsLoading(true)
      await UniversityService.delete(selectedUniversity?.id as number)
      toast.success('Xoá trường đại học thành công')
      fetchData()
    } catch (e) {
      console.log(e)
    } finally {
      setIsLoading(false)
      setOpenDeleteModal(false)
    }
  }
  return (
    <div className="overflow-y-auto">
      <h1 className="text-2xl font-bold mb-8">Môn học</h1>
      <div>
        <button
          onClick={() => setOpenAddModal(true)}
          className=" flex  text-white  bg-primary_color hover:bg-primary_color_hover text-sm  focus:outline-none font-medium rounded-lg  px-2 py-2 "
        >
          <IoIosAdd size={20} />
          Thêm mới
        </button>

        <Modal
          show={openAddModal}
          onClose={() => setOpenAddModal(false)}
        >
          <ModalHeader>Thêm thông tin trường đại học</ModalHeader>
          <ModalBody>
            <UniversityForm />
          </ModalBody>
        </Modal>
      </div>
      {isFetching ? (
        <LoadingScreen />
      ) : (
        <div className="mt-8">
          <Table className="font-montserrat">
            <Table.Head className="text-primary_color font-extrabold text-sm">
              <Table.HeadCell>STT</Table.HeadCell>
              <Table.HeadCell>ID tài khoản</Table.HeadCell>
              <Table.HeadCell>Tên cơ quan, trường học</Table.HeadCell>
              <Table.HeadCell>Mã cơ quan, trường học</Table.HeadCell>
              <Table.HeadCell></Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {data.map((university, index) => (
                <Table.Row key={university.id}>
                  <Table.Cell>{index + 1 + (page - 1) * 10}</Table.Cell>
                  <Table.Cell>
                    {university?.user?.id
                      ? university.user.id
                      : 'Chưa có tài khoản'}
                  </Table.Cell>
                  <Table.Cell>
                    <button
                      onClick={() =>
                        navigate(`/university/${university.id}/info`)
                      }
                    >
                      {university.name}
                    </button>
                  </Table.Cell>

                  <Table.Cell>{university.code}</Table.Cell>

                  <Table.Cell>
                    <div className="flex gap-4">
                      <Tooltip
                        placement="top"
                        content="Chỉnh sửa"
                      >
                        <button onClick={() => handleOpenEditModal(university)}>
                          <CiEdit
                            size={25}
                            color="#3D8BCC"
                          />
                        </button>
                      </Tooltip>

                      <Modal
                        show={
                          openEditModal &&
                          selectedUniversity?.id === university.id
                        }
                        onClose={() => setOpenEditModal(false)}
                      >
                        <ModalHeader>
                          Chỉnh sửa thông tin trường đại học # {university.id}
                        </ModalHeader>
                        <ModalBody>
                          <UniversityForm university={selectedUniversity} />
                        </ModalBody>
                      </Modal>
                      <Tooltip
                        placement="top"
                        content="Xóa"
                      >
                        <button
                          onClick={() => handleOpenDeleteModal(university)}
                        >
                          <MdOutlineDelete
                            size={25}
                            color="#F87171"
                          />
                        </button>
                      </Tooltip>
                      <Modal
                        show={
                          openDeleteModal &&
                          selectedUniversity?.id === university.id
                        }
                        onClose={() => setOpenDeleteModal(false)}
                      >
                        <Modal.Header>Cảnh báo</Modal.Header>
                        <Modal.Body>
                          <p>
                            Bạn có chắc chắn muốn xóa tài khoản cùng tất cả các
                            chương trình đào tạo và môn học của{' '}
                            <span className="text-primary_color">
                              {university.name}
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
                              onClick={handleDeleteUniversity}
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
export default UniversityManagement
