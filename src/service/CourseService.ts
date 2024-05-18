import { CourseAPIs } from '../constants/APIs'
import { Course, CourseUtils } from '../models/Course'
import { QueryParams } from '../models/QueryParams'
import { SearchCourseParams } from '../models/SearchMajorParams'
import { http } from '../server/http'

export const CourseService = {
  search: async (
    searchCourseParams?: SearchCourseParams,
    params?: QueryParams
  ) => {
    const response = (
      await http().get(CourseAPIs.SEARCH, {
        params: { ...searchCourseParams, ...params },
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
      data: CourseUtils.toEntities(response.data),
    }
  },
  create: async (data: Course) => {
    const response = (await http().post(CourseAPIs.CREATE, data)).data
    return {
      meta: {
        message: response.message,
        status: response.status,
      },
      data: CourseUtils.toEntity(response.data),
    }
  },
  getList: async (id: number) => {
    const response = (await http().get(CourseAPIs.GET_LIST(id))).data
    return {
      meta: {
        total: response.total,
        message: response.message,
        status: response.status,
      },
      data: CourseUtils.toEntities(response.data),
    }
  },
  update: async (id: number, data: Course) => {
    const response = (await http().put(CourseAPIs.UPDATE(id), data)).data
    return {
      meta: {
        message: response.message,
        status: response.status,
      },
      data: CourseUtils.toEntity(response.data),
    }
  },
  delete: async (id: number) => {
    const response = (await http().delete(CourseAPIs.DELETE(id))).data
    return {
      meta: {
        message: response.message,
        status: response.status,
      },
      data: response.data,
    }
  },
  checkExistedByCode: async (code: string) => {
    const response = (
      await http().get(CourseAPIs.CHECK_EXISTED_BY_CODE, {
        params: { code: code },
      })
    ).data
    return {
      meta: {
        message: response.message,
        status: response.status,
      },
      data: response.data,
    }
  },
}
