import { HttpStatusCode } from 'axios'
import { Spinner } from 'flowbite-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaAsterisk } from 'react-icons/fa6'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import AddressSelection from '../../components/AddressSelection'
import Paths from '../../constants/paths'
import { Address } from '../../models/Address'
import { Role, UserCreateInput } from '../../models/User'
import { AuthService } from '../../service/AuthService'

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserCreateInput>()
  const { role } = useParams()
  const [isFetching, setIsFetching] = useState<boolean>(false)

  const [address, setAddress] = useState<Address>({} as Address)
  const [detailAddress, setDetailAddress] = useState<string>()
  const [universityName, setUniversityName] = useState<string>()
  const [universityCode, setUniversityCode] = useState<string>()
  const navigate = useNavigate()

  const onSubmit = async (data: UserCreateInput) => {
    try {
      if (role === Role.UNIVERSITY.toLocaleLowerCase()) {
        if (!universityName || !universityCode) {
          toast.error('Vui lòng nhập tên và mã cơ quan, trường học')
          return
        }
        if (!address.country || !detailAddress || detailAddress.trim() === '') {
          toast.error('Vui lòng nhập quốc gia và địa chỉ chi tiết')
          return
        }
        const response = await AuthService.register({
          ...data,
          role: Role.UNIVERSITY,
          university: {
            name: universityName,
            code: universityCode,
            address: {
              ...address,
              detail: detailAddress,
            },
          },
        })
        if (response.meta.status === HttpStatusCode.Ok) {
          toast.success('Đăng ký tài khoản thành công')
          navigate(Paths.LOGIN)
        } else {
          toast.error(response.meta.message)
        }
      } else {
        const response = await AuthService.register({
          ...data,
          role: Role.USER,
        })

        if (response.meta.status === HttpStatusCode.Ok) {
          toast.success('Đăng ký tài khoản thành công')
          navigate(Paths.LOGIN)
        } else {
          toast.error(response.meta.message)
        }
      }
    } catch (e) {
      console.log(e)
      toast.error('Email hoặc tên đăng nhập đã tồn tại')
    }
  }

  return (
    <section className="bg-white  overflow-y-scroll">
      <div className="flex gap-10 items-center h-screen">
        <div className="flex-1 flex justify-center items-center">
          <img
            src="/compass.png"
            alt="background"
            className="object-cover md:block"
            width={450}
          />
        </div>
        <div className="flex flex-col flex-1">
          <div className="w-full bg-white rounded-lg shadow-md md:my-4 sm:max-w-xl xl:p-0 ">
            <div className="px-6 pb-4">
              <div className="flex justify-center">
                <a href="/">
                  <img
                    src="/logo.png"
                    alt="logo"
                    width={120}
                    height={100}
                    className="object-cover"
                  />
                </a>
              </div>
              <h1 className="text-lg font-bold leading-tight tracking-tight text-text_color md:text-xl ">
                Đăng ký
              </h1>
              <form className="flex flex-col gap-1 mt-4">
                <div>
                  <div className="flex gap-1">
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-gray-900 "
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
                      className="block mb-2 text-sm font-medium text-gray-900 "
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
                {role === Role.UNIVERSITY.toLocaleLowerCase() && (
                  <div className="space-y-2 my-2">
                    <div>
                      <div className="flex gap-1">
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Tên cơ quan, trường học
                        </label>
                        <FaAsterisk
                          color="red"
                          fontSize="0.6rem"
                        />
                      </div>
                      <input
                        type="text"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        required
                        value={universityName}
                        onChange={(e) => setUniversityName(e.target.value)}
                      />
                    </div>
                    <div>
                      <div className="flex gap-1">
                        <label
                          htmlFor="code"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Mã cơ quan, trường học
                        </label>
                        <FaAsterisk
                          color="red"
                          fontSize="0.6rem"
                        />
                      </div>
                      <input
                        type="text"
                        id="code"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        required
                        value={universityCode}
                        onChange={(e) => setUniversityCode(e.target.value)}
                      />
                    </div>
                    <div>
                      <div className="flex gap-1">
                        <label
                          htmlFor="address"
                          className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Địa chỉ
                        </label>
                        <FaAsterisk
                          color="red"
                          fontSize="0.6rem"
                        />
                      </div>

                      <AddressSelection setAddress={setAddress} />
                      <input
                        type="text"
                        value={detailAddress}
                        placeholder="Địa chỉ chi tiết"
                        onChange={(e) => setDetailAddress(e.target.value)}
                        className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      />
                    </div>
                  </div>
                )}

                <div>
                  <div className="flex gap-1">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 "
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
                    {...register('password', {
                      required: true,
                      minLength: 8,
                    })}
                  />
                  <div className="mt-2">
                    {errors.password && errors.password.type === 'required' && (
                      <span className="text-red-500">
                        Vui lòng nhập vào trường này
                      </span>
                    )}
                    {errors.password &&
                      errors.password.type === 'minLength' && (
                        <span className="text-red-500">
                          Mật khẩu phải có ít nhất 8 ký tự
                        </span>
                      )}
                  </div>
                </div>
                <div>
                  <div className="flex gap-1">
                    <label
                      htmlFor="repeat_password"
                      className="block mb-2 text-sm font-medium text-gray-900 "
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
                    <Link
                      to={Paths.LOGIN}
                      className="font-medium text-primary_color hover:underline "
                    >
                      Đăng nhập
                    </Link>
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
