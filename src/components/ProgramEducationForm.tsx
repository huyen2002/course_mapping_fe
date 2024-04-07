import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { FileInput, Label, Select, TextInput, Textarea } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaAsterisk } from 'react-icons/fa6'
import { toast } from 'react-toastify'
import WindowedSelect from 'react-windowed-select'
import { storage } from '../config/firebase'
import { Major } from '../models/Major'
import { LevelOfEducation, ProgramEducation } from '../models/ProgramEducation'
import { University } from '../models/University'
import { MajorService } from '../service/MajorService'
import ProgramEducationService from '../service/ProgramEducationService'
import { UniversityService } from '../service/UniversityService'
import LoadingScreen from './common/LoadingScreen'
import { useNavigate } from 'react-router-dom'
const ProgramEducationForm = ({
  isShowUniversity,
}: {
  isShowUniversity?: boolean
}) => {
  const { register, handleSubmit } = useForm<ProgramEducation>()
  const [majors, setMajors] = useState<Major[]>([])
  const [majorOptions, setMajorOptions] = useState<any[]>([])
  const [major, setMajor] = useState<any>(majorOptions[0])
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [universities, setUniversities] = useState<University[]>([])
  const [universityOptions, setUniversityOptions] = useState<any[]>([])
  const [university, setUniversity] = useState<any>(universityOptions[0])
  const [fileUpload, setFileUpload] = useState<File | null>(null)

  const navigate = useNavigate()
  const fetchData = async () => {
    try {
      setIsFetching(true)
      const response = await MajorService.getList()
      setMajors(response.data)
      const universityResponse = await UniversityService.getList()
      setUniversities(universityResponse.data)
    } catch (e) {
      console.log('Error', e)
    } finally {
      setIsFetching(false)
    }
  }

  const onSubmit = async (data: ProgramEducation) => {
    console.log(data)
    if (!fileUpload) return
    const filesFolderRef = ref(storage, `program_educations/${fileUpload.name}`)

    try {
      await uploadBytes(filesFolderRef, fileUpload)
    } catch (err) {
      console.error(err)
    }

    try {
      setIsFetching(true)
      const response = (
        await ProgramEducationService.create({
          ...data,
          majorId: major?.value,
          universityId: university?.value,
          outline: await getDownloadURL(filesFolderRef),
        })
      ).data
      toast.success('Thêm mới chương trình đào tạo thành công')

      navigate(`/program_education/${response.id}`)
    } catch (e: any) {
      console.log('Error', e)
      toast.error('Thêm mới chương trình đào tạo thất bại')
    } finally {
      setIsFetching(false)
    }
  }
  useEffect(() => {
    const options: any[] = []
    majors.map((major) => {
      options.push({
        label: major.name,
        value: major.id,
      })
    })
    setMajorOptions(options)
  }, [majors])

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

  return (
    <div>
      {isFetching ? (
        <LoadingScreen />
      ) : (
        <div>
          <h1 className="font-bold text-2xl">Thông tin chương trình đào tạo</h1>
          <form
            className="flex gap-10 mt-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-1/2 flex flex-col gap-4">
              <div className="">
                <div className="mb-2 block">
                  <div className="flex gap-2 items-center">
                    <Label
                      htmlFor="name"
                      value="Tên chương trình đào tạo"
                    />
                    <FaAsterisk
                      color="red"
                      fontSize="0.6rem"
                    />
                  </div>
                </div>

                <TextInput
                  id="name"
                  placeholder="Công nghệ thông tin"
                  {...register('name', {
                    required: true,
                  })}
                />
              </div>
              {isShowUniversity && (
                <div className="max-w-md">
                  <div className="mb-2 flex gap-2 items-center">
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
                    defaultValue={universityOptions[0]}
                    onChange={(selectedOption: any) => {
                      console.log(selectedOption)
                      setUniversity(selectedOption)
                    }}
                  />
                </div>
              )}

              <div>
                <div className="mb-2 block">
                  <div className="flex gap-2 items-center">
                    <Label
                      htmlFor="code"
                      value="Mã tuyển sinh"
                    />
                    <FaAsterisk
                      color="red"
                      fontSize="0.6rem"
                    />
                  </div>
                </div>
                <TextInput
                  id="code"
                  type="text"
                  placeholder="CN1"
                  {...register('code', {
                    required: true,
                  })}
                />
              </div>
              <div className="max-w-md">
                <div className="mb-2 flex gap-2 items-center">
                  <Label
                    htmlFor="majorId"
                    value="Ngành học"
                  />
                  <FaAsterisk
                    color="red"
                    fontSize="0.6rem"
                  />
                </div>
                <WindowedSelect
                  windowThreshold={10}
                  options={majorOptions}
                  defaultValue={majorOptions[0]}
                  onChange={(selectedOption: any) => {
                    console.log(selectedOption)
                    setMajor(selectedOption)
                  }}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <div className="flex gap-2 items-center">
                    <Label
                      htmlFor="levelOfEducation"
                      value="Trình độ đào tạo"
                    />
                    <FaAsterisk
                      color="red"
                      fontSize="0.6rem"
                    />
                  </div>
                </div>
                <Select {...register('levelOfEducation', { required: true })}>
                  {Object.keys(LevelOfEducation).map((key) => (
                    <option
                      key={key}
                      value={key}
                    >
                      {LevelOfEducation[key as any]}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <div className="">
                  <div className="mb-2 flex gap-2 items-center">
                    <Label
                      htmlFor="durationYear"
                      value="Thời gian đào tạo"
                    />
                    <FaAsterisk
                      color="red"
                      fontSize="0.6rem"
                    />
                  </div>
                  <TextInput
                    type="number"
                    id="durationYear"
                    {...register('durationYear', {
                      required: true,
                    })}
                    className="rounded-lg bg-gray-50 border border-gray-300  "
                    defaultValue={4}
                  />
                </div>
              </div>
              <div>
                <div className="">
                  <div className="mb-2 flex gap-2 items-center">
                    <Label
                      htmlFor="numCredits"
                      value="Số tín chỉ tích lũy"
                    />
                    <FaAsterisk
                      color="red"
                      fontSize="0.6rem"
                    />
                  </div>
                  <TextInput
                    type="number"
                    id="numCredits"
                    {...register('numCredits', {
                      required: true,
                    })}
                    className="rounded-lg bg-gray-50 border border-gray-300  "
                    defaultValue={120}
                  />
                </div>
              </div>
            </div>
            <div className="w-1/2 mr-10 flex flex-col gap-4">
              <div className="flex gap-8">
                <div className="">
                  <div className="flex gap-2 items-center mb-2">
                    <Label
                      htmlFor="startYear"
                      value="Năm bắt đầu"
                    />
                  </div>
                  <TextInput
                    type="number"
                    id="startYear"
                    {...register('startYear', {})}
                    className="rounded-lg bg-gray-50 border border-gray-300  "
                    placeholder="2021"
                  />
                </div>
                <div className="">
                  <div className="flex gap-2 items-center mb-2">
                    <Label
                      htmlFor="endYear"
                      value="Năm kết thúc"
                    />
                  </div>
                  <TextInput
                    type="number"
                    id="endYear"
                    {...register('endYear', {})}
                    className="rounded-lg bg-gray-50 border border-gray-300  "
                    placeholder="2025"
                  />
                </div>
              </div>
              <div>
                <div className="mb-2 block">
                  <div className="flex gap-2 items-center">
                    <Label
                      htmlFor="language"
                      value="Ngôn ngữ đào tạo"
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
                <div className="mb-2 flex gap-2 items-center">
                  <Label
                    htmlFor="introduction"
                    value="Giới thiệu chương trình đào tạo"
                  />
                  <FaAsterisk
                    color="red"
                    fontSize="0.6rem"
                  />
                </div>
                <Textarea
                  id="introduction"
                  {...register('introduction', {
                    required: true,
                  })}
                  rows={10}
                />
              </div>
              <div>
                <div className="mb-2">
                  <Label
                    htmlFor="outline"
                    value="Nội dung chương trình đào tạo"
                  />
                  <FileInput
                    id="outline"
                    onChange={(e) => {
                      e.target.files && setFileUpload(e.target.files[0])
                    }}
                  />
                </div>
              </div>
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
      )}
    </div>
  )
}
export default ProgramEducationForm
