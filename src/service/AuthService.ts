import { AuthAPIs } from '../constants/APIs'
import { UserLoginInput, UserUtils } from '../models/User'
import { http } from '../server/http'

export const AuthService = {
  login: async (data: UserLoginInput) => {
    const response = (await http.post(AuthAPIs.LOGIN, data)).data
    localStorage.setItem('accessToken', response.accessToken)
    localStorage.setItem('tokenType', response.tokenType)
    return UserUtils.toEntity(response.user)
  },
}
