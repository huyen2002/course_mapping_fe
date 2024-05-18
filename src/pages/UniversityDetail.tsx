import { Avatar, Table } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import LoadingScreen from '../components/common/LoadingScreen'
import Pagination from '../components/common/Pagination'
import { useFetchPagination } from '../hooks/useFetchPagination'
import { SearchProgramParams } from '../models/SearchProgramParams'
import { University } from '../models/University'
import ProgramEducationService from '../service/ProgramEducationService'
import { UniversityService } from '../service/UniversityService'
import { AuthUtils } from '../utils/AuthUtils'
import { AddressRender } from '../utils/ObjectRender'

const UniversityDetail = () => {
  const { id } = useParams()
  const [university, setUniversity] = useState<University>()
  const [searchParams, setSearchParams] = useState<SearchProgramParams>({
    universityId: Number(id),
  })
  const { data, changePage, isFetching, page, total } = useFetchPagination(
    ProgramEducationService.search,
    searchParams,
    10
  )

  const fetchUniversity = async () => {
    try {
      const universityResponse = await UniversityService.getById(Number(id))
      setUniversity(universityResponse.data)
    } catch (e: any) {
      console.log(e)
    }
  }
  useEffect(() => {
    fetchUniversity()
  }, [])

  useEffect(() => {
    if (!university?.enabled) {
      setSearchParams({
        universityId: Number(id),
        enabled: false,
      })
    }
  }, [university])

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-8">
          <Avatar
            size="xl"
            className="block"
            rounded
          />
          <h1 className="text-primary_color font-semibold text-xl">
            {university?.name}
          </h1>
        </div>
        <div>
          <span className="font-semibold mr-2">Mã tuyển sinh:</span>
          <span>{university?.code}</span>
        </div>
        <div>
          <span className="font-semibold mr-2">Giới thiệu:</span>
          <span>{university?.introduction || 'Chưa có thông tin'}</span>
        </div>
        <div>
          <span className="font-semibold mr-2">Địa chỉ: </span>
          {university?.address ? (
            <span>{AddressRender(university.address)}</span>
          ) : (
            <span>Chưa có thông tin</span>
          )}
        </div>
        <div>
          {AuthUtils.isAdmin() && (
            <Link
              to={`/admin/university/${id}/courses`}
              className="text-primary_color hover:text-primary_color_hover underline font-montserrat text-lg"
            >
              Danh sách môn học
            </Link>
          )}
        </div>
        {isFetching ? (
          <LoadingScreen />
        ) : (
          <div>
            <div className="mt-8">
              <Table className="font-montserrat">
                <Table.Head className="text-primary_color font-extrabold text-sm">
                  <Table.HeadCell>STT</Table.HeadCell>
                  <Table.HeadCell>Tên chương trình đào tạo</Table.HeadCell>

                  <Table.HeadCell>Mã tuyển sinh</Table.HeadCell>
                  <Table.HeadCell>Ngành đào tạo</Table.HeadCell>

                  <Table.HeadCell>Ngôn ngữ</Table.HeadCell>
                  <Table.HeadCell>Nội dung</Table.HeadCell>
                  <Table.HeadCell>Trạng thái</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  {data.map((program, index) => (
                    <Table.Row key={program.id}>
                      <Table.Cell>{index + 1 + (page - 1) * 10}</Table.Cell>
                      <Table.Cell>{program.name}</Table.Cell>

                      <Table.Cell>{program.code}</Table.Cell>
                      <Table.Cell>{program.major.name}</Table.Cell>

                      <Table.Cell>
                        {program.language === 'VI' ? 'Tiếng Việt' : 'Tiếng Anh'}
                      </Table.Cell>
                      <Table.Cell>
                        {program.outline ? (
                          <a
                            href={program.outline}
                            target="_blank"
                            className="text-primary_color hover:text-primary_color_hover underline font-montserrat "
                          >
                            Xem chi tiết
                          </a>
                        ) : (
                          'Chưa có thông tin'
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        <span
                          className={
                            !program.endYear ||
                            program.endYear > new Date().getFullYear()
                              ? 'text-primary_color'
                              : 'text-red-500'
                          }
                        >
                          {!program.endYear ||
                          program.endYear > new Date().getFullYear()
                            ? 'Hoạt động'
                            : 'Đã đóng'}
                        </span>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              <div className="mt-8">
                <Pagination
                  total={total}
                  currentPage={page}
                  size={10}
                  changePage={changePage}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default UniversityDetail
