import { Modal, Spinner, Table, Tooltip } from 'flowbite-react'
import { useState } from 'react'
import { FaEye } from 'react-icons/fa'
import { IoBanOutline } from 'react-icons/io5'
import { MdOutlineSettingsBackupRestore } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import LoadingScreen from '../../components/common/LoadingScreen'
import Pagination from '../../components/common/Pagination'
import { useFetchPagination } from '../../hooks/useFetchPagination'
import { RoleLabel, User } from '../../models/User'
import { UserService } from '../../service/UserService'
import { DateRender } from '../../utils/ObjectRender'

const UserManagement = () => {
  const { data, isFetching, page, changePage, fetchData, total } =
    useFetchPagination(UserService.search, {}, 10)
  const [openDeleteModal, setOpenDisableModal] = useState<boolean>(false)
  const [openEnableModal, setOpenEnableModal] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<User>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [openAddModal, setOpenAddModal] = useState<boolean>(false)
  const [openDetailModal, setOpenDetailModal] = useState<boolean>(false)

  const navigate = useNavigate()

  const handleOpenDisableModal = (user: User) => {
    setSelectedUser(user)
    setOpenDisableModal(true)
  }
  const handleOpenDetailModal = (user: User) => {
    setSelectedUser(user)
    setOpenDetailModal(true)
  }
  const handleOpenEnableModal = (user: User) => {
    setSelectedUser(user)
    setOpenEnableModal(true)
  }
  const handleDisableUser = async () => {
    try {
      setIsLoading(true)
      await UserService.update(selectedUser?.id as number, {
        enabled: false,
      })
      toast.success('Vô hiệu hóa tài khoản thành công')
      fetchData()
    } catch (e) {
      console.log(e)
      toast.error('Vô hiệu hóa tài khoản không thành công')
    } finally {
      setIsLoading(false)
      setOpenDisableModal(false)
    }
  }
  const handleEnableUser = async () => {
    try {
      setIsLoading(true)
      await UserService.update(selectedUser?.id as number, {
        enabled: true,
      })
      toast.success('Khôi phục tài khoản thành công')
      fetchData()
    } catch (e) {
      console.log(e)
      toast.error('Khôi phục tài khoản không thành công')
    } finally {
      setIsLoading(false)
      setOpenDisableModal(false)
    }
  }
  return (
    <div className="overflow-y-auto">
      <h1 className="text-2xl font-bold">Người dùng</h1>

      {isFetching ? (
        <LoadingScreen />
      ) : (
        <div className="mt-8">
          <Table className="font-montserrat">
            <Table.Head className="text-primary_color font-extrabold text-sm">
              <Table.HeadCell>STT</Table.HeadCell>
              <Table.HeadCell>ID tài khoản</Table.HeadCell>
              <Table.HeadCell>Tên người dùng</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Loại tài khoản</Table.HeadCell>
              <Table.HeadCell>Trạng thái</Table.HeadCell>
              <Table.HeadCell></Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {data.map((user, index) => (
                <Table.Row key={user.id}>
                  <Table.Cell>{index + 1 + (page - 1) * 10}</Table.Cell>
                  <Table.Cell>{user.id}</Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>

                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>
                    {RoleLabel[user.role as keyof typeof RoleLabel]}
                  </Table.Cell>
                  <Table.Cell
                    className={
                      user.enabled ? 'text-primary_color' : 'text-red-500'
                    }
                  >
                    {user.enabled ? 'Hoạt động' : 'Vô hiệu hóa'}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-4 items-center">
                      <Tooltip content="Xem chi tiết">
                        <button
                          className="text-primary_color"
                          onClick={() => handleOpenDetailModal(user)}
                        >
                          <FaEye size="18" />
                        </button>
                      </Tooltip>

                      {user.enabled ? (
                        <Tooltip
                          placement="top"
                          content="Vô hiệu hóa"
                        >
                          <button
                            onClick={() => handleOpenDisableModal(user)}
                            className="text-red-500"
                          >
                            <IoBanOutline size={20} />
                          </button>
                        </Tooltip>
                      ) : (
                        <Tooltip
                          placement="top"
                          content="Khôi phục"
                        >
                          <button
                            onClick={() => handleOpenEnableModal(user)}
                            className="text-red-500"
                          >
                            <MdOutlineSettingsBackupRestore size={20} />
                          </button>
                        </Tooltip>
                      )}

                      <Modal
                        show={openDetailModal && selectedUser?.id === user.id}
                        onClose={() => setOpenDetailModal(false)}
                      >
                        <Modal.Header>
                          Thông tin tài khoản #{user.id}
                        </Modal.Header>
                        <Modal.Body>
                          <div className="flex flex-col gap-4">
                            <div>
                              <span className="font-semibold text-primary_color">
                                Tên đăng nhập:
                              </span>
                              <span className="ml-2">{user.username}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-primary_color">
                                Email:
                              </span>
                              <span className="ml-2">{user.email}</span>
                            </div>
                            <div>
                              <span className="font-semibold text-primary_color">
                                Loai tài khoản:
                              </span>
                              <span className="ml-2">
                                {RoleLabel[user.role as keyof typeof RoleLabel]}
                              </span>
                            </div>
                            <div>
                              <span className="font-semibold text-primary_color">
                                Ngày tạo:
                              </span>
                              <span className="ml-2">
                                {DateRender(user.createAt)}
                              </span>
                            </div>
                            <div>
                              <span className="font-semibold text-primary_color">
                                Trạng thái:
                              </span>
                              <span className="ml-2">
                                {user.enabled ? 'Hoạt động' : 'Vô hiệu hóa'}
                              </span>
                            </div>
                          </div>
                        </Modal.Body>
                      </Modal>
                      <Modal
                        show={openDeleteModal && selectedUser?.id === user.id}
                        onClose={() => setOpenDisableModal(false)}
                      >
                        <Modal.Header>Cảnh báo</Modal.Header>
                        <Modal.Body>
                          <p>
                            Bạn có chắc chắn muốn vô hiệu hóa tài khoản{' '}
                            <span className="text-primary_color">
                              {user.username}
                            </span>{' '}
                            ?
                          </p>
                          <div className="flex gap-6 justify-end mt-8">
                            <button
                              onClick={() => {
                                setOpenEnableModal(false)
                              }}
                              className="bg-slate-50 hover:bg-slate-100 py-1 px-3 rounded-md border border-primary_color text-primary_color"
                            >
                              Hủy
                            </button>
                            <button
                              onClick={handleDisableUser}
                              className="bg-red-500 hover:bg-red-600 py-1 px-3 rounded-md text-white flex gap-[6px] items-center"
                            >
                              {isLoading && (
                                <Spinner
                                  color="failure"
                                  size="sm"
                                />
                              )}
                              Đồng ý
                            </button>
                          </div>
                        </Modal.Body>
                      </Modal>
                      <Modal
                        show={openEnableModal && selectedUser?.id === user.id}
                        onClose={() => setOpenEnableModal(false)}
                      >
                        <Modal.Header>Cảnh báo</Modal.Header>
                        <Modal.Body>
                          <p>
                            Bạn có chắc chắn muốn khôi phục tài khoản{' '}
                            <span className="text-primary_color">
                              {user.username}
                            </span>{' '}
                            ?
                          </p>
                          <div className="flex gap-6 justify-end mt-8">
                            <button
                              onClick={() => {
                                setOpenEnableModal(false)
                              }}
                              className="bg-slate-50 hover:bg-slate-100 py-1 px-3 rounded-md border border-red-500 text-red-500"
                            >
                              Hủy
                            </button>
                            <button
                              onClick={handleEnableUser}
                              className="bg-primary_color hover:bg-primary_color_hover py-1 px-3 rounded-md text-white flex gap-[6px] items-center"
                            >
                              {isLoading && (
                                <Spinner
                                  color="failure"
                                  size="sm"
                                />
                              )}
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
export default UserManagement
