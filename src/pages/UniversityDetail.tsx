import { Avatar, Table } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingScreen from '../components/common/LoadingScreen'
import Pagination from '../components/common/Pagination'
import { useFetchPagination } from '../hooks/useFetchPagination'
import { University } from '../models/University'
import ProgramEducationService from '../service/ProgramEducationService'
import { UniversityService } from '../service/UniversityService'

const UniversityDetail = () => {
  const { id } = useParams()
  const [university, setUniversity] = useState<University>()
  const { data, changePage, isFetching, page, total } = useFetchPagination(
    null,
    ProgramEducationService.search,
    {
      universityId: id,
    },
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
  return (
    <div className="px-10">
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
            <span>{`${university?.address.detail}, ${university?.address.district}, ${university?.address.city}, ${university?.address.country}`}</span>
          ) : (
            <span>Chưa có thông tin</span>
          )}
        </div>
        {isFetching ? (
          <LoadingScreen />
        ) : (
          <div className="mt-8">
            <Table className="font-montserrat">
              <Table.Head className="text-primary_color font-extrabold text-sm">
                <Table.HeadCell>STT</Table.HeadCell>
                <Table.HeadCell>Tên chương trình đào tạo</Table.HeadCell>

                <Table.HeadCell>Mã tuyển sinh</Table.HeadCell>
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
        )}
      </div>
    </div>
  )
}
export default UniversityDetail
