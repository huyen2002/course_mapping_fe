import { useNavigate } from 'react-router-dom'
import Paths from '../constants/paths'
import { Major } from '../models/Major'

const MajorDetail = ({ major }: { major: Major }) => {
  const navigate = useNavigate()
  return (
    <div className="w-full shadow-md rounded-md p-4 flex flex-col gap-2">
      <h1 className="text-lg font-montserrat font-semibold">{major.name}</h1>
      <div>
        <span>Mã ngành: </span>
        <span>{major.code}</span>
      </div>
      <div className="flex gap-20">
        <div>
          <button
            onClick={() =>
              navigate({
                pathname: Paths.SEARCH_PROGRAM_RESULT,
                search: `?majorCode=${major.code}`,
              })
            }
            className="font-montserrat text-primary_color hover:text-primary_color_hover hover:underline "
          >
            {`Chương trình đào tạo (${major.numberOfProgramEducations})`}
          </button>
        </div>
        <div>
          <a
            href="/"
            className="font-montserrat text-primary_color hover:text-primary_color_hover hover:underline "
          >
            Trường đào tạo (50)
          </a>
        </div>
      </div>
    </div>
  )
}
export default MajorDetail
