import { useForm } from 'react-hook-form'
import MajorDetail from '../components/MajorDetail'
import LoadingScreen from '../components/common/LoadingScreen'
import Pagination from '../components/common/Pagination'
import { useFetchPagination } from '../hooks/useFetchPagination'
import { defaultParams } from '../models/QueryParams'
import { MajorService, SearchMajorParams } from '../service/MajorService'

const Home = () => {
  const { data, page, total, isFetching, changePage } = useFetchPagination(
    MajorService.getAll
  )
  // console.log(data, page, total)
  const { register, handleSubmit, reset } = useForm<SearchMajorParams>()

  const onSubmit = async (data: SearchMajorParams) => {
    console.log('data', data)
    try {
      const response = await MajorService.search({ page: 0, size: 5 }, data)
      console.log('response', response)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <main className="flex gap-10 h-full">
      <div>
        <h1 className="font-semibold text-primary_color">Tìm kiếm</h1>
        <form className="flex flex-col gap-8 mt-4">
          <div>
            <label
              htmlFor="major_name"
              className="font-montserrat"
            >
              Tên ngành đào tạo
            </label>
            <br />
            <input
              type="text"
              id="major_name"
              {...register('name')}
              className="outline-none border-[1px] border-gray-300 rounded-md px-2 py-1 w-80 focus:border-primary_color "
            />
          </div>
          <div>
            <label
              htmlFor="major_name"
              className="font-montserrat"
            >
              Mã ngành đào tạo
            </label>
            <br />
            <input
              type="text"
              id="major_name"
              {...register('code')}
              className="p-2 outline-none border-[1px] border-gray-300 rounded-md px-2 py-1 w-80 focus:border-primary_color "
            />
          </div>
          <div className="text-sm flex justify-between">
            <button
              onClick={() => reset()}
              className=" text-primary_color border-button rounded-md px-2 py-1 hover:bg-white_hover"
            >
              Đặt lại
            </button>
            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="bg-primary_color text-white rounded-md px-2 py-1 hover:bg-primary_color_hover"
            >
              Tìm kiếm
            </button>
          </div>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-2xl text-primary_color ml-4 font-bold">
          Ngành đào tạo
        </h1>
        <div className=" h-[500px]">
          {!isFetching ? (
            <div className="relative flex flex-col gap-8 mt-4 pb-8 overflow-y-scroll h-[500px] no-scrollbar">
              <div>
                {data.map((major) => {
                  return (
                    <MajorDetail
                      major={major}
                      key={major.id}
                    />
                  )
                })}
              </div>
              <div>
                <Pagination
                  total={total}
                  currentPage={page}
                  size={defaultParams.size}
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
export default Home
