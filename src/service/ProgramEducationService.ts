import { ProgramEducationAPIs } from '../constants/APIs'
import { ComparedCoursesUtils } from '../models/ComparedCourses'
import { ProgramEducationUtils } from '../models/ProgramEducation'
import { ProgramEducationCourseUtils } from '../models/ProgramEducationCourse'
import { SearchProgramParams } from '../models/SearchProgramParams'
import { http } from '../server/http'
import { QueryParams } from './../models/QueryParams'

const ProgramEducationService = {
  getAll: async (params: QueryParams) => {
    const response = (
      await http.get(ProgramEducationAPIs.GET_ALL, {
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
      data: ProgramEducationUtils.toEntities(response.data),
    }
  },
  search: async (
    queryParams?: QueryParams,
    searchParams?: SearchProgramParams
  ) => {
    const response = (
      await http.get(ProgramEducationAPIs.SEARCH, {
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
      data: ProgramEducationUtils.toEntities(response.data),
    }
  },
  getById: async (id: number) => {
    const response = (await http.get(ProgramEducationAPIs.GET_BY_ID(id))).data
    return {
      meta: {
        status: response.status,
        message: response.message,
      },
      data: ProgramEducationUtils.toEntity(response.data),
    }
  },
  getCoursesByProgramId: async (id: number, params: QueryParams) => {
    const response = (
      await http.get(ProgramEducationAPIs.GET_COURSES_BY_PROGRAM_ID(id), {
        params,
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
  getSimilarPrograms: async (id: number) => {
    const response = (
      await http.get(ProgramEducationAPIs.GET_SIMILAR_PROGRAMS(id))
    ).data
    return {
      meta: {
        status: response.status,
        message: response.message,
      },
      data: ProgramEducationUtils.toEntities(response.data),
    }
  },
  compareCourseLists: async (
    firstProgramId: number,
    secondProgramId: number
  ) => {
    const response = (
      await http.get(
        ProgramEducationAPIs.COMPARE_COURSE_LISTS(
          firstProgramId,
          secondProgramId
        )
      )
    ).data
    return {
      meta: {
        status: response.status,
        message: response.message,
      },
      data: ComparedCoursesUtils.toEntities(response.data),
    }
  },
}
export default ProgramEducationService