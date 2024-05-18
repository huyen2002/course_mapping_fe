import { ProgramEducation } from '../models/ProgramEducation'
import ProgramEducationItem from './ProgramEducationItem'

const SimilarPrograms = ({
  programEducation,
  similarPrograms,
}: {
  programEducation: ProgramEducation | null
  similarPrograms: any[]
}) => {
  return (
    <div className="relative">
      {similarPrograms.length > 0 ? (
        <div className="flex flex-col gap-4">
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
