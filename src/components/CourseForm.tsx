import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { Label, Select, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaAsterisk } from 'react-icons/fa6'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { storage } from '../config/firebase'
import { Course } from '../models/Course'
import { CourseService } from '../service/CourseService'
import FileUploadInput from './FileUploadInput'

const CourseForm = () => {
  const { register, handleSubmit, reset } = useForm<Course>()
  const [fileUpload, setFileUpload] = useState<File | null>(null)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const navigate = useNavigate()
  const { id } = useParams()

  const handleResetForm = () => {
    reset()
    setFileUpload(null)
  }
  const onSubmit = async (data: Course) => {
    console.log(data)
    let outlineUrl: string | null = null
    if (fileUpload) {
      const filesFolderRef = ref(storage, `courses/${fileUpload.name}`)

      try {
        await uploadBytes(filesFolderRef, fileUpload)
        outlineUrl = await getDownloadURL(filesFolderRef)
      } catch (err) {
        console.error(err)
      }
    }

    try {
      setIsFetching(true)
      const response = (
        await CourseService.create({
          ...data,
          outline: outlineUrl,
        })
      ).data
      toast.success('Thêm mới môn học tạo thành công')

      navigate(`/university/${id}/courses`)
    } catch (e: any) {
      console.log('Error', e)
      toast.error('Thêm mới môn học tạo thất bại')
    } finally {
      setIsFetching(false)
    }
  }
  return (
    <div>
      <h1 className="font-bold text-2xl">Thông tin môn học</h1>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mt-8">
          <div className="mb-2 block">
            <div className="flex gap-2 items-center">
              <Label
                htmlFor="name"
                value="Tên môn học"
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
                value="Mã môn học"
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
        <div>
          <div className="mb-2 block">
            <div className="flex gap-2 items-center">
              <Label
                htmlFor="language"
                value="Ngôn ngữ giảng dạy"
              />
              <FaAsterisk
                color="red"
                fontSize="0.6rem"
              />
            </div>
          </div>
          <Select
            id="language"
            {...register('language', {
              required: true,
            })}
          >
            <option value="VI">Tiếng Việt</option>
            <option value="EN">Tiếng Anh</option>
          </Select>
        </div>
        <div>
          <FileUploadInput
            label="Tài liệu môn học"
            setFileUpload={setFileUpload}
          />
        </div>
        <div className="flex justify-end gap-8">
          <button
            onClick={handleResetForm}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-200"
          >
            Hủy
          </button>
          <button
            type="submit"
            onSubmit={handleSubmit(onSubmit)}
            className="bg-primary_color text-white py-2 px-4 rounded-lg hover:bg-primary_color_dark transition duration-200"
          >
            Thêm mới
          </button>
        </div>
      </form>
    </div>
  )
}
export default CourseForm
