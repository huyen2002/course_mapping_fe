import { ProgramEducationCourseAPIs } from '../constants/APIs'
import {
  ProgramEducationCourse,
  ProgramEducationCourseUtils,
} from '../models/ProgramEducationCourse'
import { QueryParams } from '../models/QueryParams'
import { http } from '../server/http'
import { SearchCourseParams } from './../models/SearchMajorParams'

export const ProgramEducationCourseService = {
  search: async (
    params?: QueryParams,
    searchCourseParams?: SearchCourseParams
  ) => {
    const response = (
      await http.get(ProgramEducationCourseAPIs.SEARCH, {
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
      data: ProgramEducationCourseUtils.toEntities(response.data),
    }
  },
  create: async (data: ProgramEducationCourse) => {
    const response = (await http.post(ProgramEducationCourseAPIs.CREATE, data))
      .data
    return {
      meta: {
        message: response.message,
        status: response.status,
      },
      data: ProgramEducationCourseUtils.toEntity(response.data),
    }
  },
  delete: async (id: number) => {
    const response = (await http.delete(ProgramEducationCourseAPIs.DELETE(id)))
      .data
    return {
      meta: {
        message: response.message,
        status: response.status,
      },
      data: response.data,
    }
  },
}
