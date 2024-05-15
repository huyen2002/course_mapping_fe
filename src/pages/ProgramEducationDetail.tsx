import { Drawer, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { useEffect, useState } from 'react'
import { FaAngleDoubleLeft } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { useParams } from 'react-router-dom'
import ProgramEducationInfo from '../components/ProgramEducationInfo'
import SimilarPrograms from '../components/SimilarPrograms'
import LoadingScreen from '../components/common/LoadingScreen'
import {
  FILTER_OTHER_OPERATOR,
  FilterParams,
  FilterType,
} from '../models/FilterParams'
import { ProgramEducation } from '../models/ProgramEducation'
import { SortType } from '../models/SortParam'
import ProgramEducationService from '../service/ProgramEducationService'

const ProgramEducationDetail = () => {
  const { id } = useParams()
  const [programEducation, setProgramEducation] =
    useState<ProgramEducation | null>(null)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [similarPrograms, setSimilarPrograms] = useState<any[]>([])
  const [sortType, setSortType] = useState<SortType>(SortType.SIMILARITY_DESC)
  const [filterParams, setFilterParams] = useState<FilterParams>({})
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const fetchData = async () => {
    const idValue: number = Number(id)
    try {
      setIsFetching(true)
      const response = await ProgramEducationService.getById(idValue)
      setProgramEducation(response.data)
      const similarProgramsResponse =
        await ProgramEducationService.getSimilarPrograms(
          idValue,
          {
            sortType: sortType as SortType,
          },
          filterParams
        )
      setSimilarPrograms(similarProgramsResponse.data)
      // console.log('similarProgramsResponse: ', similarProgramsResponse)
    } catch (e: any) {
      console.log('Error: ', e)
    } finally {
      setIsFetching(false)
    }
  }
  const handleOpenDrawer = () => {
    setIsOpen(true)
  }
  const [country, setCountry] = useState<string>(FilterType.ALL)
  const [language, setLanguage] = useState<string>(FilterType.ALL)
  const [major, setMajor] = useState<string>(FilterType.ALL)

  const handleFilterClick = (e: any) => {
    e.preventDefault()
    setFilterParams({
      country: country,
      language: language,
      major: major,
    })
    setIsOpen(false)
  }
  const updateSortType = (sortType: SortType) => {
    setSortType(sortType)
  }
  const resetFilter = () => {
    setCountry(FilterType.ALL)
    setLanguage(FilterType.ALL)
    setMajor(FilterType.ALL)
  }

  useEffect(() => {
    fetchData()
  }, [id, sortType, filterParams])

  useEffect(() => {
    if (!isOpen) {
      setCountry(filterParams.country || FilterType.ALL)
      setLanguage(filterParams.language || FilterType.ALL)
      setMajor(filterParams.major || FilterType.ALL)
    }
  }, [isOpen])

  return (
    <div>
      {isFetching ? (
        <LoadingScreen />
      ) : (
        <div className="lg:mx-10 flex gap-8 lg:flex-row flex-col">
          <div className="lg:w-3/4">
            <ProgramEducationInfo
              programEducation={programEducation as ProgramEducation}
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-primary_color">
              Chương trình đào tạo tương tự
            </h2>
            <div className="">
              <div className="flex justify-end mb-4">
                <button
                  className="bg-primary_color text-white flex items-center gap-2 px-2 py-1 rounded-md"
                  onClick={handleOpenDrawer}
                >
                  <FaAngleDoubleLeft />
                  Lọc
                </button>
              </div>

              <Drawer
                open={isOpen}
                onClose={() => setIsOpen(false)}
                anchor="right"
                PaperProps={{
                  sx: { width: '30%' },
                }}
              >
                <div className="px-6 pt-4 pb-6">
                  <button
                    className="absolute top-4 right-4"
                    onClick={() => setIsOpen(false)}
                  >
                    <IoClose size={25} />
                  </button>
                  <h2 className="font-semibold text-primary_color mt-8">
                    {`Bộ lọc tìm kiếm các chương trình tương tự với ${programEducation?.name} - (${programEducation?.university?.name})`}
                  </h2>
                  <div className="mt-2">
                    <h3 className=" font-semibold">Quốc gia</h3>
                    <RadioGroup
                      defaultValue={FilterType.ALL}
                      name="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      <FormControlLabel
                        value={FilterType.ALL}
                        control={<Radio />}
                        label="Tất cả"
                      />
                      <FormControlLabel
                        value="VN"
                        control={<Radio />}
                        label="Việt Nam"
                      />
                      <FormControlLabel
                        value={`${FILTER_OTHER_OPERATOR}VN`}
                        control={<Radio />}
                        label="Khác"
                      />
                    </RadioGroup>
                  </div>

                  <div className="flex flex-col mt-2">
                    <h3 className=" font-semibold">Ngôn ngữ</h3>
                    <RadioGroup
                      defaultValue={FilterType.ALL}
                      name="language"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <FormControlLabel
                        value={FilterType.ALL}
                        control={<Radio />}
                        label="Tất cả"
                      />
                      <FormControlLabel
                        value="VI"
                        control={<Radio />}
                        label="Tiếng Việt"
                      />
                      <FormControlLabel
                        value="EN"
                        control={<Radio />}
                        label="Tiếng Anh"
                      />
                    </RadioGroup>
                  </div>
                  <div className="flex flex-col mt-2">
                    <h3 className="font-semibold">Ngành học</h3>
                    <RadioGroup
                      defaultValue={FilterType.ALL}
                      name="major"
                      value={major}
                      onChange={(e) => setMajor(e.target.value)}
                    >
                      <FormControlLabel
                        value={FilterType.ALL}
                        control={<Radio />}
                        label="Tất cả"
                      />
                      <FormControlLabel
                        value={programEducation?.major.code}
                        control={<Radio />}
                        label={programEducation?.major.name}
                      />
                      <FormControlLabel
                        value={`${FILTER_OTHER_OPERATOR}${programEducation?.major.code}`}
                        control={<Radio />}
                        label="Khác ngành"
                      />
                    </RadioGroup>
                  </div>
                  <div className="flex gap-4 justify-end">
                    <button
                      className="bg-white border border-primary_color text-primary_color_hover px-2 py-2 text-sm rounded-md mt-6 float-right"
                      onClick={resetFilter}
                    >
                      Xóa bộ lọc
                    </button>
                    <button
                      className="bg-primary_color hover:bg-primary_color_hover text-white px-2 py-2 text-sm rounded-md mt-6 float-right"
                      onClick={handleFilterClick}
                    >
                      Tìm kiếm
                    </button>
                  </div>
                </div>
              </Drawer>
            </div>

            <SimilarPrograms
              programEducation={programEducation}
              similarPrograms={similarPrograms}
              sortType={sortType}
              setSortType={updateSortType}
            />
          </div>
        </div>
      )}
    </div>
  )
}
export default ProgramEducationDetail
