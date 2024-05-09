import { Modal, Spinner, Table, Tooltip } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { LiaTrashRestoreAltSolid } from 'react-icons/lia'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import LoadingScreen from '../../components/common/LoadingScreen'
import Pagination from '../../components/common/Pagination'
import SearchInput from '../../components/university/SearchInput'
import { useFetchPagination } from '../../hooks/useFetchPagination'
import { ProgramEducation } from '../../models/ProgramEducation'
import { SearchProgramParams } from '../../models/SearchProgramParams'
import ProgramEducationService from '../../service/ProgramEducationService'

const UniversityStorage = () => {
  const [searchName, setSearchName] = useState<string | null>(null)
  const [searchParams, setSearchParams] = useState<SearchProgramParams>({
    enabled: false,
  })
  const { data, total, page, changePage, isFetching, fetchData } =
    useFetchPagination(ProgramEducationService.search, searchParams)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [selectedProgram, setSelectedProgram] = useState<ProgramEducation>()
  const navigate = useNavigate()

  const { id } = useParams()

  useEffect(() => {
    setSearchParams({
      name: searchName,
      universityId: parseInt(id as string),
      enabled: false,
    })
  }, [searchName])

  useEffect(() => {
    changePage(1)
    fetchData()
  }, [searchParams])

  const handleOpenModal = (program: ProgramEducation) => {
    setSelectedProgram(program)
    setOpenModal(true)
  }

  const handleRestoreProgram = async () => {
    try {
      setIsLoading(true)
      await ProgramEducationService.updateEnabled(
        selectedProgram?.id as number,
        {
          enabled: true,
        }
      )
      toast.success('Khôi phục chương trình thành công')
    } catch (e) {
      console.log(e)
      toast.error('Khôi phục chương trình không thành công')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-8">Chương trình đào tạo</h1>

      <SearchInput
        setSearchName={setSearchName}
        placeholder="Tên chương trình đào tạo"
      />
      {isFetching ? (
        <LoadingScreen />
      ) : (
        <div className="mt-8">
          <Table className="font-montserrat">
            <Table.Head className="text-primary_color font-extrabold text-sm">
              <Table.HeadCell>STT</Table.HeadCell>
              <Table.HeadCell>Tên chương trình đào tạo</Table.HeadCell>
              <Table.HeadCell>Mã chương trình đào tạo</Table.HeadCell>
              <Table.HeadCell>Ngôn ngữ</Table.HeadCell>
              <Table.HeadCell>Nội dung</Table.HeadCell>
              <Table.HeadCell></Table.HeadCell>
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
                    <div className="flex gap-4">
                      <Tooltip
                        placement="top"
                        content="Chỉnh sửa"
                      >
                        <button
                          onClick={() =>
                            navigate(
                              `/university/program_education/${program.id}/edit`
                            )
                          }
                        >
                          <CiEdit
                            size={25}
                            color="#3D8BCC"
                          />
                        </button>
                      </Tooltip>

                      <Tooltip
                        placement="top"
                        content="Khôi phục"
                      >
                        <button onClick={() => handleOpenModal(program)}>
                          <LiaTrashRestoreAltSolid size={25} />
                        </button>
                      </Tooltip>
                      <Modal
                        show={openModal && selectedProgram?.id === program.id}
                        onClose={() => setOpenModal(false)}
                      >
                        <Modal.Header>Xác nhận</Modal.Header>
                        <Modal.Body>
                          <p>
                            Bạn có chắc chắn muốn khôi phục chương trình{' '}
                            <span className="text-primary_color">
                              {program.name}
                            </span>{' '}
                            không?
                          </p>
                          <div className="flex gap-6 justify-end mt-8">
                            <button
                              onClick={() => {
                                setOpenModal(false)
                              }}
                              className="bg-slate-50 hover:bg-slate-100 py-1 px-3 rounded-md border border-primary_color text-primary_color"
                            >
                              Hủy
                            </button>
                            <button
                              onClick={handleRestoreProgram}
                              className="bg-primary_color hover:bg-primary_color_hover py-1 px-3 rounded-md text-white flex gap-[6px] items-center"
                            >
                              {isLoading && <Spinner size="sm" />}
                              Đồng ý
                            </button>
                          </div>
                        </Modal.Body>
                      </Modal>
                    </div>
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
  )
}
export default UniversityStorage
