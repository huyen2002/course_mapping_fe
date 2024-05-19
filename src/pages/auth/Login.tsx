import { HttpStatusCode } from 'axios'
import { Spinner } from 'flowbite-react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaAsterisk } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Paths from '../../constants/paths'
import { Role, UserLoginInput } from '../../models/User'
import { AuthService } from '../../service/AuthService'
import { UniversityService } from '../../service/UniversityService'

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
      switch (response.data?.role) {
        case Role.UNIVERSITY: {
          const university = (await UniversityService.getByUser()).data
          navigate(`/university/${university.id}/info`)
          break
        }
        case Role.ADMIN:
          navigate(Paths.ADMIN_HOME)
          break
        case Role.USER:
          navigate(Paths.HOME)
          break
        default:
          break
      }
      if (response.meta.status === HttpStatusCode.Ok) {
        toast.success('Đăng nhập thành công')
      } else {
        toast.error(response.meta.message)
      }
    } catch (e) {
      console.log('Error: ', e)
      toast.error('Tài khoản hoặc mật khẩu chưa đúng')
    } finally {
      setIsFetching(false)
    }
  }

  return (
    <section className="bg-white">
      <div className="flex gap-10 items-center h-screen">
        <div className="flex-1 flex justify-center items-center">
          <img
            src="/compass.png"
            alt="background"
            className="object-cover  md:block"
            width={450}
          />
        </div>
        <div className="flex-1">
          <div className="w-full bg-white rounded-lg shadow-md md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <a
                href="#"
                className="flex justify-center"
              >
                <img
                  src="/logo.png"
                  alt="logo"
                  className="object-cover"
                  width={120}
                  height={100}
                />
              </a>

              <h1 className="text-lg font-bold leading-tight tracking-tight text-text_color md:text-xl ">
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
                    />
                  </div>

                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border  border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="daihoccongnghe@vnu.edu.vn"
                    {...register('email', {
                      required: true,
                      pattern:
                        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
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
                  className="w-full text-white bg-primary_color hover:bg-primary_color_hover focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {isFetching && (
                    <Spinner
                      size="sm"
                      className="gap-2"
                    />
                  )}
                  Đăng nhập
                </button>
                <p className=" font-light text-gray-500 dark:text-gray-400">
                  Bạn chưa có tài khoản?{' '}
                  <button
                    onClick={() => navigate(Paths.CHOOSE_ROLE)}
                    className="font-medium text-primary_color hover:underline "
                  >
                    Đăng ký
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Login
