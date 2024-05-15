import { ComparedCourses } from './ComparedCourses'

export interface ComparableProgramEducation {
  firstProgramId: number
  secondProgramId: number
  nameSimilarity: number
  introductionSimilarity: number
  outlineSimilarity: number
  coursesMapping: ComparedCourses[]
}

export const ComparableProgramEducationUtils = {
  toEntity: (dto: any) => {
    return {
      firstProgramId: dto.firstProgramId,
      secondProgramId: dto.secondProgramId,
      coursesMapping: JSON.parse(dto.coursesMapping),
      nameSimilarity: dto.nameSimilarity,
      introductionSimilarity: dto.introductionSimilarity,
      outlineSimilarity: dto.outlineSimilarity,
    } as ComparableProgramEducation
  },
}
