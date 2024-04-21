import { ProgramEducationAPIs } from '../constants/APIs'
import { ComparableProgramEducationUtils } from '../models/ComparableProgramEducation'
import { FilterParams } from '../models/FilterParams'
import { ProgramEducationCourseUtils } from '../models/ProgramEducationCourse'
import { SearchProgramParams } from '../models/SearchProgramParams'
import { SortParam } from '../models/SortParam'
import { http } from '../server/http'
import {
  ProgramEducation,
  ProgramEducationUtils,
} from './../models/ProgramEducation'
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
  getSimilarPrograms: async (
    id: number,
    sortParam: SortParam,
    filterParams: FilterParams
  ) => {
    const response = (
      await http.get(ProgramEducationAPIs.GET_SIMILAR_PROGRAMS(id), {
        params: { ...sortParam, ...filterParams },
      })
    ).data
    return {
      meta: {
        status: response.status,
        message: response.message,
      },
      data: response.data?.map((response: any) => {
        return {
          program: ProgramEducationUtils.toEntity(response.first),
          similarity: response.second,
        }
      }),
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
      data: ComparableProgramEducationUtils.toEntity(response.data),
    }
  },
  getAllByUser: async (params?: QueryParams) => {
    const response = (
      await http.get(ProgramEducationAPIs.GET_ALL_BY_USER, {
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
      data: ProgramEducationUtils.toEntities(response.data),
    }
  },
  create: async (data: ProgramEducation) => {
    const response = (await http.post(ProgramEducationAPIs.CREATE, data)).data
    return {
      meta: {
        status: response.status,
        message: response.message,
      },
      data: ProgramEducationUtils.toEntity(response.data),
    }
  },
}
export default ProgramEducationService
