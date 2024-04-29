import { Label, TextInput, Tooltip } from 'flowbite-react'
import { useState } from 'react'
import { FaAsterisk } from 'react-icons/fa6'
import { IoAdd } from 'react-icons/io5'
import { MdOutlineDelete } from 'react-icons/md'
import { toast } from 'react-toastify'
import { SourceLink } from '../models/SourceLink'

const SourceLinkForm = ({
  sourceLinks,
  setSourceLinks,
}: {
  sourceLinks: SourceLink[]
  setSourceLinks: (sourceLinks: SourceLink[]) => void
}) => {
  const [name, setName] = useState<string>('')
  const [link, setLink] = useState<string>('')

  const handleAddLink = () => {
    if (name.trim() === '' || link.trim() === '') {
      toast.error('Vui lòng nhập đầy đủ tên và đường dẫn')
    } else {
      setSourceLinks([...sourceLinks, { name, link }])
      setName('')
      setLink('')
    }
  }
  const handleDeleteLink = (index: number) => {
    console.log('delete', index)
    const newSourceLinks = sourceLinks.filter((_, i) => i !== index)
    setSourceLinks(newSourceLinks)
  }
  return (
    <div>
      <Label
        htmlFor="sourceLink"
        value="Nguồn thông tin"
      />
      <div className="flex flex-col gap-2">
        {sourceLinks.map((sourceLink, index) => {
          return (
            <div
              key={index}
              className="flex items-center"
            >
              <div className="flex-1">
                <a
                  href={sourceLink.link}
                  target="_blank"
                  className="text-primary_color hover:text-primary_color_hover underline font-montserrat "
                >
                  {sourceLink.name}
                </a>
              </div>

              <Tooltip content="Xoá">
                <button
                  type="button"
                  onClick={() => handleDeleteLink(index)}
                >
                  <MdOutlineDelete
                    size={25}
                    color="#F87171"
                  />
                </button>
              </Tooltip>
            </div>
          )
        })}
      </div>

      <div className="flex gap-4 mt-2 items-center">
        <div className="flex-1">
          <div className="flex items-center gap-[4px] mb-2">
            <Label
              htmlFor="name"
              value="Tên"
            />
            <FaAsterisk
              color="red"
              fontSize="0.6rem"
            />
          </div>

          <TextInput
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-[4px] mb-2">
            <Label
              htmlFor="link"
              value="Đường dẫn"
            />
            <FaAsterisk
              color="red"
              fontSize="0.6rem"
            />
          </div>
          <TextInput
            id="link"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        <Tooltip content="Thêm">
          <button
            type="button"
            onClick={handleAddLink}
          >
            <IoAdd
              size={25}
              color="#4B9BDB"
            />
          </button>
        </Tooltip>
      </div>
    </div>
  )
}
export default SourceLinkForm
