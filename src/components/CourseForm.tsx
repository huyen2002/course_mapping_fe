import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { Label, Select, Spinner, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaAsterisk } from 'react-icons/fa6'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { storage } from '../config/firebase'
import { Course } from '../models/Course'
import { CourseService } from '../service/CourseService'
import { ObjectUtils } from '../utils/ObjectUtils'
import FileUploadInput from './FileUploadInput'

const CourseForm = ({ course }: { course?: Course }) => {
  const { register, handleSubmit, reset } = useForm<Course>({
    defaultValues: course,
  })
  const [fileUpload, setFileUpload] = useState<File | null>(null)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const navigate = useNavigate()
  const { id } = useParams()

  const handleResetForm = () => {
    console.log('reset')
    reset()
    setFileUpload(null)
  }
  const onSubmit = async (data: Course) => {
    console.log('onsubmit', data)
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
    if (course) {
      const newObject = ObjectUtils.getUpdatedObject(
        {
          ...data,
          outline: outlineUrl,
        },
        course
      )
      console.log('course new', newObject)
      if (Object.keys(newObject).length === 0) {
        toast.error('Không có thông tin cần cập nhật')
        return
      }
      if (newObject?.code) {
        const checkCode = (
          await CourseService.checkExistedByCode(newObject.code)
        ).data
        if (checkCode) {
          toast.error('Mã môn học đã tồn tại')
          return
        }
      }
      try {
        setIsFetching(true)
        const response = await CourseService.update(course.id, newObject)
        console.log('update course', response.data)
        toast.success('Cập nhật môn học thành công')
      } catch (e: any) {
        console.log('Error: ', e)
        toast.error('Cập nhật môn học thất bại')
      } finally {
        setIsFetching(false)
      }
    } else {
      const checkCode = (await CourseService.checkExistedByCode(data.code)).data
      if (checkCode) {
        toast.error('Mã môn học đã tồn tại')
        return
      }
      try {
        setIsFetching(true)

        const response = (
          await CourseService.create({
            ...data,
            outline: outlineUrl,
          })
        ).data
        toast.success('Thêm mới môn học thành công')

        navigate(`/university/${id}/courses`)
      } catch (e: any) {
        console.log('Error', e)
        toast.error('Thêm mới môn học thất bại')
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
            type="button"
            onClick={handleResetForm}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            className="bg-primary_color text-white flex gap-[6px] items-center py-2 px-4 rounded-lg hover:bg-primary_color_dark transition duration-200"
          >
            {isFetching && (
              <Spinner
                color="info"
                size="sm"
              />
            )}
            {course ? 'Cập nhật' : 'Thêm mới'}
          </button>
        </div>
      </form>
    </div>
  )
}
export default CourseForm
