import { Select } from 'flowbite-react'

import { ProgramEducation } from '../models/ProgramEducation'
import { SortType } from '../models/SortParam'
import ProgramEducationItem from './ProgramEducationItem'

const SimilarPrograms = ({
  programEducation,
  similarPrograms,
  sortType,
  setSortType,
}: {
  programEducation: ProgramEducation | null
  similarPrograms: any[]
  sortType: SortType
  setSortType: (sortType: SortType) => void
}) => {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(SortType[e.target.value as keyof typeof SortType])
  }

  return (
    <div className="relative">
      {similarPrograms.length > 0 ? (
        <div className="flex flex-col gap-4">
          <div className=" flex items-center gap-4 ">
            <span>Sắp xếp theo:</span>
            <Select
              id="sort"
              value={sortType}
              onChange={handleSortChange}
              className="flex-1"
            >
              <option value={SortType.SIMILARITY_DESC}>
                Độ tương tự giảm dần
              </option>
              <option value={SortType.SIMILARITY_ASC}>
                Độ tương tự tăng dần
              </option>

              <option value={SortType.ALPHABET_ASC}>Từ A đến Z</option>
              <option value={SortType.ALPHABET_DESC}>Từ Z đến A</option>
            </Select>
          </div>

          {similarPrograms.map((item, index) => (
            <div key={index}>
              <ProgramEducationItem
                programEducation={item.program}
                comparedProgramEducationId={programEducation?.id}
                hideInfo
              />
              {/* <span>{item.similarity}</span> */}
            </div>
          ))}
        </div>
      ) : (
        <h1>Không có chương trình nào tương tự</h1>
      )}
    </div>
  )
}
export default SimilarPrograms
