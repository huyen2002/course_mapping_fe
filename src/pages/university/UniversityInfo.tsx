import { Avatar, Modal } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UniversityForm from '../../components/UniversityForm'
import { University } from '../../models/University'
import { UniversityService } from '../../service/UniversityService'

const UniversityInfo = () => {
  const [university, setUniversity] = useState<University>()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const { id } = useParams()
  const fetchData = async () => {
    try {
      const response = await UniversityService.getById(Number(id))
      setUniversity(response.data)
    } catch (e: any) {
      console.log(e)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-semibold">Thông tin tài khoản</h1>
      <div className="flex justify-end">
        <button
          onClick={() => setOpenModal(true)}
          className="text-white bg-primary_color hover:bg-primary_color_hover px-2 py-1 rounded-md"
        >
          Chỉnh sửa
        </button>
        <Modal
          show={openModal}
          onClose={() => setOpenModal(false)}
        >
          <Modal.Header>Chỉnh sửa thông tin cơ quan</Modal.Header>
          <Modal.Body>
            <UniversityForm university={university} />
          </Modal.Body>
        </Modal>
      </div>
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
      </div>
    </div>
  )
}

export default UniversityInfo
