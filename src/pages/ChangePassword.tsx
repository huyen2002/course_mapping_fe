import { Label, Spinner } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaAsterisk } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Paths from '../constants/paths'
import { User } from '../models/User'
import { AuthService } from '../service/AuthService'
import { UserService } from '../service/UserService'
import { AuthUtils } from '../utils/AuthUtils'

type ChangePassword = {
  oldPassword: string
  newPassword: string
  repeatPassword: string
}
const ChangePassword = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm<ChangePassword>()

  const [user, setUser] = useState<User>()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit = async (data: ChangePassword) => {
    console.log('data', data)
    try {
      setIsLoading(true)
      const response = await UserService.changePassword(user?.id as number, {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      })
      if (response.meta.status === 200) {
        toast.success('Đổi mật khẩu thành công')
        navigate(Paths.LOGIN)
      } else {
        toast.error('Mật khẩu cũ không đúng')
      }
    } catch (e: any) {
      console.log(e)
      toast.error('Đổi mật khẩu không thành công')
    } finally {
      setIsLoading(false)
    }
  }

  const resetAllField = () => {
    reset()
  }
  const fetchData = async () => {
    if (!AuthUtils.isAuthorized()) return
    else {
      try {
        const response = await AuthService.me()
        setUser(response.data)
      } catch (e: any) {
        console.log(e)
      }
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className="w-full h-full bg-slate-200 flex justify-center items-center">
      <div className=" bg-white md:w-2/3 lg:w-1/3 h-3/4  rounded-md">
        <form className="w-full p-8">
          <h1 className="text-xl font-semibold mb-4">Đổi mật khẩu</h1>
          <div>
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex gap-2 items-center">
                  <Label
                    htmlFor="oldPassword"
                    value="Mật khẩu cũ"
                  />
                  <FaAsterisk
                    color="red"
                    fontSize="0.6rem"
                  />
                </div>
                <input
                  type="password"
                  id="oldPassword"
                  className="flex-1 mt-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                  {...register('oldPassword', {
                    required: true,
                  })}
                />
                {errors.oldPassword &&
                  errors.oldPassword.type === 'required' && (
                    <span className="text-red-500">
                      Vui lòng nhập vào trường này
                    </span>
                  )}
              </div>
              <div>
                <div className="flex gap-2 items-center">
                  <Label
                    htmlFor="newPassword"
                    value="Mật khẩu mới"
                  />
                  <FaAsterisk
                    color="red"
                    fontSize="0.6rem"
                  />
                </div>
                <input
                  type="password"
                  id="newPassword"
                  className="flex-1 mt-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                  {...register('newPassword', {
                    required: true,
                  })}
                />
                {errors.newPassword &&
                  errors.newPassword.type === 'required' && (
                    <span className="text-red-500">
                      Vui lòng nhập vào trường này
                    </span>
                  )}
              </div>
              <div>
                <div className="flex gap-2 items-center">
                  <Label
                    htmlFor="repeatPassword"
                    value="Nhập lại mật khẩu mới"
                  />
                  <FaAsterisk
                    color="red"
                    fontSize="0.6rem"
                  />
                </div>
                <input
                  type="password"
                  id="repeatPassword"
                  className="flex-1 mt-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                  {...register('repeatPassword', {
                    required: true,
                    validate: (value) => value === watch('newPassword'),
                  })}
                />
                {errors.repeatPassword &&
                  errors.repeatPassword.type === 'required' && (
                    <span className="text-red-500">
                      Vui lòng nhập vào trường này
                    </span>
                  )}
                {errors.repeatPassword &&
                  errors.repeatPassword.type === 'validate' && (
                    <span className="text-red-500">
                      Mật khẩu mới không khớp
                    </span>
                  )}
              </div>
            </div>
            <div className="flex gap-6 justify-end mt-8">
              <button
                type="button"
                onClick={resetAllField}
                className="bg-slate-50 hover:bg-slate-100 py-1 px-3 rounded-md border border-primary_color text-primary_color"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="bg-primary_color hover:bg-primary_color_hover py-1 px-3 rounded-md text-white"
              >
                {isLoading && (
                  <Spinner
                    color="info"
                    size="sm"
                  />
                )}
                Đổi mật khẩu
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
