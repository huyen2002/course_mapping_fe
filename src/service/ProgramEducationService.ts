import { ProgramEducationAPIs } from '../constants/APIs'
import { ComparableProgramEducationUtils } from '../models/ComparableProgramEducation'
import { FilterParams } from '../models/FilterParams'
import { SearchProgramParams } from '../models/SearchProgramParams'
import { http } from '../server/http'
import {
  ProgramEducationDto,
  ProgramEducationUtils,
} from './../models/ProgramEducation'
import { QueryParams } from './../models/QueryParams'

const ProgramEducationService = {
  search: async (
    queryParams?: QueryParams,
    searchParams?: SearchProgramParams
  ) => {
    const response = (
      await http().get(ProgramEducationAPIs.SEARCH, {
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
    const response = (await http().get(ProgramEducationAPIs.GET_BY_ID(id))).data
    return {
      meta: {
        status: response.status,
        message: response.message,
      },
      data: ProgramEducationUtils.toEntity(response.data),
    }
  },

  getSimilarPrograms: async (id: number, filterParams: FilterParams) => {
    const response = (
      await http().get(ProgramEducationAPIs.GET_SIMILAR_PROGRAMS(id), {
        params: { ...filterParams },
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
  compareTwoPrograms: async (
    firstProgramId: number,
    secondProgramId: number
  ) => {
    const response = (
      await http().get(
        ProgramEducationAPIs.COMPARE_TWO_PROGRAMS(
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
      await http().get(ProgramEducationAPIs.GET_ALL_BY_USER, {
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
  create: async (data: ProgramEducationDto) => {
    const response = (await http().post(ProgramEducationAPIs.CREATE, data)).data
    return {
      meta: {
        status: response.status,
        message: response.message,
      },
      data: response.data
        ? ProgramEducationUtils.toEntity(response.data)
        : null,
    }
  },
  update: async (id: number, data: ProgramEducationDto) => {
    const response = (await http().put(ProgramEducationAPIs.UPDATE(id), data))
      .data
    return {
      meta: {
        status: response.status,
        message: response.message,
      },
      data: response.data
        ? ProgramEducationUtils.toEntity(response.data)
        : null,
    }
  },
  delete: async (id: number) => {
    const response = (await http().delete(ProgramEducationAPIs.DELETE(id))).data
    return {
      meta: {
        status: response.status,
        message: response.message,
      },
    }
  },
  // checkExistedByCode: async (code: string) => {
  //   const response = (
  //     await http().get(ProgramEducationCourseAPIs.CHECK_EXISTED_BY_CODE, {
  //       params: { code: code },
  //     })
  //   ).data
  //   return {
  //     meta: {
  //       message: response.message,
  //       status: response.status,
  //     },
  //     data: response.data,
  //   }
  // },
  updateEnabled: async (id: number, data: any) => {
    const response = (
      await http().put(ProgramEducationAPIs.UPDATE_ENABLED(id), data)
    ).data
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
