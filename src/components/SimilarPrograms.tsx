import { Select } from 'flowbite-react'
import { useState } from 'react'
import { FilterType } from '../models/FilterParam'
import { ProgramEducation } from '../models/ProgramEducation'
import ProgramEducationItem from './ProgramEducationItem'

const SimilarPrograms = ({
  programEducation,
  similarPrograms,
  setFilterType,
}: {
  programEducation: ProgramEducation | null
  similarPrograms: any[]
  setFilterType: (filterType: FilterType) => void
}) => {
  const [filter, setFilter] = useState<FilterType>(FilterType.SIMILARITY_DESC)
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(FilterType[e.target.value as keyof typeof FilterType])
    setFilterType(FilterType[e.target.value as keyof typeof FilterType])
  }
  return (
    <div className="">
      {similarPrograms.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-primary_color">
            Chương trình đào tạo tương tự
          </h2>
          <div className=" flex items-center gap-4 ">
            <span>Sắp xếp theo:</span>
            <Select
              id="filter"
              value={filter}
              onChange={handleFilterChange}
              className="flex-1"
            >
              <option value={FilterType.SIMILARITY_DESC}>
                Độ tương tự giảm dần
              </option>
              <option value={FilterType.SIMILARITY_ASC}>
                Độ tương tự tăng dần
              </option>

              <option value={FilterType.ALPHABET_ASC}>Từ A đến Z</option>
              <option value={FilterType.ALPHABET_DESC}>Từ Z đến A</option>
            </Select>
          </div>

          {similarPrograms.map((item, index) => (
            <div>
              <ProgramEducationItem
                key={index}
                programEducation={item.program}
                comparedProgramEducationId={programEducation?.id}
                hideInfo
              />
              <span>{item.similarity}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default SimilarPrograms
