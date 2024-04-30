import { UniversityAPIs } from '../constants/APIs'
import { QueryParams } from '../models/QueryParams'
import { SearchUniversityParams } from '../models/SearchUniversityParams'
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
  getByUser: async () => {
    const response = (await http.get(UniversityAPIs.GET_BY_USER)).data
    return {
      meta: {
        status: response.status,
        message: response.message,
      },
      data: UniversityUtils.toEntity(response.data),
    }
  },
  getById: async (id: number) => {
    const response = (await http.get(UniversityAPIs.GET_BY_ID(id))).data
    return {
      meta: {
        status: response.status,
        message: response.message,
      },
      data: UniversityUtils.toEntity(response.data),
    }
  },
  search: async (searchParams: SearchUniversityParams, params: QueryParams) => {
    const response = (
      await http.get(UniversityAPIs.SEARCH, {
        params: { ...searchParams, ...params },
      })
    ).data
    return {
      meta: {
        status: response.status,
        message: response.message,
        total: response.total,
        page: response.page,
        size: response.size,
      },
      data: UniversityUtils.toEntities(response.data),
    }
  },
  getAll: async (params: QueryParams) => {
    const response = (
      await http.get(UniversityAPIs.GET_ALL, {
        params: params,
      })
    ).data
    return {
      meta: {
        status: response.status,
        message: response.message,
        total: response.total,
        page: response.page,
        size: response.size,
      },
      data: UniversityUtils.toEntities(response.data),
    }
  },
}
