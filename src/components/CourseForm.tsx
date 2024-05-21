import { HttpStatusCode } from 'axios'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { Label, Select, Spinner, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaAsterisk } from 'react-icons/fa6'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import WindowedSelect from 'react-windowed-select'
import { storage } from '../config/firebase'
import { Course } from '../models/Course'
import { University } from '../models/University'
import { CourseService } from '../service/CourseService'
import { UniversityService } from '../service/UniversityService'
import { AuthUtils } from '../utils/AuthUtils'
import { ObjectUtils } from '../utils/ObjectUtils'
import FileUploadInput from './FileUploadInput'

const CourseForm = ({
  course,
  isShowUniversity,
}: {
  course?: Course
  isShowUniversity?: boolean
}) => {
  const { register, handleSubmit, reset } = useForm<Course>({
    defaultValues: course,
  })
  const [fileUpload, setFileUpload] = useState<File | null>(null)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const [universities, setUniversities] = useState<University[]>([])
  const [universityOptions, setUniversityOptions] = useState<any[]>([])
  const [university, setUniversity] = useState<any>(null)

  const fetchData = async () => {
    try {
      setIsFetching(true)

      const universityResponse = await UniversityService.getList()
      setUniversities(universityResponse.data)
    } catch (e) {
      console.log('Error', e)
    } finally {
      setIsFetching(false)
    }
  }
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
        setIsFetching(true)
        await uploadBytes(filesFolderRef, fileUpload)
        outlineUrl = await getDownloadURL(filesFolderRef)
      } catch (err) {
        console.error(err)
      } finally {
        setIsFetching(false)
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

      try {
        setIsFetching(true)
        const response = await CourseService.update(course.id, newObject)
        console.log('update course', response.data)
        if (response.meta.status === HttpStatusCode.Ok) {
          toast.success('Cập nhật môn học thành công')
        } else {
          toast.error(response.meta.message)
        }
      } catch (e: any) {
        console.log('Error: ', e)
        toast.error('Cập nhật môn học thất bại')
      } finally {
        setIsFetching(false)
      }
    } else {
      try {
        setIsFetching(true)

        const response = await CourseService.create({
          ...data,
          outline: outlineUrl,
          universityId: university?.value,
        })
        if (response.meta.status === HttpStatusCode.Ok) {
          toast.success('Thêm mới môn học thành công')
        } else {
          toast.error(response.meta.message)
        }

        if (AuthUtils.isAdmin()) {
          navigate(`/admin/university/${university?.value}/courses`)
        } else {
          navigate(`/university/${id}/courses`)
        }
      } catch (e: any) {
        console.log('Error', e)
        toast.error('Thêm mới môn học thất bại')
      } finally {
        setIsFetching(false)
      }
    }
  }

  useEffect(() => {
    const options: any[] = []
    universities.map((university) => {
      options.push({
        label: university.name,
        value: university.id,
      })
    })
    setUniversityOptions(options)
  }, [universities])

  useEffect(() => {
    fetchData()
  }, [])
  useEffect(() => {
    // console.log('program', programEducation)

    if (course) {
      setUniversity(
        universityOptions.find((item) => item.value === course.university.id)
      )
    }
  }, [universityOptions])
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
            type="text"
            {...register('name', {
              required: true,
            })}
          />
        </div>
        {isShowUniversity && (
          <div className="max-w-md">
            <div className="mb-2 flex gap-[4px] items-center">
              <Label
                htmlFor="majorId"
                value="Trường đào tạo"
              />
              <FaAsterisk
                color="red"
                fontSize="0.6rem"
              />
            </div>
            <WindowedSelect
              windowThreshold={10}
              options={universityOptions}
              value={university}
              onChange={(selectedOption: any) => {
                console.log(selectedOption)
                setUniversity(selectedOption)
              }}
            />
          </div>
        )}
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
            type="text"
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
            className="text-red-500 border py-2 px-4 rounded-lg border-red-500 hover:bg-red-500 hover:text-white transition duration-200 text-sm"
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
            {course ? 'Cập nhật' : 'Thêm mới'}
          </button>
        </div>
      </form>
    </div>
  )
}
export default CourseForm
