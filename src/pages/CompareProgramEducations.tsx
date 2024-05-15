import { Table } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingScreen from '../components/common/LoadingScreen'
import { ComparableProgramEducation } from '../models/ComparableProgramEducation'
import { ComparedCourses } from '../models/ComparedCourses'
import { LevelOfEducation, ProgramEducation } from '../models/ProgramEducation'
import ProgramEducationService from '../service/ProgramEducationService'

const CompareProgramEducations = () => {
  const { id_1, id_2 } = useParams()
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [firstProgram, setFirstProgram] = useState<ProgramEducation>()
  const [secondProgram, setSecondProgram] = useState<ProgramEducation>()
  const [comparablePrograms, setComparablePrograms] =
    useState<ComparableProgramEducation>()
  const [comparedCourses, setComparedCourses] = useState<ComparedCourses[]>([])

  const fetchData = async () => {
    try {
      if (!id_1 || !id_2) return
      setIsFetching(true)
      const firstProgramResponse = await ProgramEducationService.getById(
        parseInt(id_1)
      )
      setFirstProgram(firstProgramResponse.data)
      const secondProgramResponse = await ProgramEducationService.getById(
        parseInt(id_2)
      )
      setSecondProgram(secondProgramResponse.data)
      console.log('compareCourseLists', id_1, id_2)
      const comparedProgramsResponse =
        await ProgramEducationService.compareTwoPrograms(
          parseInt(id_1),
          parseInt(id_2)
        )
      console.log('comparedCoursesResponse', comparedProgramsResponse)
      setComparablePrograms(comparedProgramsResponse.data)
      setComparedCourses(comparedProgramsResponse.data.coursesMapping)
    } catch (e: any) {
      console.log('Error: ', e)
    } finally {
      setIsFetching(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id_1, id_2])

  return (
    <div>
      {isFetching ? (
        <LoadingScreen />
      ) : (
        <div className="mx-10">
          <div className="overflow-x-auto">
            <Table className="font-montserrat">
              <Table.Head className="text-primary_color font-extrabold text-sm">
                <Table.HeadCell></Table.HeadCell>
                <Table.HeadCell>
                  {firstProgram?.name} - ({firstProgram?.university.name})
                </Table.HeadCell>
                <Table.HeadCell>
                  {secondProgram?.name} - ({secondProgram?.university.name})
                </Table.HeadCell>
                <Table.HeadCell>
                  Độ tương đồng
                  <p className="text-primary_color">(0 - 100%)</p>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y text-text_color">
                <Table.Cell className="text-xl font-semibold my-2">
                  1. Thông tin chung
                </Table.Cell>

                <Table.Row className="bg-white">
                  <Table.Cell className="whitespace-nowrap font-semibold ">
                    Tên chương trình đào tạo
                  </Table.Cell>
                  <Table.Cell>{firstProgram?.name}</Table.Cell>
                  <Table.Cell>{secondProgram?.name}</Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white">
                  <Table.Cell className="whitespace-nowrap font-semibold ">
                    Mã ngành
                  </Table.Cell>
                  <Table.Cell>{firstProgram?.major.code}</Table.Cell>
                  <Table.Cell>{secondProgram?.major.code}</Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white">
                  <Table.Cell className="whitespace-nowrap font-semibold ">
                    Mã chương trình tuyển sinh
                  </Table.Cell>
                  <Table.Cell>{firstProgram?.code}</Table.Cell>
                  <Table.Cell>{secondProgram?.code}</Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white">
                  <Table.Cell className="whitespace-nowrap font-semibold ">
                    Mã trường
                  </Table.Cell>
                  <Table.Cell>{firstProgram?.university.code}</Table.Cell>
                  <Table.Cell>{secondProgram?.university.code}</Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white">
                  <Table.Cell className="whitespace-nowrap font-semibold ">
                    Danh hiệu tốt nghiệp
                  </Table.Cell>
                  <Table.Cell>
                    {LevelOfEducation[firstProgram?.levelOfEducation as any]}
                  </Table.Cell>
                  <Table.Cell>
                    {LevelOfEducation[secondProgram?.levelOfEducation as any]}
                  </Table.Cell>
                  <Table.Cell className="font-semibold text-center">
                    {firstProgram?.levelOfEducation ===
                    secondProgram?.levelOfEducation
                      ? '100%'
                      : '_'}
                  </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white">
                  <Table.Cell className="whitespace-nowrap font-semibold ">
                    Thời gian đào tạo
                  </Table.Cell>
                  <Table.Cell>{firstProgram?.durationYear} năm</Table.Cell>
                  <Table.Cell>{secondProgram?.durationYear} năm</Table.Cell>
                  <Table.Cell className="font-semibold text-center">
                    {firstProgram?.durationYear === secondProgram?.durationYear
                      ? '100%'
                      : '_'}
                  </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white">
                  <Table.Cell className="whitespace-nowrap font-semibold ">
                    Tổng số tín chỉ tích lũy
                  </Table.Cell>
                  <Table.Cell>{firstProgram?.numCredits} </Table.Cell>
                  <Table.Cell>{secondProgram?.numCredits} </Table.Cell>
                  <Table.Cell className="font-semibold text-center">
                    {firstProgram?.numCredits === secondProgram?.numCredits
                      ? '100%'
                      : '_'}
                  </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white">
                  <Table.Cell className="whitespace-nowrap font-semibold ">
                    Thời gian áp dụng
                  </Table.Cell>
                  <Table.Cell>
                    {firstProgram?.startYear} - {firstProgram?.endYear}
                  </Table.Cell>
                  <Table.Cell>
                    {secondProgram?.startYear} - {secondProgram?.endYear}
                  </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white">
                  <Table.Cell className="whitespace-nowrap font-semibold ">
                    Giới thiệu chung
                  </Table.Cell>
                  <Table.Cell>{firstProgram?.introduction}</Table.Cell>
                  <Table.Cell>{secondProgram?.introduction}</Table.Cell>
                  <Table.Cell className="font-semibold text-center">
                    {comparablePrograms?.introductionSimilarity &&
                    comparablePrograms.introductionSimilarity > 0
                      ? `${comparablePrograms?.introductionSimilarity}%`
                      : '-'}
                  </Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white">
                  <Table.Cell className="whitespace-nowrap font-semibold ">
                    Nội dung chương trình đào tạo
                  </Table.Cell>
                  <Table.Cell>
                    {!firstProgram?.outline ? (
                      <span>Chưa có thông tin</span>
                    ) : (
                      <span className="flex gap-4 items-center">
                        <a
                          href={firstProgram?.outline}
                          target="_blank"
                          className="text-primary_color hover:underline font-montserrat "
                        >
                          Xem chi tiết
                        </a>
                      </span>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {!secondProgram?.outline ? (
                      <span>Chưa có thông tin</span>
                    ) : (
                      <span className="flex gap-4 items-center">
                        <a
                          href={secondProgram?.outline}
                          target="_blank"
                          className="text-primary_color hover:underline font-montserrat "
                        >
                          Xem chi tiết
                        </a>
                      </span>
                    )}
                  </Table.Cell>
                  <Table.Cell className="font-semibold text-center">
                    {comparablePrograms?.outlineSimilarity &&
                    comparablePrograms.outlineSimilarity > 0
                      ? `${comparablePrograms?.outlineSimilarity}%`
                      : '-'}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="text-xl font-semibold pt-8 pb-2">
                    2. Danh sách học phần
                  </Table.Cell>
                </Table.Row>

                {comparedCourses.map((item, index) => (
                  <Table.Row
                    key={index}
                    className="bg-white"
                  >
                    <Table.Cell className="whitespace-nowrap text-center">
                      {index + 1}
                    </Table.Cell>
                    <Table.Cell
                      className={item?.firstCourse ? '' : 'text-center'}
                    >
                      {item?.firstCourse?.name || '_'}
                    </Table.Cell>
                    <Table.Cell
                      className={item?.secondCourse ? '' : 'text-center'}
                    >
                      {item?.secondCourse?.name || '_'}
                    </Table.Cell>

                    <Table.Cell className="font-semibold text-center">
                      {item.similarity > 0 ? `${item.similarity}%` : '_'}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      )}
    </div>
  )
}
export default CompareProgramEducations
