import { Button, Modal, Spinner, Table, Tooltip } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { BiHide } from 'react-icons/bi'
import { CiEdit } from 'react-icons/ci'
import { IoMdAdd } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import MajorForm from '../../components/MajorForm'
import LoadingScreen from '../../components/common/LoadingScreen'
import Pagination from '../../components/common/Pagination'
import SearchInput from '../../components/university/SearchInput'
import { useFetchPagination } from '../../hooks/useFetchPagination'
import { Major } from '../../models/Major'
import { SearchMajorParams } from '../../models/SearchMajorParams'
import { MajorService } from '../../service/MajorService'

const MajorManagement = () => {
  const [searchParams, setSearchParams] = useState<SearchMajorParams>({})

  const { data, isFetching, page, changePage, total, fetchData } =
    useFetchPagination(MajorService.search, searchParams, 10)
  const [searchName, setSearchName] = useState<string>()
  const [openCreateModal, setCreateModal] = useState<boolean>(false)
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)
  const [openDisableModal, setOpenDisableModal] = useState<boolean>(false)
  const navigate = useNavigate()
  const [selectedMajor, setSelectedMajor] = useState<Major>()
  const handleOpenDisableModal = (major: Major) => {
    setSelectedMajor(major)
    setOpenDisableModal(true)
  }
  const handleOpenEditModal = (major: Major) => {
    setSelectedMajor(major)
    setOpenEditModal(true)
  }
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleDisableMajor = async () => {
    try {
      setIsLoading(true)
      await MajorService.updateEnabled(selectedMajor?.id as number, {
        enabled: false,
      })
      toast.success('Ẩn thông tin ngành đào tạo thành công')
    } catch (e) {
      console.log(e)
      toast.error('Ẩn thông tin ngành đào tạo thất bại')
    } finally {
      setIsLoading(false)
      setOpenDisableModal(false)
    }
  }

  useEffect(() => {
    setSearchParams({
      name: searchName,
    })
  }, [searchName])

  useEffect(() => {
    changePage(1)
    fetchData()
  }, [searchParams])
  return (
    <div>
      {isFetching ? (
        <LoadingScreen />
      ) : (
        <div>
          <h1 className="text-2xl font-semibold mb-8">Ngành đào tạo</h1>
          <div className="flex justify-between mb-4">
            <SearchInput
              setSearchName={setSearchName}
              placeholder="Tên ngành đào tạo"
            />
            <Button
              className="bg-primary_color text-white hover:bg-primary_color_hover mb-4
            "
              size="sm"
              onClick={() => setCreateModal(true)}
            >
              <IoMdAdd size={18} />
              <span className="ml-2">Thêm mới</span>
            </Button>
          </div>
          <Modal
            show={openCreateModal}
            onClose={() => setCreateModal(false)}
          >
            <Modal.Header>Thông tin ngành đào tạo</Modal.Header>
            <Modal.Body>
              <MajorForm />
            </Modal.Body>
          </Modal>

          <Table className="font-montserrat">
            <Table.Head className="text-primary_color font-extrabold text-sm">
              <Table.HeadCell>STT</Table.HeadCell>
              <Table.HeadCell>ID</Table.HeadCell>
              <Table.HeadCell>Ngành đào tạo</Table.HeadCell>
              <Table.HeadCell>Mã ngành</Table.HeadCell>
              <Table.HeadCell></Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y text-text_color">
              {data.map((major: Major, index) => {
                return (
                  <Table.Row key={major.id}>
                    <Table.Cell>{index + 1 + (page - 1) * 10}</Table.Cell>
                    <Table.Cell>{major.id}</Table.Cell>
                    <Table.Cell>{major.name}</Table.Cell>
                    <Table.Cell>{major.code}</Table.Cell>
                    <Table.Cell>
                      <div className="flex justify-center gap-6 items-center">
                        <Tooltip content="Chỉnh sửa">
                          <button onClick={() => handleOpenEditModal(major)}>
                            <CiEdit
                              size="25"
                              color="orange"
                            />
                          </button>
                        </Tooltip>
                        <Modal
                          show={openEditModal && selectedMajor?.id === major.id}
                          onClose={() => setOpenEditModal(false)}
                        >
                          <Modal.Header>
                            Chỉnh sửa thông tin ngành học
                          </Modal.Header>
                          <div className="p-4">
                            <MajorForm major={major} />
                          </div>
                        </Modal>
                        <Tooltip content="Ẩn thông tin">
                          <button
                            onClick={() => handleOpenDisableModal(major)}
                            className="text-red-500"
                          >
                            <BiHide size="20" />
                          </button>
                        </Tooltip>
                        <Modal
                          dismissible
                          show={
                            openDisableModal && selectedMajor?.id === major.id
                          }
                          onClose={() => setOpenDisableModal(false)}
                        >
                          <Modal.Header>Cảnh báo</Modal.Header>
                          <Modal.Body>
                            <div className="space-y-6">
                              <p className="text-base leading-relaxed text-gray-500">
                                {`Bạn chắc chắn muốn chuyển ngành học ${major.name} và các thông tin liên quan sang mục lưu trữ?`}
                              </p>

                              <div className="flex gap-6 justify-end mt-8">
                                <button
                                  onClick={() => {
                                    setOpenDisableModal(false)
                                  }}
                                  className="bg-slate-50 hover:bg-slate-100 py-1 px-3 rounded-md border border-primary_color text-primary_color"
                                >
                                  Hủy
                                </button>
                                <button
                                  onClick={handleDisableMajor}
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
export default MajorManagement
