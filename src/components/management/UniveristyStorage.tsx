import { Modal, Spinner, Table, Tooltip } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { FaEye, FaRegTrashAlt } from 'react-icons/fa'
import { LiaTrashRestoreAltSolid } from 'react-icons/lia'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useFetchPagination } from '../../hooks/useFetchPagination'
import { SearchUniversityParams } from '../../models/SearchUniversityParams'
import { University } from '../../models/University'
import { UniversityService } from '../../service/UniversityService'
import LoadingScreen from '../common/LoadingScreen'
import Pagination from '../common/Pagination'
import SearchInput from '../university/SearchInput'

const UniversityStorage = () => {
  const [searchName, setSearchName] = useState<string | null>(null)
  const [searchParams, setSearchParams] = useState<SearchUniversityParams>({
    enabled: false,
  })
  const { data, total, page, changePage, isFetching, fetchData } =
    useFetchPagination(UniversityService.search, searchParams)

  useEffect(() => {
    setSearchParams({
      name: searchName,
      enabled: false,
    })
  }, [searchName])

  useEffect(() => {
    changePage(1)
    fetchData()
  }, [searchParams])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [selectedUniversity, setSelectedUniversity] = useState<University>()

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleOpenModal = (university: University) => {
    setSelectedUniversity(university)
    setOpenModal(true)
  }
  const handleOpenDeleteModal = (university: University) => {
    setSelectedUniversity(university)
    setOpenDeleteModal(true)
  }
  const handleDeleteUniversity = async () => {
    try {
      setIsLoading(true)
      await UniversityService.delete(selectedUniversity?.id as number)
      toast.success('Xóa trường đại học thành công')
    } catch (e) {
      console.log(e)
      toast.error('Xóa trường đại học không thành công')
    } finally {
      setIsLoading(false)
      setOpenDeleteModal(false)
    }
  }

  const handleRestoreUniversity = async () => {
    try {
      setIsLoading(true)
      await UniversityService.updateEnabled(selectedUniversity?.id as number, {
        enabled: true,
      })
      toast.success('Khôi phục trường đại học thành công')
    } catch (e) {
      console.log(e)
      toast.error('Khôi phục trường đại học không thành công')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div>
      <SearchInput
        setSearchName={setSearchName}
        placeholder="Tên trường đại học"
      />
      {isFetching ? (
        <LoadingScreen />
      ) : (
        <div className="mt-8">
          <Table className="font-montserrat">
            <Table.Head className="text-primary_color font-extrabold text-sm">
              <Table.HeadCell>STT</Table.HeadCell>
              <Table.HeadCell>Tên trường đại học</Table.HeadCell>
              <Table.HeadCell>Mã trường</Table.HeadCell>

              <Table.HeadCell></Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {data.map((university, index) => (
                <Table.Row key={university.id}>
                  <Table.Cell>{index + 1 + (page - 1) * 10}</Table.Cell>
                  <Table.Cell>{university.name}</Table.Cell>
                  <Table.Cell>{university.code}</Table.Cell>

                  <Table.Cell>
                    <div className="flex gap-4 items-center">
                      <Tooltip content="Xem chi tiết">
                        <button
                          className="text-primary_color"
                          onClick={() =>
                            navigate(`/university/${university.id}`)
                          }
                        >
                          <FaEye size="18" />
                        </button>
                      </Tooltip>
                      <Tooltip
                        placement="top"
                        content="Chỉnh sửa"
                      >
                        <button onClick={() => {}}>
                          <CiEdit
                            size={25}
                            color="orange"
                          />
                        </button>
                      </Tooltip>

                      <Tooltip
                        placement="top"
                        content="Khôi phục"
                      >
                        <button onClick={() => handleOpenModal(university)}>
                          <LiaTrashRestoreAltSolid size={25} />
                        </button>
                      </Tooltip>
                      <Modal
                        show={
                          openModal && selectedUniversity?.id === university.id
                        }
                        onClose={() => setOpenModal(false)}
                      >
                        <Modal.Header>Xác nhận</Modal.Header>
                        <Modal.Body>
                          <p>
                            Bạn có chắc chắn muốn khôi phục trường{' '}
                            <span className="text-primary_color">
                              {university.name}
                            </span>{' '}
                            không?
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
                              onClick={handleRestoreUniversity}
                              className="bg-primary_color hover:bg-primary_color_hover py-1 px-3 rounded-md text-white flex gap-[6px] items-center"
                            >
                              {isLoading && <Spinner size="sm" />}
                              Đồng ý
                            </button>
                          </div>
                        </Modal.Body>
                      </Modal>
                      <Tooltip
                        placement="top"
                        content="Xóa"
                      >
                        <button
                          onClick={() => handleOpenDeleteModal(university)}
                          className="text-red-500"
                        >
                          <FaRegTrashAlt size="20" />
                        </button>
                      </Tooltip>
                      <Modal
                        show={
                          openDeleteModal &&
                          selectedUniversity?.id === university.id
                        }
                        onClose={() => setOpenDeleteModal(false)}
                      >
                        <Modal.Header>Xác nhận</Modal.Header>
                        <Modal.Body>
                          <p>
                            Bạn có chắc chắn muốn xóa vĩnh viên trường{' '}
                            <span className="text-primary_color">
                              {university.name}
                            </span>{' '}
                            và tất cả các thông tin liên quan không?
                          </p>
                          <div className="flex gap-6 justify-end mt-8">
                            <button
                              onClick={() => {
                                setOpenDeleteModal(false)
                              }}
                              className="bg-slate-50 hover:bg-slate-100 py-1 px-3 rounded-md border border-primary_color text-primary_color"
                            >
                              Hủy
                            </button>
                            <button
                              onClick={handleDeleteUniversity}
                              className="bg-red-500 hover:bg-red-600 py-1 px-3 rounded-md text-white flex gap-[6px] items-center"
                            >
                              {isLoading && <Spinner size="sm" />}
                              Đồng ý
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
export default UniversityStorage
