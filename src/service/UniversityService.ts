import { UniversityAPIs } from '../constants/APIs'
import { UniversityUtils } from '../models/University'
import { http } from '../server/http'

export const UniversityService = {
  getList: async () => {
    const response = (await http.get(UniversityAPIs.GET_LIST)).data
    return {
      meta: {
        status: response.status,
        message: response.message,
      },
      data: UniversityUtils.toEntities(response.data),
    }
  },
}
