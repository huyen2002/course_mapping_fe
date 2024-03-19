import { Course } from './Course'

export interface ComparedCourses {
  firstCourse: Course | null
  secondCourse: Course | null
  similarity: number
}
export const ComparedCoursesUtils = {
  toEntity: (dto: any) => {
    return {
      firstCourse: dto.course1,
      secondCourse: dto.course2,
      similarity: dto.similarity,
    } as ComparedCourses
  },
  toEntities: (dtos: any[]) => {
    return dtos.map((dto) => ComparedCoursesUtils.toEntity(dto))
  },
}
