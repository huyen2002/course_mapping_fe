export const AuthUtils = {
  generateAuthorizationHeader: () => {
    const authToken = localStorage.getItem('accessToken')
    const tokenType = localStorage.getItem('tokenType')
    return tokenType + ' ' + authToken
  },
  isAuthorized: () => {
    return localStorage.getItem('accessToken') != null
  },
}
