import { ComparedCourses } from './ComparedCourses'

export interface ComparableProgramEducation {
  firstProgramId: number
  secondProgramId: number
  coursesMapping: ComparedCourses[]
}

export const ComparableProgramEducationUtils = {
  toEntity: (dto: any) => {
    return {
      firstProgramId: dto.firstProgramId,
      secondProgramId: dto.secondProgramId,
      coursesMapping: JSON.parse(dto.coursesMapping),
    } as ComparableProgramEducation
  },
}
