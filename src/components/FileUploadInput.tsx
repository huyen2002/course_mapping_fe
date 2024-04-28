import { FileInput, Label } from 'flowbite-react'
import { ChangeEvent } from 'react'
import { toast } from 'react-toastify'

const FileUploadInput = ({
  label,
  setFileUpload,
  outlineUrl,
}: {
  label: string
  setFileUpload: any
  outlineUrl?: string | null
}) => {
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]
    const maxSize = 5 * 1024 * 1024
    if (file) {
      if (file.size > maxSize) {
        toast.error('File upload không được vượt quá 5MB')
      } else {
        setFileUpload(file)
      }
    }
  }
  return (
    <div className="mb-2">
      <div className="mb-1">
        <Label
          htmlFor="outline"
          value={label}
        />
      </div>
      {outlineUrl && (
        <div className="mb-4">
          <a
            href={outlineUrl}
            target="_blank"
            rel="noreferrer"
            className="text-primary_color underline hover:text-primary_color_hover font-montserrat"
          >
            Xem nội dung tệp hiện tại
          </a>
        </div>
      )}

      <FileInput
        id="outline"
        onChange={handleFileUpload}
        accept=".pdf"
        helperText="Tải lên tệp PDF (tối đa 5MB)"
      />
    </div>
  )
}
export default FileUploadInput
