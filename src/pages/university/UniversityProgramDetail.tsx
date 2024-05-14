import { Modal } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import ProgramEducationInfo from '../../components/ProgramEducationInfo'
import LoadingScreen from '../../components/common/LoadingScreen'
import { ProgramEducation } from '../../models/ProgramEducation'
import ProgramEducationService from '../../service/ProgramEducationService'

const UniversityProgramDetail = () => {
  const { id } = useParams()
  const [programEducation, setProgramEducation] =
    useState<ProgramEducation | null>(null)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState<boolean>(false)

  const fetchData = async () => {
    const idValue: number = Number(id)
    try {
      setIsLoading(true)
      const response = await ProgramEducationService.getById(idValue)
      setProgramEducation(response.data)
    } catch (e: any) {
      console.log('Error: ', e)
    } finally {
      setIsLoading(false)
    }
  }
  const handleControlProgram = async () => {
    console.log('id', id)
    try {
      setIsLoading(true)
      if (!programEducation?.enabled) {
        await ProgramEducationService.delete(Number(id))
        toast.success('Xóa chương trình đào tạo thành công')
        navigate(
          `/university/${programEducation?.university.id}/program_educations`
        )
      } else {
        await ProgramEducationService.updateEnabled(Number(id), {
          enabled: false,
        })
        toast.success('Ẩn thông tin chương trình đào tạo thành công')
        navigate(`/university/${programEducation?.university.id}/storage`)
      }
    } catch (e: any) {
      console.log('Error: ', e)
      if (!programEducation?.enabled) {
        toast.error('Xóa chương trình đào tạo thất bại')
      } else {
        toast.error('Ẩn thông tin chương trình đào tạo thất bại')
      }
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [id])
  return (
    <div>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="">
          <ProgramEducationInfo
            programEducation={programEducation as ProgramEducation}
            isShowUniversityAction
          >
            <div>
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() =>
                    navigate(`/university/program_education/${id}/edit`)
                  }
                  className="px-2 py-1 bg-primary_color hover:bg-primary_color_hover text-white rounded-md"
                >
                  Chỉnh sửa
                </button>

                <button
                  onClick={() => setOpenModal(true)}
                  className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
                >
                  {!programEducation?.enabled ? 'Xóa' : 'Ẩn thông tin'}
                </button>

                <Modal
                  show={openModal}
                  onClose={() => setOpenModal(false)}
                >
                  <Modal.Header>Cảnh báo</Modal.Header>
                  <Modal.Body>
                    <h1>{`Bạn có chắc chắn muốn ${
                      !programEducation?.enabled
                        ? 'xóa'
                        : 'ẩn thông tin và chuyển vào kho lưu trữ'
                    } chương trình đào tạo này?`}</h1>
                    <div className="mt-6 flex gap-6 justify-end">
                      <button
                        className="px-2 py-1 border border-primary_color bg-slate-50 hover:bg-gray-100 text-primary_color rounded-md"
                        onClick={() => setOpenModal(false)}
                      >
                        Hủy
                      </button>
                      <button
                        onClick={handleControlProgram}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
                      >
                        Đồng ý
                      </button>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
              <h2 className="text-lg font-semibold text-primary_color">
                1. Thông tin
              </h2>
            </div>
          </ProgramEducationInfo>
        </div>
      )}
    </div>
  )
}
export default UniversityProgramDetail
