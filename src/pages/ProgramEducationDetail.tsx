import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProgramEducationItem from '../components/ProgramEducationItem'
import LoadingScreen from '../components/common/LoadingScreen'
import { LevelOfEducation, ProgramEducation } from '../models/ProgramEducation'
import ProgramEducationService from '../service/ProgramEducationService'

const ProgramEducationDetail = () => {
  const { id } = useParams()
  const [programEducation, setProgramEducation] =
    useState<ProgramEducation | null>(null)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [similarPrograms, setSimilarPrograms] = useState<ProgramEducation[]>([])

  const fetchData = async () => {
    const idValue: number = Number(id)
    try {
      setIsFetching(true)
      const response = await ProgramEducationService.getById(idValue)
      setProgramEducation(response.data)
      console.log(programEducation?.sourceLinks)
      const similarProgramsResponse =
        await ProgramEducationService.getSimilarPrograms(idValue)
      setSimilarPrograms(similarProgramsResponse.data)
      console.log('similarProgramsResponse: ', similarProgramsResponse)
    } catch (e: any) {
      console.log('Error: ', e)
    } finally {
      setIsFetching(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [id])
  return (
    <div>
      {isFetching ? (
        <LoadingScreen />
      ) : (
        <div className="lg:mx-10 flex gap-8 lg:flex-row flex-col">
          <div className="lg:w-3/4">
            <h1 className="text-2xl font-bold text-primary_color">
              {programEducation?.name} - ({programEducation?.university.name})
            </h1>
            <div className="mt-8 flex flex-col gap-2">
              <div>
                <span className="font-semibold mr-2">Tên ngành đào tạo:</span>
                <span>{programEducation?.major.name}</span>
              </div>
              <div>
                <span className="font-semibold mr-2">Trường:</span>
                <span>{programEducation?.university.name}</span>
              </div>
              <div>
                <span className="font-semibold mr-2">Mã trường:</span>
                <span>{programEducation?.university.code}</span>
              </div>
              <div>
                <span className="font-semibold mr-2">Mã ngành đào tạo:</span>
                <span>{programEducation?.major.code}</span>
              </div>
              <div>
                <span className="font-semibold mr-2">Mã tuyển sinh:</span>
                <span>{programEducation?.code}</span>
              </div>

              <div>
                <span className="font-semibold mr-2">
                  Danh hiệu tốt nghiệp:
                </span>
                <span>
                  {LevelOfEducation[programEducation?.levelOfEducation as any]}
                </span>
              </div>
              <div>
                <span className="font-semibold mr-2">Thời gian đào tạo:</span>
                <span>{programEducation?.durationYear} năm</span>
              </div>
              <div>
                <span className="font-semibold mr-2">Số tín chỉ:</span>
                <span>{programEducation?.numCredits}</span>
              </div>
              <div>
                <span className="font-semibold mr-2">Thời gian hoạt động:</span>
                <span>
                  {programEducation?.startYear && programEducation?.endYear
                    ? `${programEducation?.startYear} - ${programEducation?.endYear}`
                    : 'Chưa có thông tin'}
                </span>
              </div>
              <div>
                <span className="font-semibold mr-2">
                  Giới thiệu chung về chương trình đào tạo:
                </span>
                <span>
                  {programEducation?.introduction || 'Chưa có thông tin'}
                </span>
              </div>
              <div>
                <h1 className="font-semibold mr-2">Nguồn thông tin:</h1>
                <div className="flex flex-col gap-2 mt-2">
                  {!programEducation?.sourceLinks ||
                  programEducation?.sourceLinks.length === 0 ? (
                    <span>Chưa có thông tin</span>
                  ) : (
                    programEducation?.sourceLinks?.map((item, index) => (
                      <div key={index}>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary_color hover:underline font-montserrat"
                        >
                          {item.name}
                        </a>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="">
            {similarPrograms.length > 0 && (
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold text-primary_color lg:pl-4">
                  Chương trình đào tạo tương tự
                </h2>
                {similarPrograms.map((item, index) => (
                  <ProgramEducationItem
                    key={index}
                    programEducation={item}
                    comparedProgramEducationId={programEducation?.id}
                    hideInfo
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
export default ProgramEducationDetail
