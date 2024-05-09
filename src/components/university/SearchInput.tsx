import { useState } from 'react'

const SearchInput = ({
  setSearchName,
  placeholder,
}: {
  setSearchName: any
  placeholder: string
}) => {
  const [name, setName] = useState<string>('')
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }
  const onSubmit = (e: any) => {
    setSearchName(name)
  }
  return (
    <form className="max-w-md flex-1">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only "
      >
        Tìm kiếm
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          id="default-search"
          className="block w-full p-2 ps-10 text-sm text-gray-900 border outline-none border-gray-300 rounded-lg bg-gray-50  focus:border-primary_color "
          placeholder={placeholder}
          required
          value={name}
          onChange={handleValueChange}
        />
        <button
          type="button"
          onClick={onSubmit}
          className="text-white absolute end-2.5 bottom-1 bg-primary_color hover:bg-primary_color_hover  focus:outline-none font-medium rounded-lg text-sm px-2 py-1 "
        >
          Tìm kiếm
        </button>
      </div>
    </form>
  )
}
export default SearchInput
