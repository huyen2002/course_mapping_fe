import { Course, CourseUtils } from './Course'

export interface ProgramEducationCourse {
  id?: number
  programEducationId: number
  courseId: number
  course?: Course
  compulsory: boolean
  numCredits: number
}
export const ProgramEducationCourseUtils = {
  toEntity: (dto: any) => {
    return {
      id: dto.id,
      programEducationId: dto.programEducationId,
      course: CourseUtils.toEntity(dto.course),
      compulsory: dto.compulsory,
      numCredits: dto.numCredits,
    } as ProgramEducationCourse
  },
  toEntities: (dtos: any[]): ProgramEducationCourse[] => {
    return dtos.map((item) => ProgramEducationCourseUtils.toEntity(item))
  },
}
