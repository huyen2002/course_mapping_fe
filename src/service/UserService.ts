import { UserAPIs } from '../constants/APIs'
import { QueryParams } from '../models/QueryParams'
import { SearchUserParams } from '../models/SearchUserParams'
import { UserUtils } from '../models/User'
import { http } from '../server/http'

export const UserService = {
  update: async (id: number, data: any) => {
    const response = (await http().put(UserAPIs.UPDATE(id), data)).data
    return {
      meta: {
        status: response.status,
        message: response.message,
      },
      data: UserUtils.toEntity(response.data),
    }
  },
  changePassword: async (id: number, data: any) => {
    const response = (await http().put(UserAPIs.CHANGE_PASSWORD(id), data)).data
    return {
      meta: {
        status: response.status,
        message: response.message,
      },
      data: response.data,
    }
  },
  search: async (
    queryParams?: QueryParams,
    searchParams?: SearchUserParams
  ) => {
    const response = (
      await http().get(UserAPIs.SEARCH, {
        params: { ...queryParams, ...searchParams },
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
      data: UserUtils.toEntities(response.data),
    }
  },
  delete: async (id: number) => {
    const response = (await http().delete(UserAPIs.DELETE(id))).data
    return {
      meta: {
        status: response.status,
        message: response.message,
      },
    }
  },
}
