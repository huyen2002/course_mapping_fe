import { Modal, Spinner, Table, Tooltip } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { FaRegTrashAlt } from 'react-icons/fa'
import { LiaTrashRestoreAltSolid } from 'react-icons/lia'
import { toast } from 'react-toastify'
import { useFetchPagination } from '../../hooks/useFetchPagination'
import { Major } from '../../models/Major'
import { SearchMajorParams } from '../../models/SearchMajorParams'
import { MajorService } from '../../service/MajorService'
import LoadingScreen from '../common/LoadingScreen'
import Pagination from '../common/Pagination'
import SearchInput from '../university/SearchInput'

const MajorStorage = () => {
  const [searchName, setSearchName] = useState<string | null>(null)
  const [searchParams, setSearchParams] = useState<SearchMajorParams>({
    enabled: false,
  })
  const { data, total, page, changePage, isFetching, fetchData } =
    useFetchPagination(MajorService.search, searchParams)

  useEffect(() => {
    setSearchParams({
      name: searchName,
      enabled: false,
    })
  }, [searchName])

  useEffect(() => {
    changePage(1)
  }, [searchParams])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [selectedMajor, setSelectedMajor] = useState<Major>()
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)

  const handleOpenModal = (major: Major) => {
    setSelectedMajor(major)
    setOpenModal(true)
  }

  const handleOpenDeleteModal = (major: Major) => {
    setSelectedMajor(major)
    setOpenDeleteModal(true)
  }
  const handleRestoreMajor = async () => {
    try {
      setIsLoading(true)
      await MajorService.updateEnabled(selectedMajor?.id as number, {
        enabled: true,
      })
      toast.success('Khôi phục ngành đào tạo thành công')
    } catch (e) {
      console.log(e)
      toast.error('Khôi phục ngành đào tạo không thành công')
    } finally {
      setIsLoading(false)
    }
  }
  const handleDeleteMajor = async () => {
    try {
      setIsLoading(true)
      await MajorService.delete(selectedMajor?.id as number)
      toast.success('Xóa ngành đào tạo thành công')
    } catch (e) {
      console.log(e)
      toast.error('Khôi phục ngành đào tạo không thành công')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div>
      <SearchInput
        setSearchName={setSearchName}
        placeholder="Tên ngành đào tạo"
      />
      {isFetching ? (
        <LoadingScreen />
      ) : (
        <div className="mt-8">
          <Table className="font-montserrat">
            <Table.Head className="text-primary_color font-extrabold text-sm">
              <Table.HeadCell>STT</Table.HeadCell>
              <Table.HeadCell>Tên ngành đào tạo</Table.HeadCell>
              <Table.HeadCell>Mã ngành đào tạo</Table.HeadCell>

              <Table.HeadCell></Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {data.map((major, index) => (
                <Table.Row key={major.id}>
                  <Table.Cell>{index + 1 + (page - 1) * 10}</Table.Cell>
                  <Table.Cell>{major.name}</Table.Cell>
                  <Table.Cell>{major.code}</Table.Cell>

                  <Table.Cell>
                    <div className="flex gap-4">
                      <Tooltip
                        placement="top"
                        content="Chỉnh sửa"
                      >
                        <button onClick={() => {}}>
                          <CiEdit
                            size={25}
                            color="#3D8BCC"
                          />
                        </button>
                      </Tooltip>

                      <Tooltip
                        placement="top"
                        content="Khôi phục"
                      >
                        <button onClick={() => handleOpenModal(major)}>
                          <LiaTrashRestoreAltSolid size={25} />
                        </button>
                      </Tooltip>
                      <Modal
                        show={openModal && selectedMajor?.id === major.id}
                        onClose={() => setOpenModal(false)}
                      >
                        <Modal.Header>Xác nhận</Modal.Header>
                        <Modal.Body>
                          <p>
                            Bạn có chắc chắn muốn khôi phục ngành{' '}
                            <span className="text-primary_color">
                              {major.name}
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
                              onClick={handleRestoreMajor}
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
                          onClick={() => handleOpenDeleteModal(major)}
                          className="text-red-500"
                        >
                          <FaRegTrashAlt size="20" />
                        </button>
                      </Tooltip>
                      <Modal
                        show={openDeleteModal && selectedMajor?.id === major.id}
                        onClose={() => setOpenDeleteModal(false)}
                      >
                        <Modal.Header>Xác nhận</Modal.Header>
                        <Modal.Body>
                          <p>
                            Bạn có chắc chắn muốn xóa vĩnh viên ngành{' '}
                            <span className="text-primary_color">
                              {major.name}
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
                              onClick={handleDeleteMajor}
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
export default MajorStorage
