import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { HttpStatusCode } from 'axios'
import { Label, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { FaAsterisk } from 'react-icons/fa6'
import { toast } from 'react-toastify'
import WindowedSelect from 'react-windowed-select'
import { Course } from '../../models/Course'
import { ProgramEducation } from '../../models/ProgramEducation'
import { ProgramEducationCourse } from '../../models/ProgramEducationCourse'
import { ProgramEducationCourseService } from '../../service/ProgramEducationCourseService'
import { ObjectUtils } from '../../utils/ObjectUtils'
import LoadingScreen from '../common/LoadingScreen'

const CourseToProgramForm = ({
  program,
  programCourse,
  courseList,
}: {
  program: ProgramEducation
  programCourse?: ProgramEducationCourse | null
  courseList: Course[]
}) => {
  const [courseOptions, setCourseOptions] = useState<any[]>([])
  const [course, setCourse] = useState<any>()

  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [numCredits, setNumCredits] = useState<number>(
    programCourse ? programCourse.numCredits : 0
  )
  const [compulsory, setCompulsory] = useState<boolean>(
    programCourse ? programCourse.compulsory : false
  )

  useEffect(() => {
    const options: any[] = []
    if (courseList.length === 0) return

    courseList.map((course) => {
      options.push({
        label: course.name,
        value: course.id,
      })
    })
    setCourseOptions(options)
  }, [])
  useEffect(() => {
    setCourse(
      programCourse
        ? courseOptions.find((item) => item.value === programCourse?.course?.id)
        : courseOptions[0]
    )
  }, [courseOptions])

  const handleSubmit = async () => {
    console.log('course', programCourse?.id)
    console.log(course, numCredits, compulsory)
    if (!course || numCredits === 0) {
      toast.error('Vui lòng điền đầy đủ thông tin')
      return
    }
    const data = {
      programEducationId: program.id,
      courseId: course?.value as number,
      compulsory: compulsory,
      numCredits: numCredits,
    } as ProgramEducationCourse
    try {
      setIsFetching(true)
      if (!programCourse) {
        const response = await ProgramEducationCourseService.create(data)
        if (response.meta.status === HttpStatusCode.Ok) {
          toast.success('Thêm môn học thành công')
        } else {
          toast.error(response.meta.message)
        }
      } else {
        const newData = ObjectUtils.getUpdatedObject(data, programCourse)
        if (!newData || Object.keys(newData).length === 0) {
          toast.error('Không có thông tin cần cập nhật')
          return
        }
        await ProgramEducationCourseService.update(
          programCourse.id as number,
          newData
        )

        toast.success('Cập nhật môn học thành công')
      }
    } catch (e: any) {
      console.log(e)
      toast.error('Thêm môn học thất bại')
    } finally {
      setIsFetching(false)
    }
  }
  const handleResetForm = () => {
    setCourse(
      programCourse
        ? courseOptions.find((item) => item.value === programCourse?.course?.id)
        : courseOptions[0]
    )
    setNumCredits(programCourse ? programCourse.numCredits : 0)
    setCompulsory(programCourse ? programCourse.compulsory : false)
  }

  return (
    <div>
      {!isFetching ? (
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex gap-2 items-center">
              <Label
                htmlFor="name"
                value="Môn học"
              />
              <FaAsterisk
                color="red"
                fontSize="0.6rem"
              />
            </div>
            <WindowedSelect
              windowThreshold={10}
              options={courseOptions}
              value={course}
              onChange={(selectedOption: any) => {
                console.log(selectedOption)
                setCourse(selectedOption)
              }}
              isDisabled={programCourse ? true : false}
            />
          </div>
          <div className="">
            <div className="mb-2 block">
              <div className="flex gap-2 items-center">
                <Label
                  htmlFor="name"
                  value="Số tín chỉ"
                />
                <FaAsterisk
                  color="red"
                  fontSize="0.6rem"
                />
              </div>
            </div>

            <TextInput
              id="name"
              type="number"
              min={1}
              value={numCredits as number}
              onChange={(e) => {
                setNumCredits(parseInt(e.target.value))
              }}
            />
          </div>
          <div className="">
            <div className="mb-2 block">
              <div className="flex gap-2 items-center">
                <Label
                  htmlFor="name"
                  value="Hình thức"
                />
                <FaAsterisk
                  color="red"
                  fontSize="0.6rem"
                />
              </div>
            </div>

            <RadioGroup
              defaultValue={true}
              name="compulsory"
              value={compulsory}
              onChange={(e) => {
                setCompulsory(e.target.value === 'true')
              }}
            >
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="Bắt buộc"
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="Tự chọn"
              />
            </RadioGroup>
          </div>
          <div className="flex justify-end gap-6">
            <button
              onClick={handleResetForm}
              className="px-3 py-1 bg-slate-50 border border-primary_color text-primary_color rounded-md"
            >
              Hủy
            </button>
            <button
              className="px-3 py-1 bg-primary_color border border-primary_color text-white rounded-md"
              onClick={handleSubmit}
            >
              Lưu
            </button>
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </div>
  )
}
export default CourseToProgramForm
