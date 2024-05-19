import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LoadingScreen from '../components/common/LoadingScreen'
import Pagination from '../components/common/Pagination'
import { useFetchPagination } from '../hooks/useFetchPagination'
import { FILTER_OTHER_OPERATOR, FilterType } from '../models/FilterParams'
import { SearchUniversityParams } from '../models/SearchUniversityParams'
import { UniversityService } from '../service/UniversityService'
import { AddressRender } from '../utils/ObjectRender'

const Universities = () => {
  const [nameParam, setNameParam] = useState<string>('')
  const [country, setCountry] = useState<string>(FilterType.ALL)
  const [searchParams, setSearchParams] = useState<SearchUniversityParams>({})

  const { data, isFetching, total, page, changePage, fetchData } =
    useFetchPagination(UniversityService.search, searchParams)
  const handleSearch = () => {
    console.log('name', nameParam)
    console.log('country', country)

    console.log('search params', searchParams)
    changePage(1)
    fetchData()
  }
  useEffect(() => {
    setSearchParams({
      name: nameParam.trim() !== '' ? (nameParam.trim() as string) : null,
      country: country,
    })
  }, [nameParam, country])
  return (
    <main className="flex gap-10 h-full lg:flex-row flex-col overflow-auto no-scrollbar lg:overflow-hidden">
      <div>
        <h1 className="font-semibold text-primary_color">Tìm kiếm</h1>
        <form className="flex flex-col gap-4 mt-4">
          <div>
            <label
              htmlFor="name"
              className="font-montserrat"
            >
              Tên trường đại học
            </label>
            <br />
            <input
              id="name"
              value={nameParam}
              onChange={(e) => setNameParam(e.target.value)}
              className="p-2 outline-none border-[1px] border-gray-300 rounded-md px-2 py-1 w-80 focus:border-primary_color "
            />
          </div>
          <div>
            <h3 className="">Quốc gia</h3>
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
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSearch}
              className="bg-primary_color hover:bg-primary_color_hover text-white rounded-md px-2 py-1"
            >
              Tìm kiếm
            </button>
          </div>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-2xl ml-4 text-primary_color font-bold">
          Trường đại học
        </h1>
        <div className="h-full lg:h-[500px]">
          {!isFetching ? (
            <div className="relative flex flex-col h-full gap-8 mt-4 pb-8 overflow-auto lg:overflow-y-scroll lg:h-[500px] no-scrollbar">
              <div className="flex flex-col gap-4">
                {data.map((university) => {
                  return (
                    <div
                      key={university.id}
                      className="shadow-md rounded-md p-4 flex flex-col gap-2"
                    >
                      <div className="">
                        <Link
                          to={`/university/${university.id}`}
                          className="font-montserrat text-lg font-semibold text-text_color"
                        >
                          <span>{university.name} </span>
                        </Link>
                      </div>
                      <div>
                        <span>Mã trường: </span>
                        <span>{university.code}</span>
                      </div>
                      <div>
                        <span className="">Địa chỉ: </span>
                        {university?.address ? (
                          <span>{AddressRender(university.address)}</span>
                        ) : (
                          <span>Chưa có thông tin</span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div>
                <Pagination
                  total={total}
                  currentPage={page}
                  changePage={changePage}
                />
              </div>
            </div>
          ) : (
            <LoadingScreen />
          )}
        </div>
      </div>
    </main>
  )
}
export default Universities
