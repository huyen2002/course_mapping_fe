import { AuthAPIs } from '../constants/APIs'
import { UserCreateInput, UserLoginInput, UserUtils } from '../models/User'
import { http } from '../server/http'

export const AuthService = {
  login: async (data: UserLoginInput) => {
    const response = (await http().post(AuthAPIs.LOGIN, data)).data
    if (response.data) {
      localStorage.setItem('accessToken', response.data.accessToken)
      localStorage.setItem('tokenType', response.data.tokenType)
      localStorage.setItem('role', response.data.user.role)
    }
    return {
      meta: {
        message: response.message,
        status: response.status,
      },
      data: response.data ? UserUtils.toEntity(response.data.user) : null,
    }
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
