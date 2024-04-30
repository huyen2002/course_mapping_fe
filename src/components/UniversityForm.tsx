import { Label, TextInput } from 'flowbite-react'
import { useForm } from 'react-hook-form'
import { FaAsterisk } from 'react-icons/fa6'
import { University } from '../models/University'

const UniversityForm = ({ university }: { university?: University }) => {
  const { register, handleSubmit } = useForm<University>({
    defaultValues: university,
  })

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
          <div className="mb-2 block">
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
            <TextInput
              id="code"
              {...register('code', {
                required: true,
              })}
            />
          </div>
        </div>
      </form>
    </div>
  )
}
export default UniversityForm
