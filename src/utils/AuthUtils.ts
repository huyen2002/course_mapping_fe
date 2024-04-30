import { Role } from '../models/User'

export const AuthUtils = {
  generateAuthorizationHeader: () => {
    const authToken = localStorage.getItem('accessToken')
    const tokenType = localStorage.getItem('tokenType')
    return tokenType + ' ' + authToken
  },
  isAuthorized: () => {
    return localStorage.getItem('accessToken') != null
  },
  logout: () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('tokenType')
    localStorage.removeItem('role')
  },
  isUniversity: () => {
    return localStorage.getItem('role') === Role.UNIVERSITY
  },
  isAdmin: () => {
    return localStorage.getItem('role') === Role.ADMIN
  },
}
