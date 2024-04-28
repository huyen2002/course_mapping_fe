import { CourseAPIs } from '../constants/APIs'
import { Course, CourseUtils } from '../models/Course'
import { QueryParams } from '../models/QueryParams'
import { SearchCourseParams } from '../models/SearchMajorParams'
import { http } from '../server/http'

export const CourseService = {
  getAllByUniversity: async (id: number, params?: QueryParams) => {
    const response = (
      await http.get(CourseAPIs.GET_ALL_BY_UNIVERSITY(id), { params: params })
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
  search: async (
    searchCourseParams?: SearchCourseParams,
    params?: QueryParams
  ) => {
    const response = (
      await http.get(CourseAPIs.SEARCH, {
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
    const response = (await http.post(CourseAPIs.CREATE, data)).data
    return {
      meta: {
        message: response.message,
        status: response.status,
      },
      data: CourseUtils.toEntity(response.data),
    }
  },
  getList: async () => {
    const response = (await http.get(CourseAPIs.GET_LIST)).data
    return {
      meta: {
        total: response.total,
        message: response.message,
        status: response.status,
      },
      data: CourseUtils.toEntities(response.data),
    }
  },
}
