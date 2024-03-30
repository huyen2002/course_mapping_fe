import { Spinner } from 'flowbite-react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaAsterisk } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Paths from '../../constants/paths'
import { Role, UserLoginInput } from '../../models/User'
import { AuthService } from '../../service/AuthService'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginInput>({})
  const [isFetching, setIsFetching] = useState(false)
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<UserLoginInput> = async (
    data: UserLoginInput
  ) => {
    console.log(data)
    try {
      setIsFetching(true)
      const response = await AuthService.login(data)
      switch (response.role) {
        case Role.UNIVERSITY:
          navigate(Paths.UNIVERSITY_HOME)
          break
        case Role.ADMIN:
          navigate(Paths.ADMIN_HOME)
          break
        case Role.USER:
          navigate(Paths.HOME)
          break
        default:
          window.location.reload()
          break
      }
      toast.success('Đăng nhập thành công')
    } catch (e) {
      console.log('Error: ', e)
      toast.error('Tài khoản hoặc mật khẩu chưa đúng')
    } finally {
      setIsFetching(false)
    }
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className=""
            src="/logo.png"
            alt="logo"
          />
        </a>

        <div className="w-full bg-white rounded-lg shadow-md dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-text_color md:text-2xl dark:text-white">
              Đăng nhập
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <div className="flex gap-1">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <FaAsterisk
                    color="red"
                    fontSize="0.6rem"
                    align="center"
                  />
                </div>

                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border  border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="daihocconggnhe@vnu.edu.vn"
                  {...register('email', {
                    required: true,
                    pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  })}
                />
                <div className="mt-2">
                  {errors.email && errors.email.type === 'required' && (
                    <span className="text-red-500">
                      Vui lòng nhập vào trường này
                    </span>
                  )}
                  {errors.email && errors.email.type === 'pattern' && (
                    <span className="text-red-500">
                      Vui lòng nhập email hợp lệ
                    </span>
                  )}
                </div>
              </div>
              <div>
                <div className="flex gap-1">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Mật khẩu
                  </label>
                  <FaAsterisk
                    color="red"
                    fontSize="0.6rem"
                    align="center"
                  />
                </div>

                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register('password', { required: true })}
                />
                <div className="mt-2">
                  {errors.password && errors.password.type === 'required' && (
                    <span className="text-red-500">
                      Vui lòng nhập vào trường này
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <a
                  href="#"
                  className="text-sm font-medium text-primary_color_hover hover:underline dark:text-primary-500"
                >
                  Quên mật khẩu?
                </a>
              </div>
              <button
                type="submit"
                onSubmit={handleSubmit(onSubmit)}
                className="w-full text-white bg-primary_color hover:bg-primary_color_hover focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {isFetching && (
                  <Spinner
                    size="sm"
                    className="gap-2"
                  />
                )}
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Bạn chưa có tài khoản?{' '}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Đăng ký
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Login
