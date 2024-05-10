import { Modal, Spinner, Table, Tooltip } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { FaEye, FaRegTrashAlt } from 'react-icons/fa'
import { LiaTrashRestoreAltSolid } from 'react-icons/lia'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useFetchPagination } from '../../hooks/useFetchPagination'
import { ProgramEducation } from '../../models/ProgramEducation'
import { SearchProgramParams } from '../../models/SearchProgramParams'
import ProgramEducationService from '../../service/ProgramEducationService'
import LoadingScreen from '../common/LoadingScreen'
import Pagination from '../common/Pagination'
import SearchInput from '../university/SearchInput'

const ProgramStorage = ({ universityId }: { universityId?: number }) => {
  const [searchName, setSearchName] = useState<string | null>(null)
  const [searchParams, setSearchParams] = useState<SearchProgramParams>({
    enabled: false,
  })
  const { data, total, page, changePage, isFetching, fetchData } =
    useFetchPagination(ProgramEducationService.search, searchParams, 10)

  useEffect(() => {
    setSearchParams({
      name: searchName,
      universityId: universityId || null,
      enabled: false,
    })
  }, [searchName])

  useEffect(() => {
    changePage(1)
  }, [searchParams])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [selectedProgram, setSelectedProgram] = useState<ProgramEducation>()

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const navigate = useNavigate()
  const handleOpenDeleteModal = (program: ProgramEducation) => {
    setSelectedProgram(program)
    setOpenDeleteModal(true)
  }
  const handleDeleteProgram = async () => {
    try {
      setIsLoading(true)
      await ProgramEducationService.delete(selectedProgram?.id as number)
      toast.success('Xóa chương trình đào tạo thành công')
    } catch (e) {
      console.log(e)
      toast.error('Xóa chương trình đào tạo không thành công')
    } finally {
      setIsLoading(false)
      setOpenDeleteModal(false)
    }
  }
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
              <Table.HeadCell>ID</Table.HeadCell>
              <Table.HeadCell>Tên chương trình đào tạo</Table.HeadCell>
              <Table.HeadCell>Mã chương trình đào tạo</Table.HeadCell>
              <Table.HeadCell>Ngành đào tạo</Table.HeadCell>
              <Table.HeadCell>Trường đào tạo</Table.HeadCell>
              <Table.HeadCell></Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {data.map((program, index) => (
                <Table.Row key={program.id}>
                  <Table.Cell>{index + 1 + (page - 1) * 10}</Table.Cell>
                  <Table.Cell>{program.id}</Table.Cell>

                  <Table.Cell>{program.name}</Table.Cell>
                  <Table.Cell>{program.code}</Table.Cell>
                  <Table.Cell>{program.major.name}</Table.Cell>
                  <Table.Cell>{program.university.name}</Table.Cell>

                  <Table.Cell>
                    <div className="flex gap-4 items-center">
                      <Tooltip content="Xem chi tiết">
                        <button
                          className="text-primary_color"
                          onClick={() =>
                            navigate(`/program_education/${program.id}`)
                          }
                        >
                          <FaEye size="18" />
                        </button>
                      </Tooltip>
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
                            color="orange"
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
                      <Tooltip
                        placement="top"
                        content="Xóa"
                      >
                        <button
                          onClick={() => handleOpenDeleteModal(program)}
                          className="text-red-500"
                        >
                          <FaRegTrashAlt size="20" />
                        </button>
                      </Tooltip>
                      <Modal
                        show={
                          openDeleteModal && selectedProgram?.id === program.id
                        }
                        onClose={() => setOpenDeleteModal(false)}
                      >
                        <Modal.Header>Xác nhận</Modal.Header>
                        <Modal.Body>
                          <p>
                            Bạn có chắc chắn muốn xóa vĩnh viên trường{' '}
                            <span className="text-primary_color">
                              {program.name}
                            </span>{' '}
                            và tất cả các thông tin liên quan không?
                          </p>
                          <div className="flex gap-6 justify-end mt-8">
                            <button
                              onClick={() => {
                                setOpenDeleteModal(false)
                              }}
                              className="bg-slate-50 hover:bg-slate-100 py-1 px-3 rounded-md border border-primary_color text-primary_color"
                            >
                              Hủy
                            </button>
                            <button
                              onClick={handleDeleteProgram}
                              className="bg-red-500 hover:bg-red-600 py-1 px-3 rounded-md text-white flex gap-[6px] items-center"
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

export default ProgramStorage
