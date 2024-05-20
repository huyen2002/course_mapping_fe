import { useFetchPagination } from '../../hooks/useFetchPagination'
import { MajorService } from '../../service/MajorService'
import ProgramEducationService from '../../service/ProgramEducationService'
import { UniversityService } from '../../service/UniversityService'
import { UserService } from '../../service/UserService'

const HomeAdmin = () => {
  const { total: userTotal } = useFetchPagination(UserService.search, {})
  const { total: universityTotal } = useFetchPagination(
    UniversityService.search,
    {}
  )
  const { total: majorTotal } = useFetchPagination(MajorService.search, {})
  const { total: programEducationTotal } = useFetchPagination(
    ProgramEducationService.search,
    {}
  )
  return (
    <div>
      {/* <UniversityChart /> */}
      <h1 className="text-2xl font-semibold">Thống kê</h1>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
          <div className="bg-orange-200 p-8 rounded-md shadow-md">
            <h2 className="text-lg font-semibold text-text_color">Tài khoản</h2>
            <p className="text-5xl font-semibold text-orange-500">
              {userTotal}
            </p>
          </div>
          <div className="bg-blue-200 p-8 rounded-md shadow-md">
            <h2 className="text-lg font-semibold">Trường đại học</h2>
            <p className="text-5xl font-semibold text-blue-500 ">
              {universityTotal}
            </p>
          </div>
          <div className="bg-green-200 p-8 rounded-md shadow-md">
            <h2 className="text-lg font-semibold">Ngành đào tạo</h2>
            <p className="text-5xl font-semibold text-green-500 ">
              {majorTotal}
            </p>
          </div>
          <div className="bg-yellow-100 p-8 rounded-md shadow-md">
            <h2 className="text-lg font-semibold">Chương trình đào tạo</h2>
            <p className="text-5xl font-semibold text-yellow-400 ">
              {programEducationTotal}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default HomeAdmin
