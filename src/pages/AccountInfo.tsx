import { Label, Spinner, Tooltip } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { FaAsterisk } from 'react-icons/fa6'
import { toast } from 'react-toastify'
import { User } from '../models/User'
import { AuthService } from '../service/AuthService'
import { UserService } from '../service/UserService'
import { AuthUtils } from '../utils/AuthUtils'

const AccountInfo = () => {
  const [user, setUser] = useState<User>()
  const [username, setUsername] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [usernameDisable, setUsernameDisable] = useState<boolean>(true)
  const [emailDisable, setEmailDisable] = useState<boolean>(true)

  const fetchData = async () => {
    if (!AuthUtils.isAuthorized()) return
    else {
      try {
        const response = await AuthService.me()
        setUser(response.data)
        setUsername(response.data.username)
        setEmail(response.data.email)
      } catch (e: any) {
        console.log(e)
      }
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const resetAllField = () => {
    setUsername(user?.username)
    setEmail(user?.email)
  }
  const handleChangeInfo = async () => {
    try {
      setIsLoading(true)

      await UserService.update(user?.id as number, {
        username: username !== user?.username ? username : null,
        email: email !== user?.email ? email : null,
      })
      toast.success('Cập nhật thông tin thành công')
    } catch (e: any) {
      toast.error('Cập nhật thông tin không thành công')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="px-10 lg:w-3/4">
      <h1 className="text-2xl font-semibold">Thông tin tài khoản</h1>

      <div className="flex flex-col gap-6 mt-8">
        <div>
          <div className="flex gap-2 items-center">
            <Label
              htmlFor="name"
              value="Tên đăng nhập"
            />
            <FaAsterisk
              color="red"
              fontSize="0.6rem"
            />
          </div>
          <div className="flex gap-4 items-center mt-2">
            <input
              type="text"
              id="name"
              className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
              required
              autoFocus={true}
              disabled={usernameDisable}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Tooltip content="Chỉnh sửa">
              <button
                type="button"
                onClick={() => setUsernameDisable(false)}
              >
                <CiEdit
                  size={25}
                  color="#3D8BCC"
                />
              </button>
            </Tooltip>
          </div>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <Label
              htmlFor="name"
              value="Email"
            />
            <FaAsterisk
              color="red"
              fontSize="0.6rem"
            />
          </div>
          <div className="flex gap-4 items-center mt-2">
            <input
              type="text"
              id="name"
              className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
              required
              disabled={emailDisable}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Tooltip content="Chỉnh sửa">
              <button
                type="button"
                onClick={() => setEmailDisable(false)}
              >
                <CiEdit
                  size={25}
                  color="#3D8BCC"
                />
              </button>
            </Tooltip>
          </div>
        </div>
        <div className="flex justify-end gap-8 mt-8">
          <button
            type="button"
            onClick={resetAllField}
            className=" border-red-500 text-red-500 border  py-2 px-4 rounded-lg hover:bg-red-500 hover:text-white transition duration-200 text-sm"
          >
            Hủy
          </button>
          <button
            onClick={handleChangeInfo}
            className="bg-primary_color text-sm text-white flex gap-[6px] items-center py-2 px-4 rounded-lg hover:bg-primary_color_hover transition duration-200"
          >
            {isLoading && (
              <Spinner
                color="info"
                size="sm"
              />
            )}
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  )
}
export default AccountInfo
