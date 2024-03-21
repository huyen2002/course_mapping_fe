import { Label, Select, TextInput, Textarea } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaAsterisk } from 'react-icons/fa6'
import WindowedSelect from 'react-windowed-select'
import LoadingScreen from '../../components/common/LoadingScreen'
import { Major } from '../../models/Major'
import {
  LevelOfEducation,
  ProgramEducation,
} from '../../models/ProgramEducation'
import { MajorService } from '../../service/MajorService'

const NewProgramEducation = () => {
  const { register } = useForm<ProgramEducation>()
  const [majors, setMajors] = useState<Major[]>([])
  const [majorOptions, setMajorOptions] = useState<any[]>([])

  const [isFetching, setIsFetching] = useState<boolean>(false)
  const fetchData = async () => {
    try {
      setIsFetching(true)
      const response = await MajorService.getList()
      setMajors(response.data)
    } catch (e) {
      console.log('Error', e)
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
    fetchData()
  }, [])

  return (
    <div>
      {isFetching ? (
        <LoadingScreen />
      ) : (
        <div>
          <h1 className="font-bold text-2xl">Thông tin chương trình đào tạo</h1>
          <form className="flex gap-10 mt-4">
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
                      align="center"
                    />
                  </div>
                </div>
                <TextInput
                  id="name"
                  type="email"
                  placeholder="Công nghệ thông tin"
                  {...register('name', {
                    required: true,
                  })}
                />
              </div>
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
                      align="center"
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
                    align="center"
                  />
                </div>
                <WindowedSelect
                  windowThreshold={10}
                  options={majorOptions}
                  placeholder="Chọn ngành học"
                  {...register('majorId', {
                    required: true,
                  })}
                  onChange={(selectedOption: any) => {
                    console.log(selectedOption)
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
                      align="center"
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
                      align="center"
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
                      align="center"
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
                    <FaAsterisk
                      color="red"
                      fontSize="0.6rem"
                      align="center"
                    />
                  </div>
                  <TextInput
                    type="number"
                    id="startYear"
                    {...register('startYear', {
                      required: true,
                    })}
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
                    <FaAsterisk
                      color="red"
                      fontSize="0.6rem"
                      align="center"
                    />
                  </div>
                  <TextInput
                    type="number"
                    id="endYear"
                    {...register('endYear', {
                      required: true,
                    })}
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
                      align="center"
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
                    align="center"
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
                </div>
              </div>
            </div>
            {/* <UploadButton<OurFileRouter>
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response
                console.log('Files: ', res)
                alert('Upload Completed')
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`)
              }}
              onBeforeUploadBegin={(files) => {
                // Preprocess files before uploading (e.g. rename them)
                return files.map(
                  (f) => new File([f], 'renamed-' + f.name, { type: f.type })
                )
              }}
              onUploadBegin={(name) => {
                // Do something once upload begins
                console.log('Uploading: ', name)
              }}
            /> */}
          </form>
        </div>
      )}
    </div>
  )
}
export default NewProgramEducation
