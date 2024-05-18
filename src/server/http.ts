import axios from 'axios'
import { AuthUtils } from './../utils/AuthUtils'

// export const http = axios.create({
//   baseURL: 'http://localhost:8000',
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: AuthUtils.generateAuthorizationHeader(),
//   },
// })

export const http = () => {
  return axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
      'Content-Type': 'application/json',
      Authorization: AuthUtils.generateAuthorizationHeader(),
    },
  })
}
