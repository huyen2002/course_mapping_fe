import { MajorAPIs } from '../constants/APIs'
import { MajorUtils } from '../models/Major'
import { QueryParams } from '../models/QueryParams'
import { SearchMajorParams } from '../models/SearchMajorParams'
import { http } from '../server/http'

export const MajorService = {
  search: async (
    queryParams?: QueryParams,
    searchParams?: SearchMajorParams
  ) => {
    const response = (
      await http().get(MajorAPIs.SEARCH, {
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
  getList: async () => {
    const response = (await http().get(MajorAPIs.GET_LIST)).data
    return {
      meta: {
        status: response.status,
        message: response.message,
      },
      data: MajorUtils.toEntities(response.data),
    }
  },

  updateEnabled: async (id: number, data: any) => {
    const response = (await http().put(MajorAPIs.UPDATE_ENABLED(id), data)).data
    return {
      meta: {
        status: response.status,
        message: response.message,
      },
      data: MajorUtils.toEntity(response.data),
    }
  },
  update: async (id: number, data: any) => {
    const response = (await http().put(MajorAPIs.UPDATE(id), data)).data
    return {
      meta: {
        status: response.status,
        message: response.message,
      },
      data: response.data ? MajorUtils.toEntity(response.data) : null,
    }
  },
  create: async (data: any) => {
    const response = (await http().post(MajorAPIs.CREATE, data)).data
    return {
      meta: {
        status: response.status,
        message: response.message,
      },
      data: response.data ? MajorUtils.toEntity(response.data) : null,
    }
  },
  delete: async (id: number) => {
    const response = (await http().delete(MajorAPIs.DELETE(id))).data
    return {
      meta: {
        status: response.status,
        message: response.message,
      },
      data: response.data,
    }
  },
}
