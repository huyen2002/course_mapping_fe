import { UserAPIs } from '../constants/APIs'
import { UserUtils } from '../models/User'
import { http } from '../server/http'

export const UserService = {
  update: async (id: number, data: any) => {
    const response = (await http.put(UserAPIs.UPDATE(id), data)).data
    return {
      meta: {
        status: response.status,
        message: response.message,
      },
      data: UserUtils.toEntity(response.data),
    }
  },
}
