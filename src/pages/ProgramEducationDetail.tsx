import { getDownloadURL, ref } from 'firebase/storage'
import { Select } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProgramEducationItem from '../components/ProgramEducationItem'
import LoadingScreen from '../components/common/LoadingScreen'
import { storage } from '../config/firebase'
import { FilterType } from '../models/FilterParam'
import { LevelOfEducation, ProgramEducation } from '../models/ProgramEducation'
import ProgramEducationService from '../service/ProgramEducationService'

const ProgramEducationDetail = () => {
  const { id } = useParams()
  const [programEducation, setProgramEducation] =
    useState<ProgramEducation | null>(null)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [similarPrograms, setSimilarPrograms] = useState<any[]>([])
  const [filterType, setFilterType] = useState<FilterType>(
    FilterType.SIMILARITY_DESC
  )

  const fetchData = async () => {
    const idValue: number = Number(id)
    try {
      setIsFetching(true)
      const response = await ProgramEducationService.getById(idValue)
      setProgramEducation(response.data)
      console.log(programEducation?.sourceLinks)
      const similarProgramsResponse =
        await ProgramEducationService.getSimilarPrograms(idValue, {
          filterType: filterType,
        })
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
  }, [id, filterType])

  const handleDownloadFile = async (url) => {
    getDownloadURL(ref(storage, url))
      .then((url) => {
        const xhr = new XMLHttpRequest()
        xhr.responseType = 'blob'
        xhr.onload = (event) => {
          const blob = xhr.response
        }
        xhr.open('GET', url)
        xhr.send()
      })
      .catch((error) => {
        console.log(error)
      })
  }
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
                <span className="font-semibold mr-2">
                  {' '}
                  Nội dung chương trình đào tạo:
                </span>
                <button
                  onClick={() => handleDownloadFile(programEducation?.outline)}
                  className="text-primary_color hover:underline font-montserrat"
                >
                  {`${programEducation?.language}_${programEducation?.university.code}_${programEducation?.code}`}
                </button>
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
                <h2 className="text-xl font-bold text-primary_color">
                  Chương trình đào tạo tương tự
                </h2>
                <div className=" flex items-center gap-4 ">
                  <span>Sắp xếp theo:</span>
                  <Select
                    id="filter"
                    value={filterType}
                    onChange={(e) =>
                      setFilterType(e.target.value as FilterType)
                    }
                    className="flex-1"
                  >
                    <option value={FilterType.SIMILARITY_DESC}>
                      Độ tương tự giảm dần
                    </option>
                    <option value={FilterType.SIMILARITY_ASC}>
                      Độ tương tự tăng dần
                    </option>

                    <option value={FilterType.ALPHABET_ASC}>Từ A đến Z</option>
                    <option value={FilterType.ALPHABET_DESC}>Từ Z đến A</option>
                  </Select>
                </div>

                {similarPrograms.map((item, index) => (
                  <div>
                    <ProgramEducationItem
                      key={index}
                      programEducation={item.program}
                      comparedProgramEducationId={programEducation?.id}
                      hideInfo
                    />
                    <span>{item.similarity}</span>
                  </div>
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
