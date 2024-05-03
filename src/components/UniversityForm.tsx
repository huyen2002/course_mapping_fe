import { Label, Spinner, TextInput, Textarea, Tooltip } from 'flowbite-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CiEdit } from 'react-icons/ci'
import { FaAsterisk } from 'react-icons/fa6'
import { toast } from 'react-toastify'
import { Address } from '../models/Address'
import { University } from '../models/University'
import { UniversityService } from '../service/UniversityService'
import { ObjectUtils } from '../utils/ObjectUtils'
import AddressSelection from './AddressSelection'

const UniversityForm = ({ university }: { university?: University }) => {
  const { register, handleSubmit, reset } = useForm<University>({
    defaultValues: university,
  })
  const [address, setAddress] = useState<Address | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [openAddressEdit, setOpenAddressEdit] = useState<boolean>(false)

  const [detailAddress, setDetailAddress] = useState<string>('')
  const handleReset = () => {
    setOpenAddressEdit(false)
    setAddress(null)
    reset()
    setDetailAddress('')
  }
  const onSubmit = async (data: University) => {
    console.log('data', data)
    if (!data.name || !data.code) {
      toast.error('Vui lòng nhập đủ thông tin bắt buộc')
      return
    }
    let addressObj = {
      country: address?.country,
      city: address?.city,
      district: address?.district,
      detail: detailAddress.trim() !== '' ? detailAddress.trim() : undefined,
    } as Address
    console.log('addressObj', addressObj)
    if (university) {
      if (ObjectUtils.isAllUndefined(addressObj)) {
        addressObj = { ...university?.address }
      } else if (!ObjectUtils.isAllNotEmpty(addressObj)) {
        toast.error('Vui lòng nhập đủ thông tin địa chỉ mới')
        return
      }

      try {
        const newObj = {
          ...data,
          address: addressObj,
        }
        setIsLoading(true)
        if (university) {
          const changeObj = ObjectUtils.getUpdatedObject(newObj, university)
          console.log('new', newObj)
          console.log('old', university)
          console.log('change', changeObj)
          if (Object.keys(changeObj).length === 0) {
            toast.error('Không có thông tin cần cập nhật')
            return
          }

          const response = await UniversityService.updateById(
            university?.id,
            changeObj
          )
          console.log(response)
          toast.success('Cập nhật thông tin thành công')
        }
      } catch (e) {
        console.log(e)
        toast.error('Cập nhật thông tin thất bại')
      } finally {
        setIsLoading(false)
      }
    } else {
      if (!ObjectUtils.isAllNotEmpty(addressObj)) {
        toast.error('Vui lòng nhập đủ thông tin địa chỉ mới')
        return
      } else {
        try {
          console.log('create data', {
            ...data,
            address: addressObj,
          })
          setIsLoading(true)
          const response = await UniversityService.create({
            ...data,
            address: addressObj,
          })
        } catch (e) {
          console.log(e)
        } finally {
          setIsLoading(false)
        }
      }
    }
  }

  return (
    <div>
      <form className="flex flex-col gap-4">
        <div className="">
          <div className="mb-2 block">
            <div className="flex gap-2 items-center">
              <Label
                htmlFor="name"
                value="Tên cơ quan"
              />
              <FaAsterisk
                color="red"
                fontSize="0.6rem"
              />
            </div>
          </div>

          <TextInput
            id="name"
            {...register('name', {
              required: true,
            })}
          />
        </div>
        <div className="">
          <div className="mb-2">
            <div className="flex gap-2 items-center">
              <Label
                htmlFor="code"
                value="Mã trường"
              />
              <FaAsterisk
                color="red"
                fontSize="0.6rem"
              />
            </div>
            <TextInput
              id="code"
              {...register('code', {
                required: true,
              })}
            />
          </div>
        </div>
        <div>
          <div className="mb-2 block">
            <div className="flex gap-2 items-center">
              <Label
                htmlFor="code"
                value="Địa chỉ"
              />
              <FaAsterisk
                color="red"
                fontSize="0.6rem"
              />
            </div>
            {university?.address && (
              <div className="my-2 flex gap-4">
                <p>
                  <span className="text-primary_color">
                    Địa chỉ hiện tại: {''}
                  </span>
                  <span>
                    {`${university.address?.detail}, ${university.address?.district}, ${university.address?.city},
                    ${university.address?.country}`}
                  </span>
                </p>
                <Tooltip content="Chỉnh sửa">
                  <button
                    type="button"
                    onClick={() => setOpenAddressEdit(true)}
                  >
                    <CiEdit
                      size={25}
                      color="#3D8BCC"
                    />
                  </button>
                </Tooltip>
              </div>
            )}
            {openAddressEdit ||
              (!university && (
                <div>
                  <AddressSelection setAddress={setAddress} />
                  <TextInput
                    id="detailAddress"
                    value={detailAddress}
                    onChange={(e) => setDetailAddress(e.target.value)}
                    className="mt-4"
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="">
          <div className="mb-2 block">
            <div className="flex gap-2 items-center">
              <Label
                htmlFor="introduction"
                value="Giới thiệu"
              />
            </div>
            <Textarea
              id="introduction"
              {...register('introduction')}
              className="h-32"
            />
          </div>
        </div>
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={handleReset}
            className="border border-primary_color px-2 py-1 hover:bg-slate-50 text-primary_color rounded-md"
          >
            Trở lại
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            className="bg-primary_color text-white px-2 py-1 rounded-md hover:bg-primary_color_hover"
          >
            {isLoading && (
              <Spinner
                color="info"
                size="sm"
              />
            )}
            {university ? 'Cập nhật' : 'Thêm mới'}
          </button>
        </div>
      </form>
    </div>
  )
}
export default UniversityForm
