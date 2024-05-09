import { QueryParams } from '../models/QueryParams'
import { SearchUniversityParams } from '../models/SearchUniversityParams'
import { UniversityUtils } from '../models/University'
import { http } from '../server/http'
import { UniversityAPIs } from './../constants/APIs'

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

  updateById: async (id: number, data: any) => {
    const response = (await http.put(UniversityAPIs.UPDATE_BY_ID(id), data))
      .data
    return {
      meta: {
        status: response.status,
        message: response.message,
      },
      data: UniversityUtils.toEntity(response.data),
    }
  },
  create: async (data: any) => {
    const response = (await http.post(UniversityAPIs.CREATE, data)).data
    return {
      meta: {
        status: response.status,
        message: response.message,
      },
      data: UniversityUtils.toEntity(response.data),
    }
  },
  delete: async (id: number) => {
    const response = (await http.delete(UniversityAPIs.DELETE(id))).data
    return {
      meta: {
        status: response.status,
        message: response.message,
      },
      data: response.data,
    }
  },
}
