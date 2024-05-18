import { AuthAPIs } from '../constants/APIs'
import { UserCreateInput, UserLoginInput, UserUtils } from '../models/User'
import { http } from '../server/http'

export const AuthService = {
  login: async (data: UserLoginInput) => {
    const response = (await http().post(AuthAPIs.LOGIN, data)).data
    localStorage.setItem('accessToken', response.accessToken)
    localStorage.setItem('tokenType', response.tokenType)
    localStorage.setItem('role', response.user.role)
    return UserUtils.toEntity(response.user)
  },
  me: async () => {
    const response = (await http().get(AuthAPIs.ME)).data
    return {
      meta: {
        message: response.message,
        status: response.status,
      },
      data: UserUtils.toEntity(response.data),
    }
  },
  register: async (data: UserCreateInput) => {
    const response = (await http().post(AuthAPIs.REGISTER, data)).data
    return {
      meta: {
        message: response.message,
        status: response.status,
      },
      data: UserUtils.toEntity(response.data),
    }
  },
}
