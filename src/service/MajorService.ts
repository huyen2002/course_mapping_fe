import { MajorAPIs } from '../constants/APIs'
import { MajorUtils } from '../models/Major'
import { QueryParams } from '../models/QueryParams'
import { http } from '../server/http'

export interface SearchMajorParams {
  name?: string
  code?: string
}
export const MajorService = {
  getAll: async (params: QueryParams) => {
    const response = (
      await http.get(MajorAPIs.GET_ALL, {
        params: params,
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
      data: MajorUtils.toEntities(response.data),
    }
  },
  search: async (queryParams: QueryParams, searchParams: SearchMajorParams) => {
    const response = (
      await http.get(MajorAPIs.SEARCH, {
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
      data: MajorUtils.toEntities(response.data),
    }
  },
}
