import { HttpStatusCode } from 'axios'
import { Label, Spinner, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaAsterisk } from 'react-icons/fa6'
import { toast } from 'react-toastify'
import { Major } from '../models/Major'
import { MajorService } from '../service/MajorService'
import { ObjectUtils } from '../utils/ObjectUtils'

const MajorForm = ({ major }: { major?: Major }) => {
  const { register, handleSubmit, reset } = useForm<Major>({
    defaultValues: major,
  })
  const [isFetching, setIsFetching] = useState<boolean>(false)

  const handleResetForm = () => {
    console.log('reset')
    reset()
  }
  const onSubmit = async (data: Major) => {
    console.log('onsubmit', data)

    if (major) {
      const newObject = ObjectUtils.getUpdatedObject(data, major)
      console.log('major new', newObject)
      if (Object.keys(newObject).length === 0) {
        toast.error('Không có thông tin cần cập nhật')
        return
      }

      try {
        setIsFetching(true)
        const response = await MajorService.update(major.id, newObject)
        if (response.meta.status === HttpStatusCode.Ok) {
          toast.success('Cập nhật ngành đào tạo thành công')
        } else {
          toast.error(response.meta.message)
        }
      } finally {
        setIsFetching(false)
      }
    } else {
      try {
        setIsFetching(true)
        const response = await MajorService.create(data)
        if (response.meta.status === HttpStatusCode.Ok) {
          toast.success('Thêm mới ngành đào tạo thành công')
        } else {
          toast.error(response.meta.message)
        }
      } catch (e: any) {
        console.log(e)
        toast.error('Thêm mới ngành đào tạo thất bại')
      } finally {
        setIsFetching(false)
      }
    }
  }

  return (
    <div>
      <form className="flex flex-col gap-4">
        <div className="">
          <div className="mb-2 block">
            <div className="flex gap-2 items-center">
              <Label
                htmlFor="name"
                value="Tên ngành đào tạo"
              />
              <FaAsterisk
                color="red"
                fontSize="0.6rem"
              />
            </div>
          </div>

          <TextInput
            id="name"
            {...register('name', {
              required: true,
            })}
          />
        </div>

        <div className="">
          <div className="mb-2 block">
            <div className="flex gap-2 items-center">
              <Label
                htmlFor="code"
                value="Mã ngành"
              />
              <FaAsterisk
                color="red"
                fontSize="0.6rem"
              />
            </div>
          </div>

          <TextInput
            id="code"
            {...register('code', {
              required: true,
            })}
          />
        </div>

        <div className="flex justify-end gap-8">
          <button
            type="button"
            onClick={handleResetForm}
            className="text-red-500 border border-red-500 py-2 px-4 rounded-lg  hover:bg-red-500 hover:text-white transition duration-200 text-sm"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            className="bg-primary_color text-white flex gap-[6px] items-center py-2 px-4 rounded-lg text-sm hover:bg-primary_color_hover transition duration-200"
          >
            {isFetching && (
              <Spinner
                color="info"
                size="sm"
              />
            )}
            {major ? 'Cập nhật' : 'Thêm mới'}
          </button>
        </div>
      </form>
    </div>
  )
}
export default MajorForm
