import { ProgramEducationAPIs } from '../constants/APIs'
import { ProgramEducationUtils } from '../models/ProgramEducation'
import { QueryParams } from '../models/QueryParams'
import { http } from '../server/http'

const ProgramEducationService = {
  getAll: async (params: QueryParams) => {
    const response = (
      await http.get(ProgramEducationAPIs.GET_ALL, {
        params: params,
      })
    ).data
    return {
      meta: {
        total: response.total,
        message: response.message,
        status: response.status,
        page: response.page,
        size: response.size,
      },
      data: ProgramEducationUtils.toEntities(response.data),
    }
  },
}
export default ProgramEducationService
