import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { Spinner } from 'flowbite-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaAsterisk } from 'react-icons/fa6'
import { toast } from 'react-toastify'
import { Role, UserCreateInput } from '../../models/User'
import { AuthService } from '../../service/AuthService'

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserCreateInput>()
  const [role, setRole] = useState<Role>(Role.USER)
  const [isFetching, setIsFetching] = useState<boolean>(false)

  const onSubmit = async (data: UserCreateInput) => {
    console.log('submit', data)
    console.log('role', role)
    try {
      await AuthService.register({
        ...data,
        role: role,
      })
      toast.success('Đăng ký tài khoản thành công')
    } catch (e) {
      console.log(e)
      toast.error('Email hoặc tên đăng nhập đã tồn tại')
    }
  }

  return (
    <section className="bg-white dark:bg-gray-900 h-screen overflow-y-scroll">
      <div className="flex gap-10">
        <div className="flex-1 flex justify-center items-center">
          <img
            src="/compass.png"
            alt="background"
            className="object-cover  md:block"
            width={450}
          />
        </div>
        <div className="flex flex-col flex-1">
          <div className="w-full bg-white rounded-lg shadow-md md:my-4 sm:max-w-md xl:p-0 ">
            <div className="px-6 pb-4">
              <div className="flex justify-center">
                <a
                  href="/"
                  className="flex-none"
                >
                  <img
                    src="/logo.png"
                    alt="logo"
                    width={120}
                    height={100}
                    className="object-cover"
                  />
                </a>
              </div>
              <h1 className="text-lg font-bold leading-tight tracking-tight text-text_color md:text-xl dark:text-white">
                Đăng ký
              </h1>
              <form className="flex flex-col gap-1 mt-4">
                <div>
                  <div className="flex gap-1">
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Tên đăng nhập
                    </label>
                    <FaAsterisk
                      color="red"
                      fontSize="0.6rem"
                    />
                  </div>

                  <input
                    type="text"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    {...register('username', {
                      required: true,
                    })}
                  />
                  <div className="mt-2">
                    {errors.username && errors.username.type === 'required' && (
                      <span className="text-red-500">
                        Vui lòng nhập vào trường này
                      </span>
                    )}
                  </div>
                </div>

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
                    className="bg-gray-50 border  border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
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
                <div>
                  <div className="flex gap-1">
                    <label
                      htmlFor="repeat_password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Nhập lại mật khẩu
                    </label>
                    <FaAsterisk
                      color="red"
                      fontSize="0.6rem"
                    />
                  </div>

                  <input
                    type="password"
                    id="repeat_password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    {...register('repeatPassword', {
                      required: true,
                      validate: (value) => value === watch('password'),
                    })}
                  />
                  <div className="mt-2">
                    {errors.repeatPassword &&
                      errors.repeatPassword.type === 'required' && (
                        <span className="text-red-500">
                          Vui lòng nhập vào trường này
                        </span>
                      )}
                    {errors.repeatPassword &&
                      errors.repeatPassword.type === 'validate' && (
                        <span className="text-red-500">
                          Mật khẩu không khớp
                        </span>
                      )}
                  </div>
                </div>
                <div>
                  <div className="flex gap-1">
                    <label
                      htmlFor="role"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Vai trò
                    </label>
                    <FaAsterisk
                      color="red"
                      fontSize="0.6rem"
                    />
                  </div>
                  <RadioGroup
                    defaultValue={Role.USER}
                    name="role"
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value as Role)
                    }}
                  >
                    <FormControlLabel
                      value={Role.USER}
                      control={<Radio />}
                      label="Cá nhân"
                    />
                    <FormControlLabel
                      value={Role.UNIVERSITY}
                      control={<Radio />}
                      label="Cơ quan"
                    />
                  </RadioGroup>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  className="w-full text-white bg-primary_color hover:bg-primary_color_hover focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {isFetching && (
                    <Spinner
                      size="sm"
                      className="gap-2"
                    />
                  )}
                  Đăng ký
                </button>
                <div className="mt-4">
                  <p className=" font-light text-gray-500">
                    Bạn đã có tài khoản?{' '}
                    <a
                      href="#"
                      className="font-medium text-primary_color hover:underline "
                    >
                      Đăng nhập
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default SignUp
